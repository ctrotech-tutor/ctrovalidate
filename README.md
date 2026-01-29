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

<div align="center">
  <img src="https://raw.githubusercontent.com/ctrotech-tutor/ctrovalidate/main/public/logo.svg" alt="Ctrovalidate Logo" width="200" height="auto" />

# Ctrovalidate

**The lightweight, declarative, and robust form validation library for modern web applications.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/ctrovalidate.svg)](https://www.npmjs.com/package/ctrovalidate)
[![Build Status](https://github.com/ctrotech-tutor/ctrovalidate/actions/workflows/main.yml/badge.svg)](https://github.com/ctrotech-tutor/ctrovalidate/actions)
[![Standard: Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

[Documentation](https://ctrovalidate.ctrotech.com) | [Examples](https://ctrovalidate.ctrotech.com/examples) | [Contributing](./CONTRIBUTING.md)

</div>

---

## 🚀 Overview

**Ctrovalidate** is a zero-dependency, vanilla JavaScript library designed to make form validation simple, maintainable, and powerful. It embraces a **declarative, HTML-first approach**, allowing you to define validation rules directly in your DOM using `data` attributes, while still providing a powerful JavaScript API for complex, programmatic control.

Built for **modern production environments**, it supports TypeScript (via included definitions), Tree Shaking, and Accessibility (ARIA) out of the box.

## ✨ Features

- **Declarative Syntax**: Define rules in HTML (`data-ctrovalidate-rules="required|email"`).
- **Zero Dependencies**: Lightweight (<5kb gzipped) and fast.
- **Type Safe**: First-class TypeScript support with auto-generated definitions.
- **Robust Rule Set**: 25+ built-in rules (Auth, Numeric, String, Format).
- **Async Validation**: Built-in support for server-side checks (e.g., `usernameAvailable`).
- **Dependency Awareness**: Validations that trigger based on other fields (`sameAs`, `requiredIf`).
- **Accessibility First**: Automatically handles `aria-invalid` and `aria-describedby` for screen readers.
- **Extensible**: Easily register custom sync and async rules.

## 📦 Installation

```bash
npm install ctrovalidate
# or
yarn add ctrovalidate
# or
pnpm add ctrovalidate
```

## 🛠️ Quick Start

### 1. HTML Markup

Add `data-ctrovalidate-rules` to your inputs.

```html
<form id="registrationForm" novalidate>
  <div class="form-group">
    <label for="email">Email Address</label>
    <input
      type="email"
      id="email"
      name="email"
      class="form-control"
      data-ctrovalidate-rules="required|email"
    />
    <!-- Error message container (auto-detected) -->
    <div class="error-message"></div>
  </div>

  <button type="submit">Register</button>
</form>
```

### 2. JavaScript Initialization

```javascript
import { Ctrovalidate } from 'ctrovalidate';

// Initialize the validator
const form = document.getElementById('registrationForm');
const validator = new Ctrovalidate(form);

// Handle specific events (optional, mostly handled automatically)
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const isValid = await validator.validate();
  if (isValid) {
    console.log('Form is valid! Submitting...');
    // form.submit();
  }
});
```

## 📚 Core Concepts

### Rule Syntax

Rules are pipe-separated. Parameters are colon-separated.

- `required`
- `minLength:5`
- `between:10,20`
- `sameAs:password`

```html
<input name="age" data-ctrovalidate-rules="required|integer|between:18,99" />
```

### Conditional Validation

Use `data-ctrovalidate-if` to run rules only when another field meets a condition.

```html
<!-- Only validate 'credit_card' if 'payment_method' is 'credit' -->
<input
  name="credit_card"
  data-ctrovalidate-rules="required|creditCard"
  data-ctrovalidate-if="payment_method:value=credit"
/>
```

## 🧪 Development

We adhere to strict industry standards.

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run build (produces ESM, UMD, and TypeDefs)
npm run build

# Linting
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) and [Code of Conduct](./CODE_OF_CONDUCT.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/ctrotech-tutor">Ctrotech</a></sub>
</div>
