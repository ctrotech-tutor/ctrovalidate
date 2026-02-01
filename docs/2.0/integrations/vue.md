# Vue.js Integration

Ctrovalidate works beautifully with Vue 3's Composition API. It allows you to keep your template clean while maintaining full control over the validation lifecycle.

---

## 🏗️ Composition API Setup

Use `onMounted` to initialize the validator once Vue has rendered the initial DOM structure.

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { Ctrovalidate } from 'ctrovalidate';

const formRef = ref(null);

onMounted(() => {
  if (formRef.value) {
    // Initialize Industrial-grade validator
    new Ctrovalidate(formRef.value, {
      realTime: true,
      logLevel: Ctrovalidate.LogLevel.DEBUG,
      pendingClass: 'is-validating',
    });
  }
});

const submitForm = async () => {
  // Logic to validate on submit is handled by the 
  // library's native 'submit' listener.
};
</script>

<template>
  <div class="showcase-container">
    <form ref="formRef" @submit.prevent="submitForm" novalidate>
      <div class="form-group">
        <label>Username</label>
        <input
          name="username"
          data-ctrovalidate-rules="required|minLength:3"
          placeholder="e.g. johndoe"
        />
        <div class="error-message"></div>
      </div>

      <button type="submit" class="submit-btn">Deploy Vue Integration</button>
    </form>
  </div>
</template>
```

---

## 🔄 Reactive Data & Dynamic Fields

If you are using `v-for` to render fields, you can use Vue's template refs to register fields as they appear.

```vue
<template>
  <div v-for="(item, index) in items" :key="item.id">
    <input
      :name="'item_' + index"
      data-ctrovalidate-rules="required"
      :ref="(el) => registerField(el)"
    />
  </div>
</template>

<script setup>
const registerField = (el) => {
  if (el) validator?.addField(el);
};
</script>
```

---

## 💡 Why use Ctrovalidate with Vue?

- **Minimal Reactivity Overhead**: Avoid deep-tracking large form objects in Vue's reactivity system.
- **HTML-First API**: Designers can tweak validation rules directly in the `<template>` without touching the `<script>` block.
- **A11y by Default**: Automatically manages ARIA relationships that are complex to wire up manually in Vue.

> [!TIP]
> Use Vue's `v-cloak` or hidden states to ensure error containers don't "flicker" during initial mount.

## Next Steps

- **[Configuration](../guide/configuration.md)** — Customizing CSS classes to match your UI library.
- **[Built-in Rules](../guide/rules.md)** — Full list of available validation rules.
