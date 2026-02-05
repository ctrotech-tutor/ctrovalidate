---
title: Vue 3 Integration | Composition API
description: Integrate Ctrovalidate with Vue 3's Composition API using onMounted and reactive refs for DOM-based validation.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Integrations
    url: https://ctrovalidate.vercel.app/integrations/vue
  - name: Vue 3
    url: https://ctrovalidate.vercel.app/integrations/vue
---

# Vue 3 Integration

Ctrovalidate integrates seamlessly with Vue 3's Composition API, providing DOM-based validation that works alongside Vue's reactive state.

---

## Installation

```bash
npm install ctrovalidate
```

---

## Basic Pattern

Use Vue's `ref` to hold the form element and validator instance, initializing in `onMounted`.

### Complete Example

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Ctrovalidate, LogLevel } from 'ctrovalidate';

const formRef = ref<HTMLFormElement | null>(null);
const validator = ref<Ctrovalidate | null>(null);

onMounted(() => {
  if (formRef.value) {
    validator.value = new Ctrovalidate(formRef.value, {
      realTime: true,
      logLevel: LogLevel.WARN
    });
  }
});

onUnmounted(() => {
  validator.value?.destroy();
});

const handleSubmit = async () => {
  const isValid = await validator.value?.validate();
  
  if (isValid) {
    const formData = new FormData(formRef.value!);
    console.log('Form valid:', Object.fromEntries(formData));
    // Submit to API
  }
};
</script>

<template>
  <form ref="formRef" @submit.prevent="handleSubmit" novalidate>
    <div>
      <label for="username">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        data-ctrovalidate-rules="required|minLength:3"
      />
      <div class="error-message"></div>
    </div>

    <div>
      <label for="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        data-ctrovalidate-rules="required|email"
      />
      <div class="error-message"></div>
    </div>

    <button type="submit">Sign Up</button>
  </form>
</template>
```

---

## Dynamic Fields

When using `v-if` or `v-for` to add/remove fields, call `refresh()` after the DOM updates.

### Example: Conditional Fields

```vue
<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue';
import { Ctrovalidate } from 'ctrovalidate';

const formRef = ref<HTMLFormElement | null>(null);
const validator = ref<Ctrovalidate | null>(null);
const showPhone = ref(false);

onMounted(() => {
  if (formRef.value) {
    validator.value = new Ctrovalidate(formRef.value, {
      realTime: true
    });
  }
});

// Refresh validator when fields are added/removed
watch(showPhone, async () => {
  await nextTick();
  validator.value?.refresh();
});
</script>

<template>
  <form ref="formRef" novalidate>
    <div>
      <label>
        <input type="checkbox" v-model="showPhone" />
        Add phone number
      </label>
    </div>

    <div v-if="showPhone">
      <label for="phone">Phone</label>
      <input
        id="phone"
        name="phone"
        data-ctrovalidate-rules="required|phone"
      />
      <div class="error-message"></div>
    </div>

    <button type="submit">Submit</button>
  </form>
</template>
```

---

## TypeScript Support

Import types for full type safety:

```typescript
import { Ctrovalidate, LogLevel, type CtrovalidateOptions } from 'ctrovalidate';

const options: CtrovalidateOptions = {
  realTime: true,
  logLevel: LogLevel.DEBUG,
  errorClass: 'border-red-500',
  errorMessageClass: 'text-red-600 text-sm mt-1'
};
```

---

## Best Practices

### 1. Initialize in `onMounted`

Always initialize the validator after the component mounts:

```typescript
onMounted(() => {
  if (formRef.value) {
    validator.value = new Ctrovalidate(formRef.value);
  }
});
```

### 2. Clean Up in `onUnmounted`

Prevent memory leaks by destroying the validator:

```typescript
onUnmounted(() => {
  validator.value?.destroy();
});
```

### 3. Use `nextTick` for Dynamic Fields

Wait for DOM updates before calling `refresh()`:

```typescript
watch(dynamicState, async () => {
  await nextTick();
  validator.value?.refresh();
});
```

### 4. Use `novalidate`

Disable browser validation:

```vue
<form ref="formRef" novalidate @submit.prevent="handleSubmit">
```

---

## Benefits

- **No Reactivity Overhead**: Validation runs in the DOM, not Vue's reactive system
- **TypeScript Support**: Full type definitions included
- **Accessibility**: Automatic ARIA attribute management
- **Scoped Styles**: Works with `<style scoped>`

---

## Next Steps

- **[Dynamic Fields Guide](../guide/dynamic-fields.md)** — Managing field lifecycle
- **[API Reference](../api/methods.md)** — All 9 instance methods
- **[Custom Rules](../guide/custom-rules.md)** — Creating validation logic
- **[Configuration](../guide/configuration.md)** — Customizing options
