---
title: "ctrovalidate-browser | DOM Validation Adapter"
description: Complete guide to the DOM adapter with declarative HTML-first API, data attributes, field discovery, real-time validation, and ARIA management.
---

# ctrovalidate-browser

`ctrovalidate-browser` provides a `Ctrovalidate` controller class that bridges `ctrovalidate-core` validation logic to the DOM. It discovers fields via data attributes, manages event listeners, displays errors, and handles ARIA accessibility — all without a framework.

---

## Installation

```bash
npm install ctrovalidate-browser ctrovalidate-core
```

`ctrovalidate-core` is a peer dependency and must be installed separately.

---

## Quick Start

### 1. HTML Markup

```html
<form id="signup-form" novalidate>
  <div class="field-group">
    <label for="email">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      data-ctrovalidate-rules="required|email"
    />
    <div class="error-message"></div>
  </div>

  <div class="field-group">
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

### 2. JavaScript

```javascript
import { Ctrovalidate } from 'ctrovalidate-browser';

const form = document.querySelector('#signup-form');
const validator = new Ctrovalidate(form, {
  realTime: true,
  errorClass: 'is-invalid',
  errorMessageClass: 'error-message',
  pendingClass: 'is-validating',
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const isValid = await validator.validate();
  if (isValid) {
    // Submit form
  }
});
```

---

## Data Attributes

### `data-ctrovalidate-rules`

Pipe-delimited rule string. Parsed via `parseRules()` from ctrovalidate-core.

```html
<input data-ctrovalidate-rules="required|email" />
<input data-ctrovalidate-rules="required|minLength:8|between:1,100" />
```

See the [Rules Catalog](/guide/rules) for all 22 built-in rules.

### `data-ctrovalidate-if`

Conditional validation — only validates when the dependency is met.

**Syntax:** `fieldName:type` or `fieldName:type=value`

| Type | Example | Behavior |
|------|---------|----------|
| `checked` | `agree:checked` | Controller checkbox must be checked |
| `present` | `email:present` | Controller must have a truthy value |
| `value=X` | `country:value=USA` | Controller value must equal `X` |

```html
<!-- Validate only if checkbox is checked -->
<input type="checkbox" name="agreeTerms" />
<input
  name="signature"
  data-ctrovalidate-if="agreeTerms:checked"
  data-ctrovalidate-rules="required"
/>

<!-- Validate only if select has a specific value -->
<select name="country">
  <option value="">Select</option>
  <option value="USA">USA</option>
</select>
<input
  name="state"
  data-ctrovalidate-if="country:value=USA"
  data-ctrovalidate-rules="required"
/>

<!-- Validate only if another field has a value -->
<input name="email" />
<input
  name="confirmEmail"
  data-ctrovalidate-if="email:present"
  data-ctrovalidate-rules="required|email"
/>
```

When the dependency is **not met**, the field is skipped (no errors displayed, returns valid). When the dependency **becomes met**, the dependent field is immediately re-validated.

### `data-ctrovalidate-message`

Catch-all error message override for the field:

```html
<input
  name="email"
  data-ctrovalidate-rules="required|email"
  data-ctrovalidate-message="Please fix this field."
/>
```

### `data-ctrovalidate-{ruleName}-message`

Rule-specific override. The attribute name is case-insensitive (HTML attributes are lowercase):

```html
<input
  name="password"
  data-ctrovalidate-rules="required|minLength:8"
  data-ctrovalidate-required-message="Password is required."
  data-ctrovalidate-minlength-message="Must be at least 8 characters."
/>
```

---

## Hybrid Schema

Rules can come from two sources that are **merged together**:

1. **HTML**: `data-ctrovalidate-rules` attribute on the element
2. **Programmatic**: `schema` option passed to the constructor

HTML rules execute first, then schema rules. Fields discovered via the schema (no data attribute) are also validated.

```javascript
const validator = new Ctrovalidate(form, {
  schema: {
    email: 'email',
    username: 'required|minLength:3|alphaDash',
  },
});
```

If a field has both `data-ctrovalidate-rules="required"` and `schema: { email: 'email' }`, the combined rules are `required|email`.

---

## Message Priority

When a rule fails, the error message is resolved in this order:

1. **Field rule-specific**: `data-ctrovalidate-{ruleName}-message` attribute
2. **Field catch-all**: `data-ctrovalidate-message` attribute  
3. **Global registry**: Messages set via `Ctrovalidate.setCustomMessages()`
4. **Hardcoded fallback**: `'Invalid input.'`

Messages support `{0}`, `{1}` parameter substitution for rule params:

```javascript
Ctrovalidate.setCustomMessages({
  minLength: 'Must be at least {0} characters.',
});
```

---

## Validation Behavior

### Initialization

The constructor automatically:
1. Throws if the argument is not an `HTMLFormElement`
2. Sets `novalidate` on the form to disable browser-native validation
3. Discovers all fields with `data-ctrovalidate-rules` (and schema fields)
4. Attaches event listeners for real-time validation (unless `realTime: false`)

### Real-Time Events

| Event | When Validation Runs |
|-------|---------------------|
| `blur` | Always — validates and marks field as dirty |
| `input` | Only if field is already dirty (prevents premature errors) |
| Controller `input` | Dependent fields re-validate when controller changes |

### Programmatic Validation

`await validator.validate()` — validates every discovered field in parallel via `Promise.all`. Returns `true` only if all fields pass.

### Async Rule Lifecycle

1. Pending state: `pendingClass` is added to the field, existing errors cleared
2. A new `AbortController` is created for the async rule
3. If the field is re-validated while pending, the previous `AbortController.abort()` is called
4. `AbortError` caught silently — returns valid (no error displayed)
5. Other async errors are logged and treated as validation failure

---

## Architecture

The controller composes three internal classes:

| Class | Responsibility |
|-------|----------------|
| `FormController` | Field discovery, event listeners, state management |
| `RuleEngine` | Executes rules against field values, resolves messages |
| `UIManager` | DOM manipulation, error display/clear, ARIA attributes |

### Error Container Discovery

The `UIManager` searches for the error message container using a **3-level parent traversal**:

1. Looks for a descendant matching `errorMessageClass` in the field's parent
2. If not found, checks grandparent and great-grandparent
3. If still not found, **creates a fallback** `<div>` with `role="status"` and `aria-live="polite"` placed immediately after the field

Results are cached via `WeakMap` to avoid repeated DOM queries.

### CSS Class Handling

All class options (`errorClass`, `errorMessageClass`, `pendingClass`) support **space-separated strings** for Tailwind CSS compatibility:

```javascript
const validator = new Ctrovalidate(form, {
  errorClass: 'border-red-500 bg-red-50',
  errorMessageClass: 'text-red-500 text-sm mt-1',
  pendingClass: 'opacity-50 pointer-events-none',
});
```

---

## Accessibility (ARIA)

The controller automatically manages these attributes:

- `aria-invalid="true"` — Added on validation failure, removed on success
- `aria-describedby` — Links the field to its error container by ID
- `role="status"` — Set on auto-generated fallback containers
- `aria-live="polite"` — Set on auto-generated fallback containers

```html
<!-- After validation failure -->
<input
  name="email"
  aria-invalid="true"
  aria-describedby="ctrovalidate-error-email"
/>
<div id="ctrovalidate-error-email" class="error-message"
     role="status" aria-live="polite">
  Please enter a valid email address.
</div>
```

Generated error container IDs follow the pattern `ctrovalidate-error-{fieldName}` (sanitized). If the field has no name, a numeric counter is used.

---

## Comparison with ctrovalidate-core

| Feature | ctrovalidate-browser | ctrovalidate-core |
|---------|---------------------|-------------------|
| DOM interaction | Full (form, events, ARIA) | None |
| Rule definition | Data attributes + schema | Schema object only |
| Message source | HTML attributes + global registry | options.messages + translator |
| Conditional validation | `data-ctrovalidate-if` | Not supported |
| Static rule registration | `Ctrovalidate.addRule()` | Not supported |
| Instance lifecycle | Constructor + destroy() | Pure functions |
| Async support | AbortController per field | AbortSignal per call |

---

## Next Steps

- [**API Reference**](/api/browser) — Complete class, method, and type documentation
- [**Configuration**](/guide/configuration) — All options in detail
- [**Conditional Validation**](/guide/conditional-validation) — Field dependencies
- [**Custom Rules**](/guide/custom-rules) — Adding custom validation logic
