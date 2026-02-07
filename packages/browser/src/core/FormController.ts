import {
  normalizeRules,
  ValidationSchema,
  SchemaRule,
  DependencyDefinition,
  Logger,
} from '@ctrovalidate/core';
import { FieldObject } from '../types/index';

interface FormControllerDependencies {
  logger: Logger;
  schema?: ValidationSchema;
  aliases?: Record<string, SchemaRule>;
  validationHandler: (fieldObject: FieldObject) => void;
}

/**
 * Manages the form's fields, their state, and their event listeners.
 */
export class FormController {
  #form: HTMLFormElement;
  #fields: FieldObject[] = [];
  #fieldMap: Map<HTMLElement, FieldObject> = new Map();
  #logger: Logger;
  #schema: ValidationSchema;
  #aliases: Record<string, SchemaRule>;
  #validationHandler: (fieldObject: FieldObject) => void;

  /**
   * @param formElement - The form element to control.
   * @param dependencies - Core dependencies.
   */
  constructor(
    formElement: HTMLFormElement,
    {
      logger,
      schema = {},
      aliases = {},
      validationHandler,
    }: FormControllerDependencies
  ) {
    this.#form = formElement;
    this.#logger = logger;
    this.#schema = schema;
    this.#aliases = aliases;
    this.#validationHandler = validationHandler;
  }

  /**
   * Scans the form to find all fields and prepares them for validation.
   */
  discoverFields(): void {
    this.#fields = [];
    this.#fieldMap.clear();

    const fieldsToValidate = this.#form.querySelectorAll(
      '[data-ctrovalidate-rules]'
    );
    this.#logger.debug(
      '[FormController] Discovered ' +
        fieldsToValidate.length +
        ' fields to validate.'
    );

    fieldsToValidate.forEach((element) =>
      this.addField(element as HTMLElement, false)
    );

    // Also add fields that are in the schema but not necessarily have data attributes
    Object.keys(this.#schema).forEach((fieldName) => {
      const element = this.#form.querySelector(
        `[name="${fieldName}"]`
      ) as HTMLElement;
      if (element && !this.#fieldMap.has(element)) {
        this.addField(element, false);
      }
    });
  }

  /**
   * Adds a single field to the validation controller.
   */
  addField(element: HTMLElement, attachListener: boolean = true): void {
    if (!element || this.#fieldMap.has(element)) {
      return;
    }

    const rulesString = element.getAttribute('data-ctrovalidate-rules');
    const dependencyString = element.getAttribute('data-ctrovalidate-if');
    const fieldName = (element as HTMLInputElement).name;

    // Resolve rules: HTML attributes + Schema rules
    const htmlRules = normalizeRules(rulesString || '', this.#aliases);
    const schemaRules = fieldName
      ? normalizeRules(this.#schema[fieldName] || [], this.#aliases)
      : [];

    // Merge rules
    const combinedRules = [...htmlRules, ...schemaRules];

    // If no rules found in either, skip unless it has a dependency
    if (combinedRules.length === 0 && !dependencyString) {
      return;
    }

    // Parse custom message overrides
    const customMessages: Record<string, string> = {};
    const catchAllMessage = element.getAttribute('data-ctrovalidate-message');
    if (catchAllMessage) {
      customMessages['*'] = catchAllMessage;
    }

    for (const attr of Array.from(element.attributes)) {
      if (
        attr.name.startsWith('data-ctrovalidate-') &&
        attr.name.endsWith('-message')
      ) {
        const ruleName = attr.name
          .replace('data-ctrovalidate-', '')
          .replace('-message', '');
        if (ruleName !== '' && ruleName !== 'message') {
          customMessages[ruleName] = attr.value;
        }
      }
    }

    const fieldObject: FieldObject = {
      element,
      rules: combinedRules,
      dependency: this.#parseDependency(dependencyString),
      customMessages:
        Object.keys(customMessages).length > 0 ? customMessages : undefined,
      state: { isDirty: false, abortController: null, lastError: null },
    };

    this.#fields.push(fieldObject);
    this.#fieldMap.set(element, fieldObject);
    this.#logger.debug('[FormController] Added field:', element);

    if (attachListener) {
      this.#attachSingleFieldListener(fieldObject);
    }
  }

  /**
   * Removes a single field from the validation controller.
   */
  removeField(element: HTMLElement): void {
    if (!element || !this.#fieldMap.has(element)) {
      return;
    }

    const fieldObject = this.#fieldMap.get(element)!;

    this.#fields = this.#fields.filter((f) => f.element !== element);

    if (fieldObject.listeners) {
      const { onBlur, onInput, onControllerInput, controllerElement } =
        fieldObject.listeners;

      try {
        element.removeEventListener('blur', onBlur);
        element.removeEventListener('input', onInput);
        if (controllerElement && onControllerInput)
          controllerElement.removeEventListener('input', onControllerInput);
      } catch (e) {
        this.#logger.debug(
          '[FormController] Error while removing listeners for',
          element,
          e
        );
      }

      delete fieldObject.listeners;
    }

    this.#fieldMap.delete(element);
    this.#logger.debug('[FormController] Removed field:', element);
  }

  /**
   * Attaches all necessary event listeners for real-time validation.
   */
  attachEventListeners(isRealTime: boolean): void {
    if (!isRealTime) {
      this.#logger.info('[FormController] Real-time validation is disabled.');
      return;
    }

    this.#logger.info(
      '[FormController] Real-time validation is enabled. Attaching listeners.'
    );
    this.#fields.forEach((fieldObject) =>
      this.#attachSingleFieldListener(fieldObject)
    );
  }

  /**
   * Attaches event listeners to a single field object.
   */
  #attachSingleFieldListener(fieldObject: FieldObject): void {
    const { element, dependency } = fieldObject;

    if (fieldObject.listeners) return;

    const onBlur = () => {
      this.#logger.debug(
        `[FormController] Blur event on "${(element as HTMLInputElement).name}". Validating.`
      );
      this.#validationHandler(fieldObject);
      fieldObject.state.isDirty = true;
    };

    const onInput = () => {
      if (fieldObject.state.isDirty) {
        this.#logger.debug(
          `[FormController] Input event on dirty field "${(element as HTMLInputElement).name}". Validating.`
        );
        this.#validationHandler(fieldObject);
      }
    };

    element.addEventListener('blur', onBlur);
    element.addEventListener('input', onInput);

    let controllerElement: HTMLElement | null = null;
    let onControllerInput: ((e: Event) => void) | null = null;

    if (dependency) {
      controllerElement = this.#form.querySelector(
        `[name="${dependency.controllerName}"]`
      ) as HTMLElement | null;

      if (controllerElement) {
        onControllerInput = () => {
          this.#logger.debug(
            `[FormController] Controller "${(controllerElement as HTMLInputElement).name}" changed. Re-validating dependent field "${(element as HTMLInputElement).name}".`
          );
          this.#validationHandler(fieldObject);
        };

        controllerElement.addEventListener('input', onControllerInput);
      } else {
        this.#logger.warn(
          `[FormController] Could not find controller field with name "${dependency.controllerName}".`
        );
      }
    }

    fieldObject.listeners = {
      onBlur,
      onInput,
      onControllerInput,
      controllerElement,
    };
  }

  /**
   * Parses the dependency condition string.
   */
  #parseDependency(
    conditionString: string | null
  ): DependencyDefinition | null {
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
   * Resets all field states to clean.
   */
  reset(): void {
    this.#fields.forEach((field) => {
      field.state.isDirty = false;
      field.state.lastError = null;
    });
  }

  /**
   * Cleans up all event listeners.
   */
  destroy(): void {
    [...this.#fields].forEach((field) => {
      this.removeField(field.element);
    });
  }

  /**
   * Returns all discovered fields.
   */
  getFields(): FieldObject[] {
    return this.#fields;
  }
}
