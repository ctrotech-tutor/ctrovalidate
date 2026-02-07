<script lang="ts">
  import { useCtrovalidate } from '@ctrovalidate/svelte';

  const { values, errors, isDirty, isValid, handleChange, handleBlur, validateForm, reset } = useCtrovalidate({
    schema: {
      username: 'required|minLength:4|alphaDash',
      email: 'required|email'
    },
    initialValues: {
      username: '',
      email: ''
    },
    messages: {
      username: 'Svelte says: Min 4 chars for your ID!',
      email: 'We need a proper svelte-ready email.'
    }
  });

  async function handleSubmit() {
    const success = await validateForm();
    if (success) {
      alert('Svelte form is valid! 🎉');
      console.log('Final Values:', $values);
    }
  }
</script>

<main style="padding: 20px; font-family: sans-serif; max-width: 500px;">
  <h1>Ctrovalidate Svelte Demo</h1>
  <p>Universal validation in Svelte using reactive stores.</p>

  <form on:submit|preventDefault={handleSubmit} novalidate>
    <div style="margin-bottom: 15px;">
      <label for="username">Username:</label><br />
      <input
        id="username"
        type="text"
        value={$values.username}
        on:input={(e) => handleChange('username', e.currentTarget.value)}
        on:blur={() => handleBlur('username')}
        style="border: {$errors.username ? '1px solid red' : '1px solid #ccc'}; padding: 8px; width: 100%; box-sizing: border-box;"
      />
      {#if $errors.username}
        <div style="color: red; font-size: 12px; margin-top: 4px;">{$errors.username}</div>
      {/if}
    </div>

    <div style="margin-bottom: 15px;">
      <label for="email">Email:</label><br />
      <input
        id="email"
        type="email"
        value={$values.email}
        on:input={(e) => handleChange('email', e.currentTarget.value)}
        on:blur={() => handleBlur('email')}
        style="border: {$errors.email ? '1px solid red' : '1px solid #ccc'}; padding: 8px; width: 100%; box-sizing: border-box;"
      />
      {#if $errors.email}
        <div style="color: red; font-size: 12px; margin-top: 4px;">{$errors.email}</div>
      {/if}
    </div>

    <div style="display: flex; gap: 10px;">
      <button type="submit" disabled={!$isValid} style="padding: 10px 20px; cursor: pointer;">
        Submit
      </button>
      <button type="button" on:click={() => reset()} style="padding: 10px 20px; cursor: pointer; background: #eee; border: 1px solid #ccc;">
        Reset
      </button>
    </div>
  </form>

  <div style="margin-top: 30px; padding: 15px; background: #f8f8f8; border: 1px solid #ddd; border-radius: 4px;">
    <strong>Reactive State Debugger:</strong>
    <pre style="font-size: 11px;">{JSON.stringify({ values: $values, errors: $errors, isDirty: $isDirty, isValid: $isValid }, null, 2)}</pre>
  </div>
</main>

<style>
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
