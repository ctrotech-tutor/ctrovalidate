# Integration: Vue.js

Integrating Ctrovalidate into a modern [Vue.js](https://vuejs.org/) application (v3) is straightforward. The key is to respect Vue's component lifecycle and its system for referencing DOM elements. This guide assumes you have a standard Vue project, likely set up with [Vite](https://vitejs.dev/).

## The Core Pattern

The recommended pattern involves using Vue's `onMounted` lifecycle hook and template refs.

1.  **Template Ref:** Use the `ref` attribute on your `<form>` element to get a direct, stable reference to the underlying DOM node. Avoid using `document.getElementById`.
2.  **Lifecycle Hook:** Initialize the Ctrovalidate instance inside the `onMounted` hook. This guarantees that the component's DOM is fully rendered and available before you try to access it.
3.  **Store the Instance:** Store the created validator instance in a variable within your component's `setup` scope so it can be accessed by other methods, like your submit handler.

This approach ensures that Ctrovalidate is initialized at the correct time and that it operates on the correct DOM element, all while respecting Vue's rendering lifecycle.

## Example: A Standard Vue Component

Let's walk through creating a `RegistrationForm.vue` component.

### 1. The Component Template

In your component's `<template>` section, define your form. Use `@submit.prevent` to hook into the form's submit event and `ref="formEl"` to create the DOM reference.

```vue
<template>
  <form ref="formEl" @submit.prevent="handleSubmit" novalidate>
    <div>
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        data-ctrovalidate-rules="required|minLength:3|alphaDash"
      />
      <div class="error-message"></div>
    </div>

    <div>
      <label for="email">Email Address</label>
      <input
        type="email"
        id="email"
        name="email"
        data-ctrovalidate-rules="required|email"
      />
      <div class="error-message"></div>
    </div>

    <button type="submit">Create Account</button>
  </form>
</template>
```

### 2. The Component Script (Composition API)

In your `<script setup>` block, import the necessary functions from Vue and Ctrovalidate.

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { Ctrovalidate } from 'ctrovalidate';

// 1. Create a ref to hold the form's DOM element.
const formEl = ref(null);

// 2. Create a variable to hold the validator instance.
let validator;

// 3. Use the onMounted lifecycle hook.
onMounted(() => {
  // The 'formEl.value' will now be the actual <form> DOM node.
  if (formEl.value) {
    console.log('Vue component mounted. Initializing Ctrovalidate.');
    validator = new Ctrovalidate(formEl.value, {
      realTime: true,
    });
  }
});

// 4. Define the submit handler method.
const handleSubmit = async () => {
  if (!validator) return;

  const isFormValid = await validator.validate();

  if (isFormValid) {
    alert('Vue form is valid! Submitting...');
    // Logic to submit form data
  } else {
    console.log('Vue form has errors.');
  }
};
</script>
```

### Notes for TypeScript Users

If you are using TypeScript in your Vue project, you can get full type safety by typing your refs.

```typescript
import { ref, onMounted } from 'vue';
import { Ctrovalidate, CtrovalidateInstance } from 'ctrovalidate';

// Type the ref for the form element
const formEl = ref<HTMLFormElement | null>(null);

// Type the variable that will hold the instance
let validator: CtrovalidateInstance | undefined;

onMounted(() => {
  if (formEl.value) {
    validator = new Ctrovalidate(formEl.value, {
      /* ... */
    });
  }
});
```

By importing and using the `CtrovalidateInstance` type, TypeScript will provide autocompletion and type-checking for all of Ctrovalidate's methods, such as `validator.validate()`.

### Dynamic Fields with `v-for`

If your form has dynamic fields rendered with `v-for`, remember to use the `addField()` and `removeField()` methods. You can use Vue's watchers or lifecycle hooks (`onUpdated`, `onBeforeUnmount`) to call these methods at the appropriate times, ensuring the validator always stays in sync with your component's state.

[**View a simplified CDN example on GitHub**](https://github.com/ctrotech-tutor/ctrovalidate/blob/main/examples/with-vue/index.html)
