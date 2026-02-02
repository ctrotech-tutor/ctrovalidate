---
title: Conditional Validation | State-Based Rules
description: Master the data-ctrovalidate-if attribute to create dynamic forms where validation rules depend on the state of other fields.
---

# Conditional Validation

In industrial form design, validation logic is rarely static. You often need to validate a field only if another condition is met (e.g., "Validate Shipping Address only if 'Ship to different address' is checked"). Ctrovalidate makes this declarative via the `data-ctrovalidate-if` attribute.

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


---

## ⚡ Real-Time Reactivity

Because Ctrovalidate uses a centralized `RuleEngine`, it automatically detects when a "controller" field changes and updates the validation state of all dependent fields instantly.

> [!IMPORTANT]
> When a condition is **not met**, the field is considered valid and any existing error messages are automatically cleared.

## Next Steps

- **[Built-in Rules](./rules.md)** — See all rules you can apply conditionally.
- **[SPAs & Dynamic Fields](./spa-dynamic-fields.md)** — Learn how to handle fields added after page load.
