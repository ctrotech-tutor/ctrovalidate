---
title: Custom Rules | Extension & Business Logic
description: Learn how to author and register custom synchronous and asynchronous validation rules to handle specialized business logic.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Advanced
    url: https://ctrovalidate.vercel.app/advanced/custom-rules
  - name: Custom Rules
    url: https://ctrovalidate.vercel.app/advanced/custom-rules
---

# Custom Rules

Ctrovalidate is designed to be extensible. You can author custom synchronous or asynchronous rules via two paths:

1. **Browser adapter**: Global registration via `Ctrovalidate.addRule()` / `Ctrovalidate.addAsyncRule()` — available to all instances
2. **Core package**: Per-call via `customRules` option in validation functions

---

## Path 1: Browser Adapter (Global Registration)

Register rules globally so they are available to any `Ctrovalidate` instance across your application.

### Sync Rules

```javascript
import { Ctrovalidate } from 'ctrovalidate-browser';

Ctrovalidate.addRule(
  'positive',
  (value, params, element) => {
    const num = parseFloat(value);
    return !isNaN(num) && num > 0;
  },
  'Must be a positive number.'
);
```

```html
<input name="amount" data-ctrovalidate-rules="required|numeric|positive" />
```

### Async Rules

```javascript
Ctrovalidate.addAsyncRule(
  'unique',
  async (value, params, element, signal) => {
    const res = await fetch(`/api/check?v=${value}`, { signal });
    const { available } = await res.json();
    return available;
  },
  'This value is already taken.'
);
```

---

## Path 2: Core Package (Per-Call)

Pass custom rules directly to validation functions. This is the isomorphic approach — works in any JavaScript environment.

```javascript
import { validateValue } from 'ctrovalidate-core';

const result = validateValue('abc', 'required|startsWithA', {
  customRules: {
    startsWithA: (value) => String(value).startsWith('a'),
  },
});
```

```javascript
import { validateAsync } from 'ctrovalidate-core';

const results = await validateAsync(data, schema, {
  customRules: {
    checkDb: async (value, params, ctx, signal) => {
      const res = await fetch(`/api/check`, { signal });
      return (await res.json()).available;
    },
  },
});
```

---

## Logic Function Signatures

### Sync

```typescript
type RuleLogic = (
  value: unknown,
  params?: unknown[],
  element?: HTMLElement | null  // browser only; null in core
) => boolean;
```

### Async

```typescript
type AsyncRuleLogic = (
  value: unknown,
  params?: unknown[],
  element?: HTMLElement | null,  // browser only; null in core
  signal?: AbortSignal
) => Promise<boolean>;
```

---

## Parameters

Custom rules accept parameters like built-in rules. Parameters are passed as an array of strings (from HTML or string notation) or as-is (from `RuleDefinition` objects).

```javascript
// Rule: minAge:18 — params is ['18'] from string, or [18] from object
Ctrovalidate.addRule('minAge', (value, [minAge]) => {
  return parseInt(value) >= parseInt(minAge);
}, 'Must be at least {0} years old.');
```

Message interpolation: `{0}`, `{1}`, etc., are substituted with the corresponding parameter index.

---

## Rule Aliases

Group multiple rules into a reusable macro:

```javascript
import { Ctrovalidate } from 'ctrovalidate-browser';

Ctrovalidate.defineAlias('username', 'required|alphaDash|minLength:3');
```

```html
<input data-ctrovalidate-rules="username" />
```

In the core package, pass aliases via `ValidationOptions`:

```javascript
validateValue('john_doe', 'username', {
  aliases: { username: 'required|alphaDash|minLength:3' },
});
```

---

## Best Practices

- **Rule Atomicity**: Keep rules focused on a single check. Compose them via piping (`required|numeric|positive`).
- **Empty Values**: Let `required` handle presence. Custom rules should return `true` for empty values to support optional fields.
- **Registration Timing**: In the browser adapter, register rules before creating `Ctrovalidate` instances.
- **Isomorphism**: Author rules in a shared file with a `customRules` dictionary so they work in both `ctrovalidate-core` (server) and `ctrovalidate-browser` (client).
