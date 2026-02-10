# Ctrovalidate

![Ctrovalidate Logo](./public/logo.png)

**The lightweight, declarative, and type-safe form validation ecosystem for modern web applications.**

[![CI Status](https://github.com/ctrotech-tutor/ctrovalidate/actions/workflows/ci.yml/badge.svg)](https://github.com/ctrotech-tutor/ctrovalidate/actions)
[![NPM Version](https://img.shields.io/npm/v/ctrovalidate.svg)](https://www.npmjs.com/package/ctrovalidate)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/ctrovalidate.svg)](https://bundlephobia.com/package/ctrovalidate)
[![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/ctrotech-tutor/ctrovalidate)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-black.svg)](./LICENSE)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-black.svg)](https://conventionalcommits.org)

---

Ctrovalidate is a **zero-dependency**, **TypeScript-native** form validation library that bridges the gap between raw DOM power and framework-ready APIs. It provides a **declarative, HTML-first approach** for vanilla JavaScript applications and **professional-grade headless adapters** for modern frameworks.

## 🏛️ Monorepo Ecosystem

Since v4, Ctrovalidate is organized as a high-performance monorepo with specialized packages for every layer of your application.

| Package                                         | Description                                                                                  | Version  |
| :---------------------------------------------- | :------------------------------------------------------------------------------------------- | :------- |
| **[@ctrovalidate/core](./packages/core)**       | Platform-agnostic validation engine. Zero dependencies, runs anywhere (Node, Browser, Edge). | `v4.0.1` |
| **[@ctrovalidate/browser](./packages/browser)** | DOM adapter with declarative HTML-first API using data attributes.                           | `v4.0.1` |
| **[@ctrovalidate/react](./packages/react)**     | Headless hook for React 18+ with controlled input pattern and stable callbacks.              | `v4.0.1` |
| **[@ctrovalidate/vue](./packages/vue)**         | Reactive composable for Vue 3 with v-model integration and deep watch support.               | `v4.0.1` |
| **[@ctrovalidate/svelte](./packages/svelte)**   | Store-based integration for Svelte with auto-subscription via `$` prefix.                    | `v4.0.1` |
| **[@ctrovalidate/next](./packages/next)**       | Server-side utilities for Next.js Server Actions with FormData parsing.                      | `v4.0.1` |

---

## ✨ Key Features

- 🎨 **HTML-First Philosophy** - Define rules in markup with `data-ctrovalidate-rules` (browser package)
- ♿ **Accessibility by Default** - Automated ARIA management and live-region support
- ⚡ **Async Validation** - First-class Promise support with `AbortController` integration
- 🔗 **Conditional Validation** - Field dependencies via `data-ctrovalidate-if` (browser package)
- 🎭 **Framework Adapters** - Native integrations for React, Vue, Svelte, and Next.js
- 🔁 **Rule Aliases** - Reusable validation macros with infinite-loop protection
- 📦 **Zero Dependencies** - Core package has no runtime dependencies
- 🔒 **TypeScript First** - Built with strict type safety and full generic support
- 🌍 **i18n Ready** - Built-in translator with locale switching and message interpolation
- 🧪 **100% Coverage** - Comprehensive test suite verified via Vitest

---

## 🚀 Quick Start

### Browser (Vanilla JS)

```bash
pnpm add @ctrovalidate/browser @ctrovalidate/core
```

```html
<form id="registrationForm" novalidate>
  <div class="form-group">
    <label for="email">Email Address</label>
    <input
      type="email"
      name="email"
      id="email"
      data-ctrovalidate-rules="required|email"
      placeholder="john@example.com"
    />
    <div class="error-message"></div>
  </div>

  <div class="form-group">
    <label for="password">Password</label>
    <input
      type="password"
      name="password"
      id="password"
      data-ctrovalidate-rules="required|minLength:8|strongPassword"
    />
    <div class="error-message"></div>
  </div>

  <button type="submit">Register</button>
</form>
```

```typescript
import { Ctrovalidate } from '@ctrovalidate/browser';

const validator = new Ctrovalidate(
  document.querySelector('#registrationForm'),
  {
    realTime: true,
    errorClass: 'is-invalid',
    pendingClass: 'is-validating',
  }
);

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const isValid = await validator.validate();

  if (isValid) {
    console.log('Form is valid!');
  }
});
```

### React

```bash
pnpm add @ctrovalidate/react @ctrovalidate/core react
```

```tsx
import { useCtrovalidate } from '@ctrovalidate/react';

interface LoginForm {
  email: string;
  password: string;
}

function LoginPage() {
  const { values, errors, handleChange, handleBlur, validateForm } =
    useCtrovalidate<LoginForm>({
      initialValues: { email: '', password: '' },
      schema: {
        email: 'required|email',
        password: 'required|minLength:8',
      },
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await validateForm()) {
      console.log('Valid!', values);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={values.email}
        onChange={(e) => handleChange('email', e.target.value)}
        onBlur={() => handleBlur('email')}
      />
      {errors.email && <span>{errors.email}</span>}

      <button type="submit">Login</button>
    </form>
  );
}
```

### Vue 3

```bash
pnpm add @ctrovalidate/vue @ctrovalidate/core vue
```

```vue
<script setup lang="ts">
import { useCtrovalidate } from '@ctrovalidate/vue';

const { values, errors, handleBlur, validateForm } = useCtrovalidate<{
  email: string;
}>({
  initialValues: { email: '' },
  schema: { email: 'required|email' },
});

async function handleSubmit() {
  if (await validateForm()) {
    console.log('Valid!', values);
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="values.email" @blur="handleBlur('email')" type="email" />
    <span v-if="errors.email">{{ errors.email }}</span>
    <button type="submit">Submit</button>
  </form>
</template>
```

### Svelte

```bash
pnpm add @ctrovalidate/svelte @ctrovalidate/core svelte
```

```svelte
<script lang="ts">
  import { useCtrovalidate } from '@ctrovalidate/svelte';

  const { values, errors, handleChange, handleBlur, validateForm } =
    useCtrovalidate<{ email: string }>({
      initialValues: { email: '' },
      schema: { email: 'required|email' }
    });

  async function handleSubmit() {
    if (await validateForm()) {
      console.log('Valid!', $values);
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input
    value={$values.email}
    on:input={(e) => handleChange('email', e.currentTarget.value)}
    on:blur={() => handleBlur('email')}
    type="email"
  />
  {#if $errors.email}
    <span>{$errors.email}</span>
  {/if}
  <button type="submit">Submit</button>
</form>
```

### Next.js (Server Actions)

```bash
pnpm add @ctrovalidate/next @ctrovalidate/core next
```

```typescript
// actions.ts
'use server';

import { validateAction } from '@ctrovalidate/next';

interface SignupForm {
  email: string;
  password: string;
}

export async function signup(prevState: any, formData: FormData) {
  const { isValid, errors, values } = await validateAction<SignupForm>(
    formData,
    {
      email: 'required|email',
      password: 'required|minLength:8',
    }
  );

  if (!isValid) {
    return { success: false, errors };
  }

  await db.createUser(values);
  return { success: true };
}
```

```tsx
// SignupForm.tsx
'use client';

import { useActionState } from 'react';
import { signup } from './actions';

export default function SignupForm() {
  const [state, action] = useActionState(signup, {
    success: false,
    errors: {},
  });

  return (
    <form action={action}>
      <input name="email" type="email" />
      {state.errors?.email && <p>{state.errors.email}</p>}

      <button type="submit">Sign Up</button>
    </form>
  );
}
```

---

## 🛠️ Built-in Validation Rules (22)

Ctrovalidate includes 22 production-ready validation rules across 5 categories:

### Required & Comparison

- `required` - Field must have a value
- `sameAs:value` - Value matching (e.g., password confirmation)

### Format Validation

- `email` - RFC-compliant email validation
- `url` - HTTP/HTTPS URL validation
- `ipAddress` - IPv4 and IPv6 support
- `phone` - International phone number validation
- `json` - Valid JSON string
- `creditCard` - Luhn algorithm validation

### String Validation

- `alpha` - Alphabetic characters only
- `alphaNum` - Alphanumeric characters only
- `alphaDash` - Alphanumeric with dashes and underscores
- `alphaSpaces` - Alphabetic with spaces

### Numeric Validation

- `numeric` - Any numeric value
- `integer` - Whole numbers only
- `decimal` - Decimal numbers
- `min:n` - Minimum numeric value
- `max:n` - Maximum numeric value

### Length & Range

- `minLength:n` - Minimum character length
- `maxLength:n` - Maximum character length
- `exactLength:n` - Exact character length
- `between:min,max` - Numeric range (inclusive)

### Complex Validation

- `strongPassword` - Uppercase, lowercase, numbers, and special characters

See the [@ctrovalidate/core documentation](./packages/core) for detailed rule descriptions and parameters.

---

## 🎮 API Reference

### Browser Package (@ctrovalidate/browser)

**Instance Methods:**

```typescript
await validator.validate(); // Validate all fields
validator.addField(element); // Register new field
validator.removeField(element); // Unregister field
validator.refresh(); // Re-scan DOM
validator.isDirty(fieldName); // Check if touched
validator.getError(fieldName); // Get error message
validator.reset(); // Reset all states
validator.destroy(); // Cleanup instance
```

**Static Methods:**

```typescript
Ctrovalidate.defineAlias(name, rules)        // Register alias
Ctrovalidate.addRule(name, logic, msg?)      // Add sync rule
Ctrovalidate.addAsyncRule(name, logic, msg?) // Add async rule
Ctrovalidate.setCustomMessages(messages)     // Override messages
Ctrovalidate.LogLevel                        // Enum (NONE, INFO, WARN, ERROR, DEBUG)
```

### Framework Adapters

**React Hook:**

```typescript
const {
  values,              // Current form state
  errors,              // Error messages (undefined if valid)
  isDirty,             // Touched fields
  isValidating,        // Async validation status
  handleChange,        // Update value
  handleBlur,          // Mark as dirty and validate
  validateField,       // Validate single field
  validateForm,        // Validate all fields
  reset                // Reset form
} = useCtrovalidate<T>({ schema, initialValues, ... });
```

**Vue Composable:**

```typescript
const {
  values,              // Reactive form state
  errors,              // Reactive error messages
  isDirty,             // Reactive touched fields
  isValidating,        // Reactive async status
  isValid,             // Computed overall validity
  handleChange,        // Update value
  handleBlur,          // Mark as dirty and validate
  validateField,       // Validate single field
  validateForm,        // Validate all fields
  reset                // Reset form
} = useCtrovalidate<T>({ schema, initialValues, ... });
```

**Svelte Stores:**

```typescript
const {
  values,              // Writable store
  errors,              // Writable store
  isDirty,             // Writable store
  isValidating,        // Writable store
  isValid,             // Derived store
  handleChange,        // Update value
  handleBlur,          // Mark as dirty and validate
  validateField,       // Validate single field
  validateForm,        // Validate all fields
  reset                // Reset form
} = useCtrovalidate<T>({ schema, initialValues, ... });
```

**Next.js Server Actions:**

```typescript
const { isValid, errors, values } = await validateAction<T>(formData, schema, {
  locale,
  messages,
  customRules,
  aliases,
});
```

---

## 🔧 Advanced Features

### Rule Aliases (Macros)

Standardize validation logic across your application:

```typescript
Ctrovalidate.defineAlias('premiumUser', 'required|minLength:5|alphaNum');
```

```html
<input name="username" data-ctrovalidate-rules="premiumUser" />
```

### Conditional Validation

Build complex conditional flows with `data-ctrovalidate-if`:

```html
<select name="contact_method">
  <option value="email">Email</option>
  <option value="phone">Phone</option>
</select>

<input
  name="email"
  data-ctrovalidate-rules="required|email"
  data-ctrovalidate-if="contact_method:value:email"
/>
<input
  name="phone"
  data-ctrovalidate-rules="required|phone"
  data-ctrovalidate-if="contact_method:value:phone"
/>
```

### Custom Async Rules

Perfect for server-side checks:

```typescript
Ctrovalidate.addAsyncRule(
  'uniqueEmail',
  async (value, params, element, signal) => {
    const res = await fetch(`/api/check-email?value=${value}`, { signal });
    const { available } = await res.json();
    return available;
  },
  'This email is already in use.'
);
```

### Internationalization (i18n)

Built-in translator with locale switching:

```typescript
import { translator } from '@ctrovalidate/core';

// Register Spanish messages
translator.addMessages('es', {
  required: 'Este campo es obligatorio.',
  email: 'Por favor, introduce un correo electrónico válido.',
  minLength: 'Debe tener al menos {0} caracteres.',
});

// Switch locale globally
translator.setLocale('es');

// Or per validation
const { errors } = await validateAction(formData, schema, { locale: 'es' });
```

---

## 🌐 Framework Integrations

| Framework     | Adapter                                     | Demo                                    |
| :------------ | :------------------------------------------ | :-------------------------------------- |
| **React 18+** | [`@ctrovalidate/react`](./packages/react)   | [`demo-react`](./examples/demo-react)   |
| **Vue 3**     | [`@ctrovalidate/vue`](./packages/vue)       | [`demo-vue`](./examples/demo-vue)       |
| **Svelte**    | [`@ctrovalidate/svelte`](./packages/svelte) | [`demo-svelte`](./examples/demo-svelte) |
| **Next.js**   | [`@ctrovalidate/next`](./packages/next)     | [`demo-nextjs`](./examples/demo-nextjs) |

---

## 🧪 Development & Tooling

Ctrovalidate is built with industry-standard tooling:

- **Monorepo:** Powered by **Turborepo** and **pnpm** workspaces
- **Testing:** 100% coverage via **Vitest** with comprehensive test suites
- **Build:** ESM and CJS outputs with full TypeScript declarations via **tsup**
- **Quality:** Strict **ESLint** (flat config) and **Prettier** enforcement
- **CI/CD:** GitHub Actions with Turbo caching for fast builds
- **Commits:** Conventional Commits with **commitlint**

---

## 📊 Package Stats

| Package                   | Files | Focus         | Bundle Size |
| :------------------------ | :---- | :------------ | :---------- |
| **@ctrovalidate/core**    | 36    | Comprehensive | ~5KB        |
| **@ctrovalidate/browser** | 21    | Extensive     | ~8KB        |
| **@ctrovalidate/react**   | 3     | Focused       | ~2KB        |
| **@ctrovalidate/vue**     | 3     | Focused       | ~2KB        |
| **@ctrovalidate/svelte**  | 2     | Minimal       | ~2KB        |
| **@ctrovalidate/next**    | 2     | Minimal       | ~2KB        |

---

## 📚 Documentation

**[Visit Full Documentation →](https://ctrovalidate.vercel.app)**

- [Getting Started](https://ctrovalidate.vercel.app/v4/guide/introduction)
- [Validation Rules](https://ctrovalidate.vercel.app/v4/guide/rules)
- [Custom Rules](https://ctrovalidate.vercel.app/v4/guide/custom-rules)
- [Internationalization](https://ctrovalidate.vercel.app/v4/advanced/i18n)
- [Framework Integrations](https://ctrovalidate.vercel.app/v4/integrations/react)

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

---

## 📄 License

MIT © [Ctrotech](https://github.com/ctrotech-tutor)

**[⬆ Back to Top](#ctrovalidate)**
