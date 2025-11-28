<!-- examples/with-svelte/App.svelte -->

<script>
  import { onMount } from 'svelte';
  import { Ctrovalidate } from '../../src/index.js';

  // 1. Create a variable to hold the form's DOM element
  let formElement;
  
  // 2. Create a variable to hold the validator instance
  let validator;

  // 3. Use the onMount lifecycle function
  // This code runs after the component's markup has been rendered to the DOM
  onMount(() => {
    if (formElement) {
      console.log('Svelte component mounted. Initializing Ctrovalidate.');
      validator = new Ctrovalidate(formElement, {
        realTime: true
      });
    }
  });

  // 4. Define the submit handler function
  async function handleSubmit() {
    if (!validator) {
      console.error('Validator not initialized yet.');
      return;
    }
    const isFormValid = await validator.validate();
    if (isFormValid) {
      alert('Svelte form is valid! Submitting...');
      console.log('Form Data:', Object.fromEntries(new FormData(formElement).entries()));
    } else {
      console.log('Svelte form has errors.');
    }
  }
</script>

<main>
  <h1>Register with Svelte</h1>
  <p>This form is rendered and managed by a Svelte component.</p>
  
  <!-- 5. The Form -->
  <!-- Use bind:this to get a reference to the DOM element -->
  <!-- Use on:submit|preventDefault to call our handler -->
  <form bind:this={formElement} on:submit|preventDefault={handleSubmit} novalidate>
    <div>
      <label for="username">Username</label>
      <input 
        type="text" 
        id="username" 
        name="username" 
        data-ctrovalidate-rules="required|minLength:3|alphaDash"
      >
      <div class="error-message"></div>
    </div>

    <div>
      <label for="email">Email Address</label>
      <input 
        type="email" 
        id="email" 
        name="email" 
        data-ctrovalidate-rules="required|email"
      >
      <div class="error-message"></div>
    </div>

    <div>
      <label for="password">Password</label>
      <input 
        type="password" 
        id="password" 
        name="password" 
        data-ctrovalidate-rules="required|strongPassword"
      >
      <div class="error-message"></div>
    </div>

    <button type="submit">Create Account</button>
  </form>
</main>
