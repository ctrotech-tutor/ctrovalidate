# Ctrovalidate

**Modern, declarative, and accessible form validation for the industrial web.**

<p align="center">
  <a href="https://github.com/ctrotech-tutor/ctrovalidate/actions"><img src="https://github.com/ctrotech-tutor/ctrovalidate/actions/workflows/ci.yml/badge.svg" alt="CI Status"></a>
  <a href="https://www.npmjs.com/package/ctrovalidate"><img src="https://img.shields.io/npm/v/ctrovalidate.svg" alt="NPM"></a>
  <a href="https://bundlephobia.com/package/ctrovalidate"><img src="https://img.shields.io/bundlephobia/minzip/ctrovalidate.svg" alt="Size"></a>
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-black.svg" alt="Conventional Commits"></a>
</p>

---

[Documentation](https://ctrotech-tutor.github.io/ctrovalidate/) | [Framework Demos](./examples/) | [API Reference](https://ctrotech-tutor.github.io/ctrovalidate/api/methods) | [Contributing](./CONTRIBUTING.md)

---

## 🚀 Overview

**Ctrovalidate** is a zero-dependency, vanilla JavaScript library that bridges the gap between raw DOM power and framework-ready APIs. It embraces a **declarative, HTML-first approach**, allowing you to define validation rules directly in your markup using `data` attributes, powered by an industrial-grade monochrome design philosophy.

## ✨ Why Ctrovalidate?

- **HTML-First logic**: Keep validation rules where your data lives.
- **A11y-by-default**: Native ARIA management for screen-reader excellence.
- **Industrial Standards**: Built-in support for async checks, conditional logic, and deep field dependencies.
- **Micro-Weight**: <5KB gzipped. Zero dependencies. No bloat.
- **Monochrome Aesthetic**: Designed for high-contrast, professional-grade UIs.

## 📦 Multi-Framework Ecosystem

Ctrovalidate is tool-agnostic. We provide first-class integration patterns and industrial demos for:

| Framework       | Demo                                                                     | Status    |
| :-------------- | :----------------------------------------------------------------------- | :-------- |
| **React 18+**   | [`demo-react`](./examples/demo-react)                                    | ✅ Stable |
| **Next.js 15+** | [`demo-nextjs`](./examples/demo-nextjs)                                  | ✅ Stable |
| **Vue 3**       | [`demo-vue`](./examples/demo-vue)                                        | ✅ Stable |
| **Alpine.js**   | [`demo-alpine`](./examples/demo-alpine)                                  | ✅ Stable |
| **Vanilla JS**  | [`demo-vanilla-js`](./examples/demo-vanilla-js)                          | ✅ Stable |
| **HTMX**        | [Guide](https://ctrotech-tutor.github.io/ctrovalidate/integrations/htmx) | ✅ Active |

## 🛠️ Quick Start (Industrial Pattern)

### 1. The Markup

```html
<div class="showcase-container">
  <form id="registrationForm" novalidate className="validation-form">
    <div class="form-group">
      <label for="email">Email Address</label>
      <input
        type="email"
        name="email"
        data-ctrovalidate-rules="required|email"
        placeholder="john@example.com"
      />
      <div class="error-message"></div>
    </div>
    <button type="submit" class="submit-btn">Verify Integration</button>
  </form>
</div>
```

### 2. The Implementation

```javascript
import { Ctrovalidate } from 'ctrovalidate';

// Initialize with industrial defaults
const validator = new Ctrovalidate(
  document.querySelector('#registrationForm'),
  { realTime: true, pendingClass: 'is-validating' }
);

// Unified validation handler
const isValid = await validator.validate();
```

## 🧪 Development

```bash
npm install     # Install suite
npm test        # Run verification (Vitest)
npm run build   # Generate industrial bundles
```

---

<p align="center">
  Built with ❤️ for the industrial web by <a href="https://github.com/ctrotech-tutor">Ctrotech</a>
</p>
