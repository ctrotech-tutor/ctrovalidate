// eslint-disable-next-line import/no-duplicates
import { writable, derived, get } from 'svelte/store';
// eslint-disable-next-line import/no-duplicates
import { onDestroy } from 'svelte';

import {
  validateAsync,
  ValidationSchema,
  RuleLogic,
  AsyncRuleLogic,
  SchemaRule,
  Logger,
} from '@ctrovalidate/core';

export interface UseCtrovalidateOptions<T extends object> {
  schema: ValidationSchema;
  initialValues?: T;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  customRules?: Record<string, RuleLogic | AsyncRuleLogic>;
  aliases?: Record<string, SchemaRule>;
  messages?: Record<string, string>;
  locale?: string;
}

/**
 * useCtrovalidate for Svelte.
 * Provides reactive stores for form validation state.
 */
export function useCtrovalidate<T extends object>({
  schema,
  initialValues = {} as T,
  validateOnBlur = true,
  validateOnChange = true,
  customRules = {},
  aliases = {},
  messages = {},
  locale,
}: UseCtrovalidateOptions<T>) {
  const values = writable<T>({ ...initialValues });

  const errors = writable<Record<keyof T, string | null>>(
    Object.keys(schema).reduce(
      (acc, key) => {
        acc[key as keyof T] = null;
        return acc;
      },
      {} as Record<keyof T, string | null>
    )
  );

  const isDirty = writable<Record<keyof T, boolean>>(
    Object.keys(schema).reduce(
      (acc, key) => {
        acc[key as keyof T] = false;
        return acc;
      },
      {} as Record<keyof T, boolean>
    )
  );

  const isValidating = writable<Record<keyof T, boolean>>(
    Object.keys(schema).reduce(
      (acc, key) => {
        acc[key as keyof T] = false;
        return acc;
      },
      {} as Record<keyof T, boolean>
    )
  );

  const isValid = derived(errors, ($errors) => {
    return Object.values($errors).every((error) => error === null);
  });

  // Abort controllers for async validation
  const abortControllers: Record<string, AbortController> = {};

  onDestroy(() => {
    Object.values(abortControllers).forEach((c) => c.abort());
  });

  /**
   * Validates a single field.
   */
  async function validateField(name: keyof T): Promise<boolean> {
    const fieldSchema = schema[name as string];
    if (!fieldSchema) return true;

    // Abort previous validation
    if (abortControllers[name as string]) {
      abortControllers[name as string].abort();
    }
    abortControllers[name as string] = new AbortController();

    isValidating.update((prev) => ({ ...prev, [name]: true }));

    try {
      const currentValues = get(values);
      const results = await validateAsync(
        { [name]: currentValues[name] },
        { [name as string]: fieldSchema },
        {
          customRules,
          aliases,
          messages,
          locale,
          signal: abortControllers[name as string].signal,
        }
      );

      const error = results[name as string]?.error || null;
      errors.update((prev) => ({ ...prev, [name]: error }));

      return !error;
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return false;
      Logger.error(`Validation failed for ${String(name)}:`, err);
      return false;
    } finally {
      isValidating.update((prev) => ({ ...prev, [name]: false }));
    }
  }

  /**
   * Validates the entire form.
   */
  async function validateForm(): Promise<boolean> {
    const currentValues = get(values);
    const results = await validateAsync(currentValues, schema, {
      customRules,
      aliases,
      messages,
      locale,
    });

    const newErrors: Record<keyof T, string | null> = {} as Record<
      keyof T,
      string | null
    >;
    let formIsValid = true;

    for (const key in schema) {
      const error = results[key]?.error || null;
      newErrors[key as unknown as keyof T] = error;
      if (error) {
        formIsValid = false;
      }
    }

    errors.set(newErrors);
    return formIsValid;
  }

  /**
   * Resets form state.
   */
  function reset(newValues?: Partial<T>) {
    values.set({ ...initialValues, ...newValues } as T);
    errors.set(
      Object.keys(schema).reduce(
        (acc, key) => {
          acc[key as keyof T] = null;
          return acc;
        },
        {} as Record<keyof T, string | null>
      )
    );
    isDirty.set(
      Object.keys(schema).reduce(
        (acc, key) => {
          acc[key as keyof T] = false;
          return acc;
        },
        {} as Record<keyof T, boolean>
      )
    );
    isValidating.set(
      Object.keys(schema).reduce(
        (acc, key) => {
          acc[key as keyof T] = false;
          return acc;
        },
        {} as Record<keyof T, boolean>
      )
    );
  }

  /**
   * Handles value changes.
   */
  function handleChange(name: keyof T, value: T[keyof T]) {
    values.update((v) => ({ ...v, [name]: value }));
    isDirty.update((d) => ({ ...d, [name]: true }));

    if (validateOnChange) {
      validateField(name);
    }
  }

  /**
   * Handles blur events.
   */
  function handleBlur(name: keyof T) {
    isDirty.update((d) => ({ ...d, [name]: true }));
    if (validateOnBlur) {
      validateField(name);
    }
  }

  return {
    values,
    errors,
    isDirty,
    isValidating,
    isValid,
    validateField,
    validateForm,
    reset,
    handleChange,
    handleBlur,
  };
}

export * from '@ctrovalidate/core';
