---
title: Schema System | Defining Validation Logic
description: Learn how to define validation rules using Ctrovalidate's flexible schema system, supporting string-pipes, arrays, and type-safe object definitions.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Guide
    url: https://ctrovalidate.vercel.app/v4/guide/schemas
  - name: Schema System
    url: https://ctrovalidate.vercel.app/v4/guide/schemas
---

# Schema System

Ctrovalidate v4 introduces a flexible, hybrid schema system that allows you to define validation rules in the format that best fits your workflow. From simple HTML attributes to complex, type-safe TypeScript objects, the engine handles normalization automatically.

---

## 🏗️ Supported Formats

The `ValidationSchema` type supports three distinct formats: **Strings**, **Arrays**, and **Objects**.

### 1. String Notation (Declarative)

The most common format, perfect for HTML attributes and simple logic. Rules are separated by pipes (`|`) and parameters by colons (`:`).

```typescript
const schema = "required|minLength:8|email";
```

### 2. Array Notation (Programmatic)

Useful when rule parameters contain special characters (like pipes or colons) that would break string parsing.

```typescript
const schema = [
  'required',
  { name: 'minLength', params: ['8'] },
  'email'
];
```

### 3. Object Notation (Type-Safe)

The "Gold Standard" for complex business logic. This format is fully type-safe and allows for granular rule configuration.

```typescript
const schema = {
  password: [
    { name: 'required' },
    { name: 'minLength', params: [8] },
    { name: 'regex', params: [/^[A-Z]/], message: 'Must start with capital letter' }
  ]
};
```

---

## 🧩 Advanced Schema Features

### Logic Piping

Rules are executed in the order they are defined. If a rule fails, execution for that field stops immediately by default, providing clear and predictable feedback.

### Recursive Aliases

You can register "logical macros" to simplify complex schemas. Aliases can even reference other aliases (with built-in cycle protection).

```javascript
import { Ctrovalidate } from '@ctrovalidate/core';

// Define a reusable alias
Ctrovalidate.alias('securePassword', 'required|minLength:12|regex:[0-9]');

// Use it in any schema
const schema = "securePassword";
```

### Contextual Parameters

Some rules can reference other field values using the `@` prefix (in strings) or raw field names (in objects).

```html
<input name="password" data-ctrovalidate-rules="required" />
<input 
  name="confirm" 
  data-ctrovalidate-rules="required|sameAs:@password" 
/>
```

---

## 🚀 Usage in Monorepo

The schema system is identical across all packages. You can define a schema in a shared file and use it on the frontend (browser/react) and backend (next/node).

```typescript
// shared/schemas.ts
export const RegisterSchema = {
  email: "required|email",
  password: "required|minLength:8"
};

// frontend.ts
import { useCtrovalidate } from '@ctrovalidate/react';
import { RegisterSchema } from './shared/schemas';

const { errors } = useCtrovalidate({ schema: RegisterSchema });
```

---

## ✅ Best Practices

- **Use Strings** for simple input-level validation.
- **Use Objects** for complex forms where you need custom messages per rule.
- **Use Aliases** for logic that repeats across multiple forms (e.g., `phoneValidation`).
- **Shared Schemas**: Always keep your logic definitions in a separate file to enable full isomorphism between client and server.





