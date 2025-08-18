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
  - [1. Get the Code](#1-get-the-code)
  - [2. Structure Your HTML](#2-structure-your-html)
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

-   **Declarative & HTML-First:** Define complex validation rules directly in your HTML using `data-` attributes. No messy JavaScript configuration objects.
-   **Zero Dependencies:** Written in pure, modern JavaScript. It's incredibly lightweight and won't bloat your project.
-   **Feature-Rich:** Supports synchronous, asynchronous (e.g., API calls), and conditional validation right out of the box.
-   **Extensible:** Easily add your own custom validation rules with a simple, clean API.
-   **Graceful UX:** Provides real-time feedback to users *after* they've interacted with a field, preventing premature error messages.

---

## Live Demo

Seeing is believing. Check out a live, interactive demo of all features on CodeSandbox:

**[➡️ Open Live Demo on CodeSandbox](https://codesandbox.io/)** 

---

## Features

-   **20+ Built-in Rules:** Includes common rules like `required`, `email`, `minLength`, `maxLength`, `numeric`, `sameAs`, and more.
-   **Asynchronous Validation:** Perfect for checking if a username is available on your server. Includes race condition prevention via `AbortController`.
-   **Conditional Validation:** Dynamically require fields based on the state of other fields.
-   **Customizable:** Easily configure CSS classes to match your project's styling.
-   **Developer-Friendly Debugging:** Optional logging to see the validation process in real-time.

---

## Browser Support

Ctrovalidate.js is built with modern JavaScript (`ES2020`) and is designed to work in all evergreen browsers. It does not support Internet Explorer.

| Chrome | Firefox | Safari | Edge |
| :----: | :-----: | :----: | :--: |
|  80+   |   78+   |  14+   | 80+  |

---

## Installation & Usage

### 1. Get the Code

You can include Ctrovalidate.js directly in your project. After running the build step, use the files from the `/dist` folder.

```html
<!-- For modern projects that support ES Modules -->
<script type="module" src="path/to/dist/ctrovalidate.js"></script>
```

### 2. Structure Your HTML

Add `data-validus-rules` to your input fields and provide an element to display the error message.

```html
<form id="my-form" novalidate>
  <div class="form-group">
    <label for="username">Username</label>
    <input type="text" id="username" name="username"
           data-validus-rules="required|minLength:3">
    <div class="error-message"></div>
  </div>
  <button type="submit">Submit</button>
</form>
```

### 3. Initialize in JavaScript

Import `Ctrovalidate`, point it to your form, and you're ready to go.

```html
<script type="module">
  import { Ctrovalidate } from './path/to/dist/ctrovalidate.js';
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

*(For full examples, please see the [Live Demo](#live-demo).)*

### Asynchronous Validation

Register an async rule using `addAsyncRule`. The function must return a `Promise` that resolves to `true` or `false`.

```javascript
Ctrovalidate.addAsyncRule('isUsernameTaken', async (value) => {
  const response = await fetch(`/api/check-user?username=${value}`);
  const data = await response.json();
  return !data.isTaken; 
}, 'This username is already in use.');
```

### Conditional Validation

Use the `data-validus-if` attribute to make rules dynamic. The `email` field below is only required if the `subscribe` checkbox is checked.

```html
<input type="checkbox" id="subscribe" name="subscribe">
<input type="email" id="email" name="email"
       data-validus-rules="required|email"
       data-validus-if="subscribe:checked">
```

---

## Roadmap

Ctrovalidate.js is actively developed. Here are some features planned for the future:
-   [ ] More built-in validation rules (e.g., file types, image dimensions).
-   [ ] Official integration guides for popular UI libraries.
-   [ ] A plugin system for more complex extensions.
-   [ ] Full suite of unit and end-to-end tests.

---

## Contributing

Contributions are welcome and highly appreciated! Please read our **[Contributing Guidelines](CONTRIBUTING.md)** to learn how you can help improve the project.

---

## License

This project is licensed under the **[MIT License](LICENSE)**.