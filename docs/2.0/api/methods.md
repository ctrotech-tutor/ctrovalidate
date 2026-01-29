# Instance Methods

Instances of the `Ctrovalidate` class provide several methods to control validation programmatically.

```javascript
const validator = new Ctrovalidate(formElement);
```

---

## `validate()`

The primary method for triggering a full form check.

- **Returns**: `Promise<boolean>`
- **Description**: Scans all tracked fields, executes their rules, and updates the DOM.

**Usage:**

```javascript
form.onsubmit = async (e) => {
  e.preventDefault();
  if (await validator.validate()) {
    // Submit data
  }
};
```

---

## `addField(element)`

Dynamically registers a new field.

- **Params**: `element` (HTMLElement)
- **Description**: Adds the element to the tracking list and attaches real-time listeners if enabled.

**Usage:**

```javascript
const input = document.createElement('input');
input.name = 'new_field';
input.dataset.ctrovalidateRules = 'required';

document.body.appendChild(input);
validator.addField(input);
```

---

## `removeField(element)`

Safely stops tracking a field.

- **Params**: `element` (HTMLElement)
- **Description**: Removes internal listeners, clears error caches, and removes the element from the validation cycle.

---

## `getError(fieldName)`

Retrieve the current error state for a specific field.

- **Params**: `fieldName` (string)
- **Returns**: `string | null`
- **Description**: Returns the formatted error message if the field is invalid, or `null` if valid.

---

## `isDirty(fieldName)`

Check if a user has interacted with a field.

- **Params**: `fieldName` (string)
- **Returns**: `boolean`

## Next Steps

- **[Static Methods](./static-methods.md)** — Global library configuration.
- **[TypeScript Types](./types.md)** — Working with Ctrovalidate in TS.
