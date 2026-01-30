# Ctrovalidate

**The lightweight, declarative, and accessible form validation library for modern web applications.**

<p align="center">
  <a href="https://github.com/ctrotech-tutor/ctrovalidate/actions"><img src="https://github.com/ctrotech-tutor/ctrovalidate/actions/workflows/ci.yml/badge.svg" alt="Ctrovalidate CI"></a>
  <a href="https://www.npmjs.com/package/ctrovalidate"><img src="https://img.shields.io/npm/v/ctrovalidate.svg" alt="NPM Version"></a>
  <a href="https://bundlephobia.com/package/ctrovalidate"><img src="https://img.shields.io/bundlephobia/minzip/ctrovalidate.svg" alt="Bundle Size"></a>
  <a href="https://github.com/ctrotech-tutor/ctrovalidate/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/ctrovalidate.svg" alt="License"></a>
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="Conventional Commits"></a>
</p>

---

[Documentation](https://ctrotech-tutor.github.io/ctrovalidate/) | [Integrations](https://ctrotech-tutor.github.io/ctrovalidate/integrations/tailwindcss) | [API Reference](https://ctrotech-tutor.github.io/ctrovalidate/api/methods) | [Contributing](./CONTRIBUTING.md)

---

## 🚀 Overview

**Ctrovalidate** is a zero-dependency, vanilla JavaScript library designed to make form validation simple, maintainable, and powerful. It embraces a **declarative, HTML-first approach**, allowing you to define validation rules directly in your DOM using `data` attributes, while still providing a powerful JavaScript API for complex, programmatic control.

Built for **modern production environments**, it supports TypeScript, treeshaking, and accessibility (ARIA) out of the box.

## ✨ Features

- **Declarative Syntax**: Define rules in HTML (`data-ctrovalidate-rules="required|email"`).
- **Accessibility First**: Automatically handles `aria-invalid` and `aria-describedby` for screen readers.
- **Zero Dependencies**: Lightweight (<5kb gzipped) and incredibly fast.
- **Async Validation**: Built-in support for server-side checks (e.g., username availability).
- **Conditional Validation**: Rules that trigger based on other field states (`data-ctrovalidate-if`).
- **Framework Agnostic**: Minimalist core works perfectly with React, Vue, Svelte, Alpine.js, and more.
- **Type Safe**: First-class TypeScript support with comprehensive definitions.

## 📦 Installation

```bash
npm install ctrovalidate
# or
yarn add ctrovalidate
# or
pnpm add ctrovalidate
```

## 🛠️ Quick Start

### 1. Define your rules in HTML

Add `data-ctrovalidate-rules` to your inputs. The library will automatically detect them.

```html
<form id="registrationForm" novalidate>
  <div class="form-group">
    <label for="email">Email Address</label>
    <input type="email" name="email" data-ctrovalidate-rules="required|email" />
    <!-- Error container (auto-detected) -->
    <div class="error-message"></div>
  </div>

  <button type="submit">Register</button>
</form>
```

### 2. Initialize in JavaScript

```javascript
import { Ctrovalidate } from 'ctrovalidate';

const form = document.querySelector('#registrationForm');
const validator = new Ctrovalidate(form);

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const isValid = await validator.validate();
  if (isValid) {
    console.log('Form is valid!');
  }
});
```

## 📚 Documentation

For full documentation, guides, and API reference, visit:
[**https://ctrotech-tutor.github.io/ctrovalidate/**](https://ctrotech-tutor.github.io/ctrovalidate/)

## 🧪 Development & Testing

We adhere to strict industry standards for library development.

```bash
# Register dependencies
npm install

# Run test suite
npm test

# Generate production builds
npm run build
```

## 🤝 Contributing & Community

Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

- [Contributing Guide](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Security Policy](./SECURITY.md)

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/ctrotech-tutor">Ctrotech</a>
</p>
