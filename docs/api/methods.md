---
title: Instance Methods API | Ctrovalidate Reference
description: Complete API reference for all 9 Ctrovalidate instance methods including validate, addField, removeField, refresh, getError, isDirty, reset, and destroy.
---

# Instance Methods

The `Ctrovalidate` class provides 9 public methods for programmatic form validation control.

```javascript
const validator = new Ctrovalidate(formElement, options);
```

---

## `validate()`

Validates all tracked fields in the form.

**Returns:** `Promise<boolean>`

**Description:** Executes validation rules for all fields, updates the DOM with error messages, and returns `true` if all fields are valid.

**Usage:**

```javascript
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  if (await validator.validate()) {
    // All fields valid - submit form
    const formData = new FormData(form);
    await fetch('/api/submit', { method: 'POST', body: formData });
  }
});
```

---

## `addField(element)`

Registers a new field for validation tracking.

**Parameters:**
- `element` (HTMLElement) - The input element to track

**Description:** Adds the element to validation tracking and attaches event listeners if `realTime` is enabled.

**Usage:**

```javascript
const newInput = document.createElement('input');
newInput.name = 'phone';
newInput.setAttribute('data-ctrovalidate-rules', 'required|phone');

document.querySelector('#form-container').appendChild(newInput);
validator.addField(newInput);
```

---

## `removeField(element)`

Unregisters a field from validation tracking.

**Parameters:**
- `element` (HTMLElement) - The input element to stop tracking

**Description:** Removes event listeners, clears error states, and removes the field from the validation cycle. Prevents memory leaks.

**Usage:**

```javascript
const fieldToRemove = document.querySelector('[name="optional"]');

validator.removeField(fieldToRemove);
fieldToRemove.remove();
```

---

## `refresh()`

Re-scans the form for fields with validation rules.

**Description:** Discovers all fields with `data-ctrovalidate-rules` attributes, removes tracking for fields no longer in the DOM, and attaches event listeners to new fields.

**Usage:**

```javascript
// After bulk DOM updates
document.querySelector('#dynamic-section').innerHTML = generateFields();
validator.refresh();
```

---

## `getError(fieldName)`

Retrieves the current error message for a specific field.

**Parameters:**
- `fieldName` (string) - The `name` attribute of the field

**Returns:** `string | null` - The error message, or `null` if the field is valid

**Usage:**

```javascript
const emailError = validator.getError('email');
if (emailError) {
  console.log('Email error:', emailError);
}
```

---

## `isDirty(fieldName)`

Checks if a field has been interacted with.

**Parameters:**
- `fieldName` (string) - The `name` attribute of the field

**Returns:** `boolean` - `true` if the user has triggered a blur event on the field

**Usage:**

```javascript
if (validator.isDirty('username')) {
  // User has interacted with username field
}
```

---

## `reset()`

Resets the validation state of the entire form.

**Description:** Clears all error messages, removes error classes, and resets all field "dirty" states to `false`.

**Usage:**

```javascript
// Clear form and validator state
form.reset();
validator.reset();
```

---

## `destroy()`

Completely cleans up the validator instance.

**Description:** Removes all event listeners, clears error states, and releases internal references. Use this when unmounting components in React, Vue, or Svelte.

**Usage:**

```javascript
// React example
useEffect(() => {
  const validator = new Ctrovalidate(formRef.current);
  
  return () => {
    validator.destroy();
  };
}, []);
```

---

## `setCustomMessages(messages)`

**Static method** - Sets custom error messages globally.

**Parameters:**
- `messages` (Record<string, string>) - Object mapping rule names to custom messages

**Usage:**

```javascript
Ctrovalidate.setCustomMessages({
  required: 'This field cannot be empty.',
  email: 'Please enter a valid email address.',
  minLength: 'Must be at least {0} characters long.'
});
```

---

## Summary

| Method | Type | Returns | Description |
|:-------|:-----|:--------|:------------|
| `validate()` | Instance | `Promise<boolean>` | Validates all fields |
| `addField(element)` | Instance | `void` | Registers new field |
| `removeField(element)` | Instance | `void` | Unregisters field |
| `refresh()` | Instance | `void` | Re-scans form for fields |
| `getError(fieldName)` | Instance | `string \| null` | Gets field error |
| `isDirty(fieldName)` | Instance | `boolean` | Checks if field touched |
| `reset()` | Instance | `void` | Resets validation state |
| `destroy()` | Instance | `void` | Cleans up instance |
| `setCustomMessages(messages)` | Static | `void` | Sets global messages |

---

## Next Steps

- **[Static Methods](./static-methods.md)** — Global rule registration
- **[TypeScript Types](./types.md)** — Type definitions
- **[Dynamic Fields](../guide/dynamic-fields.md)** — Managing field lifecycle
