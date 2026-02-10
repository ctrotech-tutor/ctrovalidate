---
title: "@ctrovalidate/browser | DOM Validation Adapter"
description: Complete guide to the browser adapter with declarative HTML-first API, data attributes, and DOM integration.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Guide
    url: https://ctrovalidate.vercel.app/v4/guide/browser
  - name: "@ctrovalidate/browser"
    url: https://ctrovalidate.vercel.app/v4/guide/browser
---

# @ctrovalidate/browser

The `@ctrovalidate/browser` package provides a DOM-specific adapter that wraps `@ctrovalidate/core` with a declarative, HTML-first API using data attributes.

---

## Overview

The browser adapter is designed for vanilla JavaScript applications and provides:

- **Declarative API**: Define validation rules directly in HTML using `data-ctrovalidate-rules`
- **Automatic Discovery**: Scans the DOM for fields with validation attributes
- **Real-time Validation**: Automatic `blur` and `input` event listeners
- **Accessibility**: Automated ARIA attribute management (`aria-invalid`, `aria-describedby`)
- **Conditional Validation**: Field dependencies via `data-ctrovalidate-if`
- **Custom Messages**: Per-field and per-rule message overrides
- **Tailwind-Friendly**: Safe CSS class handling for complex selectors

---

## Installation

```bash
npm install @ctrovalidate/browser
```

The browser package automatically includes `@ctrovalidate/core` as a dependency.

---

## Quick Start

### 1. HTML Markup

Define validation rules using data attributes:

```html
<form id="signup-form" novalidate>
  <div class="form-group">
    <label for="email">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      data-ctrovalidate-rules="required|email"
    />
    <div class="error-message"></div>
  </div>

  <div class="form-group">
    <label for="password">Password</label>
    <input
      type="password"
      id="password"
      name="password"
      data-ctrovalidate-rules="required|minLength:8|strongPassword"
    />
    <div class="error-message"></div>
  </div>

  <button type="submit">Sign Up</button>
</form>
```

### 2. JavaScript Initialization

```javascript
import { Ctrovalidate } from '@ctrovalidate/browser';

const form = document.querySelector('#signup-form');

const validator = new Ctrovalidate(form, {
  realTime: true,
  errorClass: 'is-invalid',
  errorMessageClass: 'error-message',
  pendingClass: 'is-validating'
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const isValid = await validator.validate();
  
  if (isValid) {
    const formData = new FormData(form);
    console.log('Valid submission:', Object.fromEntries(formData));
    // Submit to server
  }
});
```

---

## Data Attributes API

### `data-ctrovalidate-rules`

Defines validation rules for a field using pipe-separated syntax:

```html
<input
  name="username"
  data-ctrovalidate-rules="required|minLength:3|maxLength:20|alphaNum"
/>
```

### `data-ctrovalidate-if`

Conditional validation based on another field's state:

```html
<select name="contact_method">
  <option value="email">Email</option>
  <option value="phone">Phone</option>
</select>

<input
  name="email"
  data-ctrovalidate-rules="required|email"
  data-ctrovalidate-if="contact_method:value:email"
/>

<input
  name="phone"
  data-ctrovalidate-rules="required|phone"
  data-ctrovalidate-if="contact_method:value:phone"
/>
```

**Syntax:** `fieldName:property:expectedValue`

- `fieldName`: Name of the controller field
- `property`: `value` or `checked`
- `expectedValue`: Value to match

### `data-ctrovalidate-message`

Custom error message for the entire field (fallback):

```html
<input
  name="email"
  data-ctrovalidate-rules="required|email"
  data-ctrovalidate-message="Please provide a valid email address."
/>
```

### `data-ctrovalidate-{rule}-message`

Custom message for a specific rule:

```html
<input
  name="password"
  data-ctrovalidate-rules="required|minLength:8"
  data-ctrovalidate-required-message="Password is required."
  data-ctrovalidate-minLength-message="Password must be at least 8 characters."
/>
```

---

## Configuration Options

The `Ctrovalidate` constructor accepts an optional configuration object:

```typescript
interface CtrovalidateOptions {
  realTime?: boolean;              // Default: true
  logLevel?: number;               // Default: LogLevel.NONE (0)
  errorClass?: string;             // Default: 'is-invalid'
  errorMessageClass?: string;      // Default: 'error-message'
  pendingClass?: string;           // Default: 'is-validating'
  schema?: ValidationSchema;       // Programmatic rules
  aliases?: Record<string, SchemaRule>; // Instance-level aliases
}
```

See [Configuration Reference](./configuration.md) for detailed descriptions.

---

## Instance Methods

### `validate(): Promise<boolean>`

Validates all fields and returns overall validity:

```javascript
const isValid = await validator.validate();
```

### `addField(element: HTMLElement): void`

Dynamically register a new field:

```javascript
const newInput = document.createElement('input');
newInput.name = 'dynamic_field';
newInput.setAttribute('data-ctrovalidate-rules', 'required');
form.appendChild(newInput);

validator.addField(newInput);
```

### `removeField(element: HTMLElement): void`

Unregister a field:

```javascript
validator.removeField(inputElement);
```

### `refresh(): void`

Re-scan the DOM for new fields:

```javascript
validator.refresh();
```

### `isDirty(fieldName: string): boolean`

Check if a field has been touched:

```javascript
if (validator.isDirty('email')) {
  console.log('Email field has been modified');
}
```

### `getError(fieldName: string): string | null`

Get the current error message for a field:

```javascript
const error = validator.getError('email');
if (error) {
  console.log('Email error:', error);
}
```

### `reset(): void`

Reset all validation states:

```javascript
validator.reset();
```

### `destroy(): void`

Clean up the instance and remove event listeners:

```javascript
validator.destroy();
```

---

## Static Methods

### `Ctrovalidate.defineAlias(name: string, rules: SchemaRule): void`

Register a global rule alias (macro):

```javascript
Ctrovalidate.defineAlias('username', 'required|minLength:3|maxLength:20|alphaNum');
```

```html
<input name="username" data-ctrovalidate-rules="username" />
```

### `Ctrovalidate.addRule(name: string, logic: RuleLogic, message?: string): void`

Add a global synchronous custom rule:

```javascript
Ctrovalidate.addRule(
  'noSpaces',
  (value) => !/\s/.test(String(value)),
  'Spaces are not allowed.'
);
```

### `Ctrovalidate.addAsyncRule(name: string, logic: AsyncRuleLogic, message?: string): void`

Add a global asynchronous custom rule:

```javascript
Ctrovalidate.addAsyncRule(
  'uniqueEmail',
  async (value, params, element, signal) => {
    const res = await fetch(`/api/check-email?value=${value}`, { signal });
    const { available } = await res.json();
    return available;
  },
  'This email is already registered.'
);
```

### `Ctrovalidate.setCustomMessages(messages: Record<string, string>): void`

Override default global error messages:

```javascript
Ctrovalidate.setCustomMessages({
  required: 'This field is mandatory.',
  email: 'Please enter a valid email address.',
  minLength: 'Must be at least {0} characters long.'
});
```

---

## Architecture

The browser adapter consists of 4 core classes:

1. **`Ctrovalidate`**: Public API and initialization
2. **`FormController`**: Field discovery, event listeners, and state management
3. **`RuleEngine`**: Validation execution and message resolution
4. **`UIManager`**: DOM manipulation, error display, and ARIA management

---

## Accessibility (ARIA)

The browser adapter automatically manages ARIA attributes:

- **`aria-invalid`**: Set to `"true"` when validation fails, `"false"` when valid
- **`aria-describedby`**: Links input to error message container for screen readers

```html
<!-- Before validation -->
<input name="email" data-ctrovalidate-rules="required|email" />

<!-- After validation failure -->
<input
  name="email"
  data-ctrovalidate-rules="required|email"
  aria-invalid="true"
  aria-describedby="error-email"
  class="is-invalid"
/>
<div class="error-message" id="error-email">
  Please enter a valid email address.
</div>
```

---

## Next Steps

- [**Configuration**](./configuration.md) — Detailed configuration options
- [**Conditional Validation**](./conditional-validation.md) — Field dependencies
- [**Custom Rules**](./custom-rules.md) — Creating custom validation logic
- [**API Reference**](/v4/api/browser) — Complete API documentation
