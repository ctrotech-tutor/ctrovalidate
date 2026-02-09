---
title: Custom Rules | Extending Validation
description: Learn how to build and register custom synchronous and asynchronous validation rules for complex business logic.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Guide
    url: https://ctrovalidate.vercel.app/v4/guide/custom-rules
  - name: Custom Rules
    url: https://ctrovalidate.vercel.app/v4/guide/custom-rules
---

# Custom Rules

The `Ctrovalidate` class provides static methods to extend the validation engine with project-specific logic.

---

## Synchronous Rules

Use `Ctrovalidate.addRule()` for logic that executes instantly within the main validation cycle.

### Registration

```javascript
import { Ctrovalidate } from '@ctrovalidate/browser';

Ctrovalidate.addRule(
  'isDomain',
  (value) => value.endsWith('@internal.com'),
  'Input must be an internal domain email.'
);
```

### Parameters

Rules receive parameters defined in the `data-ctrovalidate-rules` attribute as an array of strings.

```html
<input name="amount" data-ctrovalidate-rules="minVal:100" />
```

```javascript
Ctrovalidate.addRule(
  'minVal',
  (value, [target]) => Number(value) >= Number(target),
  'Value must be at least {0}.'
);
```

**Message Logic**: `{0}`, `{1}`, etc., in the error message are substituted with the corresponding parameter index.

---

## Asynchronous Rules

Use `Ctrovalidate.addAsyncRule()` for Promise-based logic, such as network requests.

### Abort Handling

The controller provides an `AbortSignal` for every async execution. When a new validation cycle begins before the previous one completes, the signal is triggered to prevent race conditions.

```javascript
Ctrovalidate.addAsyncRule(
  'uniqueUser',
  async (value, params, element, signal) => {
    try {
      const response = await fetch(`/api/users/check?name=${value}`, { signal });
      const data = await response.json();
      return data.available;
    } catch (error) {
       // AbortError is handled internally by the engine
      return false;
    }
  },
  'This username is not available.'
);
```

### Visual States

The `pendingClass` (default: `'is-validating'`) is applied to the input element while the Promise is unresolved.

---

## Implementation Requirements

1. **Boolean Returns**: Rule logic must return `true` (valid) or `false` (invalid).
2. **Empty Handling**: Logic should return `true` for empty values to allow the `required` rule to manage presence validation independently.
3. **Execution Context**: The third argument in the logic function is the `HTMLElement` target, allowing for multi-field comparisons or DOM-aware logic.
4. **Registration Timing**: Call static registration methods before instantiating the controller.

---

## Technical Types (TypeScript)

```typescript
import { Ctrovalidate, RuleLogic, AsyncRuleLogic } from '@ctrovalidate/browser';

const logic: RuleLogic = (value, params, element) => {
  return value.length > 5;
};

Ctrovalidate.addRule('lengthCheck', logic, 'Must exceed 5 characters.');
```

## Next Steps

- [**API Reference**](/v4/api/browser) — Full documentation of static and instance methods.
- [**Rule Aliases**](./custom-rules.md) — Grouping custom rules into reusable macros.
- [**Built-in Rules**](./rules.md) — Review the 22 base logic rules.





