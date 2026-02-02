---
title: React Integration | Form Validation
description: Integrate Ctrovalidate with React using useRef and useEffect for DOM-based validation that works outside the render cycle.
---

# React Integration

Ctrovalidate integrates seamlessly with React by working directly with the DOM, keeping validation logic outside the React render cycle.

---

## Installation

```bash
npm install ctrovalidate
```

---

## Basic Pattern

Use `useRef` to maintain a stable validator instance across re-renders.

### Complete Example

```tsx
import { useEffect, useRef } from 'react';
import { Ctrovalidate, LogLevel } from 'ctrovalidate';

export function SignupForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const validatorRef = useRef<Ctrovalidate | null>(null);

  useEffect(() => {
    if (formRef.current && !validatorRef.current) {
      validatorRef.current = new Ctrovalidate(formRef.current, {
        realTime: true,
        logLevel: LogLevel.WARN
      });
    }

    return () => {
      validatorRef.current?.destroy();
      validatorRef.current = null;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (await validatorRef.current?.validate()) {
      const formData = new FormData(formRef.current!);
      console.log('Form valid:', Object.fromEntries(formData));
      // Submit to API
    }
  };

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          data-ctrovalidate-rules="required|email"
        />
        <div className="error-message" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          data-ctrovalidate-rules="required|minLength:8"
        />
        <div className="error-message" />
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
}
```

---

## Dynamic Fields

When adding or removing fields based on React state, call `refresh()` to update validation tracking.

### Example: Conditional Fields

```tsx
import { useEffect, useRef, useState } from 'react';
import { Ctrovalidate } from 'ctrovalidate';

export function DynamicForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const validatorRef = useRef<Ctrovalidate | null>(null);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    if (formRef.current) {
      validatorRef.current = new Ctrovalidate(formRef.current, {
        realTime: true
      });
    }
    return () => validatorRef.current?.destroy();
  }, []);

  // Refresh validator when fields are added/removed
  useEffect(() => {
    validatorRef.current?.refresh();
  }, [showPhone]);

  return (
    <form ref={formRef} noValidate>
      <div>
        <label>
          <input
            type="checkbox"
            checked={showPhone}
            onChange={(e) => setShowPhone(e.target.checked)}
          />
          Add phone number
        </label>
      </div>

      {showPhone && (
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            data-ctrovalidate-rules="required|phone"
          />
          <div className="error-message" />
        </div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## TypeScript Support

Import types for full type safety:

```tsx
import { Ctrovalidate, LogLevel, type CtrovalidateOptions } from 'ctrovalidate';

const options: CtrovalidateOptions = {
  realTime: true,
  logLevel: LogLevel.DEBUG,
  errorClass: 'border-red-500',
  errorMessageClass: 'text-red-600 text-sm mt-1'
};

const validator = new Ctrovalidate(formElement, options);
```

---

## Custom Rules

Register custom rules before initializing the validator:

```tsx
import { Ctrovalidate } from 'ctrovalidate';

// Register custom rule globally
Ctrovalidate.addRule(
  'strongPassword',
  (value) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
  },
  'Password must contain uppercase, lowercase, number, and special character.'
);

export function PasswordForm() {
  // ... component code
  return (
    <input
      name="password"
      data-ctrovalidate-rules="required|strongPassword"
    />
  );
}
```

---

## Best Practices

### 1. Initialize Once

Always check if the validator already exists before creating a new instance:

```tsx
useEffect(() => {
  if (formRef.current && !validatorRef.current) {
    validatorRef.current = new Ctrovalidate(formRef.current);
  }
}, []);
```

### 2. Clean Up on Unmount

Always call `destroy()` to prevent memory leaks:

```tsx
useEffect(() => {
  // ... initialization
  return () => {
    validatorRef.current?.destroy();
  };
}, []);
```

### 3. Use `noValidate`

Disable browser validation to let Ctrovalidate handle it:

```tsx
<form ref={formRef} noValidate onSubmit={handleSubmit}>
```

### 4. Call `refresh()` for Dynamic Fields

When fields are added/removed, update the validator:

```tsx
useEffect(() => {
  validatorRef.current?.refresh();
}, [fieldCount]);
```

---

## Benefits

- **No Re-renders**: Validation happens in the DOM, not React state
- **TypeScript Support**: Full type definitions included
- **Accessibility**: Automatic ARIA attribute management
- **Performance**: Validation runs outside React's render cycle

---

## Next Steps

- **[Next.js Integration](./nextjs.md)** — Server Components and hydration
- **[Dynamic Fields Guide](../guide/dynamic-fields.md)** — Managing field lifecycle
- **[API Reference](../api/methods.md)** — All 9 instance methods
- **[Custom Rules](../guide/custom-rules.md)** — Creating validation logic
