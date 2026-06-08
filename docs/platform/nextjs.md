---
title: Next.js Integration | Server Actions & Full-Stack Validation
description: Implement end-to-end validation in Next.js using shared schemas, Server Action utilities, and optional client-side hooks.
---

# Next.js Integration

`ctrovalidate-next` provides `validateAction` and `formDataToValues` for server-side validation in Next.js Server Actions. Combined with `ctrovalidate-react` on the client, you get a full-stack validation story with shared schemas.

---

## Installation

```bash
npm install ctrovalidate-next ctrovalidate-core
```

**Requirements:** Next.js >=13.4.0

---

## Shared Schema Pattern

Define your schema once in a shared file to ensure identical logic on both client and server:

```typescript
// lib/schemas.ts
export const signupSchema = {
  email: 'required|email',
  password: 'required|minLength:8',
};
```

---

## Server-Side: `validateAction`

```typescript
'use server';

import { validateAction } from 'ctrovalidate-next';
import { signupSchema } from '@/lib/schemas';

export async function signup(prevState: unknown, formData: FormData) {
  const { isValid, errors, values } = await validateAction<{
    email: string;
    password: string;
  }>(formData, signupSchema);

  if (!isValid) {
    return { success: false, errors };
  }

  // values is typed — use it safely
  await db.user.create({ data: values });
  return { success: true };
}
```

### Parameters

| Param | Type | Description |
|-------|------|-------------|
| `formData` | FormData | Native FormData from the Server Action |
| `schema` | ValidationSchema | Field-to-rules mapping |
| `options` | ValidateActionOptions | Optional (customRules, aliases, messages, locale) |

### `ValidateActionOptions`

```typescript
interface ValidateActionOptions {
  customRules?: Record<string, RuleLogic | AsyncRuleLogic>;
  aliases?: Record<string, SchemaRule>;
  messages?: Record<string, string>;
  locale?: string;
}
```

### Return

```typescript
Promise<{
  isValid: boolean;
  errors: Partial<Record<keyof T, string>>;
  values: T;
}>
```

- `isValid` — `true` only if all schema fields pass
- `errors` — Object with error strings for failed fields; valid fields are omitted
- `values` — FormData parsed into a typed object (see `formDataToValues`)

---

## Client-Side: `useCtrovalidate` (Optional)

For instant feedback before submission, use `ctrovalidate-react` in `'use client'` components with the **same schema**:

```tsx
'use client';

import { useCtrovalidate } from 'ctrovalidate-react';
import { signupSchema } from '@/lib/schemas';
import { signup } from './actions';
import { useActionState } from 'react';

export default function SignupForm() {
  const { values, errors, handleChange, handleBlur } =
    useCtrovalidate({
      initialValues: { email: '', password: '' },
      schema: signupSchema,
    });

  const [state, action, isPending] = useActionState(signup, {
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
      {errors.email && <p>{errors.email}</p>}
      {state.errors?.email && <p>{state.errors.email}</p>}

      <input
        type="password"
        name="password"
        value={values.password}
        onChange={(e) => handleChange('password', e.target.value)}
        onBlur={() => handleBlur('password')}
      />
      {errors.password && <p>{errors.password}</p>}
      {state.errors?.password && <p>{state.errors.password}</p>}

      <button type="submit" disabled={isPending}>Sign Up</button>
    </form>
  );
}
```

---

## `formDataToValues<T>(formData)`

Converts `FormData` to a typed plain object. Handles multiple values for the same key (checkboxes, multi-select) by collecting them into an array.

```typescript
import { formDataToValues } from 'ctrovalidate-next';

interface Preferences {
  interests: string[];
  newsletter: string;
}

const values = formDataToValues<Preferences>(formData);
// If "interests" checkbox appears 3 times → values.interests is ['a', 'b', 'c']
```

**Behavior:**
- Single value per key → stored as-is (a string)
- Multiple values for the same key → stored as `string[]`
- No entries for a key → key is absent from the result

---

## Best Practices

1. **Never trust the client** — Always validate on the server with `validateAction`. Client-side validation is UX-only.
2. **Share schemas** — Export schemas from a `lib/schemas.ts` to keep client and server in sync.
3. **Display both error sources** — Show client-side errors for instant feedback and server-side errors (from `useActionState`/`useFormState`) after submission.
4. **Edge Runtime compatible** — Both `ctrovalidate-core` and `ctrovalidate-next` work in the Edge Runtime.
