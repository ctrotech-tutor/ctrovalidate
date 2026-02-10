---
title: "@ctrovalidate/core | Universal Validation Engine"
description: Technical overview of the platform-agnostic core validation logic that powers all Ctrovalidate adapters.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Guide
    url: https://ctrovalidate.vercel.app/v4/guide/core
  - name: "@ctrovalidate/core"
    url: https://ctrovalidate.vercel.app/v4/guide/core
---

# @ctrovalidate/core

The `@ctrovalidate/core` package contains the platform-agnostic validation engine. It is designed to run in any JavaScript environment, including Node.js, browsers, and edge runtimes.

---

## Technical Role

The core package maintains the "Source of Truth" for validation logic. It does not interact with the DOM or any platform-specific APIs. Instead, it provides the primitive functions used by adapters (like `@ctrovalidate/browser`, `@ctrovalidate/react`, etc.).

### Key Responsibilities

1. **Rule Execution**: Running synchronous and asynchronous validation logic
2. **Schema Parsing**: Interpreting string-based and object-based validation schemas
3. **State Management**: Calculating validation results and error messages based on input values
4. **i18n Engine**: Managing locale-specific error message resolution via the `Translator` class

---

## Core Architecture

### Zero Dependencies

The core package has **zero runtime dependencies**, making it:

- Lightweight (~5KB minified)
- Platform-agnostic (Node.js, Browser, Edge)
- Framework-independent
- Easy to audit and maintain

### Dual Validation Engines

**Synchronous Validation:**

```typescript
import { validate } from '@ctrovalidate/core';

const result = validate('test@example.com', 'required|email');
// { valid: true, error: null }
```

**Asynchronous Validation:**

```typescript
import { validateAsync } from '@ctrovalidate/core';

const result = await validateAsync(
  { email: 'test@example.com', username: 'john' },
  {
    email: 'required|email',
    username: 'required|minLength:3'
  },
  {
    locale: 'en',
    messages: { required: 'This field is required.' }
  }
);
```

---

## Core Primitives

### `validate(value, schema, options?)`

Synchronous validation for a single value.

**Parameters:**

- `value`: The value to validate
- `schema`: String or object schema (e.g., `'required|email'`)
- `options`: Optional configuration (customRules, aliases, messages, locale)

**Returns:**

```typescript
{
  valid: boolean;
  error: string | null;
}
```

---

### `validateAsync(data, schema, options?)`

Asynchronous validation for single or multiple fields.

**Parameters:**

- `data`: Object with field values or single value
- `schema`: Validation schema object
- `options`: Optional configuration (customRules, aliases, messages, locale, signal)

**Returns:**

```typescript
Promise<Record<string, { valid: boolean; error: string | null }>>
```

---

## Built-in Features

### 22 Validation Rules

The core package includes 22 atomic validation rules across 5 categories:

- **Essential**: `required`, `sameAs`
- **String**: `minLength`, `maxLength`, `exactLength`, `between`
- **Numeric**: `numeric`, `integer`, `decimal`, `min`, `max`
- **Format**: `alpha`, `alphaNum`, `alphaDash`, `alphaSpaces`, `email`, `url`, `phone`, `ipAddress`, `creditCard`, `json`
- **Complex**: `strongPassword`

See [Built-in Rules](./rules.md) for complete reference.

---

### Internationalization (i18n)

The `Translator` class provides locale-based error messages:

```typescript
import { translator } from '@ctrovalidate/core';

// Add Spanish messages
translator.addMessages('es', {
  required: 'Este campo es obligatorio.',
  email: 'Por favor, introduce un correo electrónico válido.',
  minLength: 'Debe tener al menos {0} caracteres.'
});

// Switch locale globally
translator.setLocale('es');

// Or use locale per validation
const result = await validateAsync(data, schema, { locale: 'es' });
```

---

### Schema Parser

The `SchemaParser` normalizes different schema formats:

```typescript
import { SchemaParser } from '@ctrovalidate/core';

// String format
const parsed1 = SchemaParser.parse('required|email');

// Object format
const parsed2 = SchemaParser.parse([
  { name: 'required' },
  { name: 'minLength', params: [8] }
]);
```

---

### Rule Parser

The `RuleParser` handles rule string parsing:

```typescript
import { parseRules } from '@ctrovalidate/core';

const rules = parseRules('required|minLength:8|between:1,100');
// [
//   { name: 'required', params: [] },
//   { name: 'minLength', params: ['8'] },
//   { name: 'between', params: ['1', '100'] }
// ]
```

---

### Logger

Configurable logging with 5 levels:

```typescript
import { Logger, LogLevel } from '@ctrovalidate/core';

const logger = new Logger(LogLevel.DEBUG);
logger.info('Validation started');
logger.warn('Rule not found');
logger.error('Validation failed');
```

**LogLevel enum:**

- `NONE` (0): No output
- `ERROR` (1): Critical failures
- `WARN` (2): Warnings
- `INFO` (3): Lifecycle steps
- `DEBUG` (4): Full state transitions

---

## Extension Points

### Custom Rules

Core provides the interfaces (`RuleLogic`, `AsyncRuleLogic`) for creating universal rules:

**Synchronous Rule:**

```typescript
import type { RuleLogic } from '@ctrovalidate/core';

const noSpaces: RuleLogic = (value) => {
  return !/\s/.test(String(value));
};
```

**Asynchronous Rule:**

```typescript
import type { AsyncRuleLogic } from '@ctrovalidate/core';

const uniqueEmail: AsyncRuleLogic = async (value, params, context, signal) => {
  const res = await fetch(`/api/check-email?value=${value}`, { signal });
  const { available } = await res.json();
  return available;
};
```

---

## TypeScript Support

Full TypeScript definitions with strict types:

```typescript
import type {
  ValidationSchema,
  ValidationResult,
  RuleLogic,
  AsyncRuleLogic,
  SchemaRule,
  ParsedRule
} from '@ctrovalidate/core';
```

---

## Next Steps

- [**Built-in Rules**](./rules.md) — Reference for all 22 validation rules
- [**Custom Rules**](./custom-rules.md) — How to extend the core with your own logic
- [**Browser Adapter**](./browser.md) — How the core is used within DOM environments
- [**API Reference**](/v4/api/core) — Complete API documentation
