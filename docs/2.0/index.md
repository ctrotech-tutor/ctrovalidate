---
title: Ctrovalidate | Modern, Accessible JavaScript Form Validation
description: A lightweight, zero-dependency JavaScript library for client-side form validation with a declarative, HTML-first approach and full ARIA support.
layout: home

hero:
  name: 'Ctrovalidate'
  text: 'Modern Form Validation for the Web.'
  tagline: Lightweight, accessible-by-default, and zero-dependency. Define rules in HTML, handle the rest in JS.
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
    title: Native Accessibility
    details: Automatically manages `aria-invalid` and `aria-describedby` states, ensuring your forms are usable by everyone.
  - icon: 🚀
    title: Tiny & Fast
    details: Under 5KB gzipped with zero dependencies. Performance you can feel, without the bloat.
  - icon: 🧩
    title: Fully Extensible
    details: Build custom sync or async rules with a simple, powerful API. Perfect for unique business logic.
  - icon: 🔄
    title: Modern Frameworks
    details: Seamlessly integrates with React, Vue, Svelte, and Alpine.js with hydration-safe patterns.
  - icon: 🛡️
    title: Production Ready
    details: Built-in support for conditional validation, field dependencies, and real-time feedback loops.
---

<div class="code-preview-section">

## Declarative. Reliable. Accessible.

Validation shouldn't be a chore. Ctrovalidate allows you to describe **what** you want, leaving the **how** to us.

```html
<!-- Define rules directly in HTML -->
<input 
  type="email" 
  name="user_email"
  data-ctrovalidate-rules="required|email"
  data-ctrovalidate-on="input" 
/>

<!-- Errors are handled automatically -->
<div class="error-container"></div>
```

```javascript
import { Ctrovalidate } from 'ctrovalidate';

// One line to initialize
const validator = new Ctrovalidate(document.querySelector('form'));

// Promise-based validation
const isValid = await validator.validate();
```

</div>

<div class="integrations-grid">

## Works with your favorite tools

Ctrovalidate is tool-agnostic and designed to fit perfectly into your existing stack.

| **Frameworks** | **Styles** | **Tools** |
| :--- | :--- | :--- |
| Next.js / React | Tailwind CSS | Vite / Webpack |
| Nuxt / Vue.js | CSS Modules | TypeScript |
| SvelteKit / Svelte | Vanilla CSS | JSDoc |
| Alpine.js / HTMX | Bootstrap | Rollup / Esbuild |

</div>

<div class="cta-bottom">

## Ready to build better forms?

Join developers building accessible and performant web applications with Ctrovalidate.

[**Get Started in 5 Minutes**](/guide/getting-started) · [**Browse API Reference**](/api/methods)

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
.integrations-grid {
  margin: 80px 0;
  padding: 40px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
}
.integrations-grid h2 {
  text-align: center;
  margin-bottom: 32px;
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
  margin-bottom: 20px;
}
</style>
