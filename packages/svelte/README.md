# @ctrovalidate/svelte

**Reactive form validation for Svelte.**

`@ctrovalidate/svelte` provides a clean, store-based integration for Svelte applications. Built with Svelte stores for seamless reactivity and automatic subscription management.

[![npm version](https://img.shields.io/npm/v/@ctrovalidate/svelte.svg)](https://www.npmjs.com/package/@ctrovalidate/svelte)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

- 🎯 **Type-safe** - Full TypeScript support with excellent inference
- ⚡ **Reactive** - Built on Svelte's store system
- 🎣 **Single function** - `useCtrovalidate` is all you need
- 🔄 **Auto-subscription** - Use `$` prefix for automatic reactivity
- 🎨 **Headless** - No UI components, full control over rendering
- ⚡ **Async support** - Handles async validation with abort signals
- 🌍 **i18n ready** - Built-in locale and message customization
- 🚀 **Performant** - Leverages Svelte's efficient reactivity
- 📦 **Tiny** - Only 2 source files

---

## 📦 Installation

```bash
npm install @ctrovalidate/svelte @ctrovalidate/core svelte
```

```bash
pnpm add @ctrovalidate/svelte @ctrovalidate/core svelte
```

```bash
yarn add @ctrovalidate/svelte @ctrovalidate/core svelte
```

**Requirements:** Svelte >=3.0.0

---

## 🚀 Quick Start

```svelte
<script lang="ts">
  import { useCtrovalidate } from '@ctrovalidate/svelte';

  interface LoginForm {
    email: string;
    password: string;
  }

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    validateForm,
    isValidating
  } = useCtrovalidate<LoginForm>({
    initialValues: {
      email: '',
      password: ''
    },
    schema: {
      email: 'required|email',
      password: 'required|minLength:8'
    }
  });

  async function handleSubmit() {
    const isValid = await validateForm();

    if (isValid) {
      console.log('Form data:', $values);
      // Submit to API
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="email">Email</label>
    <input
      id="email"
      type="email"
      value={$values.email}
      on:input={(e) => handleChange('email', e.currentTarget.value)}
      on:blur={() => handleBlur('email')}
      class:error={$errors.email}
    />
    {#if $errors.email}
      <span class="error-message">{$errors.email}</span>
    {/if}
  </div>

  <div>
    <label for="password">Password</label>
    <input
      id="password"
      type="password"
      value={$values.password}
      on:input={(e) => handleChange('password', e.currentTarget.value)}
      on:blur={() => handleBlur('password')}
      class:error={$errors.password}
    />
    {#if $errors.password}
      <span class="error-message">{$errors.password}</span>
    {/if}
  </div>

  <button
    type="submit"
    disabled={$isValidating.email || $isValidating.password}
  >
    {$isValidating.email || $isValidating.password ? 'Validating...' : 'Login'}
  </button>
</form>

<style>
  .error {
    border-color: #dc3545;
  }

  .error-message {
    color: #dc3545;
    font-size: 0.875rem;
  }
</style>
```

---

## 📚 API Reference

### `useCtrovalidate<T>(options)`

The main function for form validation.

#### Options

```typescript
interface UseCtrovalidateOptions<T> {
  schema: ValidationSchema; // Required: validation rules
  initialValues?: T; // Initial form state
  validateOnBlur?: boolean; // default: true
  validateOnChange?: boolean; // default: true
  customRules?: Record<string, RuleLogic | AsyncRuleLogic>;
  aliases?: Record<string, SchemaRule>;
  messages?: Record<string, string>; // Custom error messages
  locale?: string; // i18n locale (e.g., 'es', 'fr')
}
```

#### Returns

```typescript
{
  values: Writable<T>;                                  // Writable store
  errors: Writable<Partial<Record<keyof T, string>>>;  // Writable store
  isDirty: Writable<Partial<Record<keyof T, boolean>>>; // Writable store
  isValidating: Writable<Partial<Record<keyof T, boolean>>>; // Writable store
  isValid: Readable<boolean>;                           // Derived store
  validateField: (name: keyof T, value?: T[keyof T]) => Promise<boolean>;
  validateForm: () => Promise<boolean>;
  reset: (newValues?: Partial<T>) => void;
  handleChange: (name: keyof T, value: T[keyof T]) => void;
  handleBlur: (name: keyof T) => void;
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

```svelte
<script lang="ts">
  import { useCtrovalidate } from '@ctrovalidate/svelte';

  interface SignupForm {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const { values, errors, handleChange, handleBlur, validateForm } =
    useCtrovalidate<SignupForm>({
      initialValues: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      schema: {
        username: 'required|minLength:3|maxLength:20|alphaDash',
        email: 'required|email',
        password: 'required|minLength:8|strongPassword',
        confirmPassword: 'required'
      }
    });

  async function handleSubmit() {
    if (await validateForm()) {
      // Submit form
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <!-- Form fields -->
</form>
```

### Real-Time Validation

```svelte
<script lang="ts">
  const { values, errors, handleChange, handleBlur, isValidating } =
    useCtrovalidate<{ email: string }>({
      initialValues: { email: '' },
      schema: { email: 'required|email' },
      validateOnChange: true  // Enable real-time validation
    });
</script>

<div>
  <input
    value={$values.email}
    on:input={(e) => handleChange('email', e.currentTarget.value)}
    on:blur={() => handleBlur('email')}
    class:error={$errors.email}
  />
  {#if $isValidating.email}
    <span>Validating...</span>
  {:else if $errors.email}
    <span class="error">{$errors.email}</span>
  {/if}
</div>
```

### Custom Rules

```svelte
<script lang="ts">
  const { values, errors, handleChange, handleBlur, validateForm } =
    useCtrovalidate<{ username: string; email: string }>({
      initialValues: { username: '', email: '' },
      schema: {
        username: 'required|noSpaces',
        email: 'required|email|isUniqueEmail'
      },
      customRules: {
        noSpaces: (value) => !/\s/.test(String(value)),
        isUniqueEmail: async (value) => {
          const response = await fetch(`/api/check-email?email=${value}`);
          const { isUnique } = await response.json();
          return isUnique;
        }
      },
      messages: {
        noSpaces: 'Spaces are not allowed.',
        isUniqueEmail: 'This email is already registered.'
      }
    });
</script>
```

### Internationalization (i18n)

```svelte
<script lang="ts">
  import { translator } from '@ctrovalidate/core';

  // Register Spanish messages
  translator.addMessages('es', {
    required: 'Este campo es obligatorio.',
    email: 'Por favor, introduce un correo electrónico válido.',
    minLength: 'Debe tener al menos {0} caracteres.'
  });

  const { values, errors, handleChange, handleBlur } =
    useCtrovalidate<{ email: string }>({
      initialValues: { email: '' },
      schema: { email: 'required|email|minLength:5' },
      locale: 'es'  // Use Spanish messages
    });
</script>
```

### Manual Field Validation

```svelte
<script lang="ts">
  const { values, errors, validateField } =
    useCtrovalidate<{ query: string }>({
      initialValues: { query: '' },
      schema: { query: 'required|minLength:3' },
      validateOnBlur: false  // Disable auto-validation
    });

  async function handleSearch() {
    const isValid = await validateField('query');

    if (isValid) {
      console.log('Searching for:', $values.query);
    }
  }
</script>

<div>
  <input
    value={$values.query}
    on:input={(e) => handleChange('query', e.currentTarget.value)}
    placeholder="Search..."
  />
  <button on:click={handleSearch}>Search</button>
  {#if $errors.query}
    <span>{$errors.query}</span>
  {/if}
</div>
```

### Reset Form

```svelte
<script lang="ts">
  const { values, errors, handleChange, handleBlur, validateForm, reset } =
    useCtrovalidate<{ name: string; bio: string }>({
      initialValues: { name: 'John Doe', bio: 'Developer' },
      schema: {
        name: 'required|minLength:2',
        bio: 'maxLength:500'
      }
    });

  async function handleSave() {
    if (await validateForm()) {
      console.log('Saved:', $values);
    }
  }

  function handleCancel() {
    reset();  // Reset to initial values
  }

  function handleClear() {
    reset({ name: '', bio: '' });  // Reset to empty values
  }
</script>
```

### Conditional Validation

```svelte
<script lang="ts">
  interface ShippingForm {
    country: string;
    state: string;
    zipCode: string;
  }

  const { values, errors, handleChange, handleBlur, validateForm } =
    useCtrovalidate<ShippingForm>({
      initialValues: { country: '', state: '', zipCode: '' },
      schema: {
        country: 'required',
        state: $values.country === 'USA' ? 'required' : '',
        zipCode: $values.country === 'USA' ? 'required|exactLength:5' : ''
      }
    });
</script>
```

---

## 🎨 Styling Examples

### Tailwind CSS

```svelte
<script lang="ts">
  const { values, errors, handleChange, handleBlur, validateForm } =
    useCtrovalidate<{ email: string }>({
      initialValues: { email: '' },
      schema: { email: 'required|email' }
    });
</script>

<form on:submit|preventDefault={validateForm}>
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Email
    </label>
    <input
      value={$values.email}
      on:input={(e) => handleChange('email', e.currentTarget.value)}
      on:blur={() => handleBlur('email')}
      type="email"
      class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 {$errors.email
        ? 'border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:ring-blue-500'}"
    />
    {#if $errors.email}
      <p class="text-red-500 text-sm mt-1">{$errors.email}</p>
    {/if}
  </div>

  <button
    type="submit"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    Submit
  </button>
</form>
```

### Scoped Styles

```svelte
<script lang="ts">
  const { values, errors, handleChange, handleBlur } =
    useCtrovalidate<{ email: string }>({
      initialValues: { email: '' },
      schema: { email: 'required|email' }
    });
</script>

<form>
  <input
    value={$values.email}
    on:input={(e) => handleChange('email', e.currentTarget.value)}
    on:blur={() => handleBlur('email')}
    type="email"
    class:has-error={$errors.email}
  />
  {#if $errors.email}
    <span class="error-message">{$errors.email}</span>
  {/if}
</form>

<style>
  input {
    border: 2px solid #ced4da;
    padding: 0.5rem;
    border-radius: 0.25rem;
    transition: border-color 0.2s;
  }

  input:focus {
    outline: none;
    border-color: #007bff;
  }

  input.has-error {
    border-color: #dc3545;
    background-color: #fff5f5;
  }

  .error-message {
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
  }
</style>
```

---

## 🔄 Validation Behavior

### On Blur

- Field is validated when user leaves the field
- Field is marked as "dirty"
- Error message is displayed if validation fails

### On Change

- Field is validated when value changes (if `validateOnChange: true`)
- Only validates fields that are dirty
- Provides real-time feedback

### Manual Validation

- Use `validateField(name)` to validate a specific field
- Use `validateForm()` to validate all fields
- Returns `Promise<boolean>`

---

## ⚡ Performance Tips

### Store Subscriptions

The function returns Svelte stores that auto-subscribe in templates:

```svelte
<script>
  const { values, errors } = useCtrovalidate({ ... });

  // No need to manually subscribe/unsubscribe
  // Just use $ prefix in template
</script>

<template>
  <input value={$values.email} />
  {#if $errors.email}
    <span>{$errors.email}</span>
  {/if}
</template>
```

### Async Validation

Async validations are automatically aborted when a new validation starts:

```svelte
<!-- If user types quickly, previous validations are cancelled -->
<input
  value={$values.email}
  on:input={(e) => handleChange('email', e.currentTarget.value)}
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
- **[@ctrovalidate/react](https://www.npmjs.com/package/@ctrovalidate/react)** - React hooks
- **[@ctrovalidate/vue](https://www.npmjs.com/package/@ctrovalidate/vue)** - Vue composables
- **[@ctrovalidate/next](https://www.npmjs.com/package/@ctrovalidate/next)** - Next.js server actions

---

## 📄 License

MIT © [Ctrotech](https://github.com/ctrotech-tutor)
