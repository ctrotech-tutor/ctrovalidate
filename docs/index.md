---
title: Ctrovalidate | Lightweight JavaScript Form Validation
description: A lightweight, zero-dependency JavaScript library for client-side form validation with a declarative, HTML-first approach and full ARIA support.
layout: home

hero:
  name: 'Ctrovalidate'
  text: 'Declarative Form Validation'
  tagline: Lightweight, accessible, and zero-dependency. TypeScript-native with 98% test coverage. Define rules in HTML, handle the rest in JS.
  image:
    src: /logo.svg
    alt: Ctrovalidate Logo
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/ctrotech-tutor/ctrovalidate

features:
  - icon: 🎛️
    title: HTML-First API
    details: Use `data-ctrovalidate-rules` to define validation directly on your inputs. Keep logic clean and readable.
  - icon: ♿
    title: ARIA-Compliant
    details: Automatically manages `aria-invalid` and `aria-describedby` states for screen reader compatibility.
  - icon: 📦
    title: <5KB Gzipped
    details: Zero dependencies. Lightweight bundle that won't bloat your application.
  - icon: 🔧
    title: 21 Built-in Rules
    details: Common, format, and numeric validation rules out of the box. Extensible with custom sync or async rules.
  - icon: ⚡
    title: TypeScript Native
    details: Full TypeScript support with comprehensive type definitions. 98% test coverage for reliability.
  - icon: 🌐
    title: Framework Agnostic
    details: Works with React, Vue, Svelte, Alpine.js, and vanilla JavaScript. Includes conditional validation and field dependencies.
---

<div class="code-preview-section">

## Declarative. Reliable. Accessible

Define validation rules in HTML attributes. Ctrovalidate handles the validation logic, error display, and accessibility.

```html
<!-- Define rules directly in HTML -->
<div class="form-group">
  <input 
    type="email" 
    name="user_email"
    data-ctrovalidate-rules="required|email"
  />
  <div class="error-message"></div>
</div>
```

```javascript
import { Ctrovalidate } from 'ctrovalidate';

// Initialize with configuration options
const validator = new Ctrovalidate(
  document.querySelector('form'), 
  { realTime: true }
);

// Validate programmatically
const isValid = await validator.validate();
```

</div>

<div class="stats-section">

## v3.0.0 Highlights

<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-number">21</div>
    <div class="stat-label">Built-in Rules</div>
    <div class="stat-desc">Common, format, and numeric validation</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">9</div>
    <div class="stat-label">API Methods</div>
    <div class="stat-desc">Complete programmatic control</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">&lt;5KB</div>
    <div class="stat-label">Bundle Size</div>
    <div class="stat-desc">Gzipped, zero dependencies</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">98%</div>
    <div class="stat-label">Test Coverage</div>
    <div class="stat-desc">Production-ready reliability</div>
  </div>
</div>

</div>

<div class="integrations-grid">

## Framework Integration

Ctrovalidate works with any JavaScript framework or vanilla JS.

| Framework | Status | Demo | Documentation |
| :--- | :---: | :---: | :---: |
| **Vanilla JS** | ✅ | [View Demo](https://github.com/ctrotech-tutor/ctrovalidate/tree/main/examples/demo-vanilla-js) | [Guide](/guide/getting-started) |
| **React 18+** | ✅ | [View Demo](https://github.com/ctrotech-tutor/ctrovalidate/tree/main/examples/demo-react) | [Integration](/integrations/react) |
| **Next.js 15+** | ✅ | [View Demo](https://github.com/ctrotech-tutor/ctrovalidate/tree/main/examples/demo-nextjs) | [Integration](/integrations/nextjs) |
| **Vue 3** | ✅ | [View Demo](https://github.com/ctrotech-tutor/ctrovalidate/tree/main/examples/demo-vue) | [Integration](/integrations/vue) |
| **Alpine.js** | ✅ | [View Demo](https://github.com/ctrotech-tutor/ctrovalidate/tree/main/examples/demo-alpine) | [Integration](/integrations/alpinejs) |
| **Svelte** | ✅ | - | [Integration](/integrations/svelte) |
| **HTMX** | ✅ | - | [Best Practices](/integrations/htmx) |

**Styling**: Works with Tailwind CSS, CSS Modules, Vanilla CSS, Bootstrap, or any CSS framework.

</div>

<div class="cta-bottom">

## Get Started

Install via npm and start validating forms in minutes.

```bash
npm install ctrovalidate
```

[**Read the Documentation**](/guide/getting-started) · [**View API Reference**](/api/methods) · [**See Examples**](/guide/examples)

</div>

<style>
.code-preview-section {
  margin: 64px 0;
  text-align: center;
}
.code-preview-section h2 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 24px;
}

.stats-section {
  margin: 80px 0;
  text-align: center;
}
.stats-section h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 48px;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
  max-width: 1000px;
  margin: 0 auto;
}
.stat-card {
  padding: 32px 24px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}
.stat-number {
  font-size: 3rem;
  font-weight: 800;
  color: var(--vp-c-brand-1);
  margin-bottom: 8px;
}
.stat-label {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
}
.stat-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.integrations-grid {
  margin: 80px 0;
  padding: 40px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
}
.integrations-grid h2 {
  text-align: center;
  margin-bottom: 32px;
  font-size: 2rem;
  font-weight: 700;
}
.integrations-grid table {
  margin: 32px auto 24px;
}
.integrations-grid p {
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  margin-top: 24px;
}

.cta-bottom {
  margin: 100px 0 60px;
  text-align: center;
  padding: 60px 20px;
  border-top: 1px solid var(--vp-c-divider);
}
.cta-bottom h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 32px;
}
.cta-bottom pre {
  max-width: 400px;
  margin: 24px auto;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .stat-number {
    font-size: 2.5rem;
  }
}
</style>
