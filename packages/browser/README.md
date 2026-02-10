# @ctrovalidate/browser

**The DOM-first, HTML-driven validation adapter for Ctrovalidate.**

`@ctrovalidate/browser` is the primary interface for building interactive, accessible web forms. It automates field discovery, real-time validation, and visual feedback using simple `data` attributes.

## 🚀 Installation

```bash
pnpm add @ctrovalidate/browser @ctrovalidate/core
```

## 📖 HTML API

Define validation rules directly in your markup:

```html
<form id="loginForm" novalidate>
  <div>
    <input name="email" data-ctrovalidate-rules="required|email" />
    <!-- Errors naturally appear in .ctrovalidate-error-message containers -->
    <div class="ctrovalidate-error-message"></div>
  </div>

  <div>
    <input name="password" data-ctrovalidate-rules="required|minLength:8" />
    <div class="ctrovalidate-error-message"></div>
  </div>

  <button type="submit">Login</button>
</form>
```

## 🛠️ Usage

### Initialization

```typescript
import { Ctrovalidate } from '@ctrovalidate/browser';

const form = document.querySelector('#loginForm') as HTMLFormElement;

const validator = new Ctrovalidate(form, {
  // Default Configuration
  realTime: true, // Validate on input/blur
  errorClass: 'ctrovalidate-error', // Class added to invalid inputs
  pendingClass: 'ctrovalidate-pending', // Class added during async checks
  errorMessageClass: 'ctrovalidate-error-message', // Selector for error containers
  logLevel: Ctrovalidate.LogLevel.NONE, // Debugging verbosity
});
```

### Manual Validation

```typescript
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const isValid = await validator.validate();

  if (isValid) {
    // Submit form...
  }
});
```

## 🎮 Instance Methods

- `validate(): Promise<boolean>` - Validates all fields and updates the UI.
- `reset()` - Clears all errors and validation states.
- `refresh()` - Re-scans the form for added/removed fields.
- `addField(element)` - Manually register a new input.
- `removeField(element)` - Manually unregister an input.
- `getError(fieldName)` - Get the current error text for a specific field.
- `isDirty(fieldName)` - Check if a field has been interacted with.
- `destroy()` - Remove listeners and clean up.

## 📄 License

MIT © [Ctrotech](https://github.com/ctrotech-tutor)
