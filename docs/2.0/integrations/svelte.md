# Integration: Svelte

[Svelte](https://svelte.dev/) is a radical new approach to building user interfaces. Whereas traditional frameworks like React and Vue do the bulk of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app.

Integrating Ctrovalidate with Svelte is clean and elegant, thanks to Svelte's `onMount` lifecycle function and its `bind:this` directive. This guide assumes you have a standard Svelte project, likely set up with [Vite](https://vitejs.dev/).

## The Core Pattern

The recommended pattern is very similar to other modern frameworks, focusing on lifecycle and DOM references.

1.  **`bind:this` Directive:** Use Svelte's `bind:this` directive on your `<form>` element. This special directive allows you to get a direct reference to the DOM node and assign it to a variable in your `<script>` block.
2.  **`onMount` Lifecycle Function:** Import and use the `onMount` function. The code inside `onMount` runs only once, after the component's markup has been rendered to the DOM. This is the perfect place to initialize Ctrovalidate, as you can be certain the form element exists.
3.  **Store the Instance:** Declare a variable in your script to hold the Ctrovalidate instance, allowing it to be accessed by your event handlers.

## Example: A Standard Svelte Component

Let's look at a typical `RegistrationForm.svelte` component. In Svelte, the logic and markup live together in a single `.svelte` file.

### The Svelte Component (`RegistrationForm.svelte`)

```svelte
<script>
  import { onMount } from 'svelte';
  import { Ctrovalidate } from 'ctrovalidate';

  let formElement;
  let validator;

  onMount(() => {
    if (formElement) {
      // Initialize Industrial-grade validator
      validator = new Ctrovalidate(formElement, {
        realTime: true,
        logLevel: Ctrovalidate.LogLevel.DEBUG,
        pendingClass: 'is-validating'
      });
    }
  });

  async function handleSubmit() {
    if (!validator) return;
    // Logic to validate on submit is handled by the 
    // library's native 'submit' listener.
  }
</script>

<div class="showcase-container">
  <form 
    bind:this={formElement} 
    on:submit|preventDefault={handleSubmit} 
    noValidate 
    className="validation-form"
  >
    <div class="form-group">
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        data-ctrovalidate-rules="required|minLength:3|alphaDash"
        placeholder="e.g. johndoe"
      />
      <div class="error-message"></div>
    </div>

    <div class="form-group">
      <label for="email">Email Address</label>
      <input
        type="email"
        id="email"
        name="email"
        data-ctrovalidate-rules="required|email"
        placeholder="john@example.com"
      />
      <div class="error-message"></div>
    </div>

    <button type="submit" class="submit-btn">Verify Svelte Integration</button>
  </form>
</div>
```

### Notes for TypeScript Users

If you are using TypeScript in your Svelte project, you can add types to your variables for better safety and editor support.

```typescript
<script lang="ts">
  import { onMount } from 'svelte';
  import { Ctrovalidate, type CtrovalidateInstance } from 'ctrovalidate';

  let formElement: HTMLFormElement;
  let validator: CtrovalidateInstance | undefined;

  onMount(() => {
    // ... same initialization logic ...
  });
</script>
```

By importing and using the `CtrovalidateInstance` type, you get full autocompletion and type-checking on the validator object.

### Dynamic Fields with `#each`

If you are using Svelte's `#each` block to render a dynamic list of fields, you can use Svelte's reactive statements (`$:`) or the `afterUpdate` lifecycle function to call `addField()` and `removeField()`. This ensures that Ctrovalidate is always aware of the exact fields present in the DOM.
