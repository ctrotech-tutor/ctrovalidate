---
title: HTMX Integration | Declarative AJAX Validation
description: Integrate Ctrovalidate with HTMX to validate forms before AJAX requests, ensuring only clean data reaches your server fragments.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Platform
    url: https://ctrovalidate.vercel.app/v4/platform/htmx
  - name: HTMX
    url: https://ctrovalidate.vercel.app/v4/platform/htmx
---

# HTMX Integration

Ctrovalidate and HTMX share a "markup-first" philosophy. By combining them, you can build powerful, validated AJAX forms with almost zero custom JavaScript.

---

## 🏗️ Basic Setup

Load `@ctrovalidate/browser` via CDN or NPM and initialize it on your HTMX-powered form.

```html
<form 
  hx-post="/update-profile" 
  hx-target="#response"
  id="profile-form"
>
  <input name="username" data-ctrovalidate-rules="required|minLength:4" />
  <div class="error-msg"></div>
  
  <button type="submit">Update</button>
</form>

<script type="module">
  import { Ctrovalidate } from 'https://cdn.jsdelivr.net/npm/@ctrovalidate/browser@4.0.0/dist/index.js';
  
  const validator = new Ctrovalidate(document.getElementById('profile-form'));
  
  // Intercept HTMX request to validate first
  document.body.addEventListener('htmx:beforeRequest', async (evt) => {
    if (evt.detail.target.id === 'profile-form') {
      const isValid = await validator.validate();
    if (!isValid) evt.preventDefault(); // Stop the AJAX request
    }
  });
</script>
```

---

## ⚡ Dynamic Fragments

HTMX often swaps new content into the DOM. When these fragments contain new validation rules, use `validator.refresh()`.

```javascript
document.body.addEventListener('htmx:afterOnLoad', () => {
  // Re-scan for new data-ctrovalidate-rules in the swapped content
  validator.refresh();
});
```

---

## 🛡️ Server-Side Sync

If your server returns an error fragment (e.g., `422 Unprocessable Entity`), Ctrovalidate's browser controller will automatically detect and manage the new error containers if they follow the `errorMessageClass` pattern.

---

## ✅ Best Practices

- **`hx-validate="true"`**: While HTMX has basic internal validation support, using Ctrovalidate via `htmx:beforeRequest` gives you more granular control and accessibility.
- **Global Interceptor**: Instead of per-form scripts, use a global `htmx:beforeRequest` listener that checks for a specific attribute (e.g., `data-validate`) on the form.
- **Loading States**: Bind HTMX's `htmx-request` class with Ctrovalidate's `pendingClass` for consistent loading indicators.
