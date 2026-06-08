---
title: "ctrovalidate-vue API Reference"
description: Complete API reference for the useCtrovalidate composable — options, return values, and behavior for Vue 3.
---

# ctrovalidate-vue

The `useCtrovalidate` composable integrates `ctrovalidate-core`'s `validateAsync` with Vue 3's reactivity system. Supports `v-model` binding, real-time validation via watchers, and automatic abort handling.

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
  validateOnChange?: boolean;
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
| `validateOnBlur` | boolean | `true` | Validate when `handleBlur` is called |
| `validateOnChange` | boolean | `true` | Watch `values` via `watch()` and validate dirty fields on change |
| `customRules` | Record<string, RuleLogic \| AsyncRuleLogic> | `{}` | Custom rules merged over built-ins |
| `aliases` | Record<string, SchemaRule> | `{}` | Named rule combinations |
| `messages` | Record<string, string> | `{}` | Custom error messages (passed to core's `messages` option) |
| `locale` | string | — | Override locale for translator |

---

## `UseCtrovalidateReturn<T>`

```typescript
interface UseCtrovalidateReturn<T extends object> {
  values: T;
  errors: Record<keyof T, string | undefined>;
  isDirty: Record<keyof T, boolean>;
  isValidating: Record<keyof T, boolean>;
  isValid: boolean;
  validateField: (name: keyof T) => Promise<boolean>;
  validateForm: () => Promise<boolean>;
  reset: (newValues?: Partial<T>) => void;
  handleChange: (name: keyof T, value: T[keyof T]) => void;
  handleBlur: (name: keyof T) => void;
}
```

### `values: T`

Reactive form state. Created with `reactive({ ...initialValues })`. Supports `v-model`:

```vue
<input v-model="values.email" />
```

### `errors: Record<keyof T, string | undefined>`

Reactive object pre-initialized with all schema keys set to `undefined`. Set to error message string on validation failure. Reactivity is preserved — mutations in `validateField`/`validateForm` update the template automatically.

### `isDirty: Record<keyof T, boolean>`

Reactive, pre-initialized with all schema keys set to `false`. Set to `true` by `handleChange` and `handleBlur`.

### `isValidating: Record<keyof T, boolean>`

Reactive, pre-initialized with all schema keys set to `false`. Set to `true` during async validation.

### `isValid: boolean`

A `Ref<boolean>` unwrapped via `.value`. Tracks overall form validity. Updated by `validateForm`.

### `validateField(name)`

Validates a single field against its schema using `values[name]`. Aborts any in-flight async rule for that field. Returns `true` if valid.

```typescript
const valid = await validateField('email');
```

### `validateForm()`

Validates all schema fields against current `values`. Updates `errors` and `isValid`. Returns `true` only if all fields pass.

```typescript
const handleSubmit = async () => {
  if (await validateForm()) { /* submit */ }
};
```

### `reset(newValues?)`

Resets to `initialValues` (merged with `newValues` if provided). Clears all `errors`, `isDirty`, and `isValidating` to default state. Sets `isValid` to `true`.

```typescript
reset();                 // Back to initialValues
reset({ email: '' });    // Partial reset
```

### `handleChange(name, value)`

Updates `values[name]`, marks `isDirty[name] = true`, and calls `validateField(name)` if `validateOnChange` is enabled.

```typescript
handleChange('email', 'test@example.com');
```

### `handleBlur(name)`

Marks `isDirty[name] = true` and calls `validateField(name)` if `validateOnBlur` is enabled.

```typescript
@blur="handleBlur('email')"
```

---

## Behavior Details

### `v-model` Support

Because `values` is a `reactive` object, `v-model` works directly:

```vue
<input v-model="values.email" @blur="handleBlur('email')" />
```

A `watch()` with `{ deep: true }` on `values` triggers validation for dirty fields whenever their values change (if `validateOnChange` is enabled).

### Abort Handling

Each field has its own `AbortController`. Previous validation is aborted when a new one starts for the same field. All controllers are aborted on `onUnmounted`.

### Message Priority

Messages are passed to `validateAsync` as the `messages` option. Core's priority chain applies:

1. `messages['ruleName']`
2. `messages['*']`
3. `translator.translate(ruleName, params, locale)`
4. `'Invalid input.'`

---

## TypeScript

```typescript
import type {
  UseCtrovalidateOptions,
  UseCtrovalidateReturn,
} from 'ctrovalidate-vue';
```

---

## Exports

```typescript
export { useCtrovalidate } from './useCtrovalidate';
export type { UseCtrovalidateOptions, UseCtrovalidateReturn } from './useCtrovalidate';
```

Available imports:

| Import | Kind |
|--------|------|
| `useCtrovalidate` | Composable function |
| `UseCtrovalidateOptions` | Type |
| `UseCtrovalidateReturn` | Type |
