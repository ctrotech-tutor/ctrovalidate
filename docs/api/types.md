---
title: TypeScript Support | Type Definitions
description: Complete TypeScript reference for Ctrovalidate including types, interfaces, and usage examples for type-safe form validation.
---

# TypeScript Support

Ctrovalidate is written in TypeScript and includes comprehensive type definitions. All types are exported from the main package.

---

## Installation

Type definitions are included automatically when you install Ctrovalidate:

```bash
npm install ctrovalidate
```

No separate `@types` package is needed.

---

## Basic Usage

### Importing Types

```typescript
import { 
  Ctrovalidate, 
  type CtrovalidateOptions,
  type RuleLogic,
  type AsyncRuleLogic
} from 'ctrovalidate';
```

### Type-Safe Initialization

```typescript
const form = document.querySelector<HTMLFormElement>('#myForm')!;

const options: CtrovalidateOptions = {
  realTime: true,
  logLevel: 'DEBUG',
  errorClass: 'is-invalid',
  errorMessageClass: 'error-message',
  pendingClass: 'is-validating'
};

const validator = new Ctrovalidate(form, options);
```

---

## Type Definitions

### `CtrovalidateOptions`

Configuration options for the validator instance.

```typescript
interface CtrovalidateOptions {
  realTime?: boolean;           // Default: true
  logLevel?: string;            // Default: 'NONE'
  errorClass?: string;          // Default: 'is-invalid'
  errorMessageClass?: string;   // Default: 'error-message'
  pendingClass?: string;        // Default: 'ctrovalidate-pending'
}
```

---

### `RuleLogic`

Function signature for synchronous validation rules.

```typescript
type RuleLogic = (
  value: string,
  params: string[],
  element: HTMLElement
) => boolean;
```

**Example:**

```typescript
const isPositive: RuleLogic = (value, params, element) => {
  return parseFloat(value) > 0;
};

Ctrovalidate.addRule('isPositive', isPositive, 'Must be positive.');
```

---

### `AsyncRuleLogic`

Function signature for asynchronous validation rules.

```typescript
type AsyncRuleLogic = (
  value: string,
  params: string[],
  element: HTMLElement,
  signal: AbortSignal
) => Promise<boolean>;
```

**Example:**

```typescript
const checkUsername: AsyncRuleLogic = async (value, params, element, signal) => {
  const response = await fetch(`/api/check?username=${value}`, { signal });
  const data = await response.json();
  return data.available;
};

Ctrovalidate.addAsyncRule('usernameAvailable', checkUsername, 'Username taken.');
```

---

### `FieldObject` (Internal)

Internal type representing a tracked field. Not typically used in application code.

```typescript
interface FieldObject {
  element: HTMLElement;
  rules: ParsedRule[];
  dependency: Dependency | null;
  state: {
    isDirty: boolean;
    abortController: AbortController | null;
    lastError: string | null;
  };
}
```

---

## Framework Integration

### React with TypeScript

```typescript
import { useEffect, useRef } from 'react';
import { Ctrovalidate, type CtrovalidateOptions } from 'ctrovalidate';

function MyForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const validatorRef = useRef<Ctrovalidate | null>(null);

  useEffect(() => {
    if (!formRef.current) return;

    const options: CtrovalidateOptions = {
      realTime: true,
      logLevel: 'WARN'
    };

    validatorRef.current = new Ctrovalidate(formRef.current, options);

    return () => {
      validatorRef.current?.destroy();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validatorRef.current && await validatorRef.current.validate()) {
      // Submit form
    }
  };

  return <form ref={formRef} onSubmit={handleSubmit}>...</form>;
}
```

### Vue 3 with TypeScript

```typescript
import { ref, onMounted, onUnmounted } from 'vue';
import { Ctrovalidate, type CtrovalidateOptions } from 'ctrovalidate';

export default {
  setup() {
    const formRef = ref<HTMLFormElement | null>(null);
    let validator: Ctrovalidate | null = null;

    onMounted(() => {
      if (!formRef.value) return;

      const options: CtrovalidateOptions = {
        realTime: true
      };

      validator = new Ctrovalidate(formRef.value, options);
    });

    onUnmounted(() => {
      validator?.destroy();
    });

    const handleSubmit = async () => {
      if (validator && await validator.validate()) {
        // Submit form
      }
    };

    return { formRef, handleSubmit };
  }
};
```

---

## Custom Rules with Types

### Synchronous Rule

```typescript
import { Ctrovalidate, type RuleLogic } from 'ctrovalidate';

const minAge: RuleLogic = (value, [age], element) => {
  const numValue = parseInt(value, 10);
  const minAge = parseInt(age, 10);
  return numValue >= minAge;
};

Ctrovalidate.addRule('minAge', minAge, 'Must be at least {0} years old.');
```

### Asynchronous Rule

```typescript
import { Ctrovalidate, type AsyncRuleLogic } from 'ctrovalidate';

const checkEmail: AsyncRuleLogic = async (value, params, element, signal) => {
  try {
    const response = await fetch(`/api/check-email?email=${value}`, { signal });
    const data = await response.json();
    return data.available;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return true; // Request was aborted
    }
    return false; // Network error
  }
};

Ctrovalidate.addAsyncRule('emailAvailable', checkEmail, 'Email already in use.');
```

---

## Type Reference Summary

| Type | Description |
|:-----|:------------|
| `Ctrovalidate` | Main validator class |
| `CtrovalidateOptions` | Configuration options interface |
| `RuleLogic` | Synchronous rule function type |
| `AsyncRuleLogic` | Asynchronous rule function type |
| `FieldObject` | Internal field tracking object |

---

## Next Steps

- **[Instance Methods](./methods.md)** — All 9 public methods
- **[Static Methods](./static-methods.md)** — Global rule registration
- **[Custom Rules Guide](../guide/custom-rules.md)** — Detailed examples
