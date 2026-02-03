---
title: Real-World Examples | Practical Patterns
description: Production-ready code examples for registration forms, conditional validation, async checks, and accessible feedback patterns.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrotech-tutor.github.io/ctrovalidate/
  - name: Guide
    url: https://ctrotech-tutor.github.io/ctrovalidate/guide/examples
  - name: Examples
    url: https://ctrotech-tutor.github.io/ctrovalidate/guide/examples
---

# Real-World Examples

This page provides practical code patterns for common form validation scenarios.

---

## 🔐 Registration Form

A complete registration form with email and password confirmation:

```html
<form id="reg-form" novalidate>
  <div>
    <label>Email</label>
    <input name="email" data-ctrovalidate-rules="required|email" />
    <div class="error-message"></div>
  </div>

  <div>
    <label>Password</label>
    <input
      type="password"
      name="pwd"
      id="pwd"
      data-ctrovalidate-rules="required|minLength:8"
    />
    <div class="error-message"></div>
  </div>

  <div>
    <label>Confirm Password</label>
    <input
      type="password"
      name="pwd_confirm"
      data-ctrovalidate-rules="required|sameAs:pwd"
    />
    <div class="error-message"></div>
  </div>

  <button type="submit">Sign Up</button>
</form>
```

```javascript
import { Ctrovalidate } from 'ctrovalidate';

const validator = new Ctrovalidate(
  document.querySelector('#reg-form'),
  { realTime: true }
);

document.querySelector('#reg-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  if (await validator.validate()) {
    const formData = new FormData(e.target);
    await fetch('/api/register', {
      method: 'POST',
      body: formData
    });
  }
});
```

---

## 🏦 Conditional Checkout

Tax ID field is required only for business accounts:

```html
<form id="checkout-form" novalidate>
  <label>Account Type</label>
  <select name="acc_type">
    <option value="personal">Personal</option>
    <option value="business">Business</option>
  </select>

  <div>
    <label>Tax ID / VAT Number</label>
    <input
      name="vat"
      data-ctrovalidate-rules="required|alphaNum"
      data-ctrovalidate-if="acc_type:value:business"
    />
    <div class="error-message"></div>
  </div>
</form>
```

---

## ☁️ Async Username Check

Check username availability with server-side validation:

```javascript
import { Ctrovalidate } from 'ctrovalidate';

// Register async rule
Ctrovalidate.addAsyncRule(
  'usernameAvailable',
  async (value, params, element, signal) => {
    const response = await fetch(`/api/check-username?name=${value}`, { 
      signal 
    });
    const data = await response.json();
    return data.available;
  },
  'This username is already taken.'
);

// Use in form
const validator = new Ctrovalidate(
  document.querySelector('#signup-form'),
  { 
    realTime: true,
    pendingClass: 'is-validating'
  }
);
```

```html
<form id="signup-form" novalidate>
  <div>
    <label>Username</label>
    <input 
      name="username" 
      data-ctrovalidate-rules="required|alphaNum|usernameAvailable" 
    />
    <span class="loading-indicator">Checking availability...</span>
    <div class="error-message"></div>
  </div>
</form>
```

```css
/* Show loading indicator during async validation */
.is-validating ~ .loading-indicator {
  display: inline-block;
  color: #3b82f6;
}

.loading-indicator {
  display: none;
}
```

---

## ♿ Accessible Feedback Pattern

Ctrovalidate handles ARIA attributes automatically. Style the validation states:

```css
/* Invalid field styling */
[aria-invalid='true'] {
  border-color: #ef4444;
  background-color: #fef2f2;
}

/* Error message styling */
.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  min-height: 1.25rem;
}

/* Validating state */
.is-validating {
  border-color: #3b82f6;
  background-image: url('data:image/svg+xml,...'); /* spinner */
}
```

> [!TIP]
> Always use `novalidate` on your `<form>` to prevent browser default validation and allow Ctrovalidate to manage accessibility.

---

## 📧 Contact Form with Conditional Fields

Show phone field only if user selects "Phone" as contact method:

```html
<form id="contact-form" novalidate>
  <div>
    <label>Preferred Contact Method</label>
    <select name="contact_method">
      <option value="email">Email</option>
      <option value="phone">Phone</option>
    </select>
  </div>

  <div>
    <label>Email Address</label>
    <input
      name="email"
      data-ctrovalidate-rules="required|email"
      data-ctrovalidate-if="contact_method:value:email"
    />
    <div class="error-message"></div>
  </div>

  <div>
    <label>Phone Number</label>
    <input
      name="phone"
      data-ctrovalidate-rules="required|phone"
      data-ctrovalidate-if="contact_method:value:phone"
    />
    <div class="error-message"></div>
  </div>

  <div>
    <label>Message</label>
    <textarea
      name="message"
      data-ctrovalidate-rules="required|minLength:10"
    ></textarea>
    <div class="error-message"></div>
  </div>

  <button type="submit">Send Message</button>
</form>
```

---

## Next Steps

- **[Built-in Rules](./rules.md)** — Explore all 21 validation rules
- **[Custom Rules](./custom-rules.md)** — Create your own validation logic
- **[API Reference](/api/methods)** — View all 9 public methods
- **[Framework Integrations](../integrations/react.md)** — React, Vue, Next.js, and more
