---
title: Static Methods API | Global Configuration
description: API reference for Ctrovalidate static methods including addRule, addAsyncRule, and setCustomMessages for global configuration.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: API
    url: https://ctrovalidate.vercel.app/api/static-methods
  - name: Static Methods
    url: https://ctrovalidate.vercel.app/api/static-methods
---

# Static Methods

Static methods are called directly on the `Ctrovalidate` class and affect all validator instances globally.

---

## `Ctrovalidate.addRule(name, logic, message)`

Registers a custom synchronous validation rule globally.

**Parameters:**
- `name` (string) - Rule name to use in `data-ctrovalidate-rules`
- `logic` (RuleLogic) - Validation function: `(value, params, element) => boolean`
- `message` (string, optional) - Default error message

**Usage:**

```javascript
import { Ctrovalidate } from 'ctrovalidate';

Ctrovalidate.addRule(
  'isPositive',
  (value) => parseFloat(value) > 0,
  'Value must be positive.'
);
```

```html
<input name="amount" data-ctrovalidate-rules="required|isPositive" />
```

**With Parameters:**

```javascript
Ctrovalidate.addRule(
  'minAge',
  (value, [minAge]) => parseInt(value) >= parseInt(minAge),
  'Must be at least {0} years old.'
);
```

```html
<input name="age" data-ctrovalidate-rules="required|minAge:18" />
```

---

## `Ctrovalidate.addAsyncRule(name, logic, message)`

Registers a custom asynchronous validation rule globally.

**Parameters:**
- `name` (string) - Rule name to use in `data-ctrovalidate-rules`
- `logic` (AsyncRuleLogic) - Async validation function: `(value, params, element, signal) => Promise<boolean>`
- `message` (string, optional) - Default error message

**Usage:**

```javascript
Ctrovalidate.addAsyncRule(
  'usernameAvailable',
  async (value, params, element, signal) => {
    const response = await fetch(`/api/check?username=${value}`, { signal });
    const data = await response.json();
    return data.available;
  },
  'This username is already taken.'
);
```

```html
<input name="username" data-ctrovalidate-rules="required|usernameAvailable" />
```

**Abort Signal:**
The `signal` parameter is an `AbortSignal` that automatically cancels previous requests when the user types quickly, preventing race conditions.

---

## `Ctrovalidate.setCustomMessages(messages)`

Sets custom error messages globally for built-in or custom rules.

**Parameters:**
- `messages` (Record<string, string>) - Object mapping rule names to custom messages

**Usage:**

```javascript
Ctrovalidate.setCustomMessages({
  required: 'This field cannot be empty.',
  email: 'Please enter a valid email address.',
  minLength: 'Must be at least {0} characters.',
  phone: 'Please enter a valid phone number.'
});
```

**Message Placeholders:**
Use `{0}`, `{1}`, etc. in messages to reference rule parameters:

```javascript
Ctrovalidate.setCustomMessages({
  between: 'Value must be between {0} and {1}.'
});
```

---

## Function Signatures

### RuleLogic (Synchronous)

```typescript
type RuleLogic = (
  value: string,
  params: string[],
  element: HTMLElement
) => boolean;
```

**Parameters:**
- `value` - Current field value
- `params` - Array of parameters from rule definition (e.g., `minLength:8` → `['8']`)
- `element` - The HTML input element

**Returns:** `boolean` - `true` if valid, `false` if invalid

---

### AsyncRuleLogic (Asynchronous)

```typescript
type AsyncRuleLogic = (
  value: string,
  params: string[],
  element: HTMLElement,
  signal: AbortSignal
) => Promise<boolean>;
```

**Parameters:**
- `value` - Current field value
- `params` - Array of parameters from rule definition
- `element` - The HTML input element
- `signal` - AbortSignal for canceling previous requests

**Returns:** `Promise<boolean>` - Resolves to `true` if valid, `false` if invalid

---

## Best Practices

### 1. Register Before Initialization

Always register custom rules **before** creating validator instances:

```javascript
// ✅ Correct order
Ctrovalidate.addRule('myRule', ...);
const validator = new Ctrovalidate(form);

// ❌ Wrong - rule not available during field discovery
const validator = new Ctrovalidate(form);
Ctrovalidate.addRule('myRule', ...);
```

### 2. Handle Empty Values

Let the `required` rule handle empty value validation:

```javascript
Ctrovalidate.addRule('isPositive', (value) => {
  if (!value) return true; // Let 'required' handle empty
  return parseFloat(value) > 0;
}, 'Must be positive.');
```

### 3. Use Abort Signal

Always use the `signal` parameter in async rules:

```javascript
Ctrovalidate.addAsyncRule('checkAvailability', async (value, params, element, signal) => {
  try {
    const response = await fetch(`/api/check?value=${value}`, { signal });
    return (await response.json()).available;
  } catch (error) {
    if (error.name === 'AbortError') return true; // Request canceled
    return false; // Network error
  }
}, 'Value not available.');
```

---

## Next Steps

- **[Instance Methods](./methods.md)** — All 9 instance methods
- **[Custom Rules Guide](../guide/custom-rules.md)** — Detailed examples
- **[TypeScript Types](./types.md)** — Type definitions
