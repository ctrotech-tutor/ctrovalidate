---
title: "@ctrovalidate/core API Reference"
description: Technical API reference for the isomorphic Ctrovalidate core engine. Documenting validate, validateAsync, and logic normalization.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: API
    url: https://ctrovalidate.vercel.app/v4/api/core
  - name: Core
    url: https://ctrovalidate.vercel.app/v4/api/core
---

## @ctrovalidate/core

The `@ctrovalidate/core` package contains the isomorphic validation engine. It is designed to run in any JavaScript environment (Node.js, Edge, Browser) and handles rule execution, schema normalization, and i18n.

---

## 🛠️ Validation Functions

### `validate(value, rules, options)`

Validates a single value against a schema synchronously.

- **Parameters:**
  - `value` (any): The data to validate.
  - `rules` (SchemaRule): String, Array, or Object schema.
  - `options` (ValidationOptions): Optional config (custom logic, messages).
- **Returns:** `ValidationResult` - `{ valid: boolean, error: string | null }`

### `validateAsync(value, rules, options)`

Validates a single value or multiple fields against a schema asynchronously (supports remote checks).

- **Parameters:**
  - `value` (any | Record<string, any>): Single value or object with field values.
  - `rules` (SchemaRule | ValidationSchema): String, Array, or Object schema.
  - `options` (ValidationOptions): Optional config (includes `signal` for AbortController).
- **Returns:** `Promise<ValidationResult>` or `Promise<Record<string, ValidationResult>>`

---

## 🧩 Schema Normalization

### `SchemaParser.parse(rules)`

The core utility used to normalize various schema formats into a standard `RuleDefinition[]` array.

- **Technical Nuance**: Handles circular references in aliases and expands complex pipe strings into atomic rule objects.

---

## 🌍 Internationalization (i18n)

### `Translator`

The global translation engine.

- **`translator.setLocale(lang)`**: Switch the active locale.
- **`translator.addMessages(lang, messages)`**: Register custom error messages for a locale.
- **`translator.translate(ruleName, params)`**: Manually resolve an error message with parameter interpolation (`{n}`).

---

## 🚀 Advanced Engine Features

### Rule Aliases

Register reusable logic macros globally on the engine.

```javascript
import { Ctrovalidate } from '@ctrovalidate/core';

Ctrovalidate.alias('username', 'required|alphaNum|minLength:4');
```

### Custom Rule Registration

Add synchronous or asynchronous rules that are available to all schemas globally.

```javascript
Ctrovalidate.addRule('isPositive', (val) => val > 0);
Ctrovalidate.addAsyncRule('checkDB', async (val, params, el, signal) => { ... });
```

---

## ✅ Best Practices

- **Isomorphism**: Use `@ctrovalidate/core` for server-side validation (e.g., in Next.js Server Actions) to ensure identical logic between client and server.
- **Zero Side-Effects**: The core package is side-effect free and tree-shakable.
