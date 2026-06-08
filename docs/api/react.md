---
title: "ctrovalidate-react API Reference"
description: Complete API reference for the useCtrovalidate hook — options, return values, and type definitions.
---

# ctrovalidate-react

The `useCtrovalidate` hook is a headless form validation hook for React. It wraps `ctrovalidate-core`'s `validateAsync` with reactive state management, stable callbacks, and automatic abort handling.

---

## `useCtrovalidate<T>(options)`

```typescript
function useCtrovalidate<T extends object = object>(
  options: UseCtrovalidateOptions<T>
): UseCtrovalidateReturn<T>
```

---

## `UseCtrovalidateOptions<T>`

```typescript
interface UseCtrovalidateOptions<T extends object> {
  schema: ValidationSchema;
  initialValues?: T;
  validateOnBlur?: boolean;
  customRules?: Record<string, RuleLogic | AsyncRuleLogic>;
  aliases?: Record<string, SchemaRule>;
  messages?: Record<string, string>;
  locale?: string;
}
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `schema` | ValidationSchema | — | **(Required)** Field-to-rules mapping |
| `initialValues` | T | `{}` | Initial form state |
| `validateOnBlur` | boolean | `true` | When `false`, `handleBlur` updates dirty state without validating |
| `customRules` | Record<string, RuleLogic \| AsyncRuleLogic> | — | Custom rules merged over built-ins |
| `aliases` | Record<string, SchemaRule> | — | Named rule combinations (merged with built-in aliases) |
| `messages` | Record<string, string> | — | Custom error messages (passed to core's `messages` option) |
| `locale` | string | — | Override locale for translator (core's i18n) |

---

## `UseCtrovalidateReturn<T>`

```typescript
interface UseCtrovalidateReturn<T extends object> {
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
```

### `values: T`

Current form state. Updated by `handleChange` and `reset`.

### `errors: Partial<Record<keyof T, string>>`

Error messages for each field. `undefined` means the field is valid. Updated after each `validateField` or `validateForm` call.

### `isDirty: Partial<Record<keyof T, boolean>>`

Set to `true` when `handleChange` or `handleBlur` is called for a field. Remains `true` until `reset`.

### `isValidating: Partial<Record<keyof T, boolean>>`

Set to `true` during async validation. Use to show loading indicators:

```tsx
<button disabled={isValidating.email}>
  {isValidating.email ? 'Checking...' : 'Submit'}
</button>
```

### `handleChange(name, value)`

Updates the field value, marks it dirty, and triggers validation immediately.

```tsx
<input value={values.email} onChange={(e) => handleChange('email', e.target.value)} />
```

### `handleBlur(name)`

Marks the field dirty. If `validateOnBlur !== false`, triggers validation.

```tsx
<input onBlur={() => handleBlur('email')} />
```

### `validateField(name, value?)`

Validates a single field. Uses the provided value or falls back to current state. Returns `true` if valid.

```tsx
const isValid = await validateField('email');
const customValid = await validateField('email', 'test@example.com');
```

### `validateForm()`

Validates all fields in the schema against current `values`. Returns `true` only if every field passes. Updates `errors` with all failures.

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (await validateForm()) {
    // Submit
  }
};
```

### `reset(newValues?)`

Resets to initial form state. Clears all errors, dirty flags, and validating states. If `newValues` is provided, sets form to those values instead.

```tsx
reset();               // Back to initial values
reset({ email: '' });  // Partial reset
```

---

## Behavior Details

### Stable Callbacks

All callbacks (`handleChange`, `handleBlur`, `validateField`, `validateForm`, `reset`) are wrapped in `useCallback` with zero dependencies using refs for latest values. They do not cause re-renders when passed as props.

### Abort Handling

Each field has its own `AbortController`. When `handleChange` or `validateField` is called while the field is still validating, the previous request is aborted. On unmount, all controllers are aborted.

```typescript
// Internal behavior on handleChange('email', ...):
// 1. Abort previous email validation if in-flight
// 2. Create new AbortController
// 3. Call validateAsync with signal
// 4. If AbortError caught → returns false, no error displayed
```

### Message Resolution

Messages are passed directly to `validateAsync` as the `messages` option. Core's priority chain applies:

1. `messages['ruleName']` (from hook options)
2. `messages['*']` (wildcard)
3. `translator.translate(ruleName, params, locale)`
4. `'Invalid input.'` (hardcoded fallback)

---

## TypeScript

```typescript
import type {
  UseCtrovalidateOptions,
  UseCtrovalidateReturn,
} from 'ctrovalidate-react';
```

---

## Exports

```typescript
export * from './hooks/useCtrovalidate';
```

Available imports:

| Import | Kind |
|--------|------|
| `useCtrovalidate` | Hook function |
| `UseCtrovalidateOptions` | Type |
| `UseCtrovalidateReturn` | Type |
