// src/core/RuleEngine.ts

import { Logger } from '../utils/Logger';
import { UIManager } from '../dom/UIManager';
import {
  RuleLogic,
  AsyncRuleLogic,
  FieldObject,
  DependencyDefinition,
} from '../types/index';

interface RuleEngineDependencies {
  logger: Logger;
  uiManager: UIManager;
  rules: Record<string, RuleLogic>;
  asyncRules: Record<string, AsyncRuleLogic>;
  messages: Record<string, string>;
}

/**
 * This class contains the core validation logic.
 */
export class RuleEngine {
  #logger: Logger;
  #uiManager: UIManager;
  #form: HTMLFormElement;
  #rules: Record<string, RuleLogic>;
  #asyncRules: Record<string, AsyncRuleLogic>;
  #messages: Record<string, string>;

  /**
   * @param formElement - The form element.
   * @param dependencies - Core dependencies.
   */
  constructor(
    formElement: HTMLFormElement,
    { logger, uiManager, rules, asyncRules, messages }: RuleEngineDependencies
  ) {
    this.#form = formElement;
    this.#logger = logger;
    this.#uiManager = uiManager;
    this.#rules = rules;
    this.#asyncRules = asyncRules;
    this.#messages = messages;
  }

  /**
   * The core logic for validating a single field.
   */
  async validateField(fieldObject: FieldObject): Promise<boolean> {
    const { element, rules, state, dependency } = fieldObject;

    if (!this.#isDependencyMet(dependency)) {
      this.#logger.debug(
        'RuleEngine',
        `Dependency for "${(element as any).name}" not met. Skipping validation.`
      );
      this.#uiManager.clearError(element);
      return true;
    }

    const input = element as HTMLInputElement;
    const value = input.type === 'checkbox' ? input.checked : input.value;

    if (state.abortController) {
      state.abortController.abort();
      this.#logger.debug(
        'RuleEngine',
        `Aborted previous validation for "${input.name}".`
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
        isValid = syncRuleLogic(value, rule.params, element);
      } else if (asyncRuleLogic) {
        state.abortController = new AbortController();
        this.#uiManager.showPending(element);
        try {
          isValid = await asyncRuleLogic(
            value,
            rule.params,
            element,
            state.abortController.signal
          );
        } catch (error: any) {
          if (error.name === 'AbortError') {
            this.#logger.debug(
              'RuleEngine',
              `Async validation for "${input.name}" was successfully aborted.`
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

        const message = messageTemplate.replace(/{(\d+)}/g, (match, index) => {
          const paramIndex = parseInt(index, 10);
          return rule.params[paramIndex] !== undefined
            ? rule.params[paramIndex]
            : match;
        });

        this.#uiManager.displayError(element, message);
        this.#logger.debug(
          'RuleEngine',
          `Field validation failed for "${input.name}" on rule "${rule.name}".`
        );
        return false;
      }
    }

    this.#uiManager.clearError(element);
    this.#logger.debug(
      'RuleEngine',
      `Field validation succeeded for "${input.name}".`
    );
    return true;
  }

  /**
   * Checks if a field's dependency condition is currently met.
   */
  #isDependencyMet(dependency: DependencyDefinition | null): boolean {
    if (!dependency) return true;

    const controllerElement = this.#form.querySelector(
      `[name="${dependency.controllerName}"]`
    ) as HTMLInputElement | null;
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
