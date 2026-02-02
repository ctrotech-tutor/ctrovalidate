---
title: Next.js Integration | Server & Client-Side Validation
description: Best practices for using Ctrovalidate with Next.js App Router, including Server Components and hydration-safe patterns.
---

# Next.js Integration

Ctrovalidate works seamlessly with Next.js 13+ and the App Router. Because Ctrovalidate is a client-side library, you'll use the `"use client"` directive to create validation boundaries.

---

## Installation

```bash
npm install ctrovalidate
```

---

## App Router Pattern

Forms using Ctrovalidate must be Client Components. Use the `"use client"` directive at the top of your component file.

### Complete Example

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { Ctrovalidate, LogLevel } from 'ctrovalidate';

export default function ContactForm() {
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
      // Use Server Actions or API routes
      console.log('Form valid:', Object.fromEntries(formData));
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
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          data-ctrovalidate-rules="required|minLength:10"
        />
        <div className="error-message" />
      </div>

      <button type="submit">Send Message</button>
    </form>
  );
}
```

---

## Using in a Page

Import your Client Component in any page:

```tsx
// app/contact/page.tsx

import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <main>
      <h1>Contact Us</h1>
      <ContactForm />
    </main>
  );
}
```

---

## Server Actions Integration

Ctrovalidate works perfectly with Next.js Server Actions for form submission:

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { Ctrovalidate } from 'ctrovalidate';
import { submitForm } from './actions';

export default function ServerActionForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const validatorRef = useRef<Ctrovalidate | null>(null);

  useEffect(() => {
    if (formRef.current) {
      validatorRef.current = new Ctrovalidate(formRef.current, {
        realTime: true
      });
    }
    return () => validatorRef.current?.destroy();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate before sending to server
    if (await validatorRef.current?.validate()) {
      const formData = new FormData(formRef.current!);
      await submitForm(formData);
    }
  };

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

```typescript
// actions.ts
'use server';

export async function submitForm(formData: FormData) {
  // Server-side processing
  const email = formData.get('email');
  // ... save to database
}
```

---

## Hydration Safety

Ctrovalidate is hydration-safe by design:

1. **`useRef` Initialization**: The validator is created inside `useEffect`, which only runs on the client
2. **Server Rendering**: During SSR, Next.js renders the form's static HTML with `data-ctrovalidate-rules` attributes
3. **Client Hydration**: After hydration, `useEffect` fires and Ctrovalidate initializes

### Why This Works

- The `data-*` attributes are standard HTML and render correctly on the server
- The validator only initializes after React hydrates the component
- No hydration mismatches occur because validation logic runs client-side only

---

## TypeScript Support

Full TypeScript support with proper types:

```tsx
import { Ctrovalidate, LogLevel, type CtrovalidateOptions } from 'ctrovalidate';

const options: CtrovalidateOptions = {
  realTime: true,
  logLevel: LogLevel.DEBUG,
  errorClass: 'border-red-500',
  errorMessageClass: 'text-red-600 text-sm'
};

const validator = new Ctrovalidate(formElement, options);
```

---

## Best Practices

### 1. Always Use `"use client"`

Mark components using Ctrovalidate as Client Components:

```tsx
'use client';

import { Ctrovalidate } from 'ctrovalidate';
// ... component code
```

### 2. Initialize in `useEffect`

Ensure the validator only runs on the client:

```tsx
useEffect(() => {
  if (formRef.current && !validatorRef.current) {
    validatorRef.current = new Ctrovalidate(formRef.current);
  }
}, []);
```

### 3. Clean Up on Unmount

Prevent memory leaks:

```tsx
useEffect(() => {
  // ... initialization
  return () => {
    validatorRef.current?.destroy();
  };
}, []);
```

### 4. Validate Before Server Actions

Always validate client-side before calling Server Actions:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (await validatorRef.current?.validate()) {
    await submitToServer(formData);
  }
};
```

---

## Benefits

- **Lightweight**: <5KB gzipped, smaller than form libraries
- **Server Action Ready**: Validate before sending data to server
- **SEO Friendly**: `data-*` attributes render in SSR
- **Hydration Safe**: No client/server mismatches

> [!CAUTION]
> Do not use Ctrovalidate in Server Components. It requires browser APIs (`window`, `document`) that are not available on the server.

---

## Next Steps

- **[React Integration](./react.md)** — General React patterns
- **[Dynamic Fields Guide](../guide/dynamic-fields.md)** — Managing field lifecycle
- **[API Reference](../api/methods.md)** — All 9 instance methods
- **[Server Actions Docs](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)** — Next.js documentation
