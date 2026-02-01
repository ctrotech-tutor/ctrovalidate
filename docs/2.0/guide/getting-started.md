---
title: Getting Started | Install and Setup Ctrovalidate
description: Learn how to install Ctrovalidate via npm, yarn, or CDN and build your first accessible, validated form in minutes.
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
  import { Ctrovalidate } from 'https://cdn.jsdelivr.net/npm/ctrovalidate@2.1.1/dist/ctrovalidate.js';
  // Use Ctrovalidate here
</script>
```

---

## 🛠️ Your First Form

Let's build a professional registration form that uses real-time validation and localized error messages.

### 1. HTML Structure

First, define your HTML. The declarative heart of Ctrovalidate lies in the `data-ctrovalidate-rules` attribute.

```html
<form id="registration-form" novalidate>
  <div class="field-container">
    <label for="email">Email Address</label>
    <input
      type="email"
      id="email"
      name="email"
      data-ctrovalidate-rules="required|email"
    />
    <!-- The error container (auto-detected by Ctrovalidate) -->
    <div class="error-message"></div>
  </div>

  <div class="field-container">
    <label for="password">Password</label>
    <input
      type="password"
      id="password"
      name="password"
      data-ctrovalidate-rules="required|minLength:8|strongPassword"
    />
    <div class="error-message"></div>
  </div>

  <button type="submit">Create Account</button>
</form>
```

> [!TIP]
> Always add the `novalidate` attribute to your form to prevent browser default validation from interfering with Ctrovalidate's superior feedback loops.

### 2. JavaScript Initialization

Now, initialize the library. Ctrovalidate is designed to get out of your way and handle the heavy lifting automatically.

```javascript
import { Ctrovalidate } from 'ctrovalidate';

// Select your form
const form = document.querySelector('#registration-form');

// Initialize Ctrovalidate
const validator = new Ctrovalidate(form, {
  realTime: true, // Validate as the user types
  logLevel: Ctrovalidate.LogLevel.INFO, // Helpful for development
});

// Handle submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // The .validate() method returns a boolean Promise
  const isValid = await validator.validate();

  if (isValid) {
    console.log('Success! Sending data...');
    // e.g. submitToApi(new FormData(form));
  }
});
```

---

## 🔍 What Just Happened?

1.  **Rule Mapping**: Ctrovalidate scanned the form for `data-ctrovalidate-rules`.
2.  **Event Attachment**: Because `realTime` is `true`, it automatically attached `blur` and `input` listeners.
3.  **A11y Wiring**: The library automatically linked the inputs to their error messages using `aria-describedby` and manages `aria-invalid` states dynamically.
4.  **Async Support**: If any rules were asynchronous, Ctrovalidate would have automatically handled the pending states and debounced the checks.

## 🚀 Next Steps

Now that you're up and running, explore the depths of Ctrovalidate:

- **[Configuration Options](./configuration.md)** — Customize classes, logging, and events.
- **[Built-in Rules](./rules.md)** — See all 20+ rules available out of the box.
- **[Industrial Examples](./examples.md)** — Explore our high-standards monochrome demo suite.
- **[Framework Integrations](../integrations/tailwindcss.md)** — React, Vue, Svelte, Alpine, and more.
