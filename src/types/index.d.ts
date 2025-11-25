// src/types/index.d.ts

/**
 * This file contains the TypeScript definitions for the Ctrovalidate library.
 * It provides type safety and autocompletion for developers using TypeScript.
 */

// 1. Define the LogLevel enum for type-safe logging configuration.
export enum LogLevel {
  NONE = 0,
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4,
}

// 2. Define the structure for the options object passed to the constructor.
export interface CtrovalidateOptions {
  /**
   * The logging level for the console.
   * @default LogLevel.NONE
   */
  logLevel?: LogLevel;

  /**
   * The CSS class applied to an input field when it is invalid.
   * @default 'is-invalid'
   */
  errorClass?: string;

  /**
   * The CSS class used to identify the element that will display the error message.
   * @default 'error-message'
   */
  errorMessageClass?: string;

  /**
   * The CSS class applied to an input field during an asynchronous validation.
   * @default 'is-validating'
   */
  pendingClass?: string;

  /**
   * Whether to perform validation in real-time on 'input' and 'blur' events.
   * @default true
   */
  realTime?: boolean;
}

// 3. Define the main Ctrovalidate class and its public API.
export class Ctrovalidate {
  /**
   * Initializes a new instance of the Ctrovalidate validator.
   * @param formElement The HTMLFormElement to attach the validator to.
   * @param options Optional configuration for the validator instance.
   */
  constructor(formElement: HTMLFormElement, options?: CtrovalidateOptions);

  /**
   * Validates all fields in the form and returns a promise that resolves to a boolean.
   * @returns A promise that resolves to `true` if the form is valid, `false` otherwise.
   */
  public validate(): Promise<boolean>;

  /**
   * Programmatically adds a new field (e.g., input, textarea) to the validator instance.
   * This is useful for forms where fields are added dynamically after initialization.
   * @param fieldElement The HTML element to add.
   */
  public addField(fieldElement: HTMLElement): void;

  /**
   * Programmatically removes a field from the validator instance.
   * This also cleans up associated event listeners to prevent memory leaks.
   * @param fieldElement The HTML element to remove.
   */
  public removeField(fieldElement: HTMLElement): void;

  /**
   * The available logging levels. Can be used when setting the `logLevel` option.
   */
  public static LogLevel: typeof LogLevel;

  /**
   * Adds a new synchronous validation rule to the library globally.
   * @param name The name of the rule (e.g., 'isPositive').
   * @param logic The validation function. It receives the field's value, an array of parameters, and the field element itself.
   * @param message The default error message for this rule.
   */
  public static addRule(
    name: string,
    logic: (value: any, params: string[], field: HTMLElement) => boolean,
    message: string
  ): void;

  /**
   * Adds a new asynchronous validation rule to the library globally.
   * @param name The name of the rule (e.g., 'usernameAvailable').
   * @param logic The async validation function. It receives the value, params, field, and an AbortSignal.
   * @param message The default error message for this rule.
   */
  public static addAsyncRule(
    name: string,
    logic: (value: any, params: string[], field: HTMLElement, signal: AbortSignal) => Promise<boolean>,
    message: string
  ): void;
}
