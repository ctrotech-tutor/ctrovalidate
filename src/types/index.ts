/**
 * @file Core type definitions for Ctrovalidate.
 */

/**
 * The logic function for a synchronous validation rule.
 */
export type RuleLogic = (
  value: any,
  params?: any[],
  element?: HTMLElement | null
) => boolean;

/**
 * The logic function for an asynchronous validation rule.
 */
export type AsyncRuleLogic = (
  value: any,
  params?: any[],
  element?: HTMLElement | null,
  signal?: AbortSignal
) => Promise<boolean>;

/**
 * A parsed rule definition.
 */
export interface RuleDefinition {
  name: string;
  params: any[];
}

/**
 * The state of a single validatable field.
 */
export interface FieldState {
  isDirty: boolean;
  abortController: AbortController | null;
}

/**
 * Information about a dependency between fields.
 */
export interface DependencyDefinition {
  controllerName: string;
  type: 'checked' | 'value' | 'present' | string;
  value?: any;
}

/**
 * The object representing a field being validated.
 */
export interface FieldObject {
  element: HTMLElement;
  rules: RuleDefinition[];
  state: FieldState;
  dependency: DependencyDefinition | null;
  listeners?: {
    onBlur: (e: Event) => void;
    onInput: (e: Event) => void;
    onControllerInput: ((e: Event) => void) | null;
    controllerElement: HTMLElement | null;
  };
}

/**
 * Configuration options for a Ctrovalidate instance.
 */
export interface CtrovalidateOptions {
  logLevel?: number;
  errorClass?: string;
  errorMessageClass?: string;
  pendingClass?: string;
  realTime?: boolean;
}

/**
 * Result of a validation execution.
 */
export interface ValidationResult {
  isValid: boolean;
  error: string | null;
}
