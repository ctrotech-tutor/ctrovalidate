# Working with SPAs & Dynamic Fields

Modern web applications, especially Single-Page Applications (SPAs) built with frameworks like Vue, React, or Svelte, often add or remove form fields from the DOM without a full page reload.

Ctrovalidate is designed to handle this scenario seamlessly with the `addField()` and `removeField()` methods.

When you initialize Ctrovalidate on a form, it automatically discovers all the fields that have the `data-ctrovalidate-rules` attribute. However, if you add a new field to the DOM _after_ initialization, the validator won't know about it. That's where `addField()` comes in.

## `validator.addField(fieldElement)`

This method allows you to programmatically tell your Ctrovalidate instance to start tracking and validating a new field.

### Example

Imagine you have a "Add Hobby" button that dynamically adds new input fields to your form.

**HTML:**

```html
<form id="survey-form">
  <!-- ... other fields ... -->
  <div id="hobbies-container"></div>
  <button type="button" id="add-hobby">Add Hobby</button>
  <button type="submit">Submit</button>
</form>
```

**JavaScript:**

```javascript
import { Ctrovalidate } from 'ctrovalidate';

const form = document.getElementById('survey-form');
const addBtn = document.getElementById('add-hobby');
const container = document.getElementById('hobbies-container');

// Initialize the validator on the form
const validator = new Ctrovalidate(form);

let hobbyCounter = 0;

addBtn.addEventListener('click', () => {
  hobbyCounter++;

  // 1. Create the new HTML element
  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.name = `hobby_${hobbyCounter}`;
  newInput.setAttribute('data-ctrovalidate-rules', 'required|minLength:3');

  // 2. Add it to the DOM
  container.appendChild(newInput);

  // 3. CRITICAL STEP: Tell Ctrovalidate about the new field
  validator.addField(newInput);
});
```

Now, the newly added hobby field will be included in all future validation checks, and if `realTime` is enabled, it will have event listeners attached automatically.

## `validator.removeField(fieldElement)`

Conversely, if you remove a field from the DOM, you should also tell Ctrovalidate to stop tracking it. This is important for two reasons:

1. It prevents the validator from trying to validate an element that no longer exists.
2. It cleans up the event listeners attached to the element, preventing potential memory leaks in long-lived applications.

### Example

Building on the previous example, let's add a "Remove Hobby" button.

**JavaScript:**

```javascript
// ... (previous code) ...
const removeBtn = document.getElementById('remove-hobby');

removeBtn.addEventListener('click', () => {
  if (hobbyCounter <= 0) return;

  const fieldNameToRemove = `hobby_${hobbyCounter}`;
  const fieldElement = form.querySelector(`[name="${fieldNameToRemove}"]`);

  if (fieldElement) {
    // 1. CRITICAL STEP: Tell Ctrovalidate to stop tracking the field
    validator.removeField(fieldElement);

    // 2. Remove the element from the DOM
    fieldElement.remove();
    hobbyCounter--;
  }
});
```

By using `addField()` and `removeField()`, you can ensure that Ctrovalidate's internal state always stays in sync with your form's DOM, making it a reliable tool for even the most dynamic applications.
