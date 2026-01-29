# Extending Ctrovalidate

While our built-in rules cover 90% of use cases, Ctrovalidate is built for custom business logic. You can extend the library with synchronous and asynchronous rules using the global `Ctrovalidate` object.

---

## ⚡ Synchronous Rules

Use `Ctrovalidate.addRule()` for checks that execute instantly (e.g., regex, range checks, or internal state matching).

### Signature

`Ctrovalidate.addRule(name, logic, defaultMessage)`

- **name**: String used in `data-ctrovalidate-rules`.
- **logic**: Function `(value, params, element) => boolean`.
- **defaultMessage**: The fallback error message.

### Real-world Example: `isWorkEmail`

```javascript
import { Ctrovalidate } from 'ctrovalidate';

Ctrovalidate.addRule(
  'isWorkEmail',
  (value) => {
    if (!value) return true; // Let 'required' handle empty checks
    const commonProviders = ['gmail.com', 'yahoo.com', 'hotmail.com'];
    const domain = value.split('@')[1];
    return !commonProviders.includes(domain);
  },
  'Please use a corporate email address (Personal domains not allowed).'
);
```

---

## 🌐 Asynchronous Rules

Use `Ctrovalidate.addAsyncRule()` for rules that require server-side checks or heavy computation.

### Signature

`Ctrovalidate.addAsyncRule(name, logic, defaultMessage)`

- **logic**: Async function `(value, params, element, signal) => Promise<boolean>`.
- **signal**: An `AbortSignal`. Use this to cancel redundant network requests.

### Real-world Example: `usernameAvailable`

```javascript
Ctrovalidate.addAsyncRule(
  'usernameAvailable',
  async (value, params, element, signal) => {
    if (!value) return true;

    const response = await fetch(`/api/check-user?u=${value}`, { signal });
    const data = await response.json();
    return data.available;
  },
  'This username is already taken.'
);
```

> [!TIP]
> While an async rule is running, the field receives the `pendingClass` (default: `is-validating`). Use this to show a loading spinner in your CSS.

---

## 🏗️ Best Practices

1.  **Rule Atomicity**: Each rule should do exactly one thing. Combine `required|numeric|isPositive` rather than creating one `requiredPositiveNumber` rule.
2.  **Graceful Silence**: Rules should generally return `true` for empty values. This allows the `required` rule to manage mandatory state independently.
3.  **Registration Timing**: Always register your custom rules **before** initializing `new Ctrovalidate()`. This ensures the initial field discovery pass correctly maps your rules.

## Next Steps

- **[API Methods Query](../api/methods.md)** — Detailed technical reference for all instance methods.
- **[TypeScript Integration](../api/types.md)** — Fully typed custom rules.
