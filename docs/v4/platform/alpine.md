---
title: Alpine.js Integration | Markup-First Reactivity
description: Use Ctrovalidate with Alpine.js to build reactive, validated forms directly in your HTML using x-init and x-data directives.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Platform
    url: https://ctrovalidate.vercel.app/v4/platform/alpine
  - name: Alpine.js
    url: https://ctrovalidate.vercel.app/v4/platform/alpine
---

# Alpine.js Integration

Ctrovalidate and Alpine.js share a common philosophy: **Keep logic in the HTML**. This synergy makes them a perfect pair for building interactive forms with minimal JavaScript overhead.

---

## 🏗️ Basic Integration

Initialize Ctrovalidate inside Alpine's `x-init` directive and store the instance in your `x-data` object for programmatic access.

```html
<div 
  x-data="{ 
    validator: null,
    async submit() {
      if (await this.validator.validateForm()) {
        console.log('Valid! Proceeding with update.');
      }
    }
  }" 
  x-init="validator = new Ctrovalidate($refs.form, { realTime: true })"
>
  <form x-ref="form" @submit.prevent="submit" novalidate>
    <div class="field">
      <input name="email" data-ctrovalidate-rules="required|email" />
      <div class="error-msg"></div>
    </div>
    
    <button type="submit">Sign Up</button>
  </form>
</div>
```

---

## ⚡ Dynamic Fields (Lists)

When adding or removing fields dynamically with `x-for`, you must notify Ctrovalidate to re-scan the DOM using `validator.refresh()`. Always wrap this call in `$nextTick` to ensure Alpine has finished updating the DOM.

```html
<button @click="items.push({}); $nextTick(() => validator.refresh())">
  Add Row
</button>
```

---

## 🛡️ Best Practices

- **`x-ref`**: Use Alpine's `$refs` directly in the `Ctrovalidate` constructor for a clean, ID-free initialization.
- **Global Availability**: If you use Ctrovalidate across multiple Alpine components, attach it to the `window` object in your main entry point.
- **Loading Indicators**: Map Alpine's reactive state to Ctrovalidate's `pendingClass` to show spinners during async validation.
- **Headless Power**: Remember that Ctrovalidate manages the *logic* and *ARIA* state, while Alpine manages the *reactivity* and *UI visibility*. Use them together for a flawless UX.



