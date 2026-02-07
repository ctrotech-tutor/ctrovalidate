import {
  validate,
  ValidationSchema,
  ValidationOptions,
} from '@ctrovalidate/core';

/**
 * Converts FormData to a plain object for validation.
 */
export function formDataToValues(formData: FormData): Record<string, unknown> {
  const values: Record<string, unknown> = {};
  formData.forEach((value, key) => {
    // Handle multiple values for same key (e.g. checkboxes)
    if (values[key] !== undefined) {
      if (Array.isArray(values[key])) {
        values[key].push(value);
      } else {
        values[key] = [values[key], value];
      }
    } else {
      values[key] = value;
    }
  });
  return values;
}

/**
 * Validates FormData against a schema.
 * Designed for use in Next.js Server Actions.
 *
 * @returns A tuple [isValid, errors, values]
 */
export function validateAction(
  formData: FormData,
  schema: ValidationSchema,
  options: ValidationOptions = {}
): {
  isValid: boolean;
  errors: Record<string, string | null>;
  values: Record<string, unknown>;
} {
  const values = formDataToValues(formData);
  const results = validate(values, schema, options);

  const errors: Record<string, string | null> = {};
  let isValid = true;

  for (const key in results) {
    if (!results[key].isValid) {
      errors[key] = results[key].error;
      isValid = false;
    } else {
      errors[key] = null;
    }
  }

  return { isValid, errors, values };
}

export * from '@ctrovalidate/core';
