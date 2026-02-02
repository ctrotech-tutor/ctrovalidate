# Vue.js Integration
Ctrovalidate works beautifully with# Vue 3 Integration

Ctrovalidate integrates seamlessly with Vue 3's Composition API. By combining Vue's reactive state with Ctrovalidate's DOM-first engine, you get the best of both worlds: **high performance** and **reactive simplicity**.

---

## ⚙️ Setting Up Your Vue Project

We recommend using **Vite** for the best Vue development experience.

### 1. Initialize with Vite
```bash
npm create vite@latest my-vue-app -- --template vue-ts
cd my-vue-app
npm install ctrovalidate
npm run dev
```

### 2. Styling (Tailwind CSS)
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 🏗️ The Composition API Pattern

The standard way to use Ctrovalidate in Vue 3 is to initialize the validator within `onMounted`. Use a `ref` to hold the validator instance.

### Complete Implementation

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Ctrovalidate } from 'ctrovalidate';

const formRef = ref<HTMLFormElement | null>(null);
const validator = ref<Ctrovalidate | null>(null);

onMounted(() => {
  if (formRef.vue) {
    // Initialize Ctrovalidate with industrial defaults
    validator.value = new Ctrovalidate(formRef.value, {
      realTime: true,
      logLevel: Ctrovalidate.LogLevel.DEBUG,
      errorClass: 'border-red-600',
      errorMessageClass: 'text-red-600 text-xs italic mt-1'
    });
  }
});

onUnmounted(() => {
  validator.value?.destroy();
});

const submitForm = async () => {
  const isValid = await validator.value?.validate();
  
  if (isValid) {
    const formData = new FormData(formRef.value!);
    console.log('Vue Form Verified:', Object.fromEntries(formData));
    // Trigger your API call here
  }
};
</script>

<template>
  <div class="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
    <form ref="formRef" @submit.prevent="submitForm" novalidate class="space-y-4">
      <div>
        <label class="block text-sm font-semibold text-gray-700">Display Name</label>
        <input
          name="username"
          type="text"
          data-ctrovalidate-rules="required|minLength:3"
          class="mt-1 block w-full border border-gray-300 px-3 py-2 rounded focus:ring-black focus:border-black"
        />
        <div class="error-message"></div>
      </div>

      <button
        type="submit"
        class="w-full bg-black text-white px-4 py-2 rounded font-bold hover:bg-gray-900 transition-colors"
      >
        Verify Identity
      </button>
    </form>
  </div>
</template>
```

---

## 🔄 Reactivity & Dynamic Fields

Vue's powerful reactivity system works in harmony with Ctrovalidate. If you use `v-if` or `v-for` to dynamically change your form structure, you simply need to tell Ctrovalidate to re-scan the form.

### Automatic Sync with `watch`
You can watch your dynamic state and call `.refresh()` whenever it changes.

```typescript
import { watch } => 'vue';

watch(() => myDynamicState, () => {
  // Wait for DOM to update before refreshing
  nextTick(() => {
    validator.value?.refresh();
  });
});
```

---

## ⚡ Why Use Ctrovalidate with Vue?

1.  **Zero Reactivity Overhead**: Ctrovalidate doesn't create thousands of reactive proxies for your validation rules. It's built for speed.
2.  **HTML-First**: Designers and developers can see exactly what the validation rules are without diving into a 500-line `setup()` block.
3.  **Scoped Styling**: Works perfectly with Vue's `<style scoped>`—just target the `.is-invalid` or `.error-message` classes.

> [!TIP]
> Use the `pendingClass` to add a high-fidelity "validating..." spinner to your inputs during async rules, all without adding a single line of extra Vue state.

## Next Steps

- **[Nuxt Integration](./nextjs.md)** — Patterns for SSR and Hydration safety.
- **[API Reference](../api/methods.md)** — Learn about `reset()` and `destroy()`.

> [!TIP]
> Use Vue's `v-cloak` or hidden states to ensure error containers don't "flicker" during initial mount.

## Next Steps

- **[Configuration](../guide/configuration.md)** — Customizing CSS classes to match your UI library.
- **[Built-in Rules](../guide/rules.md)** — Full list of available validation rules.
