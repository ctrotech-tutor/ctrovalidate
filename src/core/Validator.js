// src/core/Validator.js

/**
 * @file This is the heart of the Validus.js library. The Validator class is the main entry point
 * and acts as the orchestra conductor, coordinating the parser, rules engine, and UI manager
 * to create a seamless validation experience. This version is upgraded to handle conditional validation.
 */

import { Logger, LogLevel } from './Logger.js';
import { UIManager } from './UIManager.js';
import { parseRules } from './RuleParser.js';
import { rules as builtinRules } from '../rules/builtinRules.js';
import { defaultMessages } from '../rules/messages.js';

/**
 * @class Validus
 * @description The main class for the validation library.
 */
export class Validus {
  /**
   * The form element this instance is attached to.
   * @private
   * @type {HTMLFormElement}
   */
  #form;

  /**
   * The configuration options for this instance.
   * @private
   * @type {object}
   */
  #options;

  /**
   * The logger instance for this validator.
   * @private
   * @type {Logger}
   */
  #logger;

  /**
   * The UI manager instance for handling DOM updates.
   * @private
   * @type {UIManager}
   */
  #uiManager;

  /**
   * An array of all fields within the form that require validation.
   * @private
   * @type {Array<object>}
   */
  #fields = [];

  /**
   * A map to quickly find a field object by its element.
   * @private
   * @type {Map<HTMLElement, object>}
   */
  #fieldMap = new Map();

  static #rules = builtinRules;
  static #asyncRules = {};
  static #messages = defaultMessages;

  /**
   * @constructor
   * @param {HTMLFormElement} formElement - The form element to attach the validator to.
   * @param {object} [options={}] - Configuration options for the instance.
   */
  constructor(formElement, options = {}) {
    if (!formElement || formElement.tagName !== 'FORM') {
      throw new Error('Validus requires a valid HTMLFormElement to be initialized.');
    }
    this.#form = formElement;

    this.#options = {
      logLevel: LogLevel.NONE,
      errorClass: 'is-invalid',
      errorMessageClass: 'error-message',
      pendingClass: 'is-validating',
      realTime: true,
      ...options,
    };

    this.#logger = new Logger(this.#options.logLevel);
    this.#uiManager = new UIManager(this.#options);

    this.#logger.info('Validator', 'Initializing Validus instance for form:', this.#form);
    this.#discoverFields();
    this.#attachEventListeners();
  }

  /**
   * Parses the dependency condition string from the `data-validus-if` attribute.
   * @private
   * @param {string} conditionString - The string to parse (e.g., "fieldName:checked").
   * @returns {object | null} A structured condition object or null if invalid.
   */
  #parseDependency(conditionString) {
    if (!conditionString) return null;
    const parts = conditionString.split(':');
    const controllerName = parts[0];
    const condition = parts[1] || 'present'; // Default condition is just that the field has a value.

    if (!controllerName) return null;

    if (condition.includes('=')) {
      const [conditionType, conditionValue] = condition.split('=');
      return { controllerName, type: conditionType, value: conditionValue };
    } else {
      return { controllerName, type: condition };
    }
  }

  /**
   * Scans the form to find all fields and prepares them for validation, including dependencies.
   * @private
   */
  #discoverFields() {
    const fieldsToValidate = this.#form.querySelectorAll('[data-validus-rules]');
    this.#logger.debug('Validator', `Discovered ${fieldsToValidate.length} fields to validate.`);

    fieldsToValidate.forEach(element => {
      const rulesString = element.getAttribute('data-validus-rules');
      const dependencyString = element.getAttribute('data-validus-if');
      
      const fieldObject = {
        element,
        rules: parseRules(rulesString),
        dependency: this.#parseDependency(dependencyString),
        state: { isDirty: false, abortController: null },
      };

      this.#fields.push(fieldObject);
      this.#fieldMap.set(element, fieldObject);
    });
  }

  /**
   * Attaches all necessary event listeners for real-time and conditional validation.
   * @private
   */
  #attachEventListeners() {
    if (!this.#options.realTime) {
      this.#logger.info('Validator', 'Real-time validation is disabled.');
      return;
    }

    this.#logger.info('Validator', 'Real-time validation is enabled. Attaching listeners.');
    this.#fields.forEach(fieldObject => {
      const { element, dependency } = fieldObject;

      // Attach listeners to the field itself for real-time validation.
      element.addEventListener('blur', () => {
        this.#logger.debug('Validator', `Blur event on "${element.name}". Validating.`);
        this.#validateField(fieldObject);
        fieldObject.state.isDirty = true;
      });

      element.addEventListener('input', () => {
        if (fieldObject.state.isDirty) {
          this.#logger.debug('Validator', `Input event on dirty field "${element.name}". Validating.`);
          this.#validateField(fieldObject);
        }
      });

      // If this field has a dependency, attach a listener to its controller field.
      if (dependency) {
        const controllerElement = this.#form.querySelector(`[name="${dependency.controllerName}"]`);
        if (controllerElement) {
          controllerElement.addEventListener('input', () => {
            this.#logger.debug('Validator', `Controller "${controllerElement.name}" changed. Re-validating dependent field "${element.name}".`);
            this.#validateField(fieldObject);
          });
        } else {
          this.#logger.warn('Validator', `Could not find controller field with name "${dependency.controllerName}".`);
        }
      }
    });
  }

  /**
   * Checks if a field's dependency condition is currently met.
   * @private
   * @param {object} dependency - The parsed dependency object.
   * @returns {boolean} - True if the condition is met, false otherwise.
   */
  #isDependencyMet(dependency) {
    if (!dependency) return true; // No dependency means rules are always active.

    const controllerElement = this.#form.querySelector(`[name="${dependency.controllerName}"]`);
    if (!controllerElement) return false; // If controller doesn't exist, condition fails.

    switch (dependency.type) {
      case 'checked':
        return controllerElement.checked;
      case 'value':
        return controllerElement.value === dependency.value;
      case 'present':
        return !!controllerElement.value;
      default:
        return false;
    }
  }

  /**
   * The core logic for validating a single field, now with dependency checking.
   * @private
   * @param {object} fieldObject - The field object.
   * @returns {Promise<boolean>} - A promise that resolves to true if the field is valid, false otherwise.
   */
  async #validateField(fieldObject) {
    const { element, rules, state, dependency } = fieldObject;

    // This is the new, critical first step: check if the field's rules are active.
    if (!this.#isDependencyMet(dependency)) {
      this.#logger.debug('Validator', `Dependency for "${element.name}" not met. Skipping validation.`);
      this.#uiManager.clearError(element);
      return true; // If rules are not active, the field is considered valid by default.
    }

    const value = element.type === 'checkbox' ? element.checked : element.value;

    if (state.abortController) {
      state.abortController.abort();
      this.#logger.debug('Validator', `Aborted previous validation for "${element.name}".`);
    }

    for (const rule of rules) {
      const syncRuleLogic = Validus.#rules[rule.name];
      const asyncRuleLogic = Validus.#asyncRules[rule.name];

      if (!syncRuleLogic && !asyncRuleLogic) {
        this.#logger.warn('Validator', `Unknown rule "${rule.name}" used on field:`, element);
        continue;
      }

      let isValid = false;
      if (syncRuleLogic) {
        isValid = syncRuleLogic(value, rule.param, element);
      } else if (asyncRuleLogic) {
        state.abortController = new AbortController();
        this.#uiManager.showPending(element);
        try {
          isValid = await asyncRuleLogic(value, rule.param, element, state.abortController.signal);
        } catch (error) {
          if (error.name === 'AbortError') {
            this.#logger.debug('Validator', `Async validation for "${element.name}" was successfully aborted.`);
            return true;
          }
          this.#logger.error('Validator', `Async rule "${rule.name}" threw an error.`, error);
          isValid = false;
        } finally {
          this.#uiManager.hidePending(element);
          state.abortController = null;
        }
      }

      if (!isValid) {
        const messageTemplate = Validus.#messages[rule.name] || 'Invalid input.';
        const message = messageTemplate.replace('{param}', String(rule.param));
        this.#uiManager.displayError(element, message);
        this.#logger.debug('Validator', `Field validation failed for "${element.name}" on rule "${rule.name}".`);
        return false;
      }
    }

    this.#uiManager.clearError(element);
    this.#logger.debug('Validator', `Field validation succeeded for "${element.name}".`);
    return true;
  }

  /**
   * The main public method to validate the entire form.
   * @returns {Promise<boolean>} - A promise that resolves to true if the entire form is valid, false otherwise.
   */
  async validate() {
    this.#logger.info('Validator', 'Starting full form validation...');
    const validationPromises = this.#fields.map(fieldObject => {
      fieldObject.state.isDirty = true;
      return this.#validateField(fieldObject);
    });

    const results = await Promise.all(validationPromises);
    const isFormValid = results.every(isValid => isValid);

    this.#logger.info('Validator', `Full form validation complete. Is valid: ${isFormValid}`);
    return isFormValid;
  }

  static addRule(name, logic, message) {
    if (typeof name !== 'string' || typeof logic !== 'function' || typeof message !== 'string') {
      console.error('[Validus] addRule requires a name (string), logic (function), and message (string).');
      return;
    }
    Validus.#rules[name] = logic;
    Validus.#messages[name] = message;
  }

  static addAsyncRule(name, logic, message) {
    if (typeof name !== 'string' || typeof logic !== 'function' || typeof message !== 'string') {
      console.error('[Validus] addAsyncRule requires a name (string), logic (async function), and message (string).');
      return;
    }
    Validus.#asyncRules[name] = logic;
    Validus.#messages[name] = message;
  }
}
