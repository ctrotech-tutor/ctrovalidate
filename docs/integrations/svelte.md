# Svelte Integration

Ctrovalidate integrates seamlessly with Svelte using the `bind:this` directive and `onMount` lifecycle function.

---

## Installation

```bash
npm install ctrovalidate
```

---

## Basic Pattern

Use Svelte's `bind:this` to get a reference to the form element, then initialize Ctrovalidate in `onMount`.

### Complete Example

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { Ctrovalidate, LogLevel } from 'ctrovalidate';

  let formElement: HTMLFormElement;
  let validator: Ctrovalidate | null = null;

  onMount(() => {
    if (formElement) {
      validator = new Ctrovalidate(formElement, {
        realTime: true,
        logLevel: LogLevel.WARN
      });
    }
  });

  async function handleSubmit() {
    if (validator && await validator.validate()) {
      const formData = new FormData(formElement);
      console.log('Form valid:', Object.fromEntries(formData));
      // Submit to API
    }
  }
</script>

<form bind:this={formElement} on:submit|preventDefault={handleSubmit} novalidate>
  <div>
    <label for="username">Username</label>
    <input
      type="text"
      id="username"
      name="username"
      data-ctrovalidate-rules="required|minLength:3"
    />
    <div class="error-message"></div>
  </div>

  <div>
    <label for="email">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      data-ctrovalidate-rules="required|email"
    />
    <div class="error-message"></div>
  </div>

  <button type="submit">Sign Up</button>
</form>
```

---

## Dynamic Fields

When using `{#if}` or `{#each}` to add/remove fields, call `refresh()` after the DOM updates.

### Example: Conditional Fields

```svelte
<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { Ctrovalidate } from 'ctrovalidate';

  let formElement: HTMLFormElement;
  let validator: Ctrovalidate | null = null;
  let showPhone = false;

  onMount(() => {
    if (formElement) {
      validator = new Ctrovalidate(formElement, {
        realTime: true
      });
    }
  });

  // Refresh validator when fields change
  afterUpdate(() => {
    validator?.refresh();
  });
</script>

<form bind:this={formElement} novalidate>
  <div>
    <label>
      <input type="checkbox" bind:checked={showPhone} />
      Add phone number
    </label>
  </div>

  {#if showPhone}
    <div>
      <label for="phone">Phone</label>
      <input
        id="phone"
        name="phone"
        data-ctrovalidate-rules="required|phone"
      />
      <div class="error-message"></div>
    </div>
  {/if}

  <button type="submit">Submit</button>
</form>
```

---

## TypeScript Support

Full TypeScript support with proper types:

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

### 1. Initialize in `onMount`

Always initialize the validator after the component mounts:

```typescript
onMount(() => {
  if (formElement) {
    validator = new Ctrovalidate(formElement);
  }
});
```

### 2. Use `afterUpdate` for Dynamic Fields

Refresh the validator after DOM changes:

```typescript
afterUpdate(() => {
  validator?.refresh();
});
```

### 3. Use `novalidate`

Disable browser validation:

```svelte
<form bind:this={formElement} novalidate>
```

### 4. Clean Up (Optional)

Svelte automatically cleans up when components are destroyed, but you can manually destroy the validator if needed:

```typescript
import { onDestroy } from 'svelte';

onDestroy(() => {
  validator?.destroy();
});
```

---

## Benefits

- **No Reactivity Overhead**: Validation runs in the DOM, not Svelte's reactive system
- **TypeScript Support**: Full type definitions included
- **Accessibility**: Automatic ARIA attribute management
- **Scoped Styles**: Works with `<style>` blocks

---

## Next Steps

- **[Dynamic Fields Guide](../guide/dynamic-fields.md)** — Managing field lifecycle
- **[API Reference](../api/methods.md)** — All 9 instance methods
- **[Custom Rules](../guide/custom-rules.md)** — Creating validation logic
- **[Configuration](../guide/configuration.md)** — Customizing options
