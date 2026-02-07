<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Ctrovalidate } from '@ctrovalidate/browser';

const formRef = ref<HTMLFormElement | null>(null);

onMounted(() => {
  if (formRef.value) {
    // Initialize Custom Rules
    Ctrovalidate.addRule(
      'strongPassword',
      (value: unknown) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(value as string),
      'Use at least 8 characters with upper, lower, and numeric values.'
    );

    Ctrovalidate.addAsyncRule(
      'usernameAvailable',
      async (value: unknown, _params?: unknown[], _context?: unknown) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const reserved = ['admin', 'root', 'ctrotech'];
            resolve(!reserved.includes((value as string).toLowerCase()));
          }, 1000);
        });
      },
      'This username is already reserved by the system.'
    );

    // Initialize Validator
    const validator = new Ctrovalidate(formRef.value, {
      logLevel: Ctrovalidate.LogLevel.DEBUG,
      realTime: true,
      pendingClass: 'is-validating',
    });

    formRef.value.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('--- VUE SUBMISSION INITIATED ---');

      const isValid = await validator.validate();

      if (isValid) {
        console.log('✅ VALIDATION SUCCESS');
        alert('🚀 Registration successful! (Vue Demo)');
        const data = Object.fromEntries(new FormData(formRef.value!).entries());
        console.table(data);
      } else {
        console.warn('❌ VALIDATION FAILURE');
      }
    });
  }
});
</script>

<template>
  <div class="showcase-container">
    <header>
      <div class="logo-text">Ctrovalidate</div>
      <p>Vue 3 • Vite • Monochrome</p>
    </header>

    <form ref="formRef" novalidate>
      <div class="form-group">
        <label for="name">Full Name</label>
        <input
          name="name"
          id="name"
          type="text"
          placeholder="e.g. John Doe"
          data-ctrovalidate-rules="required|minLength:3|alpha"
        />
        <div class="spinner"></div>
        <div class="error-message"></div>
      </div>

      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Check availability..."
          data-ctrovalidate-rules="required|minLength:3|alphaDash|usernameAvailable"
        />
        <div class="spinner"></div>
        <div class="error-message"></div>
      </div>

      <div class="form-group">
        <label for="contact_method">Preferred Contact Method</label>
        <select name="contact_method" id="contact_method">
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
      </div>

      <div class="form-group">
        <label for="mobile">Mobile Number</label>
        <input
          name="mobile"
          id="mobile"
          type="text"
          placeholder="+1 234 567 890"
          data-ctrovalidate-rules="required|phone"
          data-ctrovalidate-if="contact_method:value=phone"
        />
        <div class="spinner"></div>
        <div class="error-message"></div>
      </div>

      <div class="form-group">
        <label for="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="john@example.com"
          data-ctrovalidate-rules="required|email"
          data-ctrovalidate-if="contact_method:value=email"
        />
        <div class="spinner"></div>
        <div class="error-message"></div>
      </div>

      <div class="form-group">
        <label for="password">Security Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="••••••••"
          data-ctrovalidate-rules="required|strongPassword"
        />
        <div class="spinner"></div>
        <div class="error-message"></div>
      </div>

      <div class="form-group checkbox-group">
        <input type="checkbox" id="terms" name="terms" data-ctrovalidate-rules="required" />
        <label for="terms">I agree to the industrial standards of testing</label>
      </div>
      <div class="error-message" style="margin-top: -0.5rem"></div>

      <button type="submit">Deploy Vue Integration</button>
    </form>

    <div class="footer-note">
      Powered by Ctrovalidate v4.0.0-alpha.0
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles can be empty if we rely on global style.css, 
   but it's cleaner to keep them here if they are component-specific. */
</style>
