# Integration: Tailwind CSS

Ctrovalidate is designed to be style-agnostic, making it easy to integrate with any CSS framework. Here’s a recommended pattern for using it with the popular utility-first framework, [Tailwind CSS](https://tailwindcss.com/).

## The Strategy

The goal is to use Tailwind's `@apply` directive to style the classes that Ctrovalidate adds to your form elements during validation.

- **`.is-invalid`**: This class is added to an input field when it fails validation. We'll style this to have a red border.
- **`.error-message`**: This is the class of the `<div>` that displays the error message. We'll style this to have red text.

## Example Implementation

Below is a complete example of a form styled with Tailwind CSS.

### 1. HTML Structure

First, set up your form as you normally would, adding Ctrovalidate's `data-ctrovalidate-rules` attributes.

```html
<form id="contact-form" novalidate class="space-y-6">
  <div>
    <label for="name" class="block text-sm font-medium text-gray-700"
      >Full Name</label
    >
    <input
      type="text"
      id="name"
      name="name"
      class="form-input mt-1"
      data-ctrovalidate-rules="required|minLength:3"
    />
    <div class="error-message"></div>
  </div>
  <!-- ... other fields ... -->
</form>
```

### 2. CSS Styling

In your main CSS file (or in a `<style type="text/tailwindcss">` block if using the CDN), define your styles using `@apply`.

```css
@layer components {
  /* A base style for all form inputs */
  .form-input {
    @apply block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500;
  }

  /* Style for the invalid state */
  .is-invalid {
    @apply border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500;
  }

  /* Style for the error message text */
  .error-message {
    @apply text-red-600 text-sm mt-1;
  }
}
```

### 3. JavaScript Initialization

The JavaScript remains the same as in a standard setup.

```javascript
import { Ctrovalidate } from 'ctrovalidate';

const form = document.getElementById('contact-form');
const validator = new Ctrovalidate(form, { realTime: true });

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const isFormValid = await validator.validate();
  if (isFormValid) {
    alert('Form submitted successfully!');
  }
});
```

By combining Ctrovalidate's simple class-based feedback with Tailwind's powerful utility classes, you can create beautifully styled and fully validated forms with minimal effort.

[**View the full working example on GitHub**](https://github.com/ctrotech-tutor/ctrovalidate/blob/main/examples/with-tailwindcss/index.html)
