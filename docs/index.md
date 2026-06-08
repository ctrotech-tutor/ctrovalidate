---
title: Ctrovalidate | Platform-Agnostic Validation Ecosystem
description: A high-performance, modular JavaScript validation suite. HTML-first declarative logic with universal core execution and framework-native headless adapters.
layout: home

hero:
  name: 'Ctrovalidate'
  text: 'The Modular Validation Suite'
  tagline: Isomorphic core logic. Platform-native controllers. Framework-headless hooks. Zero-dependency architecture with 100% logic coverage.
  image:
    src: /logo.svg
    alt: Ctrovalidate Logo
  actions:
    - theme: brand
      text: Implementation Guide
      link: /guide/introduction
    - theme: alt
      text: GitHub Source
      link: https://github.com/ctrotech-tutor/ctrovalidate

features:
  - icon: 🎯
    title: Universal Logic Engine
    details: Execute the same validation logic on Node.js, Edge, and Browser. Powered by ctrovalidate-core.
  - icon: 🧩
    title: Headless Adapters
    details: Native hooks and actions for React, Vue, and Svelte that share the same high-performance core.
  - icon: 🛠️
    title: Hybrid Schemas
    details: Define logic in HTML with data attributes or via TypeScript objects for complex multi-field business logic.
  - icon: 💬
    title: Strategic Overrides
    details: Precise control over feedback via field-level catch-all messages and rule-specific overrides directly in the DOM.
  - icon: ♿
    title: Automated A11Y
    details: Industrial-grade management of `aria-invalid` and `aria-describedby` based on real-time engine state.
  - icon: ⚡
    title: Async Reliability
    details: Native AbortController integration ensures zero race conditions during high-frequency remote checks.
---

<div class="code-preview-section">

## Declarative Integration. Technical Precision

Define validation rules and custom messages directly in your markup. The browser adapter orchestrates the DOM state while the core engine executes the logic.

```html
<form id="auth-form" novalidate>
  <div class="field-group">
    <input
      type="password"
      name="user_password"
      data-ctrovalidate-rules="required|minLength:8"
      data-ctrovalidate-message="Password required"
      data-ctrovalidate-minlength-message="Must be at least 8 characters"
    />
    <div class="error-container"></div>
  </div>
</form>
```

```javascript
import { Ctrovalidate } from 'ctrovalidate-browser';

const validator = new Ctrovalidate(
  document.getElementById('auth-form'),
  { realTime: true }
);

const isValid = await validator.validate();
```

</div>

<div class="stats-section">

## v1.0.0 Technical Specifications

<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-number">22</div>
    <div class="stat-label">Atomic Rules</div>
    <div class="stat-desc">Universal logic primitives</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">JSON</div>
    <div class="stat-label">Schema Support</div>
    <div class="stat-desc">Object-based configuration</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">< 5KB</div>
    <div class="stat-label">Minified Size</div>
    <div class="stat-desc">Zero runtime dependencies</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">100%</div>
    <div class="stat-label">Logic Coverage</div>
    <div class="stat-desc">Strict logic verification</div>
  </div>
</div>

</div>

<div class="integrations-grid">

## Ecosystem Support

Specialized adapters for every modern development workflow.

| Package | Purpose | Documentation |
| :--- | :--- | :--- |
| **ctrovalidate-core** | Universal validation engine (Isomorphic) | [API Ref](/api/core) |
| **ctrovalidate-browser** | DOM adapter with declarative HTML-first API | [API Ref](/api/browser) |
| **ctrovalidate-react** | Headless hook for React 18+ | [Reference](/api/react) |
| **ctrovalidate-vue** | Composition API for Vue 3 | [Reference](/api/vue) |
| **ctrovalidate-svelte** | Reactive stores for Svelte | [Reference](/api/svelte) |
| **ctrovalidate-next** | Server Action & FormData utilities | [Reference](/platform/nextjs) |

</div>

<div class="cta-bottom">

## Next Steps

```bash
npm install ctrovalidate-browser
```

[**Implementation Guides**](/guide/introduction) · [**API Reference**](/api/core)

</div>

<style>
.code-preview-section {
  margin: 64px 0;
  text-align: center;
}
.code-preview-section h2 {
  font-size: 2.25rem;
  font-weight: 800;
  margin-bottom: 24px;
}

.stats-section {
  margin: 80px 0;
  text-align: center;
}
.stats-section h2 {
  font-size: 1.75rem;
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
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--vp-c-brand-1);
  margin-bottom: 8px;
}
.stat-label {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 4px;
}
.stat-desc {
  font-size: 0.85rem;
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
  font-size: 1.75rem;
  font-weight: 700;
}
.integrations-grid table {
  margin: 32px auto 24px;
  width: 100%;
}

.cta-bottom {
  margin: 100px 0 60px;
  text-align: center;
  padding: 60px 20px;
  border-top: 1px solid var(--vp-c-divider);
}
.cta-bottom h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 24px;
}
.cta-bottom pre {
  max-width: 450px;
  margin: 24px auto;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}
</style>
