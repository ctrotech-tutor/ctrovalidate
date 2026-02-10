# @ctrovalidate/browser

**DOM-first validation for vanilla JavaScript and HTML.**

`@ctrovalidate/browser` brings the power of Ctrovalidate to traditional web forms using simple data attributes. No framework required—just clean, declarative validation that works with your existing HTML.

[![npm version](https://img.shields.io/npm/v/@ctrovalidate/browser.svg)](https://www.npmjs.com/package/@ctrovalidate/browser)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

- 🎯 **Data attribute driven** - Define rules directly in HTML
- ⚡ **Real-time validation** - Blur and input event handling
- 🎨 **Framework agnostic** - Works with vanilla JS, jQuery, or any library
- ♿ **Accessible** - Full ARIA support for screen readers
- 🎭 **Tailwind-friendly** - Supports space-separated class lists
- 🔗 **Conditional validation** - Field dependencies made easy
- 💬 **Custom messages** - Per-field or per-rule message overrides
- 🌍 **i18n ready** - Built on @ctrovalidate/core's translation system
- 🚫 **Async support** - Handles async rules with abort signals

---

## 📦 Installation

```bash
npm install @ctrovalidate/browser @ctrovalidate/core
```

```bash
pnpm add @ctrovalidate/browser @ctrovalidate/core
```

```bash
yarn add @ctrovalidate/browser @ctrovalidate/core
```

---

## 🚀 Quick Start

### 1. Add Data Attributes to Your HTML

```html
<form id="signupForm" novalidate>
  <div>
    <label for="email">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      data-ctrovalidate-rules="required|email"
    />
    <div class="error-message"></div>
  </div>

  <div>
    <label for="password">Password</label>
    <input
      type="password"
      id="password"
      name="password"
      data-ctrovalidate-rules="required|minLength:8|strongPassword"
    />
    <div class="error-message"></div>
  </div>

  <div>
    <label for="age">Age</label>
    <input
      type="number"
      id="age"
      name="age"
      data-ctrovalidate-rules="required|min:18|max:120"
    />
    <div class="error-message"></div>
  </div>

  <button type="submit">Sign Up</button>
</form>
```

### 2. Initialize Ctrovalidate

```javascript
import { Ctrovalidate } from '@ctrovalidate/browser';

const form = document.querySelector('#signupForm');

const validator = new Ctrovalidate(form, {
  realTime: true, // Enable real-time validation
  errorClass: 'is-invalid', // Class added to invalid fields
  errorMessageClass: 'error-message', // Selector for error containers
  pendingClass: 'is-validating', // Class during async validation
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const isValid = await validator.validate();

  if (isValid) {
    // Submit form data
    console.log('Form is valid!');
  }
});
```

### 3. Add Some CSS

```css
.is-invalid {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.is-validating {
  opacity: 0.6;
  pointer-events: none;
}
```

---

## 📚 Data Attributes

### Validation Rules

Define validation rules using the `data-ctrovalidate-rules` attribute:

```html
<!-- Single rule -->
<input data-ctrovalidate-rules="required" />

<!-- Multiple rules (pipe-separated) -->
<input data-ctrovalidate-rules="required|email" />

<!-- Rules with parameters -->
<input data-ctrovalidate-rules="required|minLength:8|maxLength:255" />

<!-- Complex validation -->
<input data-ctrovalidate-rules="required|between:18,120|integer" />
```

### Custom Messages

Override error messages at the field level:

```html
<!-- Catch-all message for any rule -->
<input
  data-ctrovalidate-rules="required|email"
  data-ctrovalidate-message="Please fix this field!"
/>

<!-- Rule-specific messages -->
<input
  data-ctrovalidate-rules="required|email|minLength:5"
  data-ctrovalidate-required-message="Email is required!"
  data-ctrovalidate-email-message="Invalid email format!"
  data-ctrovalidate-minlength-message="Too short!"
/>
```

### Conditional Validation (Dependencies)

Validate fields only when certain conditions are met:

```html
<!-- Validate only if checkbox is checked -->
<input type="checkbox" name="agreeToTerms" />
<input
  name="signature"
  data-ctrovalidate-if="agreeToTerms:checked"
  data-ctrovalidate-rules="required"
/>

<!-- Validate only if another field has a specific value -->
<select name="country">
  <option value="USA">USA</option>
  <option value="Canada">Canada</option>
</select>
<input
  name="state"
  data-ctrovalidate-if="country:value=USA"
  data-ctrovalidate-rules="required"
/>

<!-- Validate only if another field has any value -->
<input name="email" />
<input
  name="confirmEmail"
  data-ctrovalidate-if="email:present"
  data-ctrovalidate-rules="required|email"
/>
```

---

## 🎯 Available Rules

All rules from `@ctrovalidate/core` are available:

| Category       | Rules                                                      |
| -------------- | ---------------------------------------------------------- |
| **Required**   | `required`                                                 |
| **Format**     | `email`, `url`, `ipAddress`, `phone`, `json`, `creditCard` |
| **String**     | `alpha`, `alphaNum`, `alphaDash`, `alphaSpaces`            |
| **Numeric**    | `numeric`, `integer`, `decimal`, `min:n`, `max:n`          |
| **Length**     | `minLength:n`, `maxLength:n`, `exactLength:n`              |
| **Range**      | `between:min,max`                                          |
| **Comparison** | `sameAs:value`                                             |
| **Complex**    | `strongPassword`                                           |

See [@ctrovalidate/core documentation](https://www.npmjs.com/package/@ctrovalidate/core) for detailed rule descriptions.

---

## ⚙️ Configuration Options

```javascript
const validator = new Ctrovalidate(form, {
  // Enable/disable real-time validation (default: true)
  realTime: true,

  // Class added to invalid fields (supports space-separated for Tailwind)
  errorClass: 'is-invalid border-red-500',

  // Selector for error message containers (supports space-separated)
  errorMessageClass: 'error-message text-red-500',

  // Class added during async validation
  pendingClass: 'is-validating opacity-50',

  // Programmatic schema (alternative to data attributes)
  schema: {
    email: 'required|email',
    password: 'required|minLength:8',
  },

  // Rule aliases
  aliases: {
    username: 'required|minLength:3|maxLength:20|alphaDash',
  },

  // Logging level (LogLevel.NONE, ERROR, WARN, INFO, DEBUG)
  logLevel: Ctrovalidate.LogLevel.NONE,
});
```

---

## 🎮 Instance Methods

### `validate()`

Validates the entire form and returns a promise:

```javascript
const isValid = await validator.validate();

if (isValid) {
  console.log('All fields are valid!');
}
```

### `reset()`

Clears all validation states and error messages:

```javascript
validator.reset();
```

### `refresh()`

Re-scans the form for added/removed fields:

```javascript
// After dynamically adding fields
validator.refresh();
```

### `addField(element)`

Manually registers a field for validation:

```javascript
const newField = document.createElement('input');
newField.setAttribute('data-ctrovalidate-rules', 'required');
form.appendChild(newField);

validator.addField(newField);
```

### `removeField(element)`

Manually unregisters a field:

```javascript
validator.removeField(element);
```

### `getError(fieldName)`

Gets the current error message for a field:

```javascript
const error = validator.getError('email');
console.log(error); // "Please enter a valid email address." or null
```

### `isDirty(fieldName)`

Checks if a field has been interacted with:

```javascript
if (validator.isDirty('email')) {
  console.log('User has touched the email field');
}
```

### `destroy()`

Removes all event listeners and cleans up:

```javascript
validator.destroy();
```

---

## 🌍 Static Methods (Global Configuration)

### `Ctrovalidate.addRule(name, logic, message?)`

Add a custom synchronous validation rule globally:

```javascript
Ctrovalidate.addRule(
  'isEven',
  (value) => Number(value) % 2 === 0,
  'Value must be an even number.'
);
```

### `Ctrovalidate.addAsyncRule(name, logic, message?)`

Add a custom asynchronous validation rule globally:

```javascript
Ctrovalidate.addAsyncRule(
  'isUniqueEmail',
  async (value, params, element, signal) => {
    const response = await fetch(`/api/check-email?email=${value}`, { signal });
    const { isUnique } = await response.json();
    return isUnique;
  },
  'This email is already registered.'
);
```

### `Ctrovalidate.defineAlias(name, rules)`

Define a reusable rule combination globally:

```javascript
Ctrovalidate.defineAlias('password', 'required|minLength:8|strongPassword');
Ctrovalidate.defineAlias(
  'username',
  'required|minLength:3|maxLength:20|alphaDash'
);
```

### `Ctrovalidate.setCustomMessages(messages)`

Set custom error messages globally:

```javascript
Ctrovalidate.setCustomMessages({
  required: 'This field cannot be empty!',
  email: 'Please provide a valid email address.',
  minLength: 'Must be at least {0} characters long.',
});
```

---

## 🎨 Styling Examples

### Basic CSS

```css
.is-invalid {
  border: 2px solid #dc3545;
  background-color: #fff5f5;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.is-validating {
  opacity: 0.6;
  position: relative;
}

.is-validating::after {
  content: '';
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border: 2px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: translateY(-50%) rotate(360deg);
  }
}
```

### Tailwind CSS

```javascript
const validator = new Ctrovalidate(form, {
  errorClass: 'border-red-500 bg-red-50',
  errorMessageClass: 'text-red-500 text-sm mt-1',
  pendingClass: 'opacity-50 pointer-events-none',
});
```

```html
<div class="mb-4">
  <input
    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    data-ctrovalidate-rules="required|email"
  />
  <div class="text-red-500 text-sm mt-1"></div>
</div>
```

---

## ♿ Accessibility

Ctrovalidate automatically handles ARIA attributes for screen reader support:

- **`aria-invalid="true"`** - Added to invalid fields
- **`aria-describedby`** - Links field to error message
- **`role="status"`** - Added to error containers
- **`aria-live="polite"`** - Announces errors to screen readers

Example output:

```html
<input
  name="email"
  aria-invalid="true"
  aria-describedby="ctrovalidate-error-email"
/>
<div
  id="ctrovalidate-error-email"
  class="error-message"
  role="status"
  aria-live="polite"
>
  Please enter a valid email address.
</div>
```

---

## 🔄 Real-Time Validation Behavior

### Blur Event

- Field is validated when user leaves the field
- Field is marked as "dirty"
- Error message is displayed if validation fails

### Input Event

- Field is **only** validated if it's already dirty
- Provides instant feedback after first blur
- Prevents annoying errors while typing initially

### Dependency Changes

- Dependent fields are re-validated when controller field changes
- Example: Re-validate "confirm email" when "email" changes

---

## 🎓 Complete Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Ctrovalidate Demo</title>
    <style>
      .is-invalid {
        border-color: #dc3545;
      }
      .error-message {
        color: #dc3545;
        font-size: 0.875rem;
      }
    </style>
  </head>
  <body>
    <form id="registrationForm" novalidate>
      <div>
        <label for="username">Username</label>
        <input
          id="username"
          name="username"
          data-ctrovalidate-rules="required|minLength:3|maxLength:20|alphaDash"
          data-ctrovalidate-required-message="Username is required!"
        />
        <div class="error-message"></div>
      </div>

      <div>
        <label for="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          data-ctrovalidate-rules="required|email"
        />
        <div class="error-message"></div>
      </div>

      <div>
        <label for="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          data-ctrovalidate-rules="required|minLength:8|strongPassword"
        />
        <div class="error-message"></div>
      </div>

      <div>
        <label for="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          data-ctrovalidate-if="password:present"
          data-ctrovalidate-rules="required"
        />
        <div class="error-message"></div>
      </div>

      <div>
        <label>
          <input type="checkbox" name="agreeToTerms" />
          I agree to the terms and conditions
        </label>
      </div>

      <div>
        <input
          name="signature"
          data-ctrovalidate-if="agreeToTerms:checked"
          data-ctrovalidate-rules="required|minLength:2"
          placeholder="Type your name to agree"
        />
        <div class="error-message"></div>
      </div>

      <button type="submit">Register</button>
    </form>

    <script type="module">
      import { Ctrovalidate } from '@ctrovalidate/browser';

      const form = document.querySelector('#registrationForm');

      // Add custom rule
      Ctrovalidate.addRule(
        'noSpaces',
        (value) => !/\\s/.test(value),
        'Spaces are not allowed.'
      );

      const validator = new Ctrovalidate(form, {
        realTime: true,
        errorClass: 'is-invalid',
        errorMessageClass: 'error-message',
      });

      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const isValid = await validator.validate();

        if (isValid) {
          const formData = new FormData(form);
          console.log('Form data:', Object.fromEntries(formData));
          alert('Registration successful!');
        } else {
          alert('Please fix the errors before submitting.');
        }
      });
    </script>
  </body>
</html>
```

---

## 📚 Full Documentation

For comprehensive guides, all available rules, and advanced usage:

**[Visit Ctrovalidate Documentation](https://ctrovalidate.vercel.app)**

---

## 🤝 Related Packages

- **[@ctrovalidate/core](https://www.npmjs.com/package/@ctrovalidate/core)** - Platform-agnostic validation engine
- **[@ctrovalidate/react](https://www.npmjs.com/package/@ctrovalidate/react)** - React hooks
- **[@ctrovalidate/vue](https://www.npmjs.com/package/@ctrovalidate/vue)** - Vue composables
- **[@ctrovalidate/svelte](https://www.npmjs.com/package/@ctrovalidate/svelte)** - Svelte stores
- **[@ctrovalidate/next](https://www.npmjs.com/package/@ctrovalidate/next)** - Next.js server actions

---

## 📄 License

MIT © [Ctrotech](https://github.com/ctrotech-tutor)
