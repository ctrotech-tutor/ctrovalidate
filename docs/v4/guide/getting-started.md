---
title: Getting Started | Install and Setup Ctrovalidate
description: Learn how to install Ctrovalidate via npm, yarn, or CDN and build your first accessible, validated form in minutes.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Guide
    url: https://ctrovalidate.vercel.app/v4/guide/getting-started
  - name: Getting Started
    url: https://ctrovalidate.vercel.app/v4/guide/getting-started
---

# Getting Started

This guide covers the installation and initialization of Ctrovalidate for DOM-based projects.

## 📦 Installation

Ctrovalidate is distributed as scoped packages via NPM. For browser-based validation, use the `@ctrovalidate/browser` package.

### Package Managers

::: code-group

```bash [npm]
npm install @ctrovalidate/browser
```

```bash [yarn]
yarn add @ctrovalidate/browser
```

```bash [pnpm]
pnpm add @ctrovalidate/browser
```

:::

### 🌐 CDN

For prototyping or simple environments, load the library via a script tag.

```html
<script type="module">
  import { Ctrovalidate } from 'https://cdn.jsdelivr.net/npm/@ctrovalidate/browser@4.0.1/dist/index.js';
  // Implementation
</script>
```

---

## 🛠️ Implementation Example

The following example demonstrates a field validation setup using the declarative API.

### 1. Markup (HTML)

Define rules using the `data-ctrovalidate-rules` attribute.

```html
<form id="registration-form" novalidate>
  <div class="form-group">
    <label for="email">Email Address</label>
    <input
      type="email"
      id="email"
      name="email"
      data-ctrovalidate-rules="required|email"
    />
    <div class="error-message"></div>
  </div>

  <div class="form-group">
    <label for="password">Password</label>
    <input
      type="password"
      id="password"
      name="password"
      data-ctrovalidate-rules="required|minLength:8"
    />
    <div class="error-message"></div>
  </div>

  <button type="submit">Submit</button>
</form>
```

### 2. Controller Initialization (JavaScript)

Initialize the `Ctrovalidate` controller to manage the validation lifecycle.

```javascript
import { Ctrovalidate } from '@ctrovalidate/browser';

const form = document.querySelector('#registration-form');

// Create the validator instance
const validator = new Ctrovalidate(form, {
  realTime: true,
  errorClass: 'is-invalid',
  errorMessageClass: 'error-feedback'
});

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const isValid = await validator.validate();

  if (isValid) {
    const formData = new FormData(form);
    console.log('Valid Submission Payload:', Object.fromEntries(formData));
    // Proceed with API call
  } else {
    console.error('Validation Failed:', results);
  }
});
```

## 🔍 Technical Flow

1. **Discovery**: Ctrovalidate scans the DOM for elements with `data-ctrovalidate-rules`.
2. **Listeners**: Automated triggers are attached for `blur` and `input` events when `realTime` is enabled.
3. **A11Y**: The controller links inputs to error message containers and manages `aria-invalid` states.
4. **Logic**: The `validate()` method executes the rule engine and returns a boolean state.

## Next Steps

- [**Core Concepts**](./core.md) — Understanding the underlying engine logic.
- [**Configuration**](./configuration.md) — Advanced initialization options.
- [**Built-in Rules**](./rules.md) — Full catalog of all 22 validation rules.
- [**Framework Integrations**](/v4/api/react.md) — Using specialized adapters.
