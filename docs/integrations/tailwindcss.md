---
title: Tailwind CSS Integration | Dynamic Form Styling
description: Integrate Ctrovalidate with Tailwind CSS using utility classes for accessible, styled validation states.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Integrations
    url: https://ctrovalidate.vercel.app/integrations/tailwindcss
  - name: Tailwind CSS
    url: https://ctrovalidate.vercel.app/integrations/tailwindcss
---

# Tailwind CSS Integration

Ctrovalidate works seamlessly with Tailwind CSS. Configure the library to use Tailwind's utility classes for validation states.

---

## Basic Configuration

Configure Ctrovalidate to use Tailwind classes:

```javascript
import { Ctrovalidate, LogLevel } from 'ctrovalidate';

const validator = new Ctrovalidate(form, {
  errorClass: 'border-red-500 ring-1 ring-red-500',
  errorMessageClass: 'text-red-600 text-sm mt-1',
  pendingClass: 'border-blue-500 animate-pulse'
});
```

---

## Complete Example

```html
<form id="signup-form" novalidate class="space-y-6 max-w-md mx-auto">
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">
      Email Address
    </label>
    <input
      name="email"
      type="email"
      data-ctrovalidate-rules="required|email"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
    />
    <div class="error-message"></div>
  </div>

  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">
      Password
    </label>
    <input
      name="password"
      type="password"
      data-ctrovalidate-rules="required|minLength:8"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
    />
    <div class="error-message"></div>
  </div>

  <button
    type="submit"
    class="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
  >
    Sign Up
  </button>
</form>
```

```javascript
import { Ctrovalidate } from 'ctrovalidate';

const form = document.getElementById('signup-form');
const validator = new Ctrovalidate(form, {
  realTime: true,
  errorClass: 'border-red-500 ring-1 ring-red-500',
  errorMessageClass: 'text-red-600 text-sm font-medium mt-1'
});
```

---

## Using `@apply` Directive

Define error styles in your CSS file:

```css
/* styles.css */
input.is-invalid {
  @apply border-red-500 ring-1 ring-red-500;
}

div.error-message {
  @apply text-red-600 text-sm font-medium mt-1;
}

input.ctrovalidate-pending {
  @apply border-blue-500 animate-pulse;
}
```

```javascript
// Use default class names
const validator = new Ctrovalidate(form, {
  realTime: true
  // errorClass: 'is-invalid' (default)
  // errorMessageClass: 'error-message' (default)
  // pendingClass: 'ctrovalidate-pending' (default)
});
```

---

## Advanced: Peer Selection

Use Tailwind's `peer` utility to style elements based on validation state:

```html
<div class="relative">
  <input
    name="username"
    class="peer w-full px-4 py-2 border border-gray-300 rounded-lg"
    data-ctrovalidate-rules="required"
  />
  
  <!-- Show checkmark when valid -->
  <div class="hidden peer-[:not(.is-invalid)]:block absolute right-3 top-3 text-green-500">
    ✓
  </div>
  
  <!-- Show error icon when invalid -->
  <div class="hidden peer-[.is-invalid]:block absolute right-3 top-3 text-red-500">
    ✗
  </div>
</div>
```

---

## Dark Mode Support

Use Tailwind's dark mode variants:

```javascript
const validator = new Ctrovalidate(form, {
  errorClass: 'border-red-500 dark:border-red-400',
  errorMessageClass: 'text-red-600 dark:text-red-400 text-sm mt-1'
});
```

Or in CSS:

```css
input.is-invalid {
  @apply border-red-500 dark:border-red-400;
}

div.error-message {
  @apply text-red-600 dark:text-red-400 text-sm;
}
```

---

## Loading States

Style async validation with Tailwind:

```javascript
const validator = new Ctrovalidate(form, {
  pendingClass: 'border-blue-500 bg-blue-50 animate-pulse'
});
```

```html
<input
  name="username"
  data-ctrovalidate-rules="required|usernameAvailable"
  class="w-full px-4 py-2 border border-gray-300 rounded-lg transition-all"
/>
```

When the async rule runs, the input will have the `border-blue-500 bg-blue-50 animate-pulse` classes applied.

---

## Best Practices

### 1. Use Transitions

Add smooth transitions to validation states:

```html
<input class="... transition-all duration-200" />
```

### 2. Consistent Error Styling

Use the same error classes across all forms:

```javascript
const defaultOptions = {
  errorClass: 'border-red-500 ring-1 ring-red-500',
  errorMessageClass: 'text-red-600 text-sm mt-1'
};

const validator = new Ctrovalidate(form, defaultOptions);
```

### 3. Accessible Colors

Ensure error colors meet WCAG contrast requirements:

```javascript
// Good contrast for accessibility
errorClass: 'border-red-600 ring-1 ring-red-600'
```

---

## Benefits

- **Utility-First**: Use Tailwind's utility classes directly
- **No Custom CSS**: No need to write custom stylesheets
- **Responsive**: Easy to add responsive validation styles
- **Dark Mode**: Built-in dark mode support

> [!TIP]
> Use Tailwind's `transition` classes on inputs to make validation state changes smooth and polished.

---

## Next Steps

- **[Configuration Options](../guide/configuration.md)** — All configuration options
- **[Getting Started](../guide/getting-started.md)** — Basic usage guide
- **[React Integration](./react.md)** — Using with React and Tailwind
