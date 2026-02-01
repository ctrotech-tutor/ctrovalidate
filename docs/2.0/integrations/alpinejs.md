# Integration: Alpine.js

[Alpine.js](https://alpinejs.dev/) is a rugged, minimal framework for composing JavaScript behavior in your markup. Its declarative nature and ability to manipulate the DOM make it a perfect partner for Ctrovalidate, especially for creating dynamic forms.

## The Strategy

The key to a successful integration is to use Ctrovalidate's programmatic API (`addField` and `removeField`) to keep the validator synchronized with the DOM changes made by Alpine.

1.  **Initialize Ctrovalidate Once:** Create a single validator instance for your form.
2.  **Register Alpine Component:** Use the `alpine:init` event to safely register your component data. This is the recommended pattern.
3.  **Call `addField`:** When your Alpine component adds a new form field to the DOM, use `$nextTick` to wait for the DOM to update, then call `validator.addField()` on the new element(s).
4.  **Call `removeField`:** _Before_ your Alpine component removes a field, call `validator.removeField()` on the element(s) to be removed.

## Example: Industrial Dynamic Registration

This example demonstrates a modern, high-standards dynamic form powered by Alpine.js and Ctrovalidate.

### 1. HTML Structure

We use `x-data` to manage the dynamic state and `showcase-container` for the premium monochrome layout.

```html
<div class="showcase-container">
  <form
    id="registration-form"
    x-data="registration"
    @submit.prevent="submitForm"
    noValidate
    className="validation-form"
  >
    <div class="form-group">
      <label htmlFor="email">Email Address</label>
      <input
        type="email"
        id="email"
        name="email"
        data-ctrovalidate-rules="required|email"
        placeholder="john@example.com"
      />
      <div class="error-message"></div>
    </div>

    <!-- Dynamic Field Example -->
    <template x-if="needsPhone">
      <div class="form-group">
        <label htmlFor="phone">Mobile Number</label>
        <input
          type="text"
          id="phone"
          name="phone"
          data-ctrovalidate-rules="required|phone"
          placeholder="+1 234 567 890"
        />
        <div class="error-message"></div>
      </div>
    </template>

    <button type="submit" class="submit-btn">Verify Alpine Integration</button>
  </form>
</div>
```

### 2. JavaScript Initialization

```javascript
import { Ctrovalidate } from 'ctrovalidate';
import Alpine from 'alpinejs';

const form = document.getElementById('registration-form');
const validator = new Ctrovalidate(form, { 
  realTime: true,
  logLevel: Ctrovalidate.LogLevel.DEBUG,
  pendingClass: 'is-validating'
});

document.addEventListener('alpine:init', () => {
  Alpine.data('registration', () => ({
    needsPhone: true,

    async submitForm() {
      const isValid = await validator.validate();
      if (isValid) {
        alert('🚀 Integration verified (Alpine JS)!');
      }
    }
  }));
});

Alpine.start();
```

This pattern ensures that Ctrovalidate's zero-dependency engine works flawlessly with Alpine's reactive DOM updates.

[**View the full working example on GitHub**](https://github.com/ctrotech-tutor/ctrovalidate/tree/main/examples/demo-alpine)
