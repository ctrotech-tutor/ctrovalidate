# Ctrovalidate.js

<p align="center">
  <!-- GitHub Actions CI Badge -->
  <a href="https://github.com/ctrotech-tutor/ctrovalidate/actions/workflows/main.yml"><img src="https://github.com/ctrotech-tutor/ctrovalidate/actions/workflows/main.yml/badge.svg" alt="Ctrovalidate CI"></a>
  <!-- NPM Version Badge -->
  <a href="https://www.npmjs.com/package/ctrovalidate"><img src="https://img.shields.io/npm/v/ctrovalidate.svg" alt="NPM Version"></a>
  <!-- Bundle Size Badge -->
  <a href="https://bundlephobia.com/package/ctrovalidate"><img src="https://img.shields.io/bundlephobia/minzip/ctrovalidate.svg" alt="Bundle Size"></a>
  <!-- License Badge -->
  <a href="https://github.com/ctrotech-tutor/ctrovalidate/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/ctrovalidate.svg" alt="License"></a>
</p>

**Ctrovalidate.js** is a lightweight, powerful, and zero-dependency JavaScript library for client-side form validation. It's built with a declarative, HTML-first approach, making it incredibly fast and easy to add robust, real-time validation to any vanilla JavaScript project.

---

## Table of Contents

- [Why Ctrovalidate.js?](#why-ctrovalidatejs)
- [Live Demo](#live-demo)
- [Features](#features)
- [Browser Support](#browser-support)
- [Installation & Usage](#installation--usage)
  - [1. Via NPM](#1-via-npm)
  - [2. Via CDN](#2-via-cdn)
  - [3. Initialize in JavaScript](#3-initialize-in-javascript)
- [Advanced Usage](#advanced-usage)
  - [Asynchronous Validation](#asynchronous-validation)
  - [Conditional Validation](#conditional-validation)
  - [Customization Options](#customization-options)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Why Ctrovalidate.js?

In a world of heavy frameworks, sometimes you just need a simple, powerful tool that works without the overhead. Ctrovalidate.js is designed to be that tool.

-   **Declarative & HTML-First:** Define complex validation rules directly in your HTML using `data-` attributes.
-   **Zero Dependencies:** Written in pure, modern JavaScript. It's incredibly lightweight.
-   **Feature-Rich:** Supports synchronous, asynchronous, and conditional validation out of the box.
-   **Extensible:** Easily add your own custom validation rules with a simple, clean API.
-   **Graceful UX:** Provides real-time feedback *after* a user has interacted with a field.

---

## Live Demo

Seeing is believing. Check out a live, interactive demo of all features on CodeSandbox:

**[➡️ Open Live Demo on CodeSandbox](https://codesandbox.io/p/sandbox/ctrovalidate-demo-d6v2tr)** 

---

## Features

-   **20+ Built-in Rules:** Includes `required`, `email`, `minLength`, `sameAs`, and more.
-   **Asynchronous Validation:** Perfect for server-side checks like username availability.
-   **Conditional Validation:** Dynamically require fields based on the state of other fields.
-   **Customizable:** Easily configure CSS classes to match your project's styling.
-   **Developer-Friendly Debugging:** Optional logging to see the validation process.

---

## Browser Support

Ctrovalidate.js is built with modern JavaScript (`ES2020`) and is designed to work in all evergreen browsers. It does not support Internet Explorer.

| Chrome | Firefox | Safari | Edge |
| :----: | :-----: | :----: | :--: |
|  80+   |   78+   |  14+   | 80+  |

---

## Installation & Usage

### 1. Via NPM

For projects with a build step (like Vite or Webpack), install the package from npm:
```bash
npm install ctrovalidate
```
Then import it into your project:
```javascript
import { Ctrovalidate, LogLevel } from 'ctrovalidate';
```

### 2. Via CDN

For quick demos or projects without a build step, you can use the UMD build directly from a CDN like jsDelivr.

```html
<!-- Add this script tag to your HTML file -->
<script defer src="https://cdn.jsdelivr.net/npm/ctrovalidate@latest/dist/ctrovalidate.umd.cjs"></script>
```
This will make the library available globally under the `window.Ctrovalidate` object.

### 3. Initialize in JavaScript

The initialization process is the same regardless of how you install it.

```html
<!-- 1. Structure your HTML -->
<form id="my-form" novalidate>
  <div class="form-group">
    <label for="username">Username</label>
    <input type="text" id="username" name="username" data-validus-rules="required|minLength:3">
    <div class="error-message"></div>
  </div>
  <button type="submit">Submit</button>
</form>

<!-- 2. Initialize the library -->
<script>
  // If using CDN, the Ctrovalidate object is attached to the window
  const { Ctrovalidate, LogLevel } = window.Ctrovalidate;

  const form = document.getElementById('my-form');
  const validator = new Ctrovalidate(form);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const isFormValid = await validator.validate();
    if (isFormValid) {
      alert('Form is valid!');
    }
  });
</script>
```

---

## Advanced Usage
*(See the [Live Demo](#live-demo) for full examples.)*

- **Asynchronous Validation:** Use `Ctrovalidate.addAsyncRule(...)` to define rules that return a `Promise`.
- **Conditional Validation:** Use the `data-validus-if="fieldName:checked"` attribute to make rules dynamic.

---

## Roadmap

-   [ ] More built-in validation rules (e.g., file types, image dimensions).
-   [ ] Full suite of unit and end-to-end tests.
-   [ ] Official integration guides for popular UI libraries.

---

## Contributing

Contributions are welcome! Please read our **[Contributing Guidelines](CONTRIBUTING.md)** to learn how you can help.

---

## License

This project is licensed under the **[MIT License](LICENSE)**.