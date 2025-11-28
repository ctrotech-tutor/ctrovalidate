# Getting Started

Welcome to Ctrovalidate! This guide will walk you through the process of
setting up and using the library in your project.

## Installation

You can install Ctrovalidate using your favorite package manager.

### Using npm

```bash
npm install ctrovalidate
```

### Using yarn

```bash
yarn add ctrovalidate
```

### Using pnpm

```bash
pnpm add ctrovalidate
```

### CDN (for quick demos)

For prototyping or simple HTML files, you can use the library directly
from a CDN like jsDelivr.

```html
<script type="module">
  import { Ctrovalidate } from 'https://cdn.jsdelivr.net/npm/ctrovalidate@2.0.0/dist/ctrovalidate.js';
  // Your code here...
</script>
```

## Your First Form

Let's create a simple registration form to see Ctrovalidate in action.

### 1. Create the HTML

First, create your HTML form. The key is to add the
`data-ctrovalidate-rules` attribute to each input you want to validate.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My First Ctrovalidate Form</title>
    <style>
      /* Basic styling for feedback */
      .is-invalid {
        border-color: red;
      }
      .error-message {
        color: red;
        font-size: 0.875em;
      }
    </style>
  </head>
  <body>
    <form id="registration-form" novalidate>
      <div>
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          data-ctrovalidate-rules="required|minLength:3"
        />
        <div class="error-message"></div>
      </div>

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

      <button type="submit">Register</button>
    </form>

    <script type="module" src="app.js"></script>
  </body>
</html>
```

### 2. Initialize in JavaScript

Next, create a JavaScript file (e.g., `app.js`) to initialize the
validator.

```javascript
// app.js
import { Ctrovalidate } from 'ctrovalidate';

// 1. Get the form element from the DOM.
const form = document.getElementById('registration-form');

// 2. Create a new Ctrovalidate instance.
const validator = new Ctrovalidate(form, {
  realTime: true, // Enable real-time validation on input/blur events
});

// 3. Add a submit event listener to the form.
form.addEventListener('submit', async (event) => {
  // Prevent the default form submission.
  event.preventDefault();

  // Validate the form.
  const isFormValid = await validator.validate();

  if (isFormValid) {
    alert('Form is valid! Submitting...');
    // In a real application, you would submit the form data here.
    // form.submit();
  } else {
    alert('Form has errors. Please correct them.');
  }
});
```

That's it! You now have a fully functional, real-time validated form.
When a user types in an input and then clicks away, the validation rules
will run automatically, displaying error messages in the
`.error-message` div.

## Next Steps

Now that you have a basic form working, explore the other guides to
learn more about:

- [Configuration Options](./configuration.md)
- [All Built-in Rules](./rules.md)
- [Conditional Validation](./conditional-validation.md)
