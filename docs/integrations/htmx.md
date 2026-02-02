# Integration: htmx

[htmx](https://htmx.org/) allows you to access modern browser features like AJAX directly from HTML, without writing much JavaScript. Ctrovalidate can act as a powerful client-side "gatekeeper" for htmx, preventing unnecessary server requests for forms with invalid data.

## The Strategy

The key is to hook into htmx's event lifecycle. We will listen for the `htmx:beforeRequest` event, which is dispatched on an element just before an AJAX request is made.

1.  **Set up htmx:** Add `hx-*` attributes to your form fields to trigger server requests (e.g., `hx-post` on blur).
2.  **Initialize Ctrovalidate:** Set up your validator instance as usual.
3.  **Listen for `htmx:beforeRequest`:** Add an event listener for this event on the element that will trigger the request.
4.  **Validate and Prevent:** Inside the listener, call `await validator.validate()`. If validation fails, call `event.preventDefault()` on the event object. This will cancel the htmx request.

## Example: Industrial AJAX Verification

This pattern shows how to build a high-performance verification flow where Ctrovalidate acts as the client-side firewall for htmx.

### 1. HTML Structure

We use `hx-post` for server-side availability checks, but Ctrovalidate ensures we only hit the server when client-side rules pass.

```html
<div class="showcase-container">
  <form id="verification-form" novalidate className="validation-form">
    <div class="form-group">
      <label for="username">System ID / Username</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="e.g. admin_pro"
        data-ctrovalidate-rules="required|minLength:4|alphaDash"
        hx-post="/api/verify-id"
        hx-trigger="blur"
        hx-target="#id-status"
      />
      <div id="id-status" class="error-message"></div>
    </div>

    <button type="submit" class="submit-btn">Verify Account</button>
  </form>
</div>
```

### 2. JavaScript Integration

```javascript
import { Ctrovalidate } from 'ctrovalidate';

const form = document.getElementById('verification-form');
const usernameField = document.getElementById('username');
const validator = new Ctrovalidate(form, {
  realTime: true,
  pendingClass: 'is-validating'
});

// Intercept htmx requests to ensure client-side validity
usernameField.addEventListener('htmx:beforeRequest', async (event) => {
  // Validate only the triggering field
  const isFieldValid = await validator.validate([usernameField]);

  if (!isFieldValid) {
    // Prevent the server request if local rules fail
    event.preventDefault();
  }
});
```

## 🏗️ Professional Patterns

### Global Interception
For large applications, you can listen for `htmx:beforeRequest` on the `document` body to automatically protect all forms without individual listeners.

### Cohesive Feedback
Use `pendingClass: 'is-validating'` to show a consistent loading state that bridges the gap between Ctrovalidate's local checks and htmx's server response.

---

## Next Steps

- **[Real-time Configuration](../guide/configuration.md)** — Customizing feedback loops.
- **[Advanced Rules](../guide/rules.md)** — Composing complex security schemas.
