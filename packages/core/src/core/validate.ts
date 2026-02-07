import {
  RuleLogic,
  AsyncRuleLogic,
  SchemaRule,
  ValidationResult,
} from '../types';
import { normalizeRules } from '../utils/SchemaParser';
import * as rulesPackage from '../rules';
import { translator } from '../i18n/Translator';

export interface ValidationOptions {
  customRules?: Record<string, RuleLogic | AsyncRuleLogic>;
  aliases?: Record<string, SchemaRule>;
  messages?: Record<string, string>;
  locale?: string;
  signal?: AbortSignal;
}

/**
 * Validates a single value against a set of rules.
 */
export function validateValue(
  value: unknown,
  rules: SchemaRule,
  options: ValidationOptions = {}
): ValidationResult {
  const { customRules = {}, aliases = {}, messages = {}, locale } = options;
  const parsedRules = normalizeRules(rules, aliases);
  const allRules: Record<string, RuleLogic | AsyncRuleLogic> = {
    ...(rulesPackage as unknown as Record<string, RuleLogic>),
    ...customRules,
  };

  for (const rule of parsedRules) {
    const ruleLogic = allRules[rule.name];

    if (!ruleLogic) {
      continue;
    }

    const isValid = ruleLogic(value, rule.params);

    // In synchronous validation, we treat Promises as valid (since we can't wait for them)
    // This shouldn't happen if the user builds their schema correctly.
    if (isValid instanceof Promise) {
      continue;
    }

    if (!isValid) {
      const message =
        messages[rule.name] ||
        messages['*'] ||
        translator.translate(rule.name, rule.params, locale);

      return {
        isValid: false,
        error: message,
        rule: rule.name,
      };
    }
  }

  return {
    isValid: true,
    error: null,
    rule: null,
  };
}

/**
 * Validates an entire data object against a schema.
 */
export function validate<T extends object>(
  data: T,
  schema: Record<string, SchemaRule>,
  options: ValidationOptions = {}
): Record<string, ValidationResult> {
  const results: Record<string, ValidationResult> = {};

  for (const field in schema) {
    results[field] = validateValue(
      (data as Record<string, unknown>)[field],
      schema[field],
      options
    );
  }

  return results;
}

/**
 * Validates a single value asynchronously against a set of rules.
 */
export async function validateValueAsync(
  value: unknown,
  rules: SchemaRule,
  options: ValidationOptions = {}
): Promise<ValidationResult> {
  const {
    customRules = {},
    aliases = {},
    messages = {},
    locale,
    signal,
  } = options;
  const parsedRules = normalizeRules(rules, aliases);
  const allRules: Record<string, RuleLogic | AsyncRuleLogic> = {
    ...(rulesPackage as unknown as Record<string, RuleLogic>),
    ...customRules,
  };

  for (const rule of parsedRules) {
    const ruleLogic = allRules[rule.name];

    if (!ruleLogic) {
      continue;
    }

    const isValid = await ruleLogic(value, rule.params, null, signal);

    if (!isValid) {
      const message =
        messages[rule.name] ||
        messages['*'] ||
        translator.translate(rule.name, rule.params, locale);

      return {
        isValid: false,
        error: message,
        rule: rule.name,
      };
    }
  }

  return {
    isValid: true,
    error: null,
    rule: null,
  };
}

/**
 * Validates an entire data object asynchronously against a schema.
 */
export async function validateAsync<T extends object>(
  data: T,
  schema: Record<string, SchemaRule>,
  options: ValidationOptions = {}
): Promise<Record<string, ValidationResult>> {
  const results: Record<string, ValidationResult> = {};

  for (const field in schema) {
    results[field] = await validateValueAsync(
      (data as Record<string, unknown>)[field],
      schema[field],
      options
    );
  }

  return results;
}
