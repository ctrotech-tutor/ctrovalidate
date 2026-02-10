---
title: "@ctrovalidate/svelte API Reference"
description: Complete API reference for the useCtrovalidate function in Svelte, providing reactive stores for form state and validation.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: API
    url: https://ctrovalidate.vercel.app/v4/api/
  - name: Svelte
    url: https://ctrovalidate.vercel.app/v4/api/svelte
---

# @ctrovalidate/svelte

The `@ctrovalidate/svelte` package provides a headless validation experience optimized for **Svelte 4 and Svelte 5**, exposing reactive stores that integrate cleanly with Svelte’s reactivity model.

---

## 🏗️ The `useCtrovalidate` Function

### `useCtrovalidate(options)`

Integrates the Ctrovalidate engine into a Svelte component and returns reactive stores and stable helpers.

### Options

- `schema` (`ValidationSchema`)  
  Isomorphic schema definition.

- `initialValues` (`Record<string, unknown>`)  
  Initial state for the form.

- `realTime` (`boolean`)  
  Whether to validate on change / blur. Default: `true`.

- `customRules` (`Record<string, RuleLogic | AsyncRuleLogic>`)  
  Custom validation rules.

- `aliases` (`Record<string, SchemaRule>`)  
  Rule aliases.

- `messages` (`Record<string, string>`)  
  Custom error messages.

- `locale` (`string`)  
  Localization key.

---

## 🛠️ Return Values (Stores & Methods)

All returned state values are **Svelte stores**.  
Use the `$` prefix inside templates to access their values.

| Property | Type | Description |
|--------|------|-------------|
| `values` | `Writable<Record<string, unknown>>` | Current form values. |
| `errors` | `Readable<Partial<Record<string, string>>>` | Error messages for failed fields only. Valid fields are `undefined`. |
| `isValid` | `Readable<boolean>` | Global form validity. |
| `isDirty` | `Readable<Partial<Record<string, boolean>>>` | Per-field dirty state tracking. |
| `isValidating` | `Readable<Partial<Record<string, boolean>>>` | Per-field async validation state. |
| `validate()` | `() => Promise<boolean>` | Triggers full-form validation. |
| `reset(values?)` | `(values?: Record<string, unknown>) => void` | Reset to initial or new values, clear errors and dirty state. |

---

## 🚀 Basic Usage

::: v-pre

```svelte
<script>
  import { useCtrovalidate } from '@ctrovalidate/svelte';

  const { values, errors, validate } = useCtrovalidate({
    schema: {
      email: 'required|email'
    },
    initialValues: {
      email: ''
    }
  });

  async function submit() {
    const ok = await validate();
    if (ok) {
      console.log($values);
    }
  }
</script>

<input bind:value={$values.email} />

{#if $errors.email}
  <p>{$errors.email}</p>
{/if}

<button on:click={submit}>Submit</button>
```

:::

---

## 🔗 Store Binding

Svelte’s `bind:value` works naturally with the `values` store.

::: v-pre

```svelte
<input bind:value={$values.username} />
```

:::

---

## 🎯 Manual Event Handling

If you prefer explicit control instead of `bind:value`:

::: v-pre

```svelte
<input
  value={$values.email}
  on:input={(e) =>
    values.update(v => ({ ...v, email: e.target.value }))
  }
/>
```

:::

---

## 🔁 Async Validation State

::: v-pre

```svelte
{#if $isValidating.email}
  <span>Validating…</span>
{/if}
```

:::

---

## 🔄 Resetting the Form

```ts
reset();
```

This will:

- Restore `initialValues`
- Clear errors
- Reset dirty and validating states

---

## 🧠 SSR & SvelteKit Notes

- Fully compatible with **SvelteKit SSR**
- Avoid mutating stores during module initialization
- Validation runs safely on the client by default

---

## ✅ Best Practices

- Keep schemas close to the form that uses them
- Prefer headless UI composition
- Avoid expensive async validation on every keystroke
- Let Svelte manage store lifecycle cleanup

---

## 🔚 Summary

`@ctrovalidate/svelte` provides a predictable, framework-native validation layer that integrates seamlessly with Svelte while remaining fully headless.
