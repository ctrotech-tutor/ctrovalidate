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

- **Declarative & HTML-First:** Define complex validation rules directly in your HTML using `data-` attributes.
- **Zero Dependencies:** Written in pure, modern JavaScript. It's incredibly lightweight.
- **Feature-Rich:** Supports synchronous, asynchronous, and conditional validation out of the box.
- **Extensible:** Easily add your own custom validation rules with a simple, clean API.
- **Graceful UX:** Provides real-time feedback _after_ a user has interacted with a field.

---

## Live Demo

Seeing is believing. Check out a live, interactive demo of all features on CodeSandbox:

**[➡️ Open Live Demo on CodeSandbox](https://codesandbox.io/p/sandbox/ctrovalidate-demo-d6v2tr)**

---

## Features

- **20+ Built-in Rules:** Includes `required`, `email`, `minLength`, `sameAs`, and more.
- **Asynchronous Validation:** Perfect for server-side checks like username availability.
- **Conditional Validation:** Dynamically require fields based on the state of other fields.
- **Customizable:** Easily configure CSS classes to match your project's styling.
- **Developer-Friendly Debugging:** Optional logging to see the validation process.

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

# Ctrovalidate v2.0.0

[![Ctrovalidate CI](https://github.com/ctrotech-tutor/ctrovalidate/actions/workflows/ci.yml/badge.svg)](https://github.com/ctrotech-tutor/ctrovalidate/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/ctrovalidate.svg)](https://badge.fury.io/js/ctrovalidate)

**Ctrovalidate** is a modern, lightweight, and zero-dependency JavaScript library for client-side form validation. It's built with a declarative, HTML-first approach that makes validating forms simple, clean, and powerful.

![Ctrovalidate Logo](docs/public/logo.svg)

## ✨ Key Features

- **Declarative & HTML-First**: Define complex validation rules directly in your HTML.
- **Fully Accessible (ARIA)**: Automatic management of ARIA attributes makes your forms accessible out-of-the-box.
- **Zero-Dependency & Lightweight**: No external libraries, no bloat. Ctrovalidate is tiny and fast.
- **Extensible API**: Easily add your own synchronous or asynchronous validation rules.
- **SPA & Dynamic Content Ready**: Programmatically `addField()` and `removeField()` to work seamlessly with frameworks like Vue, React, and Svelte.
- **TypeScript Ready**: Ships with a comprehensive TypeScript declaration file for a superior developer experience.

## 📖 Documentation

For a complete guide to all features, including configuration, all built-in rules, and advanced usage, please visit our **[full documentation website](https://ctrotech-tutor.github.io/ctrovalidate/)**.

## 🚀 Getting Started

### 1. Installation

Install the package using your favorite package manager:

```bash
npm install ctrovalidate
```

Or include it directly in your HTML file from a CDN:

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/ctrovalidate@2.0.0/dist/ctrovalidate.js"
></script>
```

### 2. HTML Setup

Add `data-ctrovalidate-rules` to the inputs you want to validate. Make sure you have a container with the class `.error-message` for each field.

```html
<form id="my-form" novalidate>
  <div>
    <label for="username">Username</label>
    <input
      type="text"
      id="username"
      name="username"
      data-ctrovalidate-rules="required|minLength:3|alphaDash"
    />
    <div class="error-message"></div>
  </div>

  <div>
    <label for="email">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      data-ctrovalidate-rules="required|email"
    />
    <div class="error-message"></div>
  </div>

  <button type="submit">Register</button>
</form>
```

### 3. JavaScript Initialization

Initialize the library and add a submit handler.

```javascript
import { Ctrovalidate } from 'ctrovalidate';

const form = document.getElementById('my-form');

// Initialize the validator
const validator = new Ctrovalidate(form, {
  realTime: true, // Enable instant feedback
});

// Handle form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const isFormValid = await validator.validate();

  if (isFormValid) {
    alert('Form is valid! Submitting...');
    // form.submit();
  }
});
```

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started.

## License

This project is licensed under the [MIT License](LICENSE).
