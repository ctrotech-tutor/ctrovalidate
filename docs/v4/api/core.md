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

The core package exports **4 validation functions** for different use cases:

### `validateValue(value, rules, options)` - Sync, Single Value

Validates a **single value** against rules synchronously.

- **Parameters:**
  - `value` (unknown): The value to validate.
  - `rules` (SchemaRule): String, Array, or Object schema.
  - `options` (ValidationOptions): Optional config.
- **Returns:** `ValidationResult` - `{ isValid: boolean, error: string | null, rule: string | null }`

**Example:**

```javascript
import { validateValue } from '@ctrovalidate/core';

const result = validateValue('test@example.com', 'required|email');
console.log(result.isValid); // true
```

### `validate(data, schema, options)` - Sync, Entire Object

Validates an **entire data object** against a schema synchronously.

- **Parameters:**
  - `data` (object): The data object to validate.
  - `schema` (Record<string, SchemaRule>): Field-to-rules mapping.
  - `options` (ValidationOptions): Optional config.
- **Returns:** `Record<string, ValidationResult>` - Results for each field

**Example:**

```javascript
import { validate } from '@ctrovalidate/core';

const data = { email: 'test@example.com', age: 25 };
const schema = { email: 'required|email', age: 'required|numeric' };
const results = validate(data, schema);
```

### `validateValueAsync(value, rules, options)` - Async, Single Value

Validates a **single value** asynchronously (supports async rules).

- **Parameters:**
  - `value` (unknown): The value to validate.
  - `rules` (SchemaRule): String, Array, or Object schema.
  - `options` (ValidationOptions): Optional config (includes `signal` for AbortController).
- **Returns:** `Promise<ValidationResult>`

**Example:**

```javascript
import { validateValueAsync } from '@ctrovalidate/core';

const result = await validateValueAsync('username', 'required|checkAvailability');
```

### `validateAsync(data, schema, options)` - Async, Entire Object

Validates an **entire data object** asynchronously.

- **Parameters:**
  - `data` (object): The data object to validate.
  - `schema` (Record<string, SchemaRule>): Field-to-rules mapping.
  - `options` (ValidationOptions): Optional config (includes `signal`).
- **Returns:** `Promise<Record<string, ValidationResult>>`

**Example:**

```javascript
import { validateAsync } from '@ctrovalidate/core';

const data = { username: 'john', email: 'john@example.com' };
const schema = { username: 'required|checkAvailability', email: 'required|email' };
const results = await validateAsync(data, schema);
```

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
