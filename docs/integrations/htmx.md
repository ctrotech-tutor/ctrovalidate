---
title: HTMX Integration | Client-Side Validation
description: Integrate Ctrovalidate with HTMX to validate forms before AJAX requests using htmx:beforeRequest events.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Integrations
    url: https://ctrovalidate.vercel.app/integrations/htmx
  - name: HTMX
    url: https://ctrovalidate.vercel.app/integrations/htmx
---

# HTMX Integration

Ctrovalidate can act as a client-side validator for HTMX, preventing unnecessary server requests for forms with invalid data.

---

## Installation

```bash
npm install htmx.org ctrovalidate
```

Or via CDN:

```html
<script src="https://unpkg.com/htmx.org@1.9.10"></script>
<script type="module">
  import { Ctrovalidate } from 'https://cdn.jsdelivr.net/npm/ctrovalidate@3.0.0/dist/ctrovalidate.js';
  window.Ctrovalidate = Ctrovalidate;
</script>
```

---

## Basic Pattern

Use HTMX's `htmx:beforeRequest` event to validate before sending AJAX requests.

### Complete Example

```html
<form id="contact-form" novalidate>
  <div>
    <label for="username">Username</label>
    <input
      type="text"
      id="username"
      name="username"
      data-ctrovalidate-rules="required|minLength:4"
      hx-post="/api/check-username"
      hx-trigger="blur"
      hx-target="#username-status"
    />
    <div id="username-status" class="error-message"></div>
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

  <button type="submit">Submit</button>
</form>
```

```javascript
import { Ctrovalidate } from 'ctrovalidate';

const form = document.getElementById('contact-form');
const usernameField = document.getElementById('username');

const validator = new Ctrovalidate(form, {
  realTime: true,
  pendingClass: 'is-validating'
});

// Intercept HTMX requests to validate first
usernameField.addEventListener('htmx:beforeRequest', async (event) => {
  // Validate the field before allowing the request
  const isValid = await validator.validate();
  
  if (!isValid) {
    // Prevent the server request if validation fails
    event.preventDefault();
  }
});
```

---

## Global Interception

For larger applications, intercept all HTMX requests globally:

```javascript
import { Ctrovalidate } from 'ctrovalidate';

const form = document.getElementById('my-form');
const validator = new Ctrovalidate(form, { realTime: true });

// Intercept all HTMX requests from this form
document.body.addEventListener('htmx:beforeRequest', async (event) => {
  // Only validate if the request comes from our form
  if (event.target.closest('#my-form')) {
    const isValid = await validator.validate();
    
    if (!isValid) {
      event.preventDefault();
    }
  }
});
```

---

## Form Submission

Validate the entire form before HTMX submits:

```html
<form 
  id="signup-form" 
  hx-post="/api/signup" 
  hx-target="#response"
  novalidate
>
  <div>
    <label>Email</label>
    <input name="email" data-ctrovalidate-rules="required|email" />
    <div class="error-message"></div>
  </div>

  <div>
    <label>Password</label>
    <input 
      type="password" 
      name="password" 
      data-ctrovalidate-rules="required|minLength:8" 
    />
    <div class="error-message"></div>
  </div>

  <button type="submit">Sign Up</button>
</form>

<div id="response"></div>
```

```javascript
import { Ctrovalidate } from 'ctrovalidate';

const form = document.getElementById('signup-form');
const validator = new Ctrovalidate(form, { realTime: true });

form.addEventListener('htmx:beforeRequest', async (event) => {
  const isValid = await validator.validate();
  
  if (!isValid) {
    event.preventDefault();
  }
});
```

---

## Loading States

Use `pendingClass` to show loading states during validation:

```javascript
const validator = new Ctrovalidate(form, {
  realTime: true,
  pendingClass: 'is-validating'
});
```

```css
.is-validating {
  border-color: #3b82f6;
  background-image: url('data:image/svg+xml,...'); /* spinner */
}
```

---

## Best Practices

### 1. Validate Before Requests

Always validate before allowing HTMX to make server requests:

```javascript
element.addEventListener('htmx:beforeRequest', async (event) => {
  if (!await validator.validate()) {
    event.preventDefault();
  }
});
```

### 2. Use `pendingClass`

Show consistent loading states:

```javascript
const validator = new Ctrovalidate(form, {
  pendingClass: 'is-validating'
});
```

### 3. Target Specific Forms

When using global interception, check which form triggered the request:

```javascript
document.body.addEventListener('htmx:beforeRequest', async (event) => {
  if (event.target.closest('#my-form')) {
    // Validate only this form
  }
});
```

---

## Benefits

- **Reduced Server Load**: Only send valid data to the server
- **Better UX**: Instant client-side feedback before AJAX requests
- **Consistent Validation**: Same rules for real-time and AJAX validation
- **Accessibility**: Automatic ARIA attribute management

---

## Next Steps

- **[Configuration](../guide/configuration.md)** — Customizing validation options
- **[API Reference](../api/methods.md)** — All 9 instance methods
- **[Alpine.js Integration](./alpinejs.md)** — Using with Alpine.js
- **[HTMX Documentation](https://htmx.org/docs/)** — HTMX official docs
