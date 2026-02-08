# Ctrovalidate

![Ctrovalidate Logo](./public/logo.png)

**The lightweight, declarative, and accessible form validation ecosystem for modern web apps.**

[![CI Status](https://github.com/ctrotech-tutor/ctrovalidate/actions/workflows/ci.yml/badge.svg)](https://github.com/ctrotech-tutor/ctrovalidate/actions)
[![NPM Version](https://img.shields.io/npm/v/ctrovalidate.svg)](https://www.npmjs.com/package/ctrovalidate)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/ctrovalidate.svg)](https://bundlephobia.com/package/ctrovalidate)
[![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/ctrotech-tutor/ctrovalidate)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-black.svg)](./LICENSE)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-black.svg)](https://conventionalcommits.org)

---

Ctrovalidate is a **zero-dependency**, **TypeScript-native** form validation library that bridges the gap between raw DOM power and framework-ready APIs. It embraces a **declarative, HTML-first approach**, allowing you to define validation rules directly in your markup using `data` attributes, while providing professional-grade headless adapters for modern frameworks.

## 🏛️ Monorepo Ecosystem

Since v4, Ctrovalidate is organized as a high-performance monorepo, providing specialized packages for every layer of your application.

| Package                                           | Description                                                                                   | Version          |
| :------------------------------------------------ | :-------------------------------------------------------------------------------------------- | :--------------- |
| **[`@ctrovalidate/core`](./packages/core)**       | The platform-agnostic heart. Pure validation logic that runs anywhere (Node, Browser, Edge).  | `v4.0.0-alpha.0` |
| **[`@ctrovalidate/browser`](./packages/browser)** | The DOM-specific adapter. Powers declarative HTML-first UIs with intelligent field discovery. | `v4.0.0-alpha.0` |
| **[`@ctrovalidate/react`](./packages/react)**     | Professional-grade hook for React 18+ and Next.js applications.                               | `v4.0.0-alpha.0` |
| **[`@ctrovalidate/vue`](./packages/vue)**         | Reactive composable leveraging the Vue 3 Reactivity API.                                      | `v4.0.0-alpha.0` |
| **[`@ctrovalidate/svelte`](./packages/svelte)**   | Native store-based integration for the Svelte ecosystem.                                      | `v4.0.0-alpha.0` |
| **[`@ctrovalidate/next`](./packages/next)**       | Specialized utilities for validated Next.js **Server Actions**.                               | `v4.0.0-alpha.0` |

---

## ✨ Key Features

- 🎨 **HTML-First Philosophy** - Define rules in your markup with `data-ctrovalidate-rules`.
- ♿ **Accessibility (A11Y) by Default** - Automated ARIA management and native live-region support.
- ⚡ **Async Validation** - First-class support for Promise-based rules with `AbortController` integration.
- 🔗 **Field Dependencies** - Conditional validation logic powered by `data-ctrovalidate-if`.
- 🎭 **Headless Adapters** - Native bridges for React, Vue, Svelte, and Next.js.
- 🔁 **Recursive Rule Aliases** - Standardize complex validation sets with infinite-loop protection.
- 📦 **Zero Runtime Dependencies** - Maximum performance, minimal footprint.
- 🔒 **TypeScript First** - Built from the ground up with strict type safety.
- 🧪 **Enterprise Reliability** - 100% logic coverage verified via Vitest.

---

## 🚀 Quick Start

### 1. Installation

```bash
# Recommended (pnpm)
pnpm add @ctrovalidate/core @ctrovalidate/browser

# Other package managers
npm install @ctrovalidate/core @ctrovalidate/browser
yarn add @ctrovalidate/core @ctrovalidate/browser
```

### 2. Markup (The Declarative Way)

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

### 3. Implementation

```typescript
import { Ctrovalidate } from '@ctrovalidate/browser';

// Initialize validator
const validator = new Ctrovalidate(
  document.querySelector('#registrationForm'),
  {
    realTime: true, // Validate on blur/input
    errorClass: 'is-invalid', // CSS class for invalid fields
    pendingClass: 'is-validating', // CSS class during async validation
  }
);

// Validate on submit
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const isValid = await validator.validate();

  if (isValid) {
    // Submit your form
    console.log('Form is valid!');
  }
});
```

---

## 🛠️ Built-in Validation Rules (25+)

### Common Logic

- `required` - Field must have a value (boolean `true`, non-null, non-empty string).
- `email` - Optimized RFC-compliant email validation.
- `minLength:n` / `maxLength:n` - Character length constraints.
- `exactLength:n` - Precise character length requirement.
- `sameAs:fieldName` - Value matching (e.g., password confirmation).

### Formats & Security

- `alpha` / `alphaNum` / `alphaDash` / `alphaSpaces` - Character set constraints.
- `url` - Intelligent HTTP/HTTPS URL validation.
- `phone` - International standard phone number validation.
- `creditCard` - Validates numbers using the **Luhn Algorithm**.
- `strongPassword` - Enforces uppercase, lowercase, numbers, and special characters.
- `json` - Validates parseable JSON strings.
- `ipAddress` - Comprehensive support for both **IPv4** and **IPv6**.

### Numeric & Range

- `numeric` / `integer` / `decimal` - Type-specific numeric verification.
- `min:n` / `max:n` - Numeric bound checks.
- `between:min,max` - Range validation (inclusive).

---

## 🎮 Public API Methods

### Instance Methods

```typescript
await validator.validate(); // Run all rules and return success boolean
validator.addField(element); // Dynamically register a new input
validator.removeField(element); // Clean up a removed input
validator.refresh(); // Re-scan the DOM for new fields
validator.isDirty('fieldName'); // Check if a field has been touched
validator.getError('fieldName'); // Get the current active error message
validator.reset(); // Reset all validation states
validator.destroy(); // Clean up the instance and event listeners
```

### Static Methods (Global)

```typescript
Ctrovalidate.defineAlias(name, rules)       // Register a reusable macro (e.g., 'securePassword')
Ctrovalidate.addRule(name, logic, msg?)     // Add a custom synchronous rule
Ctrovalidate.addAsyncRule(name, logic, msg?)// Add a custom asynchronous rule
Ctrovalidate.setCustomMessages(messages)    // Override default global messages
Ctrovalidate.LogLevel                       // Access enum for LogLevel (NONE, INFO, WARN, ERROR, DEBUG)
```

---

## 🔧 Advanced Showcases

### Rule Aliases (Macros)

Standardize your validation logic across the entire application.

```typescript
Ctrovalidate.defineAlias('premiumUser', 'required|minLength:5|alphaNum');
```

```html
<input name="username" data-ctrovalidate-rules="premiumUser" />
```

### Field Dependencies

Build complex conditional flows directly in your HTML.

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

Perfect for server-side checks like username availability or email uniqueness.

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

---

## 🌐 Framework Integrations

Ctrovalidate provides premium adapters for all major modern web frameworks:

| Framework     | Adapter                                | Demo                                    |
| :------------ | :------------------------------------- | :-------------------------------------- |
| **React 18+** | [`useCtrovalidate`](./packages/react)  | [`demo-react`](./examples/demo-react)   |
| **Vue 3**     | [`useCtrovalidate`](./packages/vue)    | [`demo-vue`](./examples/demo-vue)       |
| **Svelte**    | [`useCtrovalidate`](./packages/svelte) | [`demo-svelte`](./examples/demo-svelte) |
| **Next.js**   | [`validateAction`](./packages/next)    | [`demo-nextjs`](./examples/demo-nextjs) |

---

## 🧪 Development & Tooling

Ctrovalidate is built with industry-standard tooling to ensure a professional developer experience:

- **Performance**: Powered by **Turborepo** and **pnpm** for cached, parallelized builds.
- **Reliability**: 100% logic coverage verified via **Vitest**.
- **Distribution**: ESM and CJS builds with full DTS support via **tsup**.
- **Quality**: Strict **ESLint** (flat config) and **Prettier** governance.

---

## 📄 License

MIT © [Ctrotech](https://github.com/ctrotech-tutor)

**[⬆ Back to Top](#ctrovalidate)**
