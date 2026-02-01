---
title: Next.js Integration | Server & Client-Side Validation
description: Best practices for using Ctrovalidate within Next.js applications, including App Router support and hydration-safe form patterns.
---

# Next.js Integration

Yes, Ctrovalidate works perfectly with [Next.js](https://nextjs.org/), the React framework for production. However, because Next.js utilizes Server-Side Rendering (SSR) and, more recently, React Server Components (RSC), you must be careful to ensure that Ctrovalidate—a client-side library—only runs in the browser.

The key to using any browser-dependent library in Next.js is the `"use client"` directive.

## The Core Pattern in the App Router

This guide focuses on the modern Next.js App Router. The pattern is nearly identical to the standard React pattern, with the addition of `"use client"`.

1.  **`"use client"` Directive:** Any component that uses React hooks like `useState`, `useEffect`, or `useRef`, or interacts with browser APIs, must be a Client Component. You declare this by placing `"use client";` at the very top of your component file.
2.  **`useRef` for DOM Elements:** Use the `useRef` hook to get a stable reference to your `<form>` DOM element.
Ctrovalidate is fully compatible with Next.js 15+ and the **App Router**. Because the primary validation logic is DOM-based, you'll use `"use client"` directives to create high-performance, hydration-safe validation boundaries.

---

## ⚙️ Setting Up Your Next.js Project

We recommend using the official `create-next-app` CLI with TypeScript and Tailwind CSS.

### 1. Initialize
```bash
npx create-next-app@latest my-next-app --typescript --tailwind --eslint
cd my-next-app
npm install ctrovalidate
```

---

## 🏗️ The App Router Pattern

Validated forms in Next.js should be created as **Client Components**. This ensures that Ctrovalidate has access to the browser's DOM APIs (like `HTMLFormElement`) which are not available on the server.

### Complete Client Component

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { Ctrovalidate } from 'ctrovalidate';

export default function IndustrialContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const validator = useRef<Ctrovalidate | null>(null);

  useEffect(() => {
    if (formRef.current && !validator.current) {
      // Initialize only on the client
      validator.current = new Ctrovalidate(formRef.current, {
        realTime: true,
        logLevel: Ctrovalidate.LogLevel.INFO,
        errorClass: 'border-red-500 bg-red-50',
        errorMessageClass: 'text-sm text-red-700 font-bold mt-2'
      });
    }

    return () => {
      validator.current?.destroy();
      validator.current = null;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (await validator.current?.validate()) {
      const formData = new FormData(formRef.current!);
      // Use Next.js Server Actions or API routes here
      alert('Security Verification Passed.');
    }
  };

  return (
    <div className="max-w-xl mx-auto my-12 p-10 border-2 border-dashed border-black">
      <h1 className="text-3xl font-black uppercase mb-8">System Access</h1>
      
      <form ref={formRef} noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col">
          <label className="text-xs uppercase font-bold text-gray-500">Node ID (Email)</label>
          <input
            name="node_id"
            type="email"
            data-ctrovalidate-rules="required|email"
            className="border-b-2 border-black p-2 focus:bg-gray-50 outline-none transition-all"
          />
          <div className="error-message"></div>
        </div>

        <button type="submit" className="bg-black text-white p-4 font-bold uppercase hover:bg-white hover:text-black border-2 border-black transition-all">
          Authorize Payload
        </button>
      </form>
    </div>
  );
}
```

---

## 🔄 Hydration & SSR Safety

Ctrovalidate is designed to be **Hydration Safe**. 

1.  **Ref Initialization**: By using `useRef` and initializing inside `useEffect`, we guarantee that the library only touches the DOM after the component has successfully hydrated on the client.
2.  **Server Rendering**: On the server, Next.js renders the static HTML of your form. Ctrovalidate's `data-*` attributes are standard HTML attributes, so they are SEO-friendly and contribute to a fast First Contentful Paint (FCP).

---

## ⚡ Why Use Ctrovalidate with Next.js?

1.  **Lightweight**: At <5KB, Ctrovalidate is significantly smaller than libraries like Formik or React Hook Form, keeping your client bundle lean.
2.  **Server Action Ready**: Use Ctrovalidate to pre-verify data on the client before sending it to a high-speed Server Action.
3.  **Zero CSS Bloat**: Ctrovalidate doesn't ship its own styles. It relies on your existing Tailwind or Global CSS, keeping your CSS bundle small.

> [!CAUTION]
> Avoid using Ctrovalidate directly in Server Components (files without `"use client"`). The library requires the `window` and `document` objects to operate.

## Next Steps

- **[Framework Integration Suite](../guide/examples.md)** — See all demos in action.
- **[Public Methods API](../api/methods.md)** — Master programmatic control.

## Example: A Next.js Client Component

Let's create a `RegistrationForm` component within a Next.js project using the App Router.

### 1. Create the Client Component

Create a new file, for example, `components/RegistrationForm.tsx`. The `"use client"` directive at the top is essential.

```tsx
// components/RegistrationForm.tsx

'use client'; // Essential for browser-side validation

import React, { useRef, useEffect } from 'react';
import { Ctrovalidate } from 'ctrovalidate';

export function RegistrationForm() {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      // Initialize industrial-grade validator
      const validator = new Ctrovalidate(formRef.current, {
        realTime: true,
        logLevel: Ctrovalidate.LogLevel.DEBUG,
        pendingClass: 'is-validating',
      });
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Native submission handling or manual .validate() call
  };

  return (
    <div className="showcase-container">
      <form ref={formRef} noValidate className="validation-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="e.g. johndoe"
            data-ctrovalidate-rules="required|minLength:3|alphaDash"
          />
          <div className="error-message"></div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="john@example.com"
            data-ctrovalidate-rules="required|email"
          />
          <div className="error-message"></div>
        </div>

        <button type="submit" className="submit-btn text-white">
          Deploy Registration
        </button>
      </form>
    </div>
  );
}
```

### 2. Use the Component in a Page

Now, you can import and use this `RegistrationForm` component in any of your pages (e.g., `app/register/page.tsx`).

```tsx
// app/register/page.tsx

import { RegistrationForm } from '@/components/RegistrationForm';

export default function RegisterPage() {
  return (
    <main>
      <h1>Create Your Account</h1>
      <RegistrationForm />
    </main>
  );
}
```

### Why This Works

- By marking the component with `"use client"`, you tell Next.js to ship the component's JavaScript to the browser and render it there.
- During the server-side rendering pass, the component might be pre-rendered as static HTML, but the `useEffect` hook will not run.
- Once the page loads in the browser and React "hydrates" the HTML, the `useEffect` hook will fire, and Ctrovalidate will be safely initialized in the browser environment where it can find the form element and attach its event listeners.

This pattern allows you to benefit from Next.js's performance features while still using powerful client-side libraries like Ctrovalidate for rich interactivity.
