---
title: Introduction | Ctrovalidate Form Validation
description: Ctrovalidate is a lightweight, zero-dependency JavaScript library for declarative form validation with full TypeScript support and ARIA compliance.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Guide
    url: https://ctrovalidate.vercel.app/v4/guide/introduction
  - name: Introduction
    url: https://ctrovalidate.vercel.app/v4/guide/introduction
---

# Introduction

Ctrovalidate is a lightweight, zero-dependency validation ecosystem for the web. It uses a **declarative, HTML-first approach** where validation logic is defined directly in your markup using `data` attributes.

## What is Ctrovalidate?

Ctrovalidate provides validation through HTML attributes instead of complex JavaScript configuration. This keeps logic close to your form fields and simplifies maintenance across projects.

**Key Technical Details:**

- **Monorepo Architecture**: Segregated packages for `@ctrovalidate/core`, `@ctrovalidate/browser`, and framework adapters.
- **HTML-First API**: Define rules using `data-ctrovalidate-rules` attributes directly on inputs.
- **Zero Runtime Deps**: Small bundle size with no external dependencies.
- **TypeScript Native**: Strict type definitions provided out of the out of the box.
- **Automated A11Y**: Manages `aria-invalid` and `aria-describedby` for full accessibility compliance.
- **22 Built-in Rules**: Comprehensive catalog of essential, string, numeric, and format validation.
- **Recursive Aliases**: Reusable rule macros with cycle-protection for DRY validation.
- **Async Engine**: Native Promise-based validation with integrated AbortController.
- **Dependency Engine**: Conditional validation via `data-ctrovalidate-if`.
- **100% Logic Coverage**: Verified reliability across the core validation engine.

## The Declarative Approach

Instead of writing imperative logic, you declare validation parameters directly in your HTML:

```html
<!-- Define validation rules in HTML -->
<input
  type="email"
  name="subscriber_email"
  data-ctrovalidate-rules="required|email"
  data-ctrovalidate-if="wants_newsletter:checked"
/>
```

In this example, the email field is validated only when the `wants_newsletter` field is checked. Ctrovalidate manages:

- Logic execution
- Error state management
- ARIA attribute updates
- Real-time validation cycles

## Implementation Flow

1. **Define rules** in HTML via `data-ctrovalidate-rules`.
2. **Initialize the controller** in JavaScript with the target form.
3. **Handle validation** programmatically or via automated real-time triggers.

```javascript
import { Ctrovalidate } from '@ctrovalidate/browser';

const validator = new Ctrovalidate(
  document.querySelector('#myForm'),
  { realTime: true }
);

// Programmatic validation
const isValid = await validator.validate();
```

## Next Steps

- [**Getting Started**](./getting-started.md) - Installation and basic setup.
- [**Core Logic**](./core.md) - Understanding the `@ctrovalidate/core` engine.
- [**Browser Adapter**](./browser.md) - DOM-specific validation features.
- [**Built-in Rules**](./rules.md) - Full catalog of all 22 validation rules.
- [**API Reference**](/v4/api/browser) - Instance and static method documentation.
