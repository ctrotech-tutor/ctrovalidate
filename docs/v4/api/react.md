---
title: "@ctrovalidate/react API Reference"
description: Complete API reference for the useCtrovalidate hook, providing a headless, type-safe validation experience for React 18+ and Next.js.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: API
    url: https://ctrovalidate.vercel.app/v4/api/react
  - name: React
    url: https://ctrovalidate.vercel.app/v4/api/react
---

# @ctrovalidate/react

The `@ctrovalidate/react` package provides a headless hook that brings the Ctrovalidate logic engine into the React ecosystem with full type safety and reactive state.

---

## 🏗️ The `useCtrovalidate` Hook

### `useCtrovalidate<T>(options)`

The primary hook for managing form state and validation.

- **Generics**:
  - `T`: The shape of your form data (TypeScript interface/type).
- **Options**:
  - `schema` (ValidationSchema): Isomorphic schema definition.
  - `initialValues` (T): Initial state for the form.
  - `realTime` (boolean): Whether to validate on change/blur. Default: `true`.
  - `debounce` (number): Ms to wait during high-frequency typing before async validation.

---

## 🛠️ Return Values

The hook returns a reactive object containing everything needed to bind to your UI components.

| Property | Type | Description |
| :--- | :--- | :--- |
| `values` | `T` | Current reactive form state. |
| `errors` | `Partial<Record<keyof T, string>>` | Error messages for failed fields only. Valid fields are `undefined`. |
| `isValid` | `boolean` | Global validity state of the form. |
| `isDirty` | `Partial<Record<keyof T, boolean>>` | Per-field dirty state tracking. |
| `isValidating` | `Partial<Record<keyof T, boolean>>` | Per-field async validation state. |
| `handleChange(name, value)` | `Function` | Update state and trigger validation. |
| `handleBlur(name)` | `Function` | Mark field as dirty and trigger validation. |
| `validate()` | `Function` | Programmatic trigger for all rules. Returns `Promise<boolean>`. |
| `reset(values?)` | `Function` | Reset to initial or new values, clear errors and dirty state. |

---

## 🚀 Advanced Usage

### Type-Safe Integration

```typescript
interface SignupData {
  email: string;
  age: number;
}

const { values, handleChange } = useCtrovalidate<SignupData>({
  schema: { email: 'required|email' }
});

// ✅ Typescript knows 'email' is valid, but 'phone' is an error
handleChange('email', 'test@test.com'); 
```

### Async Safety

The hook automatically manages `AbortController` instances. If a user types quickly, previous async validation requests are canceled, and `isValidating` correctly tracks the latest pending request.

---

## ✅ Best Practices

- **Stability**: Define your `schema` outside the component or wrap it in `useMemo` to prevent unnecessary engine re-initialization.
- **Server Components**: Keep the hook in a `'use client'` component. For server-side validation, use `@ctrovalidate/core` or `@ctrovalidate/next`.
- **Form Binding**: Bind `onChange={(e) => handleChange('name', e.target.value)}` for the most reactive experience.
