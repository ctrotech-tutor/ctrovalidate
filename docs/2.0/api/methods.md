# Public Instance Methods

These methods are available on an instance of the `Ctrovalidate` class that you create.

```javascript
import { Ctrovalidate } from 'ctrovalidate';

const form = document.getElementById('my-form');
const validator = new Ctrovalidate(form);

// You can now call methods on the `validator` instance.
// e.g., validator.validate();
```

---

## `validate()`

Validates all fields currently being tracked by the validator instance. This is the primary method you will use to check if the entire form is valid before submission.

- **Arguments:** None.
- **Returns:** `Promise<boolean>` - A promise that resolves to `true` if all fields are valid, and `false` otherwise.

### Usage

It's an `async` method, so you should use `await` in an `async` function or use `.then()`.

```javascript
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const isFormValid = await validator.validate();

  if (isFormValid) {
    // Proceed with form submission
    console.log('Form is valid!');
  } else {
    // Errors will be displayed on the UI automatically
    console.log('Form has errors.');
  }
});
```

---

## `addField()`

Programmatically adds a new field to the validator instance. This is essential for dynamically generated forms, such as in SPAs (Single-Page Applications).

- **Arguments:**
  - `fieldElement` (`HTMLElement`): The input, textarea, or select element you want to add.
- **Returns:** `void`

### Usage

After creating a new input element and adding it to the DOM, call `addField()` to make Ctrovalidate aware of it.

```javascript
// Create a new input element
const newField = document.createElement('input');
newField.type = 'text';
newField.name = 'new_field';
newField.setAttribute('data-ctrovalidate-rules', 'required');

// Add it to the DOM
document.getElementById('form-container').appendChild(newField);

// Tell the validator to start tracking it
validator.addField(newField);
```

---

## `removeField()`

Programmatically removes a field from the validator instance. This cleans up internal tracking and removes any event listeners attached by Ctrovalidate, preventing memory leaks.

- **Arguments:**
  - `fieldElement` (`HTMLElement`): The input, textarea, or select element you want to remove.
- **Returns:** `void`

### Usage

Before you remove a field from the DOM, call `removeField()` to have the validator stop tracking it.

```javascript
// Get a reference to the field you want to remove
const fieldToRemove = document.getElementById('field-to-remove');

if (fieldToRemove) {
  // Tell the validator to forget about this field
  validator.removeField(fieldToRemove);

  // Now, safely remove it from the DOM
  fieldToRemove.remove();
}
```
