---
title: Custom Rules | Extension & Business Logic
description: Learn how to author and register custom synchronous and asynchronous validation rules to handle specialized business logic in Ctrovalidate v4.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Advanced
    url: https://ctrovalidate.vercel.app/v4/advanced/custom-rules
  - name: Custom Rules
    url: https://ctrovalidate.vercel.app/v4/advanced/custom-rules
---

# Custom Rules

Ctrovalidate is designed to be highly extensible. While the built-in catalog covers most web forms, you can easily author custom synchronous or asynchronous rules to handle specialized business requirements.

---

## 🎨 Sync Rules

Sync rules are perfect for logic that can be evaluated immediately (e.g., checking if a value is positive).

```javascript
import { Ctrovalidate } from '@ctrovalidate/core';

// 1. Define the logic
const isPositive = (value, params, element) => {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0;
};

// 2. Register globally
Ctrovalidate.addRule('positive', isPositive, 'Must be a positive number.');
```

**Usage:**

```html
<input name="amount" data-ctrovalidate-rules="required|numeric|positive" />
```

---

## ⚡ Async Rules

Async rules are used for logic that requires a Promise (e.g., API checks).

```javascript
// 1. Define the async logic
const checkAvailable = async (value, params, element, signal) => {
  const res = await fetch(`/api/check?v=${value}`, { signal });
  const { available } = await res.json();
  return available;
};

// 2. Register globally
Ctrovalidate.addAsyncRule('unique', checkAvailable, 'This value is already taken.');
```

### The `AbortSignal`

Ctrovalidate passes an `AbortSignal` as the 4th parameter. You **MUST** pass this to your `fetch` calls to ensure that outdated validation requests are canceled during fast typing.

---

## 🧩 Passable Parameters

Custom rules can accept parameters just like built-in rules. Parameters are passed as an array to your logic function.

```javascript
// Rule: minAge:18
const minAgeRule = (value, [minAge]) => {
  return parseInt(value) >= parseInt(minAge);
};

Ctrovalidate.addRule('minAge', minAgeRule, 'Must be at least {0} years old.');
```

---

## ✅ Best Practices

- **Rule Atomicity**: Keep rules focused on a single check. Use rule piping (e.g., `required|numeric|positive`) instead of building one massive rule.
- **Empty Values**: Let the `required` rule handle empty states. Your custom rules should generally return `true` if the value is empty to allow for "Optional but Valid" logic.
- **Registration Timing**: Always register custom rules **before** initializing your `Ctrovalidate` instance to ensure the discovery process recognizes them.
- **Isomorphism**: Author your rules in a shared file so they can be used in both `@ctrovalidate/core` (server) and `@ctrovalidate/browser` (client).



