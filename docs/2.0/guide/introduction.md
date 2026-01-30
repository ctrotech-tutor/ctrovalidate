---
title: Introduction | Why Ctrovalidate?
description: Learn about Ctrovalidate, the declarative, accessible, and zero-dependency form validation library for modern web applications.
---

# Introduction

Ctrovalidate is a lightweight, zero-dependency JavaScript library designed to make form validation **declarative, maintainable, and accessible**.

## Why Ctrovalidate?

Modern web development often complicates form validation by forcing logic into complex JavaScript structures. Ctrovalidate returns to the roots of the web, allowing you to define your validation rules right where your data lives: **in the HTML**.

### Key Advantages

- **🚀 Zero Dependencies**: At less than 5kb gzipped, it adds virtually no overhead to your bundle.
- **🛠️ HTML-First**: Define rules using standard `data` attributes. Easy to read, easy to change.
- **🏗️ Industrial Strength**: Built-in support for async validation, complex field dependencies, and custom rule registration.
- **♿ First-Class Accessibility**: Automatically manages ARIA attributes (`aria-invalid`, `aria-describedby`) to ensure your forms are usable by everyone.
- **🧩 Framework Agnostic**: Works perfectly with Vanilla JS, and provides seamless patterns for React, Vue, Svelte, and Alpine.js.

## The Declarative Approach

Traditional validation requires writing imperative code to check values. With Ctrovalidate, you express _what_ should be valid, and the library handles the _how_.

```html
<!-- Simple, readable, and powerful -->
<input
  type="email"
  name="subscriber_email"
  data-ctrovalidate-rules="required|email"
  data-ctrovalidate-if="wants_newsletter:checked"
/>
```

In the example above, the field is only validated as a required email if the `wants_newsletter` checkbox is checked. Zero lines of custom logic required.

## Next Steps

Ready to build better forms?

- [Getting Started](./getting-started.md)
- [Core Concepts](./configuration.md)
- [Built-in Rules](./rules.md)
