/**
 * @file Type definitions for Ctrovalidate Browser Adapter.
 */

import {
  RuleLogic as CoreRuleLogic,
  AsyncRuleLogic as CoreAsyncRuleLogic,
  RuleDefinition,
  ValidationResult,
  ValidationSchema,
  SchemaRule,
  DependencyDefinition,
} from '@ctrovalidate/core';

export type {
  RuleDefinition,
  ValidationResult,
  ValidationSchema,
  SchemaRule,
  DependencyDefinition,
};

/**
 * The logic function for a synchronous validation rule (Browser context).
 * Context is strictly HTMLElement here.
 */
export type RuleLogic = CoreRuleLogic<HTMLElement>;

/**
 * The logic function for an asynchronous validation rule (Browser context).
 */
export type AsyncRuleLogic = CoreAsyncRuleLogic<HTMLElement>;

/**
 * The state of a single validatable field.
 */
export interface FieldState {
  isDirty: boolean;
  abortController: AbortController | null;
  lastError: string | null;
}

/**
 * The object representing a field being validated.
 */
export interface FieldObject {
  element: HTMLElement;
  rules: RuleDefinition[];
  state: FieldState;
  dependency: DependencyDefinition | null;
  customMessages?: Record<string, string>;
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
  schema?: ValidationSchema;
  aliases?: Record<string, SchemaRule>;
}
