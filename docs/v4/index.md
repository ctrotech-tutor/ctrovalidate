---
title: Ctrovalidate | Platform-Agnostic Validation Ecosystem
description: A high-performance, modular JavaScript validation suite. HTML-first declarative logic with universal core execution and framework-native headless adapters.
layout: home

hero:
  name: 'Ctrovalidate'
  text: 'The Modular Validation Suite'
  tagline: Isomorphic core logic. Platform-native controllers. Framework-headless hooks. Zero-dependency architecture with 100% logic coverage in v4.
  image:
    src: /logo.svg
    alt: Ctrovalidate Logo
  actions:
    - theme: brand
      text: Implementation Guide
      link: /v4/guide/introduction
    - theme: alt
      text: Migration Blueprint
      link: /v4/guide/migration
    - theme: alt
      text: GitHub Source
      link: https://github.com/ctrotech-tutor/ctrovalidate

features:
  - icon: 🎯
    title: Universal Logic Engine
    details: Execute the same validation logic on Node.js, Edge, and Browser. Powered by @ctrovalidate/core.
  - icon: 🧩
    title: Headless Adapters
    details: Native hooks and actions for React, Vue, and Svelte that share the same high-performance core.
  - icon: 🛠️
    title: Hybrid Schemas
    details: Define logic in HTML with `data-rules` or via TypeScript objects for complex, multi-field business logic.
  - icon: 💬
    title: Strategic Overrides
    details: Precise control over feedback via field-level catch-alls and rule-specific overrides directly in the DOM.
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
      data-ctrovalidate-minLength-message="Must be at least 8 characters"
    />
    <div class="error-container"></div>
  </div>
</form>
```

```javascript
import { Ctrovalidate } from '@ctrovalidate/browser';

// Initialize the controller
const validator = new Ctrovalidate(
  document.getElementById('auth-form'), 
  { realTime: true }
);

// Programmatic trigger
const isValid = await validator.validate();
```

</div>

<div class="stats-section">

## v4.0.1 Technical Specifications

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
    <div class="stat-label">Test Coverage</div>
    <div class="stat-desc">Strict logic verification</div>
  </div>
</div>

</div>

<div class="integrations-grid">

## Ecosystem Support

The ecosystem provides specialized adapters for every modern development workflow.

| Package | Purpose | Documentation |
| :--- | :--- | :--- |
| **@ctrovalidate/core** | Universal validation engine (Isomorphic) | [API Ref](/v4/api/core) |
| **@ctrovalidate/browser** | DOM-based controller (Post-v3 evolution) | [API Ref](/v4/api/browser) |
| **@ctrovalidate/react** | Headless Hooks for React 18+ | [Reference](/v4/api/react) |
| **@ctrovalidate/vue** | Composition API for Vue 3 | [Reference](/v4/api/vue) |
| **@ctrovalidate/svelte** | Reactive Stores for Svelte | [Reference](/v4/api/svelte) |
| **@ctrovalidate/next** | Server Action & FormData utilities | [Reference](/v4/platform/nextjs) |

</div>

<div class="cta-bottom">

## Next Steps

Restoring the standard of documentation you expect. Technical, reliable, and precise.

```bash
npm install @ctrovalidate/browser
```

[**Implementation Guides**](/v4/guide/introduction) · [**API Reference**](/v4/api/core) · [**Migration Blueprint**](/v4/guide/migration)

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
