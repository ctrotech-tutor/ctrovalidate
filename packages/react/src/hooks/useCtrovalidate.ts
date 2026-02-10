import { useState, useCallback, useRef, useEffect } from 'react';
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
  customRules?: Record<string, RuleLogic | AsyncRuleLogic>;
  aliases?: Record<string, SchemaRule>;
  messages?: Record<string, string>;
  locale?: string;
}

export interface UseCtrovalidateReturn<T extends object> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isDirty: Partial<Record<keyof T, boolean>>;
  isValidating: Partial<Record<keyof T, boolean>>;
  handleChange: (name: keyof T, value: T[keyof T]) => void;
  handleBlur: (name: keyof T) => void;
  validateField: (name: keyof T, value?: T[keyof T]) => Promise<boolean>;
  validateForm: () => Promise<boolean>;
  reset: (newValues?: Partial<T>) => void;
}

/**
 * useCtrovalidate hook for React.
 * Headless validation logic designed for controlled inputs.
 */
export function useCtrovalidate<T extends object = object>(
  options: UseCtrovalidateOptions<T>
): UseCtrovalidateReturn<T> {
  const { initialValues = {} } = options;

  const [values, setValues] = useState<T>(initialValues as T);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isDirty, setIsDirty] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isValidating, setIsValidating] = useState<
    Partial<Record<keyof T, boolean>>
  >({});

  // Latest options ref to avoid dependency loops when literals are passed
  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  });

  // Keep a ref to values for stable callbacks
  const valuesRef = useRef(values);
  valuesRef.current = values;

  // Abort controllers for async validation
  const abortControllers = useRef<Record<string, AbortController>>({});

  // Cleanup controllers on unmount
  useEffect(() => {
    return () => {
      Object.values(abortControllers.current).forEach((c) => c.abort());
    };
  }, []);

  /**
   * Validates a single field.
   */
  const validateField = useCallback(
    async (name: keyof T, value?: T[keyof T]): Promise<boolean> => {
      const fieldName = name as string;
      const currentOptions = optionsRef.current;
      const fieldSchema = currentOptions.schema[fieldName];
      if (!fieldSchema) return true;

      const valueToValidate =
        value !== undefined ? value : (valuesRef.current[name] as T[keyof T]);

      // Abort previous validation for this field
      if (abortControllers.current[fieldName]) {
        abortControllers.current[fieldName].abort();
      }
      abortControllers.current[fieldName] = new AbortController();

      setIsValidating((prev) => ({ ...prev, [name]: true }));

      try {
        const results = await validateAsync(
          { [fieldName]: valueToValidate },
          { [fieldName]: fieldSchema },
          {
            customRules: currentOptions.customRules,
            aliases: currentOptions.aliases,
            messages: currentOptions.messages,
            locale: currentOptions.locale,
            signal: abortControllers.current[fieldName].signal,
          }
        );
        const error = results[fieldName]?.error;

        setErrors((prev) => ({ ...prev, [name]: error || undefined }));
        return !error;
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return false;
        Logger.error(`Validation failed for ${fieldName}:`, err);
        return false;
      } finally {
        setIsValidating((prev) => ({ ...prev, [name]: false }));
      }
    },
    [] // No dependencies because we use optionsRef
  );

  /**
   * Handles value changes.
   */
  const handleChange = useCallback(
    (name: keyof T, value: T[keyof T]) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      setIsDirty((prev) => ({ ...prev, [name]: true }));
      validateField(name, value);
    },
    [validateField]
  );

  /**
   * Handles blur events.
   */
  const handleBlur = useCallback(
    (name: keyof T) => {
      setIsDirty((prev) => ({ ...prev, [name]: true }));
      if (optionsRef.current.validateOnBlur !== false) {
        validateField(name, valuesRef.current[name]);
      }
    },
    [validateField]
  );

  /**
   * Validates the entire form state.
   */
  const validateForm = useCallback(async () => {
    const currentOptions = optionsRef.current;
    const results = await validateAsync(values, currentOptions.schema, {
      customRules: currentOptions.customRules,
      aliases: currentOptions.aliases,
      messages: currentOptions.messages,
      locale: currentOptions.locale,
    });

    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    for (const key in currentOptions.schema) {
      const error = results[key]?.error;
      newErrors[key as keyof T] = error || undefined;
      if (error) {
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  }, [values]);

  /**
   * Resets the form state.
   */
  const reset = useCallback((newValues?: Partial<T>) => {
    setValues(
      (newValues as T) || (optionsRef.current.initialValues as T) || ({} as T)
    );
    setErrors({});
    setIsDirty({});
    setIsValidating({});
  }, []);

  return {
    values,
    errors,
    isDirty,
    isValidating,
    handleChange,
    handleBlur,
    validateField,
    validateForm,
    reset,
  };
}
