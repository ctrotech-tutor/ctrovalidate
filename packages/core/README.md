# @ctrovalidate/core

**Platform-agnostic validation engine for JavaScript and TypeScript.**

`@ctrovalidate/core` is the headless validation library at the heart of Ctrovalidate. It provides pure validation logic with zero dependencies, making it perfect for Node.js, browsers, serverless functions, and any JavaScript environment.

[![npm version](https://img.shields.io/npm/v/@ctrovalidate/core.svg)](https://www.npmjs.com/package/@ctrovalidate/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

- 🚀 **Zero dependencies** - Runs anywhere JavaScript runs
- 📦 **22+ built-in rules** - Covers most validation needs
- 🌍 **i18n ready** - Built-in translation system with message interpolation
- ⚡ **Async support** - First-class async validation with abort signals
- 🎯 **Type-safe** - Full TypeScript support with excellent inference
- 🔧 **Extensible** - Custom rules, aliases, and message overrides
- 📝 **Flexible syntax** - Multiple ways to define validation rules

---

## 📦 Installation

```bash
npm install @ctrovalidate/core
```

```bash
pnpm add @ctrovalidate/core
```

```bash
yarn add @ctrovalidate/core
```

---

## 🚀 Quick Start

### Basic Validation

```typescript
import { validate } from '@ctrovalidate/core';

const data = {
  email: 'user@example.com',
  age: 25,
  username: 'john_doe',
};

const schema = {
  email: 'required|email',
  age: 'required|min:18',
  username: 'required|minLength:3|alphaDash',
};

const results = validate(data, schema);

console.log(results);
/*
{
  email: { isValid: true, error: null, rule: null },
  age: { isValid: true, error: null, rule: null },
  username: { isValid: true, error: null, rule: null }
}
*/
```

### Async Validation

```typescript
import { validateAsync } from '@ctrovalidate/core';

const results = await validateAsync(data, schema);
```

---

## 📚 Available Rules

### Required & Presence

| Rule       | Description                                      | Example      |
| ---------- | ------------------------------------------------ | ------------ |
| `required` | Value must be present (not null/undefined/empty) | `'required'` |

### String Format

| Rule         | Description                        | Example        |
| ------------ | ---------------------------------- | -------------- |
| `email`      | Valid email address                | `'email'`      |
| `url`        | Valid URL                          | `'url'`        |
| `ipAddress`  | Valid IP address (v4/v6)           | `'ipAddress'`  |
| `phone`      | Valid phone number                 | `'phone'`      |
| `json`       | Valid JSON string                  | `'json'`       |
| `creditCard` | Valid credit card (Luhn algorithm) | `'creditCard'` |

### String Content

| Rule          | Description                       | Example         |
| ------------- | --------------------------------- | --------------- |
| `alpha`       | Only alphabetic characters        | `'alpha'`       |
| `alphaNum`    | Only alphanumeric characters      | `'alphaNum'`    |
| `alphaDash`   | Alphanumeric + dashes/underscores | `'alphaDash'`   |
| `alphaSpaces` | Alphabetic + spaces               | `'alphaSpaces'` |

### Numeric

| Rule      | Description           | Example     |
| --------- | --------------------- | ----------- |
| `numeric` | Any number            | `'numeric'` |
| `integer` | Whole numbers only    | `'integer'` |
| `decimal` | Decimal numbers       | `'decimal'` |
| `min:n`   | Minimum numeric value | `'min:18'`  |
| `max:n`   | Maximum numeric value | `'max:100'` |

### Length

| Rule            | Description           | Example            |
| --------------- | --------------------- | ------------------ |
| `minLength:n`   | Minimum string length | `'minLength:8'`    |
| `maxLength:n`   | Maximum string length | `'maxLength:255'`  |
| `exactLength:n` | Exact string length   | `'exactLength:10'` |

### Range & Comparison

| Rule              | Description                | Example             |
| ----------------- | -------------------------- | ------------------- |
| `between:min,max` | Value/length between range | `'between:1,100'`   |
| `sameAs:value`    | Value equals target        | `'sameAs:password'` |

### Complex

| Rule             | Description                                    | Example            |
| ---------------- | ---------------------------------------------- | ------------------ |
| `strongPassword` | 8+ chars, uppercase, lowercase, number, symbol | `'strongPassword'` |

---

## 🎯 Rule Syntax

Ctrovalidate supports multiple ways to define rules:

### Pipe-Delimited String

```typescript
const schema = {
  password: 'required|minLength:8|strongPassword',
};
```

### Array of Strings

```typescript
const schema = {
  password: ['required', 'minLength:8', 'strongPassword'],
};
```

### Rule Objects

```typescript
const schema = {
  password: [
    { name: 'required', params: [] },
    { name: 'minLength', params: [8] },
    { name: 'strongPassword', params: [] },
  ],
};
```

### Mixed

```typescript
const schema = {
  password: ['required', { name: 'minLength', params: [8] }],
};
```

---

## 🔧 Custom Rules

Define your own validation logic:

```typescript
import { validate } from '@ctrovalidate/core';

const customRules = {
  isEven: (value) => Number(value) % 2 === 0,

  isAdult: (value) => {
    const age = Number(value);
    return age >= 18 && age <= 120;
  },

  // Async rule
  isUniqueEmail: async (value) => {
    const response = await fetch(`/api/check-email?email=${value}`);
    const { isUnique } = await response.json();
    return isUnique;
  },
};

const schema = {
  age: 'required|isAdult',
  favoriteNumber: 'isEven',
  email: 'required|email|isUniqueEmail',
};

const results = await validateAsync(data, schema, { customRules });
```

---

## 🎨 Rule Aliases

Create reusable rule combinations:

```typescript
const aliases = {
  password: 'required|minLength:8|strongPassword',
  username: 'required|minLength:3|maxLength:20|alphaDash',
};

const schema = {
  password: 'password', // Expands to full rule set
  username: 'username',
};

const results = validate(data, schema, { aliases });
```

---

## 🌍 Internationalization (i18n)

### Register Custom Locales

```typescript
import { translator } from '@ctrovalidate/core';

// Register Spanish messages
translator.addMessages('es', {
  required: 'Este campo es obligatorio.',
  email: 'Por favor, introduce un correo electrónico válido.',
  minLength: 'Debe tener al menos {0} caracteres.',
  min: 'El valor mínimo es {0}.',
});

// Switch locale
translator.setLocale('es');
```

### Message Interpolation

Use `{0}`, `{1}`, etc. for parameter substitution:

```typescript
translator.addMessages('fr', {
  between: 'La valeur doit être entre {0} et {1}.',
  minLength: 'Longueur minimale: {0} caractères.',
});
```

### Per-Validation Locale Override

```typescript
const results = validate(data, schema, {
  locale: 'es', // Use Spanish for this validation only
});
```

---

## 💬 Custom Messages

### Global Message Override

```typescript
const results = validate(data, schema, {
  messages: {
    required: 'This field cannot be empty!',
    email: 'Please provide a valid email address.',
  },
});
```

### Field-Specific Messages

```typescript
const results = validate(data, schema, {
  messages: {
    'email.required': 'We need your email to contact you.',
    'password.minLength': 'Password is too short!',
  },
});
```

### Wildcard Message

```typescript
const results = validate(data, schema, {
  messages: {
    '*': 'Invalid input.', // Fallback for all rules
  },
});
```

### Message Priority

1. Field-specific message (`'email.required'`)
2. Rule-specific message (`'required'`)
3. Wildcard message (`'*'`)
4. Translator message (locale-aware)

---

## 🎭 TypeScript Usage

### Type-Safe Schemas

```typescript
interface User {
  email: string;
  age: number;
  username: string;
}

const data: User = {
  email: 'user@example.com',
  age: 25,
  username: 'john_doe',
};

const schema: ValidationSchema = {
  email: 'required|email',
  age: 'required|min:18',
  username: 'required|alphaDash',
};

const results = validate<User>(data, schema);
```

### Custom Rule Types

```typescript
import { RuleLogic, AsyncRuleLogic } from '@ctrovalidate/core';

const isEven: RuleLogic = (value) => Number(value) % 2 === 0;

const isUniqueEmail: AsyncRuleLogic = async (
  value,
  params,
  context,
  signal
) => {
  // Async validation with abort signal support
  const response = await fetch(`/api/check?email=${value}`, { signal });
  return response.ok;
};
```

---

## 🔄 Async Validation with Abort Signals

Cancel long-running validations:

```typescript
const controller = new AbortController();

const results = validateAsync(data, schema, {
  signal: controller.signal,
});

// Cancel validation
controller.abort();
```

---

## 📖 API Reference

### Core Functions

#### `validate<T>(data, schema, options?)`

Synchronous validation for all fields.

**Parameters:**

- `data: T` - Data object to validate
- `schema: ValidationSchema` - Validation rules
- `options?: ValidationOptions` - Optional configuration

**Returns:** `Record<string, ValidationResult>`

---

#### `validateAsync<T>(data, schema, options?)`

Asynchronous validation for all fields.

**Parameters:**

- `data: T` - Data object to validate
- `schema: ValidationSchema` - Validation rules
- `options?: ValidationOptions` - Optional configuration

**Returns:** `Promise<Record<string, ValidationResult>>`

---

#### `validateValue(value, rules, options?)`

Synchronous validation for a single value.

**Parameters:**

- `value: unknown` - Value to validate
- `rules: SchemaRule` - Validation rules
- `options?: ValidationOptions` - Optional configuration

**Returns:** `ValidationResult`

---

#### `validateValueAsync(value, rules, options?)`

Asynchronous validation for a single value.

**Parameters:**

- `value: unknown` - Value to validate
- `rules: SchemaRule` - Validation rules
- `options?: ValidationOptions` - Optional configuration

**Returns:** `Promise<ValidationResult>`

---

### Types

#### `ValidationOptions`

```typescript
interface ValidationOptions {
  customRules?: Record<string, RuleLogic | AsyncRuleLogic>;
  aliases?: Record<string, SchemaRule>;
  messages?: Record<string, string>;
  locale?: string;
  signal?: AbortSignal;
}
```

#### `ValidationResult`

```typescript
interface ValidationResult {
  isValid: boolean;
  error: string | null;
  rule: string | null;
}
```

#### `RuleLogic`

```typescript
type RuleLogic<Context = unknown> = (
  value: unknown,
  params?: unknown[],
  context?: Context | null
) => boolean;
```

#### `AsyncRuleLogic`

```typescript
type AsyncRuleLogic<Context = unknown> = (
  value: unknown,
  params?: unknown[],
  context?: Context | null,
  signal?: AbortSignal
) => Promise<boolean>;
```

---

### Translator API

#### `translator.setLocale(locale: string)`

Set the active locale.

```typescript
translator.setLocale('es');
```

---

#### `translator.addMessages(locale: string, messages: LocaleDictionary)`

Register or merge messages for a locale.

```typescript
translator.addMessages('fr', {
  required: 'Champ requis',
  email: 'Email invalide',
});
```

---

#### `translator.translate(rule: string, params?: unknown[], localeOverride?: string)`

Get a translated message with parameter interpolation.

```typescript
const message = translator.translate('minLength', [8]);
// "Minimum length is 8 characters."
```

---

#### `translator.currentLocale`

Get the current active locale.

```typescript
console.log(translator.currentLocale); // "en"
```

---

## 🎓 Examples

### Complete Form Validation

```typescript
import { validateAsync } from '@ctrovalidate/core';

const formData = {
  username: 'john_doe',
  email: 'john@example.com',
  password: 'SecurePass123!',
  confirmPassword: 'SecurePass123!',
  age: 25,
  website: 'https://example.com',
};

const schema = {
  username: 'required|minLength:3|maxLength:20|alphaDash',
  email: 'required|email',
  password: 'required|minLength:8|strongPassword',
  confirmPassword: 'required|sameAs:SecurePass123!',
  age: 'required|integer|min:18|max:120',
  website: 'url',
};

const results = await validateAsync(formData, schema);

// Check if entire form is valid
const isFormValid = Object.values(results).every((r) => r.isValid);

if (!isFormValid) {
  // Get all errors
  const errors = Object.entries(results)
    .filter(([_, result]) => !result.isValid)
    .map(([field, result]) => ({ field, error: result.error }));

  console.log('Validation errors:', errors);
}
```

### Multi-Language Support

```typescript
import { translator, validateAsync } from '@ctrovalidate/core';

// Register multiple locales
translator.addMessages('es', {
  required: 'Requerido',
  email: 'Email inválido',
  minLength: 'Mínimo {0} caracteres',
});

translator.addMessages('fr', {
  required: 'Requis',
  email: 'Email invalide',
  minLength: 'Minimum {0} caractères',
});

// Switch based on user preference
const userLocale = getUserPreference(); // 'es', 'fr', etc.
translator.setLocale(userLocale);

const results = await validateAsync(data, schema);
```

---

## 📚 Full Documentation

For comprehensive guides, framework integrations, and advanced usage:

**[Visit Ctrovalidate Documentation](https://ctrovalidate.vercel.app)**

---

## 🤝 Related Packages

- **[@ctrovalidate/react](https://www.npmjs.com/package/@ctrovalidate/react)** - React hooks
- **[@ctrovalidate/vue](https://www.npmjs.com/package/@ctrovalidate/vue)** - Vue composables
- **[@ctrovalidate/svelte](https://www.npmjs.com/package/@ctrovalidate/svelte)** - Svelte stores
- **[@ctrovalidate/next](https://www.npmjs.com/package/@ctrovalidate/next)** - Next.js server actions
- **[@ctrovalidate/browser](https://www.npmjs.com/package/@ctrovalidate/browser)** - Vanilla JS DOM integration

---

## 📄 License

MIT © [Ctrotech](https://github.com/ctrotech-tutor)

---

## 🙏 Acknowledgments

Inspired by industry-leading validation libraries:

- [Zod](https://github.com/colinhacks/zod)
- [Yup](https://github.com/jquense/yup)
- [Vee-Validate](https://github.com/logaretm/vee-validate)
