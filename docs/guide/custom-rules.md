---
title: Custom Rules | Extending the Engine
description: Learn how to build and register custom sync and async validation rules to handle complex business logic with Ctrovalidate.
---

# Extending Ctrovalidate

While our built-in rules cover 90% of use cases, Ctrovalidate is built for custom business logic. You can extend the library with synchronous and asynchronous rules using the global `Ctrovalidate` object.

---

## ⚡ Synchronous Rules

Use `Ctrovalidate.addRule()` for checks that execute instantly (e.g., regex, range checks, or internal state matching).

### Signature

`Ctrovalidate.addRule(name, logic, defaultMessage)`

# Custom Rules

Ctrovalidate is designed to be infinitely extensible. While we ship with 20+ built-in rules, your business logic often requires specific, complex validation patterns. Our custom rules system allows you to register both synchronous and asynchronous logic globally.

---

## ⚙️ Synchronous Rules

Synchronous rules are ideal for complexity that doesn't require a server round-trip, such as pattern matching, cross-field comparison, or cryptographic checks.

### Basic Registration

```javascript
import { Ctrovalidate } from 'ctrovalidate';

// Register a rule named 'isCompanyEmail'
Ctrovalidate.addRule(
  'isCompanyEmail',
  (value) => value.endsWith('@industrial.com'),
  'Please use your official company email address.'
);
```

### Advanced Logic with Parameters

Rules can accept parameters defined in the `data-ctrovalidate-rules` attribute after a colon.

```html
<input name="age" data-ctrovalidate-rules="atLeast:18" />
```

```javascript
Ctrovalidate.addRule(
  'atLeast',
  (value, [minAge]) => parseInt(value, 10) >= parseInt(minAge, 10),
  'Access requires a minimum age of {0}.'
);
```

---

## 🚀 Asynchronous Rules

Async rules are and absolute necessity for modern industrial applications. They allow you to perform server-side checks (like username availability) while providing seamless UI feedback.

### The Abort Pattern

Ctrovalidate automatically manages the `AbortSignal` for you. If a user types quickly, the previous async request will be aborted, preventing "race conditions" where an old request overwrites a newer one.

```javascript
Ctrovalidate.addAsyncRule(
  'usernameAvailable',
  async (value, params, element, signal) => {
    try {
      const response = await fetch(`/api/check-user?name=${value}`, { signal });
      const data = await response.json();
      return data.available;
    } catch (error) {
      if (error.name === 'AbortError') return true; // Handled by engine
      return false; // Error state
    }
  },
  'This identity is already active in the network.'
);
```

---

## 🏗️ Industrial Best Practices

### 1. Error Message Templates
Use `{0}`, `{1}`, etc. in your error messages. Ctrovalidate will automatically inject the parameters from your rule definition into the message.

### 2. Element Context
Every rule logic function receives the `HTMLElement` as the third argument. This allows you to perform complex calculations based on the element's sibling state or custom attributes.

```javascript
Ctrovalidate.addRule('matchesOther', (value, [otherName], element) => {
  const other = element.form.querySelector(`[name="${otherName}"]`);
  return value === other.value;
}, 'This field must match the {0} field.');
```

### 3. Localization
You can override custom rule messages at initialization using `setCustomMessages`.

---

## Next Steps

- **[Rules Reference](./rules.md)** — Scan all 20+ built-in rules.
- **[Configuration](./configuration.md)** — Customize how errors are displayed.
1.  **Rule Atomicity**: Each rule should do exactly one thing. Combine `required|numeric|isPositive` rather than creating one `requiredPositiveNumber` rule.
2.  **Graceful Silence**: Rules should generally return `true` for empty values. This allows the `required` rule to manage mandatory state independently.
3.  **Registration Timing**: Always register your custom rules **before** initializing `new Ctrovalidate()`. This ensures the initial field discovery pass correctly maps your rules.

## Next Steps

- **[API Methods Query](../api/methods.md)** — Detailed technical reference for all instance methods.
- **[TypeScript Integration](../api/types.md)** — Fully typed custom rules.
