# @ctrovalidate/react

**The professional-grade React adapter for Ctrovalidate.**

`@ctrovalidate/react` provides a type-safe hook for React 18+ and Next.js applications. It uses a **controlled input** pattern to give you full control over your UI while managing validation state automatically.

## 🚀 Installation

```bash
pnpm add @ctrovalidate/react @ctrovalidate/core
```

## 🛠️ Usage

### Basic Example

There is no "register" ref. Instead, you bind `value`, `onChange`, and `onBlur` manually. This ensures maximum flexibility for UI libraries.

```tsx
import { useCtrovalidate } from '@ctrovalidate/react';

interface LoginForm {
  email: string;
}

export default function Login() {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    validateForm,
    isValidating,
  } = useCtrovalidate<LoginForm>({
    initialValues: { email: '' },
    schema: {
      email: 'required|email',
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validateForm();

    if (isValid) {
      console.log('Valid email:', values.email);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          className={errors.email ? 'is-invalid' : ''}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <button type="submit" disabled={isValidating.email}>
        {isValidating.email ? 'Checking...' : 'Login'}
      </button>
    </form>
  );
}
```

## 🧩 API Reference

### `useCtrovalidate(options)`

#### Options

- `schema`: A Ctrovalidate schema object.
- `initialValues`: Initial state for the form.
- `validateOnBlur`: (default: `true`) Trigger validation on blur.
- `locale`: Optional locale code for error messages.

#### Returns

- `values`: Current form state object.
- `errors`: Object containing error messages (nullable strings).
- `isDirty`: Object tracking touched fields.
- `isValidating`: Object tracking async validation status.
- `handleChange(name, value)`: Updates value and triggers change validation.
- `handleBlur(name)`: Marks as dirty and triggers blur validation.
- `validateField(name)`: Manually validate a single field.
- `validateForm()`: Validates all fields and returns boolean.
- `reset(newValues?)`: Resets form state.

## 📄 License

MIT © [Ctrotech](https://github.com/ctrotech-tutor)
