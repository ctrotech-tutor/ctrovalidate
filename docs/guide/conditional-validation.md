---
title: Conditional Validation | State-Based Rules
description: Master the data-ctrovalidate-if attribute to create dynamic forms where validation rules depend on the state of other fields.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Guide
    url: https://ctrovalidate.vercel.app/guide/conditional-validation
  - name: Conditional Validation
    url: https://ctrovalidate.vercel.app/guide/conditional-validation
---

# Conditional Validation

In complex forms, validation logic often depends on other field states. For example, you might want to validate a shipping address only if "Ship to different address" is checked. Ctrovalidate makes this declarative using the `data-ctrovalidate-if` attribute.

---

## ⚙️ The `if` Syntax

The `data-ctrovalidate-if` attribute takes a controller expression in the format `controllerName:type[:value]`.

### 1. Boolean State (`checked`)
Validates the current field only if the controller (checkbox/radio) is checked.

```html
<input type="checkbox" name="wants_newsletter" id="newsletter" />

<input 
  name="email" 
  data-ctrovalidate-rules="required|email"
  data-ctrovalidate-if="wants_newsletter:checked"
/>
```

### 2. Matching Value (`value`)
Validates only if the controller's value exactly matches the provided string.

```html
<select name="country">
  <option value="US">USA</option>
  <option value="CA">Canada</option>
</select>

<input 
  name="state" 
  data-ctrovalidate-rules="required"
  data-ctrovalidate-if="country:value:US"
  placeholder="Enter US state"
/>
```

---

## ⚡ Real-Time Reactivity

When `realTime` is enabled, Ctrovalidate automatically detects when a controller field changes and updates the validation state of all dependent fields.

> [!IMPORTANT]
> When a condition is **not met**, the field is considered valid and any existing error messages are automatically cleared.

## Next Steps

- **[Built-in Rules](./rules.md)** — See all 21 rules you can apply conditionally
- **[Dynamic Fields](./dynamic-fields.md)** — Learn how to handle fields added after page load
- **[Custom Rules](./custom-rules.md)** — Create custom validation logic
