<script setup lang="ts">
import { useCtrovalidate } from '@ctrovalidate/vue';

const { values, errors, isDirty, isValidating, isValid, validateForm, reset } = useCtrovalidate({
  schema: {
    username: 'required|minLength:4|alphaDash',
    email: 'required|email'
  },
  initialValues: {
    username: '',
    email: ''
  },
  messages: {
    username: 'Identifier must be at least 4 alphanumeric chars.',
    email: 'Please provide a valid relay address.'
  }
});

const handleSubmit = async () => {
  const isFormValid = await validateForm();
  if (isFormValid) {
    alert('Form submitted successfully! (Vue Composable)');
    console.log('Submitted Data:', values);
  } else {
    console.warn('Form validation failed.');
  }
};
</script>

<template>
  <div class="demo-container">
    <h1>Ctrovalidate Vue Composable Demo</h1>
    <p>Using the headless <code>useCtrovalidate</code> composable for Vue 3.</p>

    <form @submit.prevent="handleSubmit" novalidate>
      <div class="form-group">
        <label for="username">Node ID (Username)</label>
        <input
          id="username"
          v-model="values.username"
          type="text"
          placeholder="e.g. unit-734"
          :class="{ 'has-error': errors.username, 'is-dirty': isDirty.username }"
        />
        <div v-if="isValidating.username" class="validating">Checking...</div>
        <div v-if="errors.username" class="error-msg">{{ errors.username }}</div>
      </div>

      <div class="form-group">
        <label for="email">Contact Relay (Email)</label>
        <input
          id="email"
          v-model="values.email"
          type="email"
          placeholder="operator@industrial.net"
          :class="{ 'has-error': errors.email, 'is-dirty': isDirty.email }"
        />
        <div v-if="errors.email" class="error-msg">{{ errors.email }}</div>
      </div>

      <div class="actions">
        <button type="submit" class="primary-btn">Initialize Sequence</button>
        <button type="button" @click="reset()" class="secondary-btn">Reset</button>
      </div>
    </form>

    <div class="debug-panel">
      <h3>State Inspector</h3>
      <pre>{{ JSON.stringify({ values, errors, isDirty, isValidating, isValid }, null, 2) }}</pre>
    </div>
  </div>
</template>

<style>
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: #213547;
  background-color: #ffffff;
}

.demo-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 0.9rem;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input.has-error {
  border-color: #ff4d4f;
  background-color: #fff2f0;
}

input.is-dirty:not(.has-error) {
  border-color: #52c41a;
}

.error-msg {
  color: #ff4d4f;
  font-size: 0.8rem;
  margin-top: 5px;
}

.validating {
  color: #1890ff;
  font-size: 0.8rem;
  margin-top: 5px;
}

.actions {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.primary-btn {
  background-color: #000;
  color: #fff;
}

.secondary-btn {
  background-color: #eee;
  color: #333;
}

.debug-panel {
  margin-top: 40px;
  padding: 15px;
  background: #222;
  color: #0f0;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.8rem;
  overflow: auto;
}

pre {
  margin: 0;
}
</style>
