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

Let's build a professional registration form. This example covers everything from HTML attributes to handling asynchronous success.

### 1. The Markup (HTML)

Define your form and fields. The declarative power of Ctrovalidate lies in the `data-ctrovalidate-rules` attribute.

```html
<div class="showcase-container">
  <form id="registration-form" novalidate className="validation-form">
    <div class="form-group">
      <label for="email">Email Address</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="e.g. alex@industrial.com"
        data-ctrovalidate-rules="required|email"
      />
      <div class="error-message"></div>
    </div>

    <div class="form-group">
      <label for="password">Security Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="••••••••"
        data-ctrovalidate-rules="required|minLength:8|strongPassword"
      />
      <div class="error-message"></div>
    </div>

    <button type="submit" class="submit-btn">Verify Account</button>
  </form>
</div>
```

### 2. The Logic (JavaScript/TypeScript)

Initialize the library and protect your submission logic.

```javascript
import { Ctrovalidate } from 'ctrovalidate';

// Select your form
const form = document.querySelector('#registration-form');

// Initialize with industrial defaults
const validator = new Ctrovalidate(form, {
  realTime: true,
  logLevel: Ctrovalidate.LogLevel.INFO,
  pendingClass: 'is-validating'
});

// Handle submission securely
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // The .validate() method returns a boolean Promise
  const isValid = await validator.validate();

  if (isValid) {
    const data = new FormData(form);
    console.log('Form verified. Data ready for payload:', Object.fromEntries(data));
    
    // Simulate API call
    alert('Security check passed. Welcome aboard.');
  }
});
```

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
