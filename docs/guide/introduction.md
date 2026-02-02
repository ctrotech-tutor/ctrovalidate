---
title: Introduction | Ctrovalidate Form Validation
description: Ctrovalidate is a lightweight, zero-dependency JavaScript library for declarative form validation with full TypeScript support and ARIA compliance.
---

# Introduction

Ctrovalidate is a lightweight, zero-dependency JavaScript library for client-side form validation. It uses a **declarative, HTML-first approach** where validation rules are defined directly in your markup using `data` attributes.

## What is Ctrovalidate?

Ctrovalidate provides form validation through HTML attributes rather than JavaScript configuration. This keeps validation logic close to your form fields and makes it easier to maintain.

**Key Features:**

- **HTML-First API**: Define validation rules using `data-ctrovalidate-rules` attributes
- **Zero Dependencies**: <5KB gzipped bundle size
- **TypeScript Native**: Full TypeScript support with comprehensive type definitions
- **ARIA-Compliant**: Automatic management of `aria-invalid` and `aria-describedby` attributes
- **Framework Agnostic**: Works with vanilla JavaScript, React, Vue, Svelte, Alpine.js, and more
- **21 Built-in Rules**: Common, format, and numeric validation rules included
- **Async Validation**: Support for Promise-based validation with abort controllers
- **Field Dependencies**: Conditional validation based on other field states
- **98% Test Coverage**: Production-ready reliability

## The Declarative Approach

Instead of writing imperative validation logic in JavaScript, you declare what should be valid directly in your HTML:

```html
<!-- Define validation rules in HTML -->
<input
  type="email"
  name="subscriber_email"
  data-ctrovalidate-rules="required|email"
  data-ctrovalidate-if="wants_newsletter:checked"
/>
```

In this example, the email field is validated only when the `wants_newsletter` checkbox is checked. Ctrovalidate handles:
- Validation logic execution
- Error message display
- ARIA attribute management
- Real-time validation (optional)

## How It Works

1. **Define rules in HTML** using `data-ctrovalidate-rules` attributes
2. **Initialize the validator** in JavaScript with your form element
3. **Validate programmatically** or let real-time validation handle it automatically

```javascript
import { Ctrovalidate } from 'ctrovalidate';

const validator = new Ctrovalidate(
  document.querySelector('#myForm'),
  { realTime: true }
);

// Validate on submit
const isValid = await validator.validate();
```

## Use Cases

Ctrovalidate is designed for:

- **Registration forms** - Email, password, and field matching validation
- **Contact forms** - Required fields, email, and phone validation
- **Checkout forms** - Credit card, address, and conditional validation
- **Profile updates** - Dynamic field validation with dependencies
- **Multi-step forms** - Programmatic validation control per step

## Next Steps

- [**Getting Started**](./getting-started.md) - Install and set up your first form
- [**Configuration**](./configuration.md) - Learn about available options
- [**Built-in Rules**](./rules.md) - Explore all 21 validation rules
- [**API Reference**](/api/methods) - View all 9 public methods
