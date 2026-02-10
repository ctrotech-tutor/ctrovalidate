---
title: "@ctrovalidate/vue API Reference"
description: Complete API reference for the useCtrovalidate composable, providing a headless, reactive validation experience for Vue 3 and Nuxt.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: API
    url: https://ctrovalidate.vercel.app/v4/api/vue
  - name: Vue
    url: https://ctrovalidate.vercel.app/v4/api/vue
---

# @ctrovalidate/vue

The `@ctrovalidate/vue` package provides a headless composable that integrates Ctrovalidate's logic engine with Vue 3's reactivity system.

---

## 🏗️ The `useCtrovalidate` Composable

### `useCtrovalidate(options)`

The primary composable for managing form state in Vue 3.

- **Options**:
  - `schema` (ValidationSchema): Isomorphic schema definition.
  - `initialValues` (Record): Initial state for the form.
  - `realTime` (boolean): Whether to validate on change/blur. Default: `true`.

---

## 🛠️ Return Values

Everything returned is reactive and intended to be used directly in your `<template>`.

| Property | Type | Description |
| :--- | :--- | :--- |
| `values` | `Reactive<Record<string, any>>` | Reactive object containing form values. |
| `errors` | `Reactive<Partial<Record<string, string>>>` | Error messages for failed fields only. Valid fields are `undefined`. |
| `isValid` | `Ref<boolean>` | Global validity state. |
| `isDirty` | `Reactive<Partial<Record<string, boolean>>>` | Per-field dirty state tracking. |
| `isValidating` | `Reactive<Partial<Record<string, boolean>>>` | Per-field async validation state. |
| `validate()` | `Function` | Programmatic validation trigger. Returns `Promise<boolean>`. |
| `reset(values?)` | `Function` | Reset to initial or new values, clear errors and dirty state. |

---

## 🚀 Advanced Usage

### Composition API Integration

```javascript
import { useCtrovalidate } from '@ctrovalidate/vue';

const { values, errors, validate } = useCtrovalidate({
  schema: {
    username: 'required|alphaNum',
  },
  initialValues: { username: '' }
});

const onSubmit = async () => {
  if (await validate()) {
    // Form is valid
  }
};
```

### Template Binding

Vue's `v-model` works seamlessly with the returned `values` object.

```html
<template>
  <input v-model="values.username" @blur="handleBlur('username')" />
  <span v-if="errors.username">{{ errors.username }}</span>
</template>
```

---

## ✅ Best Practices

- **Watchers**: The composable uses internal watchers. To prevent memory leaks, ensure it is called within the `setup()` lifecycle (automatically handled in `<script setup>`).
- **Deep Reactivity**: `values` is a `reactive` object. If you need to destructure it, use `toRefs`.
- **Nuxt**: The composable is SSR-safe and works perfectly inside Nuxt 3 projects.
