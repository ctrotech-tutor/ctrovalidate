# Real-world Examples

This page provides functional patterns and code snippets for common production scenarios.

---

## 🔐 Registration with Strong Password

A complete pattern for a secure registration form, including password confirmation.

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
      data-ctrovalidate-rules="required|strongPassword"
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

---

## 🏦 conditional Checkout

In this example, the "Tax ID" field is only required if the user selects the "Business" account type.

```html
<form id="checkout-form" novalidate>
  <label>Account Type</label>
  <select name="acc_type">
    <option value="personal">Personal</option>
    <option value="business">Business</option>
  </select>

  <div class="mt-4">
    <label>Tax ID / VAT Number</label>
    <input
      name="vat"
      data-ctrovalidate-rules="required|alphaNum"
      data-ctrovalidate-if="acc_type:value=business"
    />
    <div class="error-message"></div>
  </div>
</form>
```

---

## ☁️ Async API Validation

Check if a domain is available or if a username is unique via a back-end call.

```javascript
import { Ctrovalidate } from 'ctrovalidate';

Ctrovalidate.addAsyncRule(
  'isAvailable',
  async (val, params, el, signal) => {
    const res = await fetch(`/api/check?q=${val}`, { signal });
    return (await res.json()).valid;
  },
  'This value is already taken.'
);
```

```html
<input name="subdomain" data-ctrovalidate-rules="required|isAvailable" />
<span class="is-validating:block hidden">Checking...</span>
<div class="error-message"></div>
```

---

## ♿ Accessible Feedback Pattern

Ctrovalidate handles the ARIA wiring, but you should ensure your CSS makes the states visible.

```css
/* Styling based on ARIA states */
[aria-invalid='true'] {
  border: 2px solid #dc2626;
  background-color: #fef2f2;
}

[aria-invalid='true'] + .error-message {
  display: block;
  color: #dc2626;
  margin-top: 0.25rem;
}
```

> [!TIP]
> Always use `novalidate` on your `<form>` to allow Ctrovalidate to manage the screen-reader focus and announcements without browser interference.

## Next Steps

- **[Built-in Rules](./rules.md)** — Full technical details for every rule.
- **[Integration Guides](../integrations/tailwindcss.md)** — Polishing these examples with CSS frameworks.
