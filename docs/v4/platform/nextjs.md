---
title: Next.js Integration | Server Actions & Full-Stack Validation
description: Learn how to implement end-to-end validation in Next.js using Ctrovalidate's shared schemas and Server Action utilities.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Platform
    url: https://ctrovalidate.vercel.app/v4/platform/nextjs
  - name: Next.js
    url: https://ctrovalidate.vercel.app/v4/platform/nextjs
---

# Next.js Integration

Ctrovalidate provides a powerful, full-stack validation story for Next.js applications, specifically optimized for the **App Router** and **Server Actions**.

---

## 🏗️ The Shared Schema Pattern

The "Gold Standard" for Next.js is to define your `ValidationSchema` in a shared file (e.g., `lib/schemas.ts`) to ensure identical logic on both the client (for real-time feedback) and the server (for security).

```typescript
// lib/schemas.ts
export const SignupSchema = {
  email: 'required|email',
  password: 'required|minLength:8'
};
```

---

## ⚡ Client-Side: `useCtrovalidate`

Use the `@ctrovalidate/react` hook in your `'use client'` components for instant user feedback.

```tsx
'use client';

import { useCtrovalidate } from '@ctrovalidate/react';
import { SignupSchema } from '@/lib/schemas';
import { signupAction } from '@/actions/signup';

export default function SignupForm() {
  const { values, errors, handleChange } = useCtrovalidate({
    schema: SignupSchema
  });

  return (
    <form action={signupAction}>
      <input 
        name="email" 
        onChange={(e) => handleChange('email', e.target.value)} 
      />
      {errors.email && <span>{errors.email}</span>}
      <button type="submit">Sign Up</button>
    </form>
  );
}
```

---

## 🛡️ Server-Side: `validateAction`

In your Server Actions, use the `@ctrovalidate/next` utilities to securely validate the incoming `FormData`.

```typescript
'use server';

import { validateAction } from '@ctrovalidate/next';
import { SignupSchema } from '@/lib/schemas';

export async function signupAction(formData: FormData) {
  // Validate the form data against the SAME schema
  const { isValid, errors, values } = await validateAction(formData, SignupSchema);

  if (!isValid) {
    return { errors };
  }

  // ✅ 'values' is now parsed and validated
  await db.user.create({ data: values });
}
```

---

## 🧩 Advanced: Handling Multi-Value Fields

`@ctrovalidate/next` includes `formDataToValues`, a specialized utility that correctly handles multiple values for the same key (e.g., checkboxes with the same name).

```typescript
import { formDataToValues } from '@ctrovalidate/next';

const values = formDataToValues(formData);
// { roles: ['admin', 'editor'], email: '...' }
```

---

## ✅ Best Practices

- **Never Trust the Client**: Always re-validate on the server using `validateAction`.
- **Error Propagation**: Return the `results` object from your Server Action and use it to populate the `errors` state in your Client Component (e.g., via `useFormState`).
- **Edge Compatible**: Both `@ctrovalidate/core` and `@ctrovalidate/next` are fully compatible with the Next.js Edge Runtime.
