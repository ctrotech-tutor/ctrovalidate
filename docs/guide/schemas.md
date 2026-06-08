---
title: Schema System | Defining Validation Logic
description: Learn how to define validation rules using Ctrovalidate's flexible schema system, supporting string-pipes and array definitions across all packages.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Guide
    url: https://ctrovalidate.vercel.app/guide/schemas
  - name: Schema System
    url: https://ctrovalidate.vercel.app/guide/schemas
---

# Schema System

Ctrovalidate provides a flexible, hybrid schema system that allows you to define validation rules in the format that best fits your workflow. The engine normalizes all formats automatically via `normalizeRules()`.

---

## Core Types

### `ValidationSchema`

The top-level type mapping field names to their rules:

```typescript
type ValidationSchema = Record<string, SchemaRule>;
```

### `SchemaRule`

A single field's rules. Can be a **string** or an **array** of strings and/or `RuleDefinition` objects:

```typescript
type SchemaRule = string | (string | RuleDefinition)[];
```

### `RuleDefinition`

The normalized object representation:

```typescript
interface RuleDefinition {
  name: string;
  params: unknown[];
}
```

---

## Supported Formats

### 1. String Notation

The most common format. Rules are separated by `|` and parameters by `:`.

```typescript
// Single field's rules
const fieldRules = 'required|minLength:8|email';

// Full schema
const schema = {
  email: 'required|email',
  password: 'required|minLength:8|strongPassword',
  age: 'required|numeric|between:18,120',
};
```

### 2. Array Notation

Useful when rule parameters contain special characters (commas, pipes) that would break string parsing.

```typescript
const schema = {
  password: [
    'required',
    { name: 'minLength', params: ['8'] },
    { name: 'regex', params: ['^(?=.*[A-Z])'] },
  ],
};
```

### 3. Hybrid

Mix strings and objects freely within the array:

```typescript
const schema = {
  username: ['required', 'alphaNum', { name: 'minLength', params: ['3'] }],
};
```

---

## Rule Aliases

Register reusable rule macros via the browser adapter's `Ctrovalidate.defineAlias()`:

```typescript
import { Ctrovalidate } from 'ctrovalidate-browser';

Ctrovalidate.defineAlias('securePassword', 'required|minLength:8|strongPassword');
```

```html
<input data-ctrovalidate-rules="securePassword" />
```

Aliases expand recursively during `normalizeRules()`. Circular references are detected and blocked via a `Set`-based cycle detector.

For server-side usage, pass aliases as a `ValidationOptions` parameter:

```typescript
import { validateValue } from 'ctrovalidate-core';

validateValue('MyPass1!', 'securePassword', {
  aliases: { securePassword: 'required|minLength:8|strongPassword' },
});
```

---

## Field-to-Field Comparison

The `sameAs` rule compares a value against a target. In `ctrovalidate-browser`, the adapter resolves field references using the DOM (`form.querySelector('[name="fieldName"]').value`) before delegating to the core rule.

```html
<input name="password" data-ctrovalidate-rules="required" />
<input name="confirm" data-ctrovalidate-rules="required|sameAs:password" />
```

In the core package or framework hooks, pass the target value directly as a parameter:

```typescript
import { validateValue } from 'ctrovalidate-core';

validateValue('abc', 'sameAs:abc');  // passes
validateValue('abc', 'sameAs:xyz');  // fails
```

---

## Execution Order

Rules are executed in the order they are defined. First-fail-wins — when a rule fails, execution stops for that field and the error is returned immediately.

```typescript
// required runs first, then email. If required fails, email is never evaluated.
'required|email'
```

---

## Message Resolution

Error messages are resolved in this priority order (highest to lowest):

1. `messages[ruleName]` — from `ValidationOptions.messages` (or `Ctrovalidate.setCustomMessages()` in browser)
2. `messages['*']` — catch-all from options
3. `translator.translate(ruleName, params, locale)` — from the i18n system
4. `'Invalid input.'` — hardcoded fallback

---

## Shared Schema Pattern (Isomorphic)

Define your schema once and use it across client and server:

```typescript
// lib/schemas.ts
export const signupSchema = {
  email: 'required|email',
  password: 'required|minLength:8',
};

// React (client)
import { useCtrovalidate } from 'ctrovalidate-react';
const { errors } = useCtrovalidate({ schema: signupSchema });

// Next.js (server)
import { validateAction } from 'ctrovalidate-next';
const { isValid } = await validateAction(formData, signupSchema);
```

---

## Best Practices

- **Use Strings** for simple input-level validation in HTML or quick schemas.
- **Use Arrays** when params contain special characters (commas, pipes).
- **Use Aliases** for rules that repeat across multiple forms.
- **Shared Schemas**: Keep logic definitions in a separate file for isomorphic validation between client and server.
