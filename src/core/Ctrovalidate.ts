// src/core/Ctrovalidate.ts

import { Logger, LogLevel } from '../utils/Logger';
import { UIManager } from '../dom/UIManager';
import { RuleEngine } from './RuleEngine';
import { FormController } from './FormController';
import { rules, asyncRules } from '../rules/index';
import { messages, addMessages } from '../rules/messages';
import type {
  CtrovalidateOptions,
  FieldObject,
  RuleLogic,
  AsyncRuleLogic,
} from '../types/index';

/**
 * The main public-facing class for the Ctrovalidate library.
 */
export class Ctrovalidate {
  #form: HTMLFormElement;
  #options: Required<CtrovalidateOptions>;
  #logger: Logger;
  #uiManager: UIManager;
  #ruleEngine: RuleEngine;
  #formController: FormController;
  public static LogLevel = LogLevel;

  /**
   * @param formElement - The HTML form element to validate.
   * @param options - Custom configuration options.
   */
  constructor(formElement: HTMLFormElement, options: CtrovalidateOptions = {}) {
    if (!(formElement instanceof HTMLFormElement)) {
      throw new Error(
        'Ctrovalidate requires a valid HTMLFormElement to be initialized.'
      );
    }

    this.#form = formElement;
    this.#options = {
      logLevel: LogLevel.NONE,
      errorClass: 'is-invalid',
      errorMessageClass: 'error-message',
      pendingClass: 'ctrovalidate-pending',
      realTime: true,
      ...options,
    };

    this.#logger = new Logger(this.#options.logLevel);
    this.#uiManager = new UIManager(this.#options);

    this.#ruleEngine = new RuleEngine(this.#form, {
      logger: this.#logger,
      uiManager: this.#uiManager,
      rules,
      asyncRules,
      messages,
    });

    this.#formController = new FormController(this.#form, {
      logger: this.#logger,
      validationHandler: (field: FieldObject) =>
        this.#ruleEngine.validateField(field),
    });

    this.#init();
  }

  /**
   * Initializes the library by discovering fields and attaching listeners.
   */
  #init(): void {
    this.#logger.info('Ctrovalidate', 'Initializing library.');
    this.#formController.discoverFields();
    this.#formController.attachEventListeners(this.#options.realTime);

    // Disable browser's native validation to prevent conflicts
    this.#form.setAttribute('novalidate', 'true');
  }

  /**
   * Validates the entire form programmatically.
   */
  async validate(): Promise<boolean> {
    return this.validateForm();
  }

  /**
   * Validates the entire form programmatically.
   */
  async validateForm(): Promise<boolean> {
    this.#logger.info('Ctrovalidate', 'Manually triggering form validation.');
    const fields = this.#formController.getFields();

    const results = await Promise.all(
      fields.map((field) => this.#ruleEngine.validateField(field))
    );

    const isValid = results.every((result) => result === true);

    if (isValid) {
      this.#logger.info('Ctrovalidate', 'Form validation succeeded.');
    } else {
      this.#logger.warn('Ctrovalidate', 'Form validation failed.');
    }

    return isValid;
  }

  /**
   * Allows the user to add custom validation messages globally.
   */
  static setCustomMessages(customMessages: Record<string, string>): void {
    addMessages(customMessages);
  }

  /**
   * Adds a custom synchronous validation rule globally.
   */
  static addRule(name: string, logic: RuleLogic, message?: string): void {
    if (!name || typeof logic !== 'function') {
      console.error(
        '[Ctrovalidate] addRule requires a rule name and a logic function.'
      );
      return;
    }
    rules[name] = logic;
    if (message) {
      messages[name] = message;
    }
  }

  /**
   * Adds a custom asynchronous validation rule globally.
   */
  static addAsyncRule(
    name: string,
    logic: AsyncRuleLogic,
    message?: string
  ): void {
    if (!name || typeof logic !== 'function') {
      console.error(
        '[Ctrovalidate] addAsyncRule requires a rule name and a logic function.'
      );
      return;
    }
    asyncRules[name] = logic;
    if (message) {
      messages[name] = message;
    }
  }

  /**
   * Manually adds a new field to be validated.
   */
  addField(element: HTMLElement): void {
    this.#formController.addField(element);
  }

  /**
   * Manually removes a field from validation.
   */
  removeField(element: HTMLElement): void {
    this.#formController.removeField(element);
  }

  /**
   * Refreshes the discovered fields. Use if fields are added or removed from the DOM.
   */
  refresh(): void {
    this.#formController.discoverFields();
    this.#formController.attachEventListeners(this.#options.realTime);
  }

  /**
   * Returns the current error for a field by its name.
   */
  getError(fieldName: string): string | null {
    const field = this.#formController
      .getFields()
      .find((f) => (f.element as any).name === fieldName);
    return field ? field.state.lastError : null;
  }

  /**
   * Checks if a field has been interacted with.
   */
  isDirty(fieldName: string): boolean {
    const field = this.#formController
      .getFields()
      .find((f) => (f.element as any).name === fieldName);
    return field ? field.state.isDirty : false;
  }

  /**
   * Resets the validation state of the form.
   */
  reset(): void {
    this.#formController.reset();
    this.#formController.getFields().forEach((f) => {
      this.#uiManager.clearError(f.element);
    });
  }

  /**
   * Fully cleans up the validator instance.
   */
  destroy(): void {
    this.#formController.destroy();
    this.#formController.getFields().forEach((f) => {
      this.#uiManager.clearError(f.element);
    });
  }
}
