/**
 * @file Core type definitions for Ctrovalidate.
 */

/**
 * The logic function for a synchronous validation rule.
 * @template Context The type of the context object (e.g., generic context or platform specific element).
 */
export type RuleLogic<Context = unknown> = (
  value: unknown,
  params?: unknown[],
  context?: Context | null
) => boolean;

/**
 * Information about a dependency between fields.
 */
export interface DependencyDefinition {
  controllerName: string;
  type: 'checked' | 'value' | 'present' | string;
  value?: unknown;
}

/**
 * The logic function for an asynchronous validation rule.
 * @template Context The type of the context object.
 */
export type AsyncRuleLogic<Context = unknown> = (
  value: unknown,
  params?: unknown[],
  context?: Context | null,
  signal?: AbortSignal
) => Promise<boolean>;

/**
 * A parsed rule definition.
 */
export interface RuleDefinition {
  name: string;
  params: unknown[];
}

/**
 * A rule definition in a schema, supporting strings, array of strings,
 * RuleDefinitions, or a hybrid array of both strings and definitions.
 */
export type SchemaRule = string | (string | RuleDefinition)[];

/**
 * A validation schema object mapping field names to rules.
 */
export type ValidationSchema = Record<string, SchemaRule>;

/**
 * Result of a validation execution.
 */
export interface ValidationResult {
  isValid: boolean;
  error: string | null;
  rule: string | null;
}
