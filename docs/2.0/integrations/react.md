# React Integration

Ctrovalidate is a DOM-first library, making it an ideal "headless" validation engine for React. By running validation outside of the React render cycle, you achieve **peak performance** without the overhead of heavy state-management libraries.

---

## ⚙️ Setting Up Your React Project

We recommend using **Vite** for a modern React development environment.

### 1. Initialize with Vite
```bash
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app
npm install ctrovalidate
npm run dev
```

### 2. Styling (Tailwind CSS)
For the best aesthetic results with our monochrome design, we recommend Tailwind CSS.
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 🏗️ The Industrial Pattern

The most reliable way to integrate Ctrovalidate is to use `useRef` to hold the validator instance. This ensures the library survives re-renders while maintaining a stable connection to the DOM.

### Complete Implementation

```tsx
import React, { useEffect, useRef } from 'react';
import { Ctrovalidate } from 'ctrovalidate';

export const IndustrialSignup = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const validatorRef = useRef<Ctrovalidate | null>(null);

  useEffect(() => {
    if (formRef.current && !validatorRef.current) {
      // Initialize once on mount
      validatorRef.current = new Ctrovalidate(formRef.current, {
        realTime: true,
        logLevel: Ctrovalidate.LogLevel.DEBUG,
        errorClass: 'border-black ring-1 ring-black',
        errorMessageClass: 'text-xs font-mono uppercase mt-1'
      });
    }

    // Optional: Clean up on unmount
    return () => {
      validatorRef.current?.destroy();
      validatorRef.current = null;
    };
  }, []);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (await validatorRef.current?.validate()) {
      const formData = new FormData(formRef.current!);
      console.log('Verification successful:', Object.fromEntries(formData));
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 border border-black bg-white">
      <h2 className="text-2xl font-bold mb-6 uppercase tracking-tighter">Register Account</h2>
      
      <form ref={formRef} noValidate onSubmit={onFormSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium uppercase mb-1">Email</label>
          <input
            name="email"
            type="email"
            data-ctrovalidate-rules="required|email"
            className="w-full border-b border-black py-2 focus:outline-none focus:border-gray-400 transition-colors"
          />
          <div className="error-message" />
        </div>

        <button type="submit" className="w-full bg-black text-white py-3 uppercase text-sm font-bold hover:bg-gray-800 transition-colors">
          Initialize Access
        </button>
      </form>
    </div>
  );
};
```

---

## 🔄 Handling Dynamic State

If your form depends on dynamic React state (e.g., a "Toggle Password" field), Ctrovalidate handles it seamlessly. Because it reads the DOM on the fly during validation, it will always see the current value of the elements.

### When to call `.refresh()`
If you add or remove input elements from the DOM using React's conditional rendering (`{showField && <input ... />}`), you should call `validator.refresh()` inside a `useEffect` that tracks that state.

```tsx
useEffect(() => {
  validatorRef.current?.refresh();
}, [isAdvancedMode]);
```

---

## ⚡ Why Use Ctrovalidate with React?

1.  **Skip the Re-renders**: Ctrovalidate handles error display and class toggling directly in the DOM. Your component only re-renders when **you** want it to.
2.  **Type Safety**: Full TypeScript support with `CtrovalidateOptions` and `RuleLogic` types.
3.  **A11y Automated**: No more manual `aria-invalid` management.

> [!TIP]
> Use the `pendingClass` option to show high-fidelity loading states during async checks (like "Username Available") without writing any custom React state logic.

## Next Steps

- **[Next.js integration](./nextjs.md)** — Working with Server Components and Hydration.
- **[API Methods Reference](../api/methods.md)** — Deep dive into `getError()` and `isDirty()`.
