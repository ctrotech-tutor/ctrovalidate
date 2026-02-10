# @ctrovalidate/react

**Type-safe form validation hook for React.**

`@ctrovalidate/react` provides a headless `useCtrovalidate` hook that brings the power of Ctrovalidate to React applications. Built for controlled inputs with full TypeScript support and zero UI opinions.

[![npm version](https://img.shields.io/npm/v/@ctrovalidate/react.svg)](https://www.npmjs.com/package/@ctrovalidate/react)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

- 🎯 **Type-safe** - Full TypeScript support with excellent inference
- 🎣 **Single hook** - `useCtrovalidate` is all you need
- 🎨 **Headless** - No UI components, full control over rendering
- ⚡ **Async support** - Handles async validation with abort signals
- 🔄 **Controlled inputs** - Works with any UI library (MUI, Chakra, Ant Design)
- 🌍 **i18n ready** - Built-in locale and message customization
- 🚀 **Performant** - Stable callbacks, minimal re-renders
- 📦 **Tiny** - Only 3 source files

---

## 📦 Installation

```bash
npm install @ctrovalidate/react @ctrovalidate/core react
```

```bash
pnpm add @ctrovalidate/react @ctrovalidate/core react
```

```bash
yarn add @ctrovalidate/react @ctrovalidate/core react
```

**Requirements:** React >=16.8.0

---

## 🚀 Quick Start

```tsx
import { useCtrovalidate } from '@ctrovalidate/react';

interface LoginForm {
  email: string;
  password: string;
}

function LoginPage() {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    validateForm,
    isValidating,
  } = useCtrovalidate<LoginForm>({
    initialValues: {
      email: '',
      password: '',
    },
    schema: {
      email: 'required|email',
      password: 'required|minLength:8',
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await validateForm();

    if (isValid) {
      console.log('Form data:', values);
      // Submit to API
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={values.password}
          onChange={(e) => handleChange('password', e.target.value)}
          onBlur={() => handleBlur('password')}
          className={errors.password ? 'error' : ''}
        />
        {errors.password && (
          <span className="error-message">{errors.password}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isValidating.email || isValidating.password}
      >
        {isValidating.email || isValidating.password
          ? 'Validating...'
          : 'Login'}
      </button>
    </form>
  );
}
```

---

## 📚 API Reference

### `useCtrovalidate<T>(options)`

The main hook for form validation.

#### Options

```typescript
interface UseCtrovalidateOptions<T> {
  schema: ValidationSchema; // Required: validation rules
  initialValues?: T; // Initial form state
  validateOnBlur?: boolean; // default: true
  customRules?: Record<string, RuleLogic | AsyncRuleLogic>;
  aliases?: Record<string, SchemaRule>;
  messages?: Record<string, string>; // Custom error messages
  locale?: string; // i18n locale (e.g., 'es', 'fr')
}
```

#### Returns

```typescript
interface UseCtrovalidateReturn<T> {
  values: T; // Current form state
  errors: Partial<Record<keyof T, string>>; // Error messages (undefined if valid)
  isDirty: Partial<Record<keyof T, boolean>>; // Touched fields
  isValidating: Partial<Record<keyof T, boolean>>; // Async validation status
  handleChange: (name: keyof T, value: T[keyof T]) => void;
  handleBlur: (name: keyof T) => void;
  validateField: (name: keyof T, value?: T[keyof T]) => Promise<boolean>;
  validateForm: () => Promise<boolean>;
  reset: (newValues?: Partial<T>) => void;
}
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

### Basic Form

```tsx
interface SignupForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignupPage() {
  const { values, errors, handleChange, handleBlur, validateForm } =
    useCtrovalidate<SignupForm>({
      initialValues: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      schema: {
        username: 'required|minLength:3|maxLength:20|alphaDash',
        email: 'required|email',
        password: 'required|minLength:8|strongPassword',
        confirmPassword: 'required',
      },
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (await validateForm()) {
      // Submit form
    }
  };

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
}
```

### With Material-UI

```tsx
import { TextField, Button } from '@mui/material';
import { useCtrovalidate } from '@ctrovalidate/react';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

function ContactPage() {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    validateForm,
    isValidating,
  } = useCtrovalidate<ContactForm>({
    initialValues: { name: '', email: '', message: '' },
    schema: {
      name: 'required|minLength:2',
      email: 'required|email',
      message: 'required|minLength:10',
    },
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (await validateForm()) {
          // Submit
        }
      }}
    >
      <TextField
        label="Name"
        value={values.name}
        onChange={(e) => handleChange('name', e.target.value)}
        onBlur={() => handleBlur('name')}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
      />

      <TextField
        label="Email"
        type="email"
        value={values.email}
        onChange={(e) => handleChange('email', e.target.value)}
        onBlur={() => handleBlur('email')}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
      />

      <TextField
        label="Message"
        multiline
        rows={4}
        value={values.message}
        onChange={(e) => handleChange('message', e.target.value)}
        onBlur={() => handleBlur('message')}
        error={!!errors.message}
        helperText={errors.message}
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        disabled={Object.values(isValidating).some(Boolean)}
      >
        Send Message
      </Button>
    </form>
  );
}
```

### Custom Rules

```tsx
import { useCtrovalidate } from '@ctrovalidate/react';

interface UserForm {
  username: string;
  email: string;
}

function UserForm() {
  const { values, errors, handleChange, handleBlur, validateForm } =
    useCtrovalidate<UserForm>({
      initialValues: { username: '', email: '' },
      schema: {
        username: 'required|noSpaces',
        email: 'required|email|isUniqueEmail',
      },
      customRules: {
        noSpaces: (value) => !/\s/.test(String(value)),
        isUniqueEmail: async (value) => {
          const response = await fetch(`/api/check-email?email=${value}`);
          const { isUnique } = await response.json();
          return isUnique;
        },
      },
      messages: {
        noSpaces: 'Spaces are not allowed.',
        isUniqueEmail: 'This email is already registered.',
      },
    });

  // ... rest of component
}
```

### Internationalization (i18n)

```tsx
import { useCtrovalidate } from '@ctrovalidate/react';
import { translator } from '@ctrovalidate/core';

// Register Spanish messages
translator.addMessages('es', {
  required: 'Este campo es obligatorio.',
  email: 'Por favor, introduce un correo electrónico válido.',
  minLength: 'Debe tener al menos {0} caracteres.',
});

function SpanishForm() {
  const { values, errors, handleChange, handleBlur, validateForm } =
    useCtrovalidate<{ email: string }>({
      initialValues: { email: '' },
      schema: { email: 'required|email|minLength:5' },
      locale: 'es', // Use Spanish messages
    });

  // ... rest of component
}
```

### Manual Field Validation

```tsx
function SearchForm() {
  const { values, errors, handleChange, validateField } = useCtrovalidate<{
    query: string;
  }>({
    initialValues: { query: '' },
    schema: { query: 'required|minLength:3' },
    validateOnBlur: false, // Disable auto-validation
  });

  const handleSearch = async () => {
    const isValid = await validateField('query');

    if (isValid) {
      // Perform search
      console.log('Searching for:', values.query);
    }
  };

  return (
    <div>
      <input
        value={values.query}
        onChange={(e) => handleChange('query', e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
      {errors.query && <span>{errors.query}</span>}
    </div>
  );
}
```

### Reset Form

```tsx
function EditProfileForm() {
  const { values, errors, handleChange, handleBlur, validateForm, reset } =
    useCtrovalidate<{ name: string; bio: string }>({
      initialValues: { name: 'John Doe', bio: 'Developer' },
      schema: {
        name: 'required|minLength:2',
        bio: 'maxLength:500',
      },
    });

  const handleSave = async () => {
    if (await validateForm()) {
      // Save to API
      console.log('Saved:', values);
    }
  };

  const handleCancel = () => {
    // Reset to initial values
    reset();
  };

  const handleClear = () => {
    // Reset to empty values
    reset({ name: '', bio: '' });
  };

  // ... rest of component
}
```

### Conditional Validation

```tsx
interface ShippingForm {
  country: string;
  state: string;
  zipCode: string;
}

function ShippingForm() {
  const { values, errors, handleChange, handleBlur, validateForm } =
    useCtrovalidate<ShippingForm>({
      initialValues: { country: '', state: '', zipCode: '' },
      schema: {
        country: 'required',
        state: values.country === 'USA' ? 'required' : '',
        zipCode: values.country === 'USA' ? 'required|exactLength:5' : '',
      },
    });

  // ... rest of component
}
```

---

## 🎨 Styling Examples

### Tailwind CSS

```tsx
function TailwindForm() {
  const { values, errors, handleChange, handleBlur, validateForm } =
    useCtrovalidate<{ email: string }>({
      initialValues: { email: '' },
      schema: { email: 'required|email' },
    });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await validateForm();
      }}
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          className={`
            w-full px-3 py-2 border rounded-md
            focus:outline-none focus:ring-2
            ${
              errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }
          `}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
}
```

### Styled Components

```tsx
import styled from 'styled-components';

const Input = styled.input<{ hasError?: boolean }>`
  border: 2px solid ${(props) => (props.hasError ? '#dc3545' : '#ced4da')};
  padding: 0.5rem;
  border-radius: 0.25rem;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? '#dc3545' : '#007bff')};
  }
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`;

function StyledForm() {
  const { values, errors, handleChange, handleBlur } = useCtrovalidate<{
    email: string;
  }>({
    initialValues: { email: '' },
    schema: { email: 'required|email' },
  });

  return (
    <form>
      <Input
        type="email"
        value={values.email}
        onChange={(e) => handleChange('email', e.target.value)}
        onBlur={() => handleBlur('email')}
        hasError={!!errors.email}
      />
      {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
    </form>
  );
}
```

---

## 🔄 Validation Behavior

### On Blur

- Field is validated when user leaves the field
- Field is marked as "dirty"
- Error message is displayed if validation fails

### On Change

- Field value is updated immediately
- Validation is triggered after blur (when dirty)
- Provides instant feedback after first interaction

### Manual Validation

- Use `validateField(name)` to validate a specific field
- Use `validateForm()` to validate all fields
- Returns `Promise<boolean>`

---

## ⚡ Performance Tips

### Stable Callbacks

The hook uses refs internally to provide stable callbacks that don't cause unnecessary re-renders:

```tsx
// These callbacks are stable and won't change between renders
const { handleChange, handleBlur, validateField, validateForm, reset } =
  useCtrovalidate({ ... });
```

### Async Validation

Async validations are automatically aborted when a new validation starts:

```tsx
// If user types quickly, previous validations are cancelled
<input
  value={values.email}
  onChange={(e) => handleChange('email', e.target.value)}
/>
```

---

## 📚 Full Documentation

For comprehensive guides, all available rules, and advanced usage:

**[Visit Ctrovalidate Documentation](https://ctrovalidate.vercel.app)**

---

## 🤝 Related Packages

- **[@ctrovalidate/core](https://www.npmjs.com/package/@ctrovalidate/core)** - Platform-agnostic validation engine
- **[@ctrovalidate/browser](https://www.npmjs.com/package/@ctrovalidate/browser)** - Vanilla JS DOM integration
- **[@ctrovalidate/vue](https://www.npmjs.com/package/@ctrovalidate/vue)** - Vue composables
- **[@ctrovalidate/svelte](https://www.npmjs.com/package/@ctrovalidate/svelte)** - Svelte stores
- **[@ctrovalidate/next](https://www.npmjs.com/package/@ctrovalidate/next)** - Next.js server actions

---

## 📄 License

MIT © [Ctrotech](https://github.com/ctrotech-tutor)
