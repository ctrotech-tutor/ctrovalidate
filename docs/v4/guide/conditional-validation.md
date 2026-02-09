---
title: Conditional Validation | State-Based Rules
description: Master the data-ctrovalidate-if attribute to create dynamic forms where validation rules depend on the state of other fields.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Guide
    url: https://ctrovalidate.vercel.app/v4/guide/conditional-validation
  - name: Conditional Validation
    url: https://ctrovalidate.vercel.app/v4/guide/conditional-validation
---

# Conditional Validation

The `data-ctrovalidate-if` directive allows you to define dependencies between fields. Validation logic for a field is only executed if the specified condition on a "controller" field is met.

---

## Technical Syntax

The directive follows the format `controllerName:condition[:value]`.

### 1. Boolean State (`checked`)

Executes validation only if the controller element (checkbox or radio) is in a checked state.

```html
<input type="checkbox" name="shipping_separate" id="shipping" />

<input 
  name="shipping_address" 
  data-ctrovalidate-rules="required"
  data-ctrovalidate-if="shipping_separate:checked"
/>
```

### 2. Value Comparison (`value`)

Executes validation only if the current value of the controller element matches the provided string.

```html
<select name="method">
  <option value="none">None</option>
  <option value="express">Express</option>
</select>

<input 
  name="express_code" 
  data-ctrovalidate-rules="required"
  data-ctrovalidate-if="method:value:express"
/>
```

### 3. Presence (`present`)

Executes validation if any value is present in the controller field. This is the default if no condition is provided.

```html
<input name="referral_code" />

<input 
  name="referrer_name"
  data-ctrovalidate-rules="required"
  data-ctrovalidate-if="referral_code"
/>
```

---

## Behavior & Lifecycle

- **Automatic Cleanup**: When a condition is not met, the target field is marked valid, rules are not executed, and any existing error states are cleared automatically.
- **Dependency Tracking**: When `realTime` is enabled, the controller maintains a reference to its dependent fields and triggers a validation cycle on the dependents whenever the controller's value changes.

## Next Steps

- [**Built-in Rules**](./rules.md) — Apply any of the 22 logic rules conditionally.
- [**Dynamic Fields](./dynamic-fields.md)** — Managing dependencies for fields added at runtime.
- [**API Reference**](/v4/api/browser) — Programmatic dependency management.





