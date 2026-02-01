---
title: Tailwind CSS Integration | Dynamic Form Styling
description: Seamlessly integrate Ctrovalidate with Tailwind CSS using dynamic classes and peer-state variants for a premium, accessible form experience.
---

# Tailwind CSS Integration

Ctrovalidate works seamlessly with Tailwind CSS. Since the library is CSS-class driven, you can leverage Tailwind's utility classes to build beautiful, accessible validation states without writing a single line of custom CSS.

---

## 🎨 Design Strategy: Industrial Monochrome

The easiest way to integrate is by configuring Ctrovalidate to use Tailwind's error classes, maintaining our high-standards monochrome palette (Black, White, and Red for errors).

```javascript
const validator = new Ctrovalidate(form, {
  errorClass: 'border-red-500 ring-0', // Minimalist Red Border
  pendingClass: 'is-validating',
});
```

---

## 🛠️ Implementation Example

Here is a production-ready field structure using the **Industrial Monochrome** design system.

```html
<form id="taiwind-form" novalidate className="space-y-6">
  <div class="form-group">
    <label class="block text-sm font-semibold text-black uppercase tracking-wider">
      Email Address
    </label>

    <input
      name="email"
      data-ctrovalidate-rules="required|email"
      class="mt-1 block w-full border-0 border-b-2 border-black bg-transparent py-2 focus:border-red-500 focus:ring-0 transition-all duration-300"
    />

    <!-- Error message container -->
    <div class="error-message mt-2 text-xs text-red-600 font-bold h-4"></div>
  </div>

  <button
    class="w-full bg-black text-white font-bold py-4 uppercase tracking-widest hover:bg-gray-900 transition-colors"
  >
    Verify Integration
  </button>
</form>
```

### Dynamic Styling with `is-invalid`

If you prefer to define your error styles in your CSS file using `@apply`, you can target the default `is-invalid` class:

```css
/* industrial.css */
input.is-invalid {
  @apply border-red-500 text-red-600;
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
