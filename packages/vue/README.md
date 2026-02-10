# @ctrovalidate/vue

**The reactive Vue 3 adapter for Ctrovalidate.**

`@ctrovalidate/vue` provides a native Composition API integration for Ctrovalidate. It leverages Vue's reactivity system to provide real-time validation state without boilerplate.

## 🚀 Installation

```bash
pnpm add @ctrovalidate/vue @ctrovalidate/core
```

## 🛠️ Usage

### Reactive Forms with `v-model`

This adapter does **not** use a `ref` registry. Instead, it exposes a reactive `values` object that you bind directly to your inputs using `v-model`.

```vue
<script setup lang="ts">
import { useCtrovalidate } from '@ctrovalidate/vue';

// Define your form shape
interface SignupForm {
  username: string;
  email: string;
}

const { values, errors, handleBlur, validateForm, isValidating, isDirty } =
  useCtrovalidate<SignupForm>({
    initialValues: {
      username: '',
      email: '',
    },
    schema: {
      username: 'required|minLength:3',
      email: 'required|email',
    },
    validateOnBlur: true,
    validateOnChange: true,
  });

const onSubmit = async () => {
  const isValid = await validateForm();
  if (isValid) {
    console.log('Form submitted:', values);
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <!-- Username Field -->
    <div class="field">
      <label>Username</label>
      <input
        v-model="values.username"
        @blur="handleBlur('username')"
        :class="{ invalid: errors.username }"
      />
      <span v-if="isValidating.username">Checking...</span>
      <span v-else-if="errors.username" class="error">{{
        errors.username
      }}</span>
    </div>

    <!-- Email Field -->
    <div class="field">
      <label>Email</label>
      <input
        v-model="values.email"
        @blur="handleBlur('email')"
        :class="{ invalid: errors.email }"
      />
      <span v-if="errors.email" class="error">{{ errors.email }}</span>
    </div>

    <button type="submit" :disabled="!isDirty.username">Sign Up</button>
  </form>
</template>
```

## 🧩 Composable API

### `useCtrovalidate(options)`

#### Options

- `schema`: A Ctrovalidate schema object.
- `initialValues`: Initial state for the form.
- `validateOnBlur`: (default: `true`) Trigger validation on blur.
- `validateOnChange`: (default: `true`) Trigger validation on value change.

#### Returns

- `values`: Reactive object containing form values.
- `errors`: Reactive object containing error messages.
- `isDirty`: Reactive object tracking touched fields.
- `isValidating`: Reactive object tracking async validation.
- `isValid`: Computed boolean for overall form validity.
- `handleBlur(name)`: Triggers blur validation.
- `handleChange(name, value)`: Manually updates value (if not using v-model).
- `validateField(name)`: Manually validate a single field.
- `validateForm()`: Validates all fields and returns boolean.
- `reset(newValues?)`: Resets form state.

## 📄 License

MIT © [Ctrotech](https://github.com/ctrotech-tutor)
