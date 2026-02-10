# @ctrovalidate/next

**Server-side validation for Next.js Server Actions.**

`@ctrovalidate/next` provides purpose-built utilities for validating Next.js Server Actions with full TypeScript support and async validation capabilities.

[![npm version](https://img.shields.io/npm/v/@ctrovalidate/next.svg)](https://www.npmjs.com/package/@ctrovalidate/next)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

- 🎯 **Type-safe** - Full TypeScript support with generic types
- 🚀 **Server Actions** - Built specifically for Next.js Server Actions
- 📦 **FormData native** - Automatic FormData parsing
- ⚡ **Async support** - Handles async validation rules
- 🌍 **i18n ready** - Built-in locale and message customization
- 🔄 **Multi-value support** - Handles checkboxes and multi-select
- 📦 **Tiny** - Only 2 source files

---

## 📦 Installation

```bash
npm install @ctrovalidate/next @ctrovalidate/core next
```

```bash
pnpm add @ctrovalidate/next @ctrovalidate/core next
```

```bash
yarn add @ctrovalidate/next @ctrovalidate/core next
```

**Requirements:** Next.js >=13.4.0

---

## 🚀 Quick Start

### Server Action

```typescript
// app/actions.ts
'use server';

import { validateAction } from '@ctrovalidate/next';

interface SignupForm {
  email: string;
  password: string;
}

export async function signup(prevState: any, formData: FormData) {
  const { isValid, errors, values } = await validateAction<SignupForm>(
    formData,
    {
      email: 'required|email',
      password: 'required|minLength:8',
    }
  );

  if (!isValid) {
    return {
      success: false,
      errors, // Partial<Record<keyof SignupForm, string>>
    };
  }

  // values is fully typed as SignupForm
  await db.createUser(values);

  return { success: true };
}
```

### Client Component

```tsx
// app/SignupForm.tsx
'use client';

import { useActionState } from 'react';
import { signup } from './actions';

export default function SignupForm() {
  const [state, action] = useActionState(signup, {
    success: false,
    errors: {},
  });

  return (
    <form action={action}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          className={state.errors?.email ? 'error' : ''}
        />
        {state.errors?.email && (
          <p className="error-message">{state.errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className={state.errors?.password ? 'error' : ''}
        />
        {state.errors?.password && (
          <p className="error-message">{state.errors.password}</p>
        )}
      </div>

      <button type="submit">{state.success ? 'Success!' : 'Sign Up'}</button>
    </form>
  );
}
```

---

## 📚 API Reference

### `validateAction<T>(formData, schema, options?)`

Validates FormData against a schema for Server Actions.

#### Parameters

```typescript
formData: FormData                    // Native FormData from the request
schema: ValidationSchema              // Ctrovalidate schema object
options?: ValidateActionOptions       // Optional configuration
```

**ValidateActionOptions:**

```typescript
{
  customRules?: Record<string, RuleLogic | AsyncRuleLogic>;
  aliases?: Record<string, SchemaRule>;
  messages?: Record<string, string>;  // Custom error messages
  locale?: string;                    // i18n locale (e.g., 'es', 'fr')
}
```

#### Returns

```typescript
Promise<{
  isValid: boolean; // True if all rules passed
  errors: Partial<Record<keyof T, string>>; // Only failed fields
  values: T; // Parsed and typed values
}>;
```

---

### `formDataToValues<T>(formData)`

Converts FormData to a typed object. Handles multiple values for the same key (e.g., checkboxes).

#### Parameters

```typescript
formData: FormData; // Native FormData object
```

#### Returns

```typescript
T; // Parsed values as a typed object
```

---

## 🎯 Available Rules

All rules from `@ctrovalidate/core` are available:

| Category       | Rules                                                      |
| -------------- | ---------------------------------------------------------- |
| **Required**   | `required`                                                 |
| **Format**     | `email`, `url`, `ipAddress`, `phone`, `json`, `creditCard` |
| **String**     | `alpha`, `alphaNum`, `alphaDash`, `alphaSpaces`            |
| **Numeric**    | `numeric`, `integer`, `decimal`, `min:n`, `max:n`          |
| **Length**     | `minLength:n`, `maxLength:n`, `exactLength:n`              |
| **Range**      | `between:min,max`                                          |
| **Comparison** | `sameAs:value`                                             |
| **Complex**    | `strongPassword`                                           |

See [@ctrovalidate/core documentation](https://www.npmjs.com/package/@ctrovalidate/core) for detailed rule descriptions.

---

## 🎓 Usage Examples

### Basic Server Action

```typescript
'use server';

import { validateAction } from '@ctrovalidate/next';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export async function submitContact(prevState: any, formData: FormData) {
  const { isValid, errors, values } = await validateAction<ContactForm>(
    formData,
    {
      name: 'required|minLength:2',
      email: 'required|email',
      message: 'required|minLength:10',
    }
  );

  if (!isValid) {
    return { success: false, errors };
  }

  await sendEmail(values);
  return { success: true };
}
```

### With Locale & Custom Messages

```typescript
'use server';

import { translator } from '@ctrovalidate/core';
import { validateAction } from '@ctrovalidate/next';

// Register Spanish messages globally
translator.addMessages('es', {
  required: 'Este campo es obligatorio.',
  email: 'Por favor, introduce un correo electrónico válido.',
  minLength: 'Debe tener al menos {0} caracteres.',
});

export async function signup(prevState: any, formData: FormData) {
  const { isValid, errors, values } = await validateAction<SignupForm>(
    formData,
    {
      email: 'required|email',
      password: 'required|minLength:8',
    },
    {
      locale: 'es', // Use Spanish messages
      messages: {
        'password.minLength': 'La contraseña debe tener al menos 8 caracteres.',
      },
    }
  );

  if (!isValid) {
    return { success: false, errors };
  }

  await db.createUser(values);
  return { success: true };
}
```

### Custom Rules

```typescript
'use server';

import { validateAction } from '@ctrovalidate/next';

export async function signup(prevState: any, formData: FormData) {
  const { isValid, errors, values } = await validateAction<SignupForm>(
    formData,
    {
      username: 'required|noSpaces',
      email: 'required|email|isUniqueEmail',
    },
    {
      customRules: {
        noSpaces: (value) => !/\s/.test(String(value)),
        isUniqueEmail: async (value) => {
          const user = await db.findUserByEmail(String(value));
          return !user;
        },
      },
      messages: {
        noSpaces: 'Spaces are not allowed.',
        isUniqueEmail: 'This email is already registered.',
      },
    }
  );

  if (!isValid) {
    return { success: false, errors };
  }

  await db.createUser(values);
  return { success: true };
}
```

### Multi-Value Fields (Checkboxes)

```typescript
'use server';

import { validateAction } from '@ctrovalidate/next';

interface PreferencesForm {
  interests: string[];
  newsletter: string;
}

export async function updatePreferences(prevState: any, formData: FormData) {
  const { isValid, errors, values } = await validateAction<PreferencesForm>(
    formData,
    {
      interests: 'required', // Will be array if multiple checkboxes
      newsletter: 'required',
    }
  );

  if (!isValid) {
    return { success: false, errors };
  }

  // values.interests is string[] if multiple checkboxes selected
  await db.updateUserPreferences(values);
  return { success: true };
}
```

**Client Component:**

```tsx
<form action={action}>
  <label>
    <input type="checkbox" name="interests" value="tech" />
    Technology
  </label>
  <label>
    <input type="checkbox" name="interests" value="sports" />
    Sports
  </label>
  <label>
    <input type="checkbox" name="interests" value="music" />
    Music
  </label>

  <button type="submit">Save</button>
</form>
```

### Manual FormData Parsing

```typescript
'use server';

import { formDataToValues } from '@ctrovalidate/next';

export async function processForm(formData: FormData) {
  // Convert FormData to typed object
  const values = formDataToValues<{ name: string; email: string }>(formData);

  console.log(values.name); // Fully typed
  console.log(values.email); // Fully typed

  // Use values for custom processing
}
```

### With useFormState (Next.js 14)

For Next.js 14 and earlier, use `useFormState` instead of `useActionState`:

```tsx
'use client';

import { useFormState } from 'react-dom';
import { signup } from './actions';

export default function SignupForm() {
  const [state, action] = useFormState(signup, {
    success: false,
    errors: {},
  });

  return <form action={action}>{/* Same as above */}</form>;
}
```

### Error Handling Pattern

```tsx
'use client';

import { useActionState } from 'react';
import { signup } from './actions';

export default function SignupForm() {
  const [state, action, isPending] = useActionState(signup, {
    success: false,
    errors: {},
  });

  return (
    <form action={action}>
      <input
        name="email"
        type="email"
        disabled={isPending}
        className={state.errors?.email ? 'border-red-500' : 'border-gray-300'}
      />
      {state.errors?.email && (
        <p className="text-red-500 text-sm">{state.errors.email}</p>
      )}

      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>

      {state.success && <p className="text-green-500">Success!</p>}
    </form>
  );
}
```

---

## 🎨 Styling Examples

### Tailwind CSS

```tsx
'use client';

import { useActionState } from 'react';
import { signup } from './actions';

export default function SignupForm() {
  const [state, action] = useActionState(signup, {
    success: false,
    errors: {},
  });

  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          name="email"
          type="email"
          className={`
            mt-1 block w-full px-3 py-2 border rounded-md shadow-sm
            focus:outline-none focus:ring-2
            ${
              state.errors?.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }
          `}
        />
        {state.errors?.email && (
          <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Sign Up
      </button>
    </form>
  );
}
```

---

## 🔄 Server vs Client Validation

### Server-Side (Recommended)

```typescript
// actions.ts
'use server';

export async function signup(prevState: any, formData: FormData) {
  const { isValid, errors, values } = await validateAction<SignupForm>(...);
  // Server-side validation is secure and authoritative
}
```

### Client-Side (Optional)

For better UX, combine with `@ctrovalidate/react`:

```tsx
'use client';

import { useCtrovalidate } from '@ctrovalidate/react';
import { signup } from './actions';

export default function SignupForm() {
  // Client-side validation for instant feedback
  const { values, errors, handleChange, handleBlur } =
    useCtrovalidate<SignupForm>({
      initialValues: { email: '', password: '' },
      schema: { email: 'required|email', password: 'required|minLength:8' },
    });

  // Server-side validation for security
  const [state, action] = useActionState(signup, {
    success: false,
    errors: {},
  });

  return (
    <form action={action}>
      <input
        name="email"
        value={values.email}
        onChange={(e) => handleChange('email', e.target.value)}
        onBlur={() => handleBlur('email')}
      />
      {/* Show client-side errors immediately */}
      {errors.email && <p>{errors.email}</p>}
      {/* Show server-side errors after submission */}
      {state.errors?.email && <p>{state.errors.email}</p>}
    </form>
  );
}
```

---

## 📚 Full Documentation

For comprehensive guides, all available rules, and advanced usage:

**[Visit Ctrovalidate Documentation](https://ctrovalidate.vercel.app)**

---

## 🤝 Related Packages

- **[@ctrovalidate/core](https://www.npmjs.com/package/@ctrovalidate/core)** - Platform-agnostic validation engine
- **[@ctrovalidate/browser](https://www.npmjs.com/package/@ctrovalidate/browser)** - Vanilla JS DOM integration
- **[@ctrovalidate/react](https://www.npmjs.com/package/@ctrovalidate/react)** - React hooks (for client-side)
- **[@ctrovalidate/vue](https://www.npmjs.com/package/@ctrovalidate/vue)** - Vue composables
- **[@ctrovalidate/svelte](https://www.npmjs.com/package/@ctrovalidate/svelte)** - Svelte stores

---

## 📄 License

MIT © [Ctrotech](https://github.com/ctrotech-tutor)
