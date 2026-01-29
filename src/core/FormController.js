// src/core/FormController.js

/**
 * @file Manages the form's fields, their state, and their event listeners.
 * This class is responsible for discovering validatable fields and attaching
 * the necessary logic for real-time validation.
 */

import { parseRules } from '../utils/RuleParser.js';
/**
 * @typedef {import('../utils/Logger.js').Logger} Logger
 */

export class FormController {
  /**
   * The form element being controlled.
   * @type {HTMLFormElement}
   */
  #form;

  /**
   * An array of all fields within the form that require validation.
   * @type {Array<object>}
   */
  #fields = [];

  /**
   * A map to quickly find a field object by its element.
   * @type {Map<HTMLElement, object>}
   */
  #fieldMap = new Map();

  /**
   * A reference to the main validator's logger.
   * @type {Logger}
   */
  #logger;

  /**
   * A reference to the validation function to call on events.
   * @type {Function}
   */
  #validationHandler;

  /**
   * @constructor
   * @param {HTMLFormElement} formElement - The form element to control.
   * @param {object} options - An object containing dependencies like the logger.
   * @param {Logger} options.logger - The logger instance.
   * @param {Function} options.validationHandler - The function to call to validate a field.
   */
  constructor(formElement, { logger, validationHandler }) {
    this.#form = formElement;
    this.#logger = logger;
    this.#validationHandler = validationHandler;
  }

  /**
   * Scans the form to find all fields and prepares them for validation.
   */
  discoverFields() {
    this.#fields = [];
    this.#fieldMap.clear();

    const fieldsToValidate = this.#form.querySelectorAll(
      '[data-ctrovalidate-rules]'
    );
    this.#logger.debug(
      'FormController',
      `Discovered ${fieldsToValidate.length} fields to validate.`
    );

    fieldsToValidate.forEach((element) =>
      this.addField(/** @type {HTMLElement} */ (element), false)
    );
  }

  /**
   * Adds a single field to the validation controller.
   * @param {HTMLElement} element - The field element to add.
   * @param {boolean} attachListener - Whether to immediately attach event listeners.
   */
  addField(element, attachListener = true) {
    if (
      !element ||
      !element.hasAttribute('data-ctrovalidate-rules') ||
      this.#fieldMap.has(element)
    ) {
      return; // Don't add invalid elements, fields without rules, or duplicates
    }

    const rulesString = element.getAttribute('data-ctrovalidate-rules');
    const dependencyString = element.getAttribute('data-ctrovalidate-if');

    const fieldObject = {
      element,
      rules: parseRules(rulesString),
      dependency: this.#parseDependency(dependencyString),
      state: { isDirty: false, abortController: null },
    };

    this.#fields.push(fieldObject);
    this.#fieldMap.set(element, fieldObject);
    this.#logger.debug('FormController', `Added field:`, element);

    if (attachListener) {
      this.#attachSingleFieldListener(fieldObject);
    }
  }

  /**
   * Removes a single field from the validation controller.
   * @param {HTMLElement} element - The field element to remove.
   */
  removeField(element) {
    if (!element || !this.#fieldMap.has(element)) {
      return; // Can't remove an element that isn't being tracked.
    }

    const fieldObject = this.#fieldMap.get(element);

    // Remove from internal tracking
    this.#fields = this.#fields.filter((f) => f.element !== element);

    // Remove event listeners that we attached earlier
    if (fieldObject.listeners) {
      const { onBlur, onInput, onControllerInput, controllerElement } =
        fieldObject.listeners;

      try {
        if (onBlur) element.removeEventListener('blur', onBlur);
        if (onInput) element.removeEventListener('input', onInput);
        if (controllerElement && onControllerInput)
          controllerElement.removeEventListener('input', onControllerInput);
      } catch (e) {
        // Removing listeners may throw if element has been detached already
        this.#logger.debug(
          'FormController',
          'Error while removing listeners for',
          element,
          e
        );
      }

      // Clean up the saved listeners object
      delete fieldObject.listeners;
    }

    this.#fieldMap.delete(element);

    this.#logger.debug('FormController', `Removed field:`, element);
  }

  /**
   * Attaches all necessary event listeners for real-time validation.
   * @param {boolean} isRealTime - Whether to attach real-time listeners.
   */
  attachEventListeners(isRealTime) {
    if (!isRealTime) {
      this.#logger.info('FormController', 'Real-time validation is disabled.');
      return;
    }

    this.#logger.info(
      'FormController',
      'Real-time validation is enabled. Attaching listeners.'
    );
    this.#fields.forEach((fieldObject) =>
      this.#attachSingleFieldListener(fieldObject)
    );
  }

  /**
   * Attaches event listeners to a single field object.
   * @param {object} fieldObject - The field object to attach listeners to.
   */
  #attachSingleFieldListener(fieldObject) {
    const { element, dependency } = fieldObject;

    // Avoid attaching listeners multiple times for the same field
    if (fieldObject.listeners) return;

    const onBlur = () => {
      this.#logger.debug(
        'FormController',
        `Blur event on "${element.name}". Validating.`
      );
      this.#validationHandler(fieldObject);
      fieldObject.state.isDirty = true;
    };

    const onInput = () => {
      if (fieldObject.state.isDirty) {
        this.#logger.debug(
          'FormController',
          `Input event on dirty field "${element.name}". Validating.`
        );
        this.#validationHandler(fieldObject);
      }
    };

    element.addEventListener('blur', onBlur);
    element.addEventListener('input', onInput);

    let controllerElement = null;
    let onControllerInput = null;

    if (dependency) {
      controllerElement = this.#form.querySelector(
        `[name="${dependency.controllerName}"]`
      );
      if (controllerElement) {
        onControllerInput = () => {
          this.#logger.debug(
            'FormController',
            `Controller "${controllerElement.name}" changed. Re-validating dependent field "${element.name}".`
          );
          this.#validationHandler(fieldObject);
        };

        controllerElement.addEventListener('input', onControllerInput);
      } else {
        this.#logger.warn(
          'FormController',
          `Could not find controller field with name "${dependency.controllerName}".`
        );
      }
    }

    // Save listener references so they can be removed later
    fieldObject.listeners = {
      onBlur,
      onInput,
      onControllerInput,
      controllerElement,
    };
  }

  /**
   * Parses the dependency condition string from the `data-ctrovalidate-if` attribute.
   * @param {string} conditionString - The string to parse (e.g., "fieldName:checked").
   * @returns {object | null} A structured condition object or null if invalid.
   */
  #parseDependency(conditionString) {
    if (!conditionString) return null;
    const parts = conditionString.split(':');
    const controllerName = parts[0];
    const condition = parts[1] || 'present';

    if (!controllerName) return null;

    if (condition.includes('=')) {
      const [conditionType, conditionValue] = condition.split('=');
      return { controllerName, type: conditionType, value: conditionValue };
    } else {
      return { controllerName, type: condition };
    }
  }

  /**
   * Returns all discovered fields.
   * @returns {Array<object>}
   */
  getFields() {
    return this.#fields;
  }
}
