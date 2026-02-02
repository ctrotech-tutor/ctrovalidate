---
title: Custom Rules | Extending Validation
description: Learn how to build and register custom synchronous and asynchronous validation rules for complex business logic.
---

# Custom Rules

Ctrovalidate provides 21 built-in validation rules, but you can extend it with custom rules for your specific business logic. The library supports both synchronous and asynchronous custom rules.

---

## ⚡ Synchronous Rules

Use `Ctrovalidate.addRule()` for instant validation checks like regex patterns, range checks, or field comparisons.

### Basic Registration

```javascript
import { Ctrovalidate } from 'ctrovalidate';

// Register a custom rule
Ctrovalidate.addRule(
  'isCompanyEmail',
  (value) => value.endsWith('@company.com'),
  'Please use your company email address.'
);
```

### Using the Rule

```html
<input 
  name="email" 
  data-ctrovalidate-rules="required|email|isCompanyEmail" 
/>
```

### Rules with Parameters

Rules can accept parameters from the `data-ctrovalidate-rules` attribute:

```html
<input name="age" data-ctrovalidate-rules="atLeast:18" />
```

```javascript
Ctrovalidate.addRule(
  'atLeast',
  (value, [minAge]) => parseInt(value, 10) >= parseInt(minAge, 10),
  'Minimum age is {0}.'
);
```

**Message Placeholders**: Use `{0}`, `{1}`, etc. in error messages. Ctrovalidate automatically replaces them with parameter values.

---

## 🚀 Asynchronous Rules

Async rules allow server-side validation (e.g., checking username availability) with automatic abort handling.

### The Abort Pattern

Ctrovalidate manages `AbortSignal` automatically. If a user types quickly, previous requests are aborted to prevent race conditions.

```javascript
Ctrovalidate.addAsyncRule(
  'usernameAvailable',
  async (value, params, element, signal) => {
    try {
      const response = await fetch(`/api/check-username?name=${value}`, { 
        signal 
      });
      const data = await response.json();
      return data.available;
    } catch (error) {
      if (error.name === 'AbortError') return true; // Handled by engine
      return false; // Validation failed
    }
  },
  'This username is already taken.'
);
```

### Using Async Rules

```html
<input 
  name="username" 
  data-ctrovalidate-rules="required|alphaNum|usernameAvailable" 
/>
```

The `pendingClass` (default: `'is-validating'`) is applied during async validation:

```css
.is-validating {
  border-color: #3b82f6;
  background-image: url('spinner.svg');
}
```

---

## 🏗️ Best Practices

### 1. Rule Atomicity
Each rule should do one thing. Combine multiple rules instead of creating complex single rules:
- ✅ Good: `required|numeric|min:18`
- ❌ Avoid: `requiredPositiveNumber`

### 2. Handle Empty Values
Rules should return `true` for empty values, letting the `required` rule handle mandatory validation:

```javascript
Ctrovalidate.addRule('isPositive', (value) => {
  if (!value) return true; // Let 'required' handle empty
  return parseFloat(value) > 0;
}, 'Value must be positive.');
```

### 3. Element Context
Every rule receives the `HTMLElement` as the third argument for complex checks:

```javascript
Ctrovalidate.addRule('matchesOther', (value, [otherName], element) => {
  const other = element.form.querySelector(`[name="${otherName}"]`);
  return value === other?.value;
}, 'This field must match {0}.');
```

### 4. Registration Timing
Always register custom rules **before** initializing `new Ctrovalidate()`:

```javascript
// 1. Register custom rules first
Ctrovalidate.addRule('myRule', ...);

// 2. Then initialize validator
const validator = new Ctrovalidate(form);
```

### 5. Custom Messages
Override default messages globally:

```javascript
Ctrovalidate.setCustomMessages({
  required: 'This field cannot be empty.',
  email: 'Please enter a valid email address.'
});
```

---

## TypeScript Support

Custom rules are fully typed when using TypeScript:

```typescript
import { Ctrovalidate, RuleLogic, AsyncRuleLogic } from 'ctrovalidate';

const syncRule: RuleLogic = (value, params, element) => {
  // Your logic here
  return true;
};

const asyncRule: AsyncRuleLogic = async (value, params, element, signal) => {
  // Your async logic here
  return true;
};

Ctrovalidate.addRule('myRule', syncRule, 'Error message');
Ctrovalidate.addAsyncRule('myAsyncRule', asyncRule, 'Error message');
```

---

## Next Steps

- **[Built-in Rules](./rules.md)** — Explore all 21 built-in rules
- **[API Reference](/api/static-methods)** — Complete API documentation
- **[TypeScript Types](/api/types)** — Type definitions for custom rules
- **[Examples](./examples.md)** — See custom rules in action
