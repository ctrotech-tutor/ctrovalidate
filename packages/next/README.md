# @ctrovalidate/next

**Specialized Next.js integration for Ctrovalidate.**

`@ctrovalidate/next` provides purpose-built utilities for validating Next.js **Server Actions**. It allows you to reuse your standard Ctrovalidate schemas on the server to ensure high-performance, type-safe data handling with full async validation support.

## 🚀 Installation

```bash
pnpm add @ctrovalidate/next @ctrovalidate/core
```

## 🛠️ Usage

### Server Actions

The `validateAction` utility automatically parses `FormData` and validates it against your schema with full TypeScript type safety.

```typescript
// actions.ts
'use server';

import { validateAction } from '@ctrovalidate/next';

interface SignupForm {
  email: string;
  password: string;
}

const schema = {
  email: 'required|email',
  password: 'required|minLength:8',
};

export async function signup(prevState: any, formData: FormData) {
  // Validate with generic type support
  const { isValid, errors, values } = await validateAction<SignupForm>(
    formData,
    schema
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

### With Locale & Messages

```typescript
export async function signup(prevState: any, formData: FormData) {
  const { isValid, errors, values } = await validateAction<SignupForm>(
    formData,
    schema,
    {
      locale: 'es', // Use Spanish error messages
      messages: {
        email: 'El correo electrónico es obligatorio',
      },
    }
  );

  // ...
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

### `validateAction<T>(formData, schema, options)`

#### Parameters

- `formData`: The native `FormData` object from the request.
- `schema`: A Ctrovalidate schema object.
- `options`: Optional validation options:
  - `customRules`: Custom validation rules
  - `aliases`: Rule aliases
  - `messages`: Custom error messages
  - `locale`: Locale for error messages (e.g., 'en', 'es', 'fr')

#### Returns

A `Promise` resolving to an object containing:

- `isValid`: `boolean` - True if all rules passed.
- `errors`: `Partial<Record<keyof T, string>>` - Map of field names to error messages (only failed fields).
- `values`: `T` - The parsed and typed values from FormData.

### `formDataToValues<T>(formData)`

Converts `FormData` to a typed object. Handles multiple values for the same key (e.g., checkboxes).

#### Parameters

- `formData`: The native `FormData` object.

#### Returns

- `T` - The parsed values as a typed object.

## 📄 License

MIT © [Ctrotech](https://github.com/ctrotech-tutor)
