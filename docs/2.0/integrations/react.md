# React Integration

While Ctrovalidate is a DOM-first library, it integrates perfectly with React's component lifecycle using `useRef` and `useEffect`.

---

## 🏗️ Basic Pattern

The most reliable way to use Ctrovalidate in React is to initialize it once the component mounts and the form element is available in the DOM.

```tsx
import React, { useEffect, useRef } from 'react';
import { Ctrovalidate } from 'ctrovalidate';

export const SignupForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const validatorRef = useRef<Ctrovalidate | null>(null);

  useEffect(() => {
    if (formRef.current) {
      validatorRef.current = new Ctrovalidate(formRef.current, {
        realTime: true,
      });
    }

    // Optional: Cleanup
    return () => {
      // Instance cleanup if needed
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validatorRef.current?.validate();

    if (isValid) {
      console.log('Form is valid!');
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} novalidate>
      <input
        name="email"
        data-ctrovalidate-rules="required|email"
        placeholder="Enter email"
      />
      <div className="error-message" />

      <button type="submit">Register</button>
    </form>
  );
};
```

---

## 🔄 Handling Dynamic Fields

If your React form fields are added/removed dynamically (e.g., in a list), use a separate `useEffect` or a callback-ref to register/unregister them.

```tsx
const DynamicInput = ({ validator }: { validator: Ctrovalidate }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      validator.addField(inputRef.current);
    }
    return () => {
      if (inputRef.current) {
        validator.removeField(inputRef.current);
      }
    };
  }, [validator]);

  return (
    <input ref={inputRef} name="hobby" data-ctrovalidate-rules="required" />
  );
};
```

---

## ⚡ Benefits over Pure React Validation

1.  **Performance**: Validation logic runs outside of React's render cycle, preventing unnecessary re-renders of the entire form.
2.  **Declarative**: Keep your validation logic in the JSX markup rather than in complex `yup` or `zod` schemas.
3.  **No State Boilerplate**: You don't need to manually manage `error` or `touched` states in `useState`.

> [!IMPORTANT]
> Since Ctrovalidate manipulates the DOM directly (adding classes and error messages), ensure your `error-message` containers are empty in your JSX to avoid hydration mismatches.

## Next Steps

- **[API Reference](../api/methods.md)** — More details on `addField` and `removeField`.
- **[Custom Rules](../guide/custom-rules.md)** — Creating async rules for your React apps.
