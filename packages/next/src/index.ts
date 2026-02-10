import {
  validateAsync,
  ValidationSchema,
  RuleLogic,
  AsyncRuleLogic,
  SchemaRule,
} from '@ctrovalidate/core';

/**
 * Converts FormData to a plain object for validation.
 */
export function formDataToValues<
  T extends Record<string, any> = Record<string, any>,
>(formData: FormData): T {
  const values: Record<string, any> = {};
  formData.forEach((value, key) => {
    // Handle multiple values for same key (e.g. checkboxes)
    if (values[key] !== undefined) {
      if (Array.isArray(values[key])) {
        (values[key] as any[]).push(value);
      } else {
        values[key] = [values[key], value];
      }
    } else {
      values[key] = value;
    }
  });
  return values as T;
}

export interface ValidateActionOptions {
  customRules?: Record<string, RuleLogic | AsyncRuleLogic>;
  aliases?: Record<string, SchemaRule>;
  messages?: Record<string, string>;
  locale?: string;
}

/**
 * Validates FormData against a schema asynchronously.
 * Designed for use in Next.js Server Actions.
 *
 * @returns An object with isValid, errors (Partial<Record<K, string>>), and values
 */
export async function validateAction<
  T extends Record<string, any> = Record<string, any>,
>(
  formData: FormData,
  schema: ValidationSchema,
  options: ValidateActionOptions = {}
): Promise<{
  isValid: boolean;
  errors: Partial<Record<keyof T, string>>;
  values: T;
}> {
  const values = formDataToValues<T>(formData);

  const results = await validateAsync(values, schema, {
    customRules: options.customRules,
    aliases: options.aliases,
    messages: options.messages,
    locale: options.locale,
  });

  const errors: Partial<Record<keyof T, string>> = {};
  let isValid = true;

  (Object.keys(schema) as (keyof T)[]).forEach((key) => {
    const error = results[key as string]?.error;
    if (error) {
      errors[key] = error;
      isValid = false;
    }
  });

  return { isValid, errors, values };
}

export * from '@ctrovalidate/core';
