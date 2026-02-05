---
title: Getting Started | Install and Setup Ctrovalidate
description: Learn how to install Ctrovalidate via npm, yarn, or CDN and build your first accessible, validated form in minutes.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Guide
    url: https://ctrovalidate.vercel.app/guide/getting-started
  - name: Getting Started
    url: https://ctrovalidate.vercel.app/guide/getting-started
---

# Getting Started

Welcome to **Ctrovalidate**! In this guide, we'll walk you through setting up the library and building your first validated form in under 5 minutes.

## 📦 Installation

Ctrovalidate is available on all major package registries.

### Package Managers

::: code-group

```bash [npm]
npm install ctrovalidate
```

```bash [yarn]
yarn add ctrovalidate
```

```bash [pnpm]
pnpm add ctrovalidate
```

:::

### 🌐 CDN (Quick Prototyping)

For quick tests or simple static sites, you can import Ctrovalidate directly from a CDN.

```html
<script type="module">
  import { Ctrovalidate } from 'https://cdn.jsdelivr.net/npm/ctrovalidate@3.0.0/dist/ctrovalidate.js';
  // Use Ctrovalidate here
</script>
```
## ⚙️ Setting Up Your Project

Before we dive into the code, ensure your environment is ready for modern development. Ctrovalidate works out-of-the-box with any build tool (Vite, Webpack, etc.) or as a simple `<script>` tag.

### 1. Initialize your environment
If you are starting from scratch, we recommend using **Vite** for the fastest developer experience.

```bash
npm create vite@latest my-form-app -- --template vanilla-ts
cd my-form-app
npm install ctrovalidate
npm run dev
```

---

## 🛠️ Your First Form

Let's build a registration form with email and password validation.

### 1. The Markup (HTML)

Define your form and fields using the `data-ctrovalidate-rules` attribute:

```html
<form id="registration-form" novalidate>
  <div class="form-group">
    <label for="email">Email Address</label>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="user@example.com"
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
      placeholder="Enter password"
      data-ctrovalidate-rules="required|minLength:8"
    />
    <div class="error-message"></div>
  </div>

  <button type="submit">Create Account</button>
</form>
```

### 2. The Logic (JavaScript/TypeScript)

Initialize Ctrovalidate and handle form submission:

```javascript
import { Ctrovalidate } from 'ctrovalidate';

// Select your form
const form = document.querySelector('#registration-form');

// Initialize validator with options
const validator = new Ctrovalidate(form, {
  realTime: true,           // Validate on blur/input
  errorClass: 'is-invalid', // CSS class for invalid fields
  pendingClass: 'is-validating' // CSS class during async validation
});

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validate all fields
  const isValid = await validator.validate();

  if (isValid) {
    const formData = new FormData(form);
    console.log('Form data:', Object.fromEntries(formData));
    
    // Submit to your API
    await fetch('/api/register', {
      method: 'POST',
      body: formData
    });
  }
});
```

## 🔍 What Just Happened?

1. **Field Discovery**: Ctrovalidate scanned the form for all inputs with `data-ctrovalidate-rules`
2. **Event Listeners**: With `realTime: true`, it attached `blur` and `input` event listeners automatically
3. **ARIA Management**: The library linked inputs to error messages using `aria-describedby` and manages `aria-invalid` states
4. **Validation**: On submit, `validate()` checks all rules and returns `true` if the form is valid

## 🚀 Next Steps

Explore more features:

- **[Configuration Options](./configuration.md)** — Learn about all 5 configuration options
- **[Built-in Rules](./rules.md)** — Explore all 21 validation rules
- **[Real-World Examples](./examples.md)** — See practical implementation patterns
- **[API Reference](/api/methods)** — View all 9 public methods
- **[Framework Integrations](../integrations/react.md)** — React, Vue, Svelte, Alpine.js, and more
