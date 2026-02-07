import { reactive, ref, watch, onUnmounted } from 'vue';
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

export interface UseCtrovalidateReturn<T extends object> {
  values: T;
  errors: Record<keyof T, string | null>;
  isDirty: Record<keyof T, boolean>;
  isValidating: Record<keyof T, boolean>;
  isValid: boolean;
  validateField: (name: keyof T) => Promise<boolean>;
  validateForm: () => Promise<boolean>;
  reset: (newValues?: Partial<T>) => void;
  handleChange: (name: keyof T, value: T[keyof T]) => void;
  handleBlur: (name: keyof T) => void;
}

/**
 * useCtrovalidate composable for Vue 3.
 * Provides reactive validation logic for form state.
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
}: UseCtrovalidateOptions<T>): UseCtrovalidateReturn<T> {
  const values = reactive<T>({ ...initialValues }) as T;

  // We use reactive for these states, cast to the final type to simplify indexing
  const errors = reactive(
    Object.keys(schema).reduce(
      (acc, key) => {
        acc[key] = null;
        return acc;
      },
      {} as Record<string, string | null>
    )
  ) as Record<keyof T, string | null>;

  const isDirty = reactive(
    Object.keys(schema).reduce(
      (acc, key) => {
        acc[key] = false;
        return acc;
      },
      {} as Record<string, boolean>
    )
  ) as Record<keyof T, boolean>;

  const isValidating = reactive(
    Object.keys(schema).reduce(
      (acc, key) => {
        acc[key] = false;
        return acc;
      },
      {} as Record<string, boolean>
    )
  ) as Record<keyof T, boolean>;

  const isValid = ref(true);

  // Abort controllers for async validation
  const abortControllers: Record<string, AbortController> = {};

  onUnmounted(() => {
    Object.values(abortControllers).forEach((c) => c.abort());
  });

  /**
   * Validates a single field.
   */
  const validateField = async (name: keyof T): Promise<boolean> => {
    const fieldSchema = schema[name as string];
    if (!fieldSchema) return true;

    // Abort previous validation for this field
    if (abortControllers[name as string]) {
      abortControllers[name as string].abort();
    }
    abortControllers[name as string] = new AbortController();

    isValidating[name] = true;
    try {
      const results = await validateAsync(
        { [name]: values[name] },
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
      errors[name] = error;
      return !error;
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return false;
      Logger.error(`Validation failed for ${String(name)}:`, err);
      return false;
    } finally {
      isValidating[name] = false;
    }
  };

  /**
   * Validates the entire form.
   */
  async function validateForm(): Promise<boolean> {
    const results = await validateAsync(values, schema, {
      customRules,
      aliases,
      messages,
      locale,
    });

    let formIsValid = true;

    for (const key in schema) {
      const error = results[key]?.error || null;
      errors[key as unknown as keyof T] = error;
      if (error) {
        formIsValid = false;
      }
    }

    isValid.value = formIsValid;
    return formIsValid;
  }

  /**
   * Resets the form state.
   */
  const reset = (newValues?: Partial<T>) => {
    Object.assign(values, { ...initialValues, ...newValues });
    for (const key in schema) {
      errors[key as unknown as keyof T] = null;
      isDirty[key as unknown as keyof T] = false;
      isValidating[key as unknown as keyof T] = false;
    }
    isValid.value = true;
  };

  /**
   * Handles value changes manually if not using v-model.
   */
  const handleChange = (name: keyof T, value: T[keyof T]) => {
    values[name] = value as T[keyof T];
    isDirty[name] = true;
    if (validateOnChange) {
      validateField(name);
    }
  };

  /**
   * Handles blur events.
   */
  const handleBlur = (name: keyof T) => {
    isDirty[name] = true;
    if (validateOnBlur) {
      validateField(name);
    }
  };

  // Watch for internal value changes if validateOnChange is enabled
  if (validateOnChange) {
    watch(
      values,
      (newValues) => {
        for (const key in newValues) {
          if (isDirty[key as keyof T]) {
            validateField(key as keyof T);
          }
        }
      },
      { deep: true }
    );
  }

  return {
    values,
    errors,
    isDirty,
    isValidating,
    isValid: isValid.value as unknown as boolean,
    validateField,
    validateForm,
    reset,
    handleChange,
    handleBlur,
  };
}
