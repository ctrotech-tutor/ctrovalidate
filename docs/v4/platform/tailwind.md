---
title: Tailwind CSS Integration | Utility-First Validation
description: Learn how to style Ctrovalidate error states, loading indicators, and field transitions using Tailwind CSS utility classes.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Platform
    url: https://ctrovalidate.vercel.app/v4/platform/tailwind
  - name: Tailwind CSS
    url: https://ctrovalidate.vercel.app/v4/platform/tailwind
---

# Tailwind CSS Integration

Ctrovalidate is designed to be fully compatible with utility-first CSS frameworks. Its configuration allows you to pass multiple space-separated classes directly to fields and error containers.

---

## 🎨 Styling Error States

Use the `errorClass` and `errorMessageClass` options to apply Tailwind utilities dynamically.

```javascript
import { Ctrovalidate } from '@ctrovalidate/browser';

const validator = new Ctrovalidate(form, {
  // Apply a red ring and border to the input
  errorClass: 'ring-2 ring-red-500 border-red-500 focus:ring-red-600',
  
  // Style the error message container
  errorMessageClass: 'text-sm text-red-600 mt-1 font-medium italic'
});
```

---

## ⚡ Loading & Pending States

When using asynchronous rules (e.g., username availability), use the `pendingClass` to provide visual feedback.

```javascript
const validator = new Ctrovalidate(form, {
  pendingClass: 'animate-pulse border-blue-400 bg-blue-50'
});
```

---

## 🧩 Complex Layouts (3-Level Search)

Ctrovalidate v4 supports a **3-level parent search** for error containers, which is perfect for complex Tailwind layouts where inputs are nested inside specialized wrappers.

```html
<div class="form-group flex flex-col gap-2">
  <label class="text-gray-700">Email Address</label>
  
  <!-- The input is nested inside a wrapper for icons -->
  <div class="relative">
    <span class="absolute left-3 top-2 text-gray-400">@</span>
    <input 
      name="email" 
      class="pl-10 pr-4 py-2 border rounded-lg w-full"
      data-ctrovalidate-rules="required|email"
    />
  </div>

  <!-- Ctrovalidate finds this container by searching up 2 levels -->
  <div class="error-message"></div>
</div>
```

---

## 🛠️ Performance Tip: PurgeCSS

Since Ctrovalidate applies classes dynamically, ensure that your `tailwind.config.js` is aware of the classes you use in your JS configuration to prevent them from being purged in production.

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./docs/**/*.{md,html}",
    // If you define classes in a JS object, include that file:
    "./lib/validation-config.ts" 
  ],
  // OR use safelist
  safelist: [
    'ring-red-500',
    'border-red-500',
    'animate-pulse'
  ]
}
```

---

## ✅ Best Practices

- **Focus States**: Ensure your `errorClass` includes `focus:` variants to maintain visibility when the user clicks back into an invalid field.
- **Transitions**: Add `transition-all duration-200` to your base input classes for smooth visual feedback when errors appear.
- **Group Hover**: Use Tailwind's `group` class on the parent container to highlight labels or icons when the field is in an error state.



