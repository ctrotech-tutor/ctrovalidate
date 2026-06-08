---
title: "ctrovalidate-core | Universal Validation Engine"
description: Technical overview of the platform-agnostic core validation logic that powers all Ctrovalidate adapters.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Guide
    url: https://ctrovalidate.vercel.app/guide/core
  - name: "ctrovalidate-core"
    url: https://ctrovalidate.vercel.app/guide/core
---

# ctrovalidate-core

The `ctrovalidate-core` package contains the platform-agnostic validation engine. It is designed to run in any JavaScript environment, including Node.js, browsers, and edge runtimes.

---

## Technical Role

The core package maintains the "Source of Truth" for validation logic. It does not interact with the DOM or any platform-specific APIs. Instead, it provides the primitive functions used by adapters (`ctrovalidate-browser`, `ctrovalidate-react`, etc.).

### Key Responsibilities

1. **Rule Execution** — Running synchronous and asynchronous validation logic
2. **Schema Parsing** — Interpreting string-based and object-based validation schemas
3. **Result Calculation** — Returning `{ isValid, error, rule }` for each field
4. **i18n Engine** — Managing locale-specific error message resolution via the `Translator` class

---

## Core Architecture

### Zero Dependencies

The core package has **zero runtime dependencies**, making it:

- Lightweight (~5KB minified)
- Platform-agnostic (Node.js, Browser, Edge)
- Framework-independent
- Easy to audit and maintain

### 4 Validation Functions

**Synchronous — Single Value:**

```typescript
import { validateValue } from 'ctrovalidate-core';

const result = validateValue('test@example.com', 'required|email');
// { isValid: true, error: null, rule: null }
```

**Synchronous — Full Object:**

```typescript
import { validate } from 'ctrovalidate-core';

const results = validate(
  { email: 'test@example.com', age: 25 },
  { email: 'required|email', age: 'required|numeric' }
);
// { email: { isValid: true, error: null, rule: null }, age: { ... } }
```

**Asynchronous — Single Value:**

```typescript
import { validateValueAsync } from 'ctrovalidate-core';

const result = await validateValueAsync('username', 'required|checkAvailability', {
  customRules: { checkAvailability: async (val, p, ctx, sig) => { /* ... */ } },
});
```

**Asynchronous — Full Object:**

```typescript
import { validateAsync } from 'ctrovalidate-core';

const results = await validateAsync(
  { email: 'test@example.com', username: 'john' },
  { email: 'required|email', username: 'required|minLength:3' },
  { locale: 'en', messages: { required: 'This field is required.' } }
);
```

---

## Core Primitives

### `validateValue(value, rules, options?)`

Synchronous validation for a single value against a set of rules.

**Parameters:**

- `value` (unknown) — The value to validate
- `rules` (SchemaRule) — String like `'required|email'`, or array format
- `options` (ValidationOptions) — Optional: `customRules`, `aliases`, `messages`, `locale`

**Returns:** `ValidationResult`

```typescript
{
  isValid: boolean;
  error: string | null;
  rule: string | null;
}
```

First-fail-wins: returns immediately when a rule fails. If a rule's logic returns a `Promise` in the sync path, it is silently skipped.

---

### `validate(data, schema, options?)`

Synchronous validation for an entire data object.

**Parameters:**

- `data` (object) — The data object to validate
- `schema` (ValidationSchema) — Field-to-rules mapping
- `options` (ValidationOptions) — Optional config

**Returns:** `Record<string, ValidationResult>`

Only fields in `schema` are validated; extra data keys are ignored.

---

### `validateValueAsync(value, rules, options?)`

Async validation for a single value. Supports async rules with `AbortSignal`.

**Parameters:**

- `value` (unknown) — The value to validate
- `rules` (SchemaRule) — String or array
- `options` (ValidationOptions) — Also supports `signal` for abort

**Returns:** `Promise<ValidationResult>`

---

### `validateAsync(data, schema, options?)`

Async validation for an entire data object. Sequentially validates each schema field.

**Parameters:**

- `data` (object) — The data object to validate
- `schema` (ValidationSchema) — Field-to-rules mapping
- `options` (ValidationOptions) — Also supports `signal`

**Returns:** `Promise<Record<string, ValidationResult>>`

---

## 22 Validation Rules

The core package includes 22 atomic validation rules:

- **Essential**: `required`, `sameAs`
- **String**: `minLength`, `maxLength`, `exactLength`
- **Numeric**: `numeric`, `integer`, `decimal`, `min`, `max`
- **Range**: `between` (numeric values and string lengths)
- **Format**: `alpha`, `alphaNum`, `alphaDash`, `alphaSpaces`, `email`, `url`, `phone`, `ipAddress`, `creditCard`, `json`
- **Complex**: `strongPassword`

### Skip Conditions

Unless noted, most rules **skip** (return `true`) when the value is `null`, `undefined`, or empty string `""`. This allows "optional but valid" fields — only `required` controls presence.

| Rule | Skips on | Notes |
|------|----------|-------|
| `required` | Never | Returns `false` for `null`, `undefined`, `""`, whitespace-only, and `false` |
| `sameAs` | Never | Fails if `params[0]` is undefined (missing target) |
| `email`, `url`, `ipAddress`, `json`, `phone`, `creditCard`, `strongPassword` | Falsy (`!value`) | — |
| `alpha`, `alphaNum`, `alphaDash`, `alphaSpaces` | Falsy (`!value`) | — |
| `numeric`, `integer`, `decimal` | Falsy AND not `0` | `0` is validated (is numeric) |
| `min`, `max`, `minLength`, `maxLength`, `exactLength`, `between` | `null`, `undefined`, `""` | — |

### Key Rule Details

- **`required`** — Returns `false` for `null`, `undefined`, empty string, whitespace-only. For booleans, returns the boolean itself (`false` → `false`).
- **`sameAs`** — Strict equality (`===`) against `params[0]`. In `ctrovalidate-browser`, the adapter resolves field references to their current values before calling core.
- **`between`** — Dual mode: numeric comparison for numbers and numeric strings (e.g., `"5"` between `1,10`), length comparison for non-numeric strings (e.g., `"abc"` length between `1,5`).
- **`min`/`max`** — Coerces value to `Number()` for comparison. Fails with `console.error` if `params[0]` is missing.

---

## Internationalization (i18n)

The `Translator` class provides locale-based error messages:

```typescript
import { translator } from 'ctrovalidate-core';

// Add Spanish messages
translator.addMessages('es', {
  required: 'Este campo es obligatorio.',
  email: 'Por favor, introduce un correo electrónico válido.',
  minLength: 'Debe tener al menos {0} caracteres.',
});

// Switch locale globally
translator.setLocale('es');

// Or use locale per validation call
const result = await validateAsync(data, schema, { locale: 'es' });
```

Messages support `{0}`, `{1}` parameter interpolation. Missing locales fall back to `'en'`. Missing rule entries fall back to `'Invalid input.'`.

---

## Utility Functions

### `normalizeRules(rules, aliases?, seen?)`

Normalizes any `SchemaRule` (string, array, hybrid) into a uniform `RuleDefinition[]`. Supports recursive alias expansion with cycle protection via the `seen` set.

```typescript
import { normalizeRules } from 'ctrovalidate-core';

normalizeRules(['required', { name: 'minLength', params: ['8'] }]);
// [{ name: 'required', params: [] }, { name: 'minLength', params: ['8'] }]
```

### `parseRules(rulesString)`

Parses a pipe-delimited rule string into structured objects.

```typescript
import { parseRules } from 'ctrovalidate-core';

parseRules('required|minLength:8|between:1,100');
// [
//   { name: 'required', params: [] },
//   { name: 'minLength', params: ['8'] },
//   { name: 'between', params: ['1', '100'] }
// ]
```

---

## Logger

Configurable logging with 5 levels. Has both static (global `LogLevel.ERROR`) and instance (default `LogLevel.NONE`) APIs.

```typescript
import { Logger, LogLevel } from 'ctrovalidate-core';

// Static (global)
Logger.setLevel(LogLevel.DEBUG);
Logger.info('Validation started');

// Instance
const logger = new Logger(LogLevel.WARN);
logger.warn('Rule not found');
logger.error('Validation failed');
```

**LogLevel enum:** `NONE` (0), `ERROR` (1), `WARN` (2), `INFO` (3), `DEBUG` (4)

---

## Extension Points

### Custom Rules

Core provides the `RuleLogic` and `AsyncRuleLogic` interfaces for creating universal validation logic. Register them via `customRules` option in validation functions.

```typescript
import type { RuleLogic, AsyncRuleLogic } from 'ctrovalidate-core';

// Synchronous
const noSpaces: RuleLogic = (value) => !/\s/.test(String(value));

// Asynchronous (register via options.customRules)
const uniqueEmail: AsyncRuleLogic = async (value, params, context, signal) => {
  const res = await fetch(`/api/check-email?value=${value}`, { signal });
  return (await res.json()).available;
};
```

Note: The `Ctrovalidate` class with static `addRule`/`addAsyncRule` methods is part of `ctrovalidate-browser`, not the core package. Core validation functions accept custom rules via the `customRules` option.

---

## TypeScript Support

```typescript
import type {
  ValidationSchema,
  ValidationResult,
  RuleLogic,
  AsyncRuleLogic,
  SchemaRule,
  RuleDefinition,
  DependencyDefinition,
  ValidationOptions,
} from 'ctrovalidate-core';
```

---

## Next Steps

- [**Built-in Rules**](./rules.md) — Reference for all 22 validation rules with skip conditions
- [**Custom Rules**](./custom-rules.md) — How to extend with your own logic
- [**Browser Adapter**](./browser.md) — How the core is used within DOM environments
- [**API Reference**](/api/core) — Complete API documentation
