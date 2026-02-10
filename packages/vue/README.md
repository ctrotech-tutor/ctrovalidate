# @ctrovalidate/vue

**Reactive form validation for Vue 3.**

`@ctrovalidate/vue` provides a native Composition API integration for Ctrovalidate. Built with Vue 3's reactivity system for seamless `v-model` binding and real-time validation.

[![npm version](https://img.shields.io/npm/v/@ctrovalidate/vue.svg)](https://www.npmjs.com/package/@ctrovalidate/vue)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

- 🎯 **Type-safe** - Full TypeScript support with excellent inference
- ⚡ **Reactive** - Built on Vue 3's reactivity system
- 🎣 **Single composable** - `useCtrovalidate` is all you need
- 🔄 **v-model ready** - Direct binding to reactive values
- 🎨 **Headless** - No UI components, full control over rendering
- ⚡ **Async support** - Handles async validation with abort signals
- 🌍 **i18n ready** - Built-in locale and message customization
- 🚀 **Performant** - Leverages Vue's efficient reactivity
- 📦 **Tiny** - Only 3 source files

---

## 📦 Installation

```bash
npm install @ctrovalidate/vue @ctrovalidate/core vue
```

```bash
pnpm add @ctrovalidate/vue @ctrovalidate/core vue
```

```bash
yarn add @ctrovalidate/vue @ctrovalidate/core vue
```

**Requirements:** Vue ^3.0.0

---

## 🚀 Quick Start

```vue
<script setup lang="ts">
import { useCtrovalidate } from '@ctrovalidate/vue';

interface LoginForm {
  email: string;
  password: string;
}

const { values, errors, handleBlur, validateForm, isValidating } =
  useCtrovalidate<LoginForm>({
    initialValues: {
      email: '',
      password: '',
    },
    schema: {
      email: 'required|email',
      password: 'required|minLength:8',
    },
  });

const handleSubmit = async () => {
  const isValid = await validateForm();

  if (isValid) {
    console.log('Form data:', values);
    // Submit to API
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="email">Email</label>
      <input
        id="email"
        v-model="values.email"
        @blur="handleBlur('email')"
        :class="{ error: errors.email }"
        type="email"
      />
      <span v-if="errors.email" class="error-message">
        {{ errors.email }}
      </span>
    </div>

    <div>
      <label for="password">Password</label>
      <input
        id="password"
        v-model="values.password"
        @blur="handleBlur('password')"
        :class="{ error: errors.password }"
        type="password"
      />
      <span v-if="errors.password" class="error-message">
        {{ errors.password }}
      </span>
    </div>

    <button
      type="submit"
      :disabled="isValidating.email || isValidating.password"
    >
      {{
        isValidating.email || isValidating.password ? 'Validating...' : 'Login'
      }}
    </button>
  </form>
</template>

<style scoped>
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

The main composable for form validation.

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
interface UseCtrovalidateReturn<T> {
  values: T; // Reactive form state
  errors: Record<keyof T, string | undefined>; // Reactive error messages
  isDirty: Record<keyof T, boolean>; // Reactive touched fields
  isValidating: Record<keyof T, boolean>; // Reactive async status
  isValid: boolean; // Overall form validity
  validateField: (name: keyof T) => Promise<boolean>;
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

```vue
<script setup lang="ts">
import { useCtrovalidate } from '@ctrovalidate/vue';

interface SignupForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const { values, errors, handleBlur, validateForm } =
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

const handleSubmit = async () => {
  if (await validateForm()) {
    // Submit form
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <!-- Form fields -->
  </form>
</template>
```

### Real-Time Validation

```vue
<script setup lang="ts">
const { values, errors, handleBlur, isValidating } = useCtrovalidate<{
  email: string;
}>({
  initialValues: { email: '' },
  schema: { email: 'required|email' },
  validateOnChange: true, // Enable real-time validation
});
</script>

<template>
  <div>
    <input
      v-model="values.email"
      @blur="handleBlur('email')"
      :class="{ error: errors.email }"
    />
    <span v-if="isValidating.email">Validating...</span>
    <span v-else-if="errors.email" class="error">{{ errors.email }}</span>
  </div>
</template>
```

### Custom Rules

```vue
<script setup lang="ts">
const { values, errors, handleBlur, validateForm } = useCtrovalidate<{
  username: string;
  email: string;
}>({
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
</script>
```

### Internationalization (i18n)

```vue
<script setup lang="ts">
import { translator } from '@ctrovalidate/core';

// Register Spanish messages
translator.addMessages('es', {
  required: 'Este campo es obligatorio.',
  email: 'Por favor, introduce un correo electrónico válido.',
  minLength: 'Debe tener al menos {0} caracteres.',
});

const { values, errors, handleBlur } = useCtrovalidate<{ email: string }>({
  initialValues: { email: '' },
  schema: { email: 'required|email|minLength:5' },
  locale: 'es', // Use Spanish messages
});
</script>
```

### Manual Field Validation

```vue
<script setup lang="ts">
const { values, errors, validateField } = useCtrovalidate<{ query: string }>({
  initialValues: { query: '' },
  schema: { query: 'required|minLength:3' },
  validateOnBlur: false, // Disable auto-validation
});

const handleSearch = async () => {
  const isValid = await validateField('query');

  if (isValid) {
    console.log('Searching for:', values.query);
  }
};
</script>

<template>
  <div>
    <input v-model="values.query" placeholder="Search..." />
    <button @click="handleSearch">Search</button>
    <span v-if="errors.query">{{ errors.query }}</span>
  </div>
</template>
```

### Reset Form

```vue
<script setup lang="ts">
const { values, errors, handleBlur, validateForm, reset } = useCtrovalidate<{
  name: string;
  bio: string;
}>({
  initialValues: { name: 'John Doe', bio: 'Developer' },
  schema: {
    name: 'required|minLength:2',
    bio: 'maxLength:500',
  },
});

const handleSave = async () => {
  if (await validateForm()) {
    console.log('Saved:', values);
  }
};

const handleCancel = () => {
  reset(); // Reset to initial values
};

const handleClear = () => {
  reset({ name: '', bio: '' }); // Reset to empty values
};
</script>
```

### With Element Plus

```vue
<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
import { useCtrovalidate } from '@ctrovalidate/vue';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const { values, errors, handleBlur, validateForm, isValidating } =
  useCtrovalidate<ContactForm>({
    initialValues: { name: '', email: '', message: '' },
    schema: {
      name: 'required|minLength:2',
      email: 'required|email',
      message: 'required|minLength:10',
    },
  });
</script>

<template>
  <ElForm @submit.prevent="validateForm">
    <ElFormItem label="Name" :error="errors.name">
      <ElInput v-model="values.name" @blur="handleBlur('name')" />
    </ElFormItem>

    <ElFormItem label="Email" :error="errors.email">
      <ElInput
        v-model="values.email"
        @blur="handleBlur('email')"
        type="email"
      />
    </ElFormItem>

    <ElFormItem label="Message" :error="errors.message">
      <ElInput
        v-model="values.message"
        @blur="handleBlur('message')"
        type="textarea"
        :rows="4"
      />
    </ElFormItem>

    <ElButton
      type="primary"
      native-type="submit"
      :loading="Object.values(isValidating).some(Boolean)"
    >
      Send Message
    </ElButton>
  </ElForm>
</template>
```

### Conditional Validation

```vue
<script setup lang="ts">
import { computed } from 'vue';

interface ShippingForm {
  country: string;
  state: string;
  zipCode: string;
}

const { values, errors, handleBlur, validateForm } =
  useCtrovalidate<ShippingForm>({
    initialValues: { country: '', state: '', zipCode: '' },
    schema: computed(() => ({
      country: 'required',
      state: values.country === 'USA' ? 'required' : '',
      zipCode: values.country === 'USA' ? 'required|exactLength:5' : '',
    })).value,
  });
</script>
```

---

## 🎨 Styling Examples

### Tailwind CSS

```vue
<script setup lang="ts">
const { values, errors, handleBlur, validateForm } = useCtrovalidate<{
  email: string;
}>({
  initialValues: { email: '' },
  schema: { email: 'required|email' },
});
</script>

<template>
  <form @submit.prevent="validateForm">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2"> Email </label>
      <input
        v-model="values.email"
        @blur="handleBlur('email')"
        type="email"
        :class="[
          'w-full px-3 py-2 border rounded-md',
          'focus:outline-none focus:ring-2',
          errors.email
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500',
        ]"
      />
      <p v-if="errors.email" class="text-red-500 text-sm mt-1">
        {{ errors.email }}
      </p>
    </div>

    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Submit
    </button>
  </form>
</template>
```

### Scoped Styles

```vue
<script setup lang="ts">
const { values, errors, handleBlur } = useCtrovalidate<{ email: string }>({
  initialValues: { email: '' },
  schema: { email: 'required|email' },
});
</script>

<template>
  <form>
    <input
      v-model="values.email"
      @blur="handleBlur('email')"
      :class="{ 'has-error': errors.email }"
      type="email"
    />
    <span v-if="errors.email" class="error-message">
      {{ errors.email }}
    </span>
  </form>
</template>

<style scoped>
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

### Reactive State

The composable uses Vue 3's reactivity system efficiently:

```vue
<script setup>
// values, errors, isDirty, isValidating are all reactive
const { values, errors } = useCtrovalidate({ ... });

// No need for .value, they're reactive objects
console.log(values.email);  // Reactive!
console.log(errors.email);  // Reactive!
</script>
```

### Async Validation

Async validations are automatically aborted when a new validation starts:

```vue
<template>
  <!-- If user types quickly, previous validations are cancelled -->
  <input v-model="values.email" />
</template>
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
- **[@ctrovalidate/svelte](https://www.npmjs.com/package/@ctrovalidate/svelte)** - Svelte stores
- **[@ctrovalidate/next](https://www.npmjs.com/package/@ctrovalidate/next)** - Next.js server actions

---

## 📄 License

MIT © [Ctrotech](https://github.com/ctrotech-tutor)
