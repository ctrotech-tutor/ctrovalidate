// src/core/Ctrovalidate.js

/**
 * @file This is the main public-facing class for the Ctrovalidate library.
 * It acts as an orchestrator, initializing and coordinating the FormController,
 * RuleEngine, and UIManager to provide a seamless validation experience.
 */

import { Logger, LogLevel } from '../utils/Logger.js';
import { UIManager } from '../dom/UIManager.js';
import { FormController } from './FormController.js';
import { RuleEngine } from './RuleEngine.js';
import { rules as builtinRules } from '../rules/index.js';
import { defaultMessages } from '../localization/en.js';

/**
 * @class Ctrovalidate
 * @description The main class for the validation library.
 */
export class Ctrovalidate {
  /**
   * The form element this instance is attached to.
   * @private
   * @type {HTMLFormElement}
   */
  #form;

  /**
   * The logger instance for this validator.
   * @private
   * @type {Logger}
   */
  #logger;

  /**
   * The FormController instance for managing fields and events.
   * @private
   * @type {FormController}
   */
  #formController;

  /**
   * The RuleEngine instance for executing validation logic.
   * @private
   * @type {RuleEngine}
   */
  #ruleEngine;

  /**
   * The configuration options for this instance.
   * @private
   * @type {object}
   */
  #options;

  // Static properties remain here as the central point of extension.
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
      throw new Error('Ctrovalidate requires a valid HTMLFormElement to be initialized.');
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

    // 1. Initialize core utilities
    this.#logger = new Logger(this.#options.logLevel);
    const uiManager = new UIManager(this.#options);

    // 2. Initialize the Rule Engine with its dependencies
    this.#ruleEngine = new RuleEngine(this.#form, {
      logger: this.#logger,
      uiManager: uiManager,
      rules: Ctrovalidate.#rules,
      asyncRules: Ctrovalidate.#asyncRules,
      messages: Ctrovalidate.#messages,
    });

    // 3. Initialize the Form Controller, passing it the engine's validation method
    this.#formController = new FormController(this.#form, {
      logger: this.#logger,
      validationHandler: this.#ruleEngine.validateField.bind(this.#ruleEngine),
    });

    this.#logger.info('Ctrovalidate', 'Initializing instance for form:', this.#form);

    // 4. Discover fields and attach listeners
    this.#formController.discoverFields();
    this.#formController.attachEventListeners(this.#options.realTime);
  }

  /**
   * The main public method to validate the entire form.
   * @returns {Promise<boolean>} - A promise that resolves to true if the entire form is valid, false otherwise.
   */
  async validate() {
    this.#logger.info('Ctrovalidate', 'Starting full form validation...');
    
    const fields = this.#formController.getFields();
    const validationPromises = fields.map(fieldObject => {
      fieldObject.state.isDirty = true; // Mark as dirty on full validation attempt
      return this.#ruleEngine.validateField(fieldObject);
    });

    const results = await Promise.all(validationPromises);
    const isFormValid = results.every(isValid => isValid);

    this.#logger.info('Ctrovalidate', `Full form validation complete. Is valid: ${isFormValid}`);
    return isFormValid;
  }

  /**
   * Programmatically adds a new field to the validator instance.
   * This is useful for forms where fields are added dynamically.
   * @param {HTMLElement} fieldElement - The input, textarea, or select element to add.
   */
  addField(fieldElement) {
    this.#logger.info('Ctrovalidate', 'Dynamically adding field:', fieldElement);
    this.#formController.addField(fieldElement, this.#options.realTime);
  }

  /**
   * Programmatically removes a field from the validator instance.
   * This is useful for forms where fields are removed dynamically.
   * @param {HTMLElement} fieldElement - The input, textarea, or select element to remove.
   */
  removeField(fieldElement) {
    this.#logger.info('Ctrovalidate', 'Dynamically removing field:', fieldElement);
    this.#formController.removeField(fieldElement);
  }

  /**
   * Adds a new synchronous validation rule to the library.
   * @param {string} name - The name of the rule.
   * @param {Function} logic - The validation function.
   * @param {string} message - The default error message.
   */
  static addRule(name, logic, message) {
    if (typeof name !== 'string' || typeof logic !== 'function' || typeof message !== 'string') {
      console.error('[Ctrovalidate] addRule requires a name (string), logic (function), and message (string).');
      return;
    }
    Ctrovalidate.#rules[name] = logic;
    Ctrovalidate.#messages[name] = message;
  }

  /**
   * Adds a new asynchronous validation rule to the library.
   * @param {string} name - The name of the rule.
   * @param {Function} logic - The async validation function.
   * @param {string} message - The default error message.
   */
  static addAsyncRule(name, logic, message) {
    if (typeof name !== 'string' || typeof logic !== 'function' || typeof message !== 'string') {
      console.error('[Ctrovalidate] addAsyncRule requires a name (string), logic (async function), and message (string).');
      return;
    }
    Ctrovalidate.#asyncRules[name] = logic;
    Ctrovalidate.#messages[name] = message;
  }
}
