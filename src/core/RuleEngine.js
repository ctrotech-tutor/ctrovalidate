// src/core/RuleEngine.js

/**
 * @file This class contains the core validation logic. It's responsible for
 * checking dependencies, executing synchronous and asynchronous rules, and
 * formatting error messages.
 */

export class RuleEngine {
  /**
   * A reference to the main validator's logger.
   * @private
   * @type {Logger}
   */
  #logger;

  /**
   * A reference to the UI Manager to display/clear errors.
   * @private
   * @type {UIManager}
   */
  #uiManager;

  /**
   * A reference to the form element for dependency checks.
   * @private
   * @type {HTMLFormElement}
   */
  #form;

  /**
   * A reference to the static rules object.
   * @private
   * @type {object}
   */
  #rules;

  /**
   * A reference to the static async rules object.
   * @private
   * @type {object}
   */
  #asyncRules;

  /**
   * A reference to the static messages object.
   * @private
   * @type {object}
   */
  #messages;

  /**
   * @constructor
   * @param {HTMLFormElement} formElement - The form element.
   * @param {object} dependencies - An object containing dependencies.
   * @param {Logger} dependencies.logger - The logger instance.
   * @param {UIManager} dependencies.uiManager - The UI manager instance.
   * @param {object} dependencies.rules - The synchronous rules.
   * @param {object} dependencies.asyncRules - The asynchronous rules.
   * @param {object} dependencies.messages - The error messages.
   */
  constructor(formElement, { logger, uiManager, rules, asyncRules, messages }) {
    this.#form = formElement;
    this.#logger = logger;
    this.#uiManager = uiManager;
    this.#rules = rules;
    this.#asyncRules = asyncRules;
    this.#messages = messages;
  }

  /**
   * The core logic for validating a single field.
   * @param {object} fieldObject - The field object to validate.
   * @returns {Promise<boolean>} - A promise that resolves to true if the field is valid, false otherwise.
   */
  async validateField(fieldObject) {
    const { element, rules, state, dependency } = fieldObject;

    if (!this.#isDependencyMet(dependency)) {
      this.#logger.debug(
        'RuleEngine',
        `Dependency for "${element.name}" not met. Skipping validation.`
      );
      this.#uiManager.clearError(element);
      return true;
    }

    const value = element.type === 'checkbox' ? element.checked : element.value;

    if (state.abortController) {
      state.abortController.abort();
      this.#logger.debug(
        'RuleEngine',
        `Aborted previous validation for "${element.name}".`
      );
    }

    for (const rule of rules) {
      const syncRuleLogic = this.#rules[rule.name];
      const asyncRuleLogic = this.#asyncRules[rule.name];

      if (!syncRuleLogic && !asyncRuleLogic) {
        this.#logger.warn(
          'RuleEngine',
          `Unknown rule "${rule.name}" used on field:`,
          element
        );
        continue;
      }

      let isValid = false;
      if (syncRuleLogic) {
        // --- UPDATED LINE ---
        // Pass the entire params array to the rule logic.
        isValid = syncRuleLogic(value, rule.params, element);
      } else if (asyncRuleLogic) {
        state.abortController = new AbortController();
        this.#uiManager.showPending(element);
        try {
          // --- UPDATED LINE ---
          // Pass the entire params array to the async rule logic.
          isValid = await asyncRuleLogic(
            value,
            rule.params,
            element,
            state.abortController.signal
          );
        } catch (error) {
          if (error.name === 'AbortError') {
            this.#logger.debug(
              'RuleEngine',
              `Async validation for "${element.name}" was successfully aborted.`
            );
            return true;
          }
          this.#logger.error(
            'RuleEngine',
            `Async rule "${rule.name}" threw an error.`,
            error
          );
          isValid = false;
        } finally {
          this.#uiManager.hidePending(element);
          state.abortController = null;
        }
      }

      if (!isValid) {
        const messageTemplate = this.#messages[rule.name] || 'Invalid input.';

        // This logic no longer needs to split the param string, it just uses the params array.
        const message = messageTemplate.replace(/{(\d+)}/g, (match, index) => {
          const paramIndex = parseInt(index, 10);
          return rule.params[paramIndex] !== undefined
            ? rule.params[paramIndex]
            : match;
        });

        this.#uiManager.displayError(element, message);
        this.#logger.debug(
          'RuleEngine',
          `Field validation failed for "${element.name}" on rule "${rule.name}".`
        );
        return false;
      }
    }

    this.#uiManager.clearError(element);
    this.#logger.debug(
      'RuleEngine',
      `Field validation succeeded for "${element.name}".`
    );
    return true;
  }

  /**
   * Checks if a field's dependency condition is currently met.
   * @private
   * @param {object} dependency - The parsed dependency object.
   * @returns {boolean} - True if the condition is met, false otherwise.
   */
  #isDependencyMet(dependency) {
    if (!dependency) return true;

    const controllerElement = this.#form.querySelector(
      `[name="${dependency.controllerName}"]`
    );
    if (!controllerElement) return false;

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
}
