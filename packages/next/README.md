# @ctrovalidate/next

**Specialized Next.js integration for Ctrovalidate.**

`@ctrovalidate/next` provides purpose-built utilities for validating Next.js **Server Actions**. It allows you to reuse your standard Ctrovalidate schemas on the server to ensure high-performance, type-safe data handling.

## 🚀 Installation

```bash
pnpm add @ctrovalidate/next @ctrovalidate/core
```

## 🛠️ Usage

### Server Actions

The `validateAction` utility automatically parses `FormData` and validates it against your schema.

```typescript
// actions.ts
'use server';

import { validateAction } from '@ctrovalidate/next';

const schema = {
  email: 'required|email',
  password: 'required|minLength:8',
};

export async function signup(prevState: any, formData: FormData) {
  // Validate directly from FormData
  const { isValid, errors, values } = await validateAction(formData, schema);

  if (!isValid) {
    return {
      success: false,
      errors, // { email: 'Error message', password: null }
    };
  }

  // Safe to use values
  await db.createUser(values); // values is Record<string, unknown>

  return { success: true };
}
```

### Client Component

Consume the server action result using `useActionState` (React 19 / Next.js 15) or `useFormState` (older versions).

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
    <form action={action}>
      <div>
        <input name="email" type="email" />
        {state.errors?.email && <p className="error">{state.errors.email}</p>}
      </div>

      <div>
        <input name="password" type="password" />
        {state.errors?.password && (
          <p className="error">{state.errors.password}</p>
        )}
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
}
```

## 🧩 API Reference

### `validateAction(formData, schema, options)`

#### Parameters

- `formData`: The native `FormData` object from the request.
- `schema`: A Ctrovalidate schema object.
- `options`: Standard validation options (custom rules, messages, etc.).

#### Returns

An object containing:

- `isValid`: `boolean` - True if all rules passed.
- `errors`: `Record<string, string | null>` - Map of field names to error messages.
- `values`: `Record<string, unknown>` - The parsed values from FormData.

## 📄 License

MIT © [Ctrotech](https://github.com/ctrotech-tutor)
