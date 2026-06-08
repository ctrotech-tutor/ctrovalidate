---
title: "ctrovalidate-browser API Reference"
description: Complete API reference for the Ctrovalidate browser controller — constructor options, instance methods, static methods, and type definitions.
---

# ctrovalidate-browser

The `Ctrovalidate` class orchestrates DOM-based form validation. It discovers fields, manages event listeners, delegates rule execution to `ctrovalidate-core`, and handles visual/ARIA feedback.

---

## `Ctrovalidate` Class

```typescript
class Ctrovalidate {
  static LogLevel: typeof LogLevel;
  static defineAlias(name: string, rules: SchemaRule): void;
  static addRule(name: string, logic: RuleLogic, message?: string): void;
  static addAsyncRule(name: string, logic: AsyncRuleLogic, message?: string): void;
  static setCustomMessages(messages: Record<string, string>): void;

  constructor(formElement: HTMLFormElement, options?: CtrovalidateOptions);

  validate(): Promise<boolean>;
  validateForm(): Promise<boolean>;
  addField(element: HTMLElement): void;
  removeField(element: HTMLElement): void;
  refresh(): void;
  isDirty(fieldName: string): boolean;
  getError(fieldName: string): string | null;
  reset(): void;
  destroy(): void;
}
```

---

## Constructor

### `new Ctrovalidate(formElement, options?)`

Initializes a validator instance.

**Parameters:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `formElement` | HTMLFormElement | — | The form to validate. Throws if not a form element |
| `options` | CtrovalidateOptions | `{}` | Configuration (see below) |

```javascript
const validator = new Ctrovalidate(document.querySelector('#form'), {
  realTime: true,
  errorClass: 'is-invalid',
});
```

**Throws:** `Error` if `formElement` is not an `HTMLFormElement`.

---

## Instance Methods

### `validate(): Promise<boolean>`

Validates all discovered fields. Returns `true` only if every field passes all rules. Each field validates asynchronously in parallel via `Promise.all`.

```javascript
const isValid = await validator.validate();
if (isValid) { /* submit */ }
```

### `validateForm(): Promise<boolean>`

Alias for `validate()`. Same behavior.

### `addField(element: HTMLElement): void`

Registers a field for validation. Parses its `data-ctrovalidate-rules`, dependency, and message attributes. Attaches event listeners. No-op if the element is already registered.

```javascript
const input = document.createElement('input');
input.name = 'custom';
input.setAttribute('data-ctrovalidate-rules', 'required');
form.appendChild(input);
validator.addField(input);
```

### `removeField(element: HTMLElement): void`

Unregisters a field. Removes all event listeners (blur, input, and controller dependency listeners). No-op if not registered.

```javascript
validator.removeField(inputElement);
```

### `refresh(): void`

Re-scans the form for fields. Re-discovers all elements with `data-ctrovalidate-rules` and schema fields, then re-attaches event listeners. Call after dynamically adding/removing fields.

```javascript
// After HTMX or Alpine.js replaces content
validator.refresh();
```

### `isDirty(fieldName: string): boolean`

Returns `true` if the field has been blurred (interacted with) at least once. Returns `false` if the field name is not found.

```javascript
if (validator.isDirty('email')) { /* user touched it */ }
```

### `getError(fieldName: string): string | null`

Returns the current error message for the field, or `null` if the field is valid or not found.

```javascript
const msg = validator.getError('email');
// "Please enter a valid email address."
```

### `reset(): void`

Resets all field states: clears dirty flags, removes error classes and messages, clears ARIA attributes (`aria-invalid`, `aria-describedby`).

```javascript
validator.reset();
```

### `destroy(): void`

Full cleanup. Removes all event listeners from all discovered fields, clears errors, and empties the internal field map. Call when the component unmounts in a SPA.

```javascript
validator.destroy();
```

---

## Static Methods

### `Ctrovalidate.defineAlias(name, rules)`

Registers a global rule alias. Aliases expand recursively when encountered in `data-ctrovalidate-rules` or schema. Cycle-protected via `normalizeRules`.

```javascript
Ctrovalidate.defineAlias('password', 'required|minLength:8|strongPassword');
```

```html
<input data-ctrovalidate-rules="password" />
```

### `Ctrovalidate.addRule(name, logic, message?)`

Adds a global synchronous custom rule. The logic function receives `(value, params, element)` and returns `boolean`. If `message` is provided, it becomes the default error message.

```javascript
Ctrovalidate.addRule(
  'isEven',
  (value) => Number(value) % 2 === 0,
  'Value must be even.'
);
```

**No-op** if `name` is empty or `logic` is not a function.

### `Ctrovalidate.addAsyncRule(name, logic, message?)`

Adds a global asynchronous custom rule. The logic function receives `(value, params, element, signal)` and returns `Promise<boolean>`. The `signal` is an `AbortSignal` — if the field is re-validated while pending, the previous `AbortController` is aborted.

```javascript
Ctrovalidate.addAsyncRule(
  'uniqueEmail',
  async (value, params, element, signal) => {
    const res = await fetch(`/api/check?email=${value}`, { signal });
    return (await res.json()).available;
  },
  'Email already taken.'
);
```

**No-op** if `name` is empty or `logic` is not a function.

### `Ctrovalidate.setCustomMessages(messages)`

Merges custom messages into the global message registry. These apply to all instances.

```javascript
Ctrovalidate.setCustomMessages({
  required: 'This field cannot be empty.',
  minLength: 'Must be at least {0} characters.',
});
```

### `Ctrovalidate.LogLevel`

Exposes the `LogLevel` enum from `ctrovalidate-core`:

```javascript
Ctrovalidate.LogLevel.NONE   // 0
Ctrovalidate.LogLevel.ERROR  // 1
Ctrovalidate.LogLevel.WARN   // 2
Ctrovalidate.LogLevel.INFO   // 3
Ctrovalidate.LogLevel.DEBUG  // 4
```

---

## `CtrovalidateOptions`

```typescript
interface CtrovalidateOptions {
  logLevel?: number;
  errorClass?: string;
  errorMessageClass?: string;
  pendingClass?: string;
  realTime?: boolean;
  schema?: ValidationSchema;
  aliases?: Record<string, SchemaRule>;
}
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `logLevel` | number | `LogLevel.NONE` | Logging verbosity |
| `errorClass` | string | `'is-invalid'` | CSS class added to invalid fields (space-separated for Tailwind) |
| `errorMessageClass` | string | `'error-message'` | CSS class used to find error containers (space-separated) |
| `pendingClass` | string | `'ctrovalidate-pending'` | CSS class added during async rule execution |
| `realTime` | boolean | `true` | Enable/disable automatic blur/input listeners |
| `schema` | ValidationSchema | `{}` | Programmatic rule definitions merged with HTML attributes |
| `aliases` | Record<string, SchemaRule> | `{}` | Additional instance-level aliases merged with globals |

---

## Type Definitions

Types re-exported from `ctrovalidate-core`:

```typescript
type RuleDefinition = { name: string; params: unknown[] };
type ValidationResult = { isValid: boolean; error: string | null; rule: string | null };
type ValidationSchema = Record<string, SchemaRule>;
type SchemaRule = string | (string | RuleDefinition)[];
type DependencyDefinition = { controllerName: string; type: string; value?: unknown };
```

Browser-specific types:

```typescript
type RuleLogic = (value: unknown, params?: unknown[], element?: HTMLElement | null) => boolean;

type AsyncRuleLogic = (
  value: unknown,
  params?: unknown[],
  element?: HTMLElement | null,
  signal?: AbortSignal
) => Promise<boolean>;

interface FieldState {
  isDirty: boolean;
  abortController: AbortController | null;
  lastError: string | null;
}

interface FieldObject {
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

interface CtrovalidateOptions {
  logLevel?: number;
  errorClass?: string;
  errorMessageClass?: string;
  pendingClass?: string;
  realTime?: boolean;
  schema?: ValidationSchema;
  aliases?: Record<string, SchemaRule>;
}
```

---

## Exports

```typescript
export { Ctrovalidate } from './core/Ctrovalidate';
export { LogLevel } from 'ctrovalidate-core';
export * from './types/index';
```

Available named imports:

| Import | Kind | Source |
|--------|------|--------|
| `Ctrovalidate` | Class | Browser package |
| `LogLevel` | Enum | ctrovalidate-core (re-exported) |
| `RuleLogic` | Type | Browser (context=HTMLElement) |
| `AsyncRuleLogic` | Type | Browser (context=HTMLElement) |
| `FieldState` | Interface | Browser |
| `FieldObject` | Interface | Browser |
| `CtrovalidateOptions` | Interface | Browser |
| `RuleDefinition` | Type | ctrovalidate-core (re-exported) |
| `ValidationResult` | Interface | ctrovalidate-core (re-exported) |
| `ValidationSchema` | Type | ctrovalidate-core (re-exported) |
| `SchemaRule` | Type | ctrovalidate-core (re-exported) |
| `DependencyDefinition` | Interface | ctrovalidate-core (re-exported) |
