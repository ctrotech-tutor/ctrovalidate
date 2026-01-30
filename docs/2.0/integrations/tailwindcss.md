---
title: Tailwind CSS Integration | Dynamic Form Styling
description: Seamlessly integrate Ctrovalidate with Tailwind CSS using dynamic classes and peer-state variants for a premium, accessible form experience.
---

# Tailwind CSS Integration

Ctrovalidate works seamlessly with Tailwind CSS. Since the library is CSS-class driven, you can leverage Tailwind's utility classes to build beautiful, accessible validation states without writing a single line of custom CSS.

---

## 🎨 Design Strategy

The easiest way to integrate is by configuring Ctrovalidate to use Tailwind's error classes.

```javascript
const validator = new Ctrovalidate(form, {
  errorClass: 'border-red-500 ring-1 ring-red-500', // Tailwind classes
});
```

---

## 🛠️ Implementation Example

Here is a production-ready field structure using Tailwind's `group` utility for coordinated state changes.

```html
<form id="taiwind-form" novalidate>
  <div class="mb-4">
    <label class="block text-sm font-medium text-gray-700">Email</label>

    <input
      name="email"
      data-ctrovalidate-rules="required|email"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
    />

    <!-- Error message container -->
    <div class="error-message mt-2 text-sm text-red-600 h-5"></div>
  </div>

  <button
    class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
  >
    Submit
  </button>
</form>
```

### Dynamic Styling with `is-invalid`

If you prefer to define your error styles in your CSS file using `@apply`, you can target the default `is-invalid` class:

```css
/* main.css */
input.is-invalid {
  @apply border-red-500 bg-red-50 ring-2 ring-red-100;
}

div.error-message {
  @apply text-red-600 font-medium;
}
```

---

## 🧩 Advanced: Peer Selection

You can even use Tailwind's `peer` utility to style sibling elements based on the validation status of the input.

```html
<div class="relative">
  <input
    name="username"
    class="peer ... border-gray-300 is-invalid:border-red-500"
    data-ctrovalidate-rules="required"
  />
  <!-- This icon only shows when the input IS NOT invalid -->
  <div class="hidden peer-[:not(.is-invalid)]:block">✅</div>
</div>
```

> [!TIP]
> Use Tailwind's `transition` classes on your input to make the error border appear smoothly when validation triggers.

## Next Steps

- **[Configuration Options](../guide/configuration.md)** — Learn more about customizing classes.
- **[A11y Best Practices](../guide/introduction.md)** — Combining Tailwind with screen-reader support.
