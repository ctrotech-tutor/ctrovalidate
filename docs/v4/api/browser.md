---
title: "@ctrovalidate/browser API Reference"
description: Complete API reference for the Ctrovalidate browser controller, covering initialization, form validation, and dynamic field management.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: API
    url: https://ctrovalidate.vercel.app/v4/api/browser
  - name: Browser
    url: https://ctrovalidate.vercel.app/v4/api/browser
---

# @ctrovalidate/browser

The `@ctrovalidate/browser` package provides the `Ctrovalidate` controller, which orchestrates the DOM state, manages event listeners, and provides visual feedback to the user.

---

## 🏗️ The `Ctrovalidate` Class

### `new Ctrovalidate(formElement, options)`

Initializes a new validator instance for the given form.

- **Parameters:**
  - `formElement` (HTMLFormElement): The target form for discovery.
  - `options` (CtrovalidateOptions): Configuration for classes, timing, and logging.

---

## 🛠️ Instance Methods

### `validate()`

Validates all discovered fields in the form and updates the DOM.

- **Returns**: `Promise<boolean>` - Overall form validity
- **Technical Note**: This method orchestrates both sync and async rules across all fields.

### `validateField(fieldName)`

Forces a validation cycle for a specific field by its `name` attribute.

- **Returns**: `Promise<ValidationResult>`

### `refresh()`

Re-scans the DOM for fields with `data-ctrovalidate-rules` and updates the internal field map.

- **When to use**: Call this after dynamically adding or removing fields in the DOM (e.g., after an Alpine.js `x-for` or HTMX fragment swap).

### `reset()`

Clears all error messages, removes error classes, and resets "dirty" states.

### `destroy()`

Cleans up all event listeners and internal references. **Crucial for SPA lifecycle management** (React `useEffect` cleanup, Vue `onUnmounted`).

---

## 🎨 Discovery & Orchestration

### Error Container Discovery

The controller searches for error message containers using a **3-level-up heuristic**:

1. It looks for a descendant of the field's parent matching `errorMessageClass`.
2. If not found, it continues to the grandparent and great-grandparent.
3. If still not found, it generates a fallback container immediately after the field.

---

## ✅ Best Practices

- **`novalidate`**: Always add the `novalidate` attribute to your `<form>` to prevent browser default tooltips from interfering.
- **Initialization**: Initialize ONLY ONCE per form lifecycle to avoid duplicate event listeners.
- **Manual Discovery**: Use `addField(element)` if you need to manually track an input that doesn't have a `data-rules` attribute.
