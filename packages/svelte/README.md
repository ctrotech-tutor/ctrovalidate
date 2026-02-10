# @ctrovalidate/svelte

**The native Svelte adapter for Ctrovalidate.**

`@ctrovalidate/svelte` provides a clean, store-based integration for Svelte applications. It exposes reactive stores that fit perfectly into the Svelte lifecycle.

## 🚀 Installation

```bash
pnpm add @ctrovalidate/svelte @ctrovalidate/core
```

## 🛠️ Usage

### Reactive Stores

This adapter does **not** use a `use:action`. Instead, you subscribe to the `$values` store and bind it to your inputs.

```svelte
<script lang="ts">
  import { useCtrovalidate } from '@ctrovalidate/svelte';

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    validateForm,
    isValidating,
    isDirty
  } = useCtrovalidate({
    initialValues: {
      username: '',
      email: ''
    },
    schema: {
      username: 'required|minLength:3',
      email: 'required|email'
    }
  });

  async function handleSubmit() {
    const isValid = await validateForm();
    if (isValid) {
      console.log('Form submitted:', $values);
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <!-- Username Field -->
  <div class="field">
    <label>Username</label>
    <input
      value={$values.username}
      on:input={(e) => handleChange('username', e.currentTarget.value)}
      on:blur={() => handleBlur('username')}
      class:invalid={$errors.username}
    />
    {#if $isValidating.username}
      <span>Checking...</span>
    {:else if $errors.username}
      <span class="error">{$errors.username}</span>
    {/if}
  </div>

  <!-- Email Field -->
  <div class="field">
    <label>Email</label>
    <input
      value={$values.email}
      on:input={(e) => handleChange('email', e.currentTarget.value)}
      on:blur={() => handleBlur('email')}
      class:invalid={$errors.email}
    />
    {#if $errors.email}
      <span class="error">{$errors.email}</span>
    {/if}
  </div>

  <button type="submit" disabled={!$isDirty.username && !$isDirty.email}>
    Sign Up
  </button>
</form>
```

## 🧩 API Reference

### `useCtrovalidate(options)`

#### Options

- `schema`: A Ctrovalidate schema object.
- `initialValues`: Initial state for the form.
- `validateOnBlur`: (default: `true`) Trigger validation on blur.
- `validateOnChange`: (default: `true`) Trigger validation on value change.

#### Returns

- `values`: Svelte store containing form values.
- `errors`: Svelte store containing error messages.
- `isDirty`: Svelte store tracking touched fields.
- `isValidating`: Svelte store tracking async validation.
- `isValid`: Svelte store for overall form validity.
- `handleBlur(name)`: Triggers blur validation.
- `handleChange(name, value)`: Updates value and triggers change validation.
- `validateField(name)`: Manually validate a single field.
- `validateForm()`: Validates all fields and returns boolean.
- `reset(newValues?)`: Resets form state.

## 📄 License

MIT © [Ctrotech](https://github.com/ctrotech-tutor)
