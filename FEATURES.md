# Ctrovalidate v3.0.0 - Complete Feature List

## 🎯 Core Capabilities

### **1. Instance Methods (Public API)**

#### Validation Methods

- **`validate()`** / **`validateForm()`** - Validates the entire form programmatically and returns a Promise<boolean>
- **`refresh()`** - Re-discovers fields after DOM changes (dynamic forms)

#### Field Management

- **`addField(element)`** - Manually adds a field to validation tracking
- **`removeField(element)`** - Removes a field from validation tracking

#### State Inspection

- **`isDirty(fieldName)`** - Checks if a field has been interacted with (touched)
- **`getError(fieldName)`** - Returns the current error message for a field (or null)

#### Lifecycle Management

- **`reset()`** - Resets all validation states and clears all errors
- **`destroy()`** - Fully cleans up the validator instance and removes all listeners

---

### **2. Static Methods (Global Configuration)**

- **`Ctrovalidate.setCustomMessages(messages)`** - Globally override error messages
- **`Ctrovalidate.addRule(name, logic, message?)`** - Register a custom synchronous validation rule
- **`Ctrovalidate.addAsyncRule(name, logic, message?)`** - Register a custom asynchronous validation rule
- **`Ctrovalidate.LogLevel`** - Access to log level constants (NONE, INFO, WARN, ERROR, DEBUG)

---

### **3. Configuration Options**

```typescript
interface CtrovalidateOptions {
  logLevel?: number; // Logging verbosity (default: LogLevel.NONE)
  errorClass?: string; // CSS class for invalid fields (default: 'is-invalid')
  errorMessageClass?: string; // CSS class for error containers (default: 'error-message')
  pendingClass?: string; // CSS class for async validation (default: 'ctrovalidate-pending')
  realTime?: boolean; // Enable real-time validation (default: true)
}
```

---

## 📋 Built-in Validation Rules (25 Total)

### **Common Rules**

1. **`required`** - Field must have a value
2. **`email`** - Valid email format
3. **`minLength:n`** - Minimum character length
4. **`maxLength:n`** - Maximum character length
5. **`exactLength:n`** - Exact character length
6. **`sameAs:fieldName`** - Must match another field's value

### **Format Rules**

7. **`alpha`** - Only alphabetic characters
8. **`alphaNum`** - Alphanumeric characters only
9. **`alphaDash`** - Alphanumeric with dashes and underscores
10. **`url`** - Valid URL format
11. **`phone`** - Valid phone number (international and local formats)
12. **`creditCard`** - Valid credit card number (Luhn algorithm)
13. **`strongPassword`** - Strong password requirements
14. **`json`** - Valid JSON string
15. **`ipAddress`** - Valid IPv4 or IPv6 address

### **Numeric Rules**

16. **`numeric`** - Any numeric value
17. **`integer`** - Integer values only
18. **`decimal`** - Decimal/float values
19. **`min:n`** - Minimum numeric value
20. **`max:n`** - Maximum numeric value
21. **`between:min,max`** - Value within numeric range

---

## 🎨 Declarative HTML Attributes

### **Primary Attributes**

- **`data-ctrovalidate-rules`** - Pipe-separated validation rules
  ```html
  data-ctrovalidate-rules="required|email|minLength:5"
  ```

### **Conditional Validation (Dependencies)**

- **`data-ctrovalidate-if`** - Conditional validation based on another field

  ```html
  <!-- Validate only if 'agreeToTerms' is checked -->
  data-ctrovalidate-if="agreeToTerms:checked"

  <!-- Validate only if 'country' has value 'USA' -->
  data-ctrovalidate-if="country:value:USA"

  <!-- Validate only if 'email' has any value -->
  data-ctrovalidate-if="email:present"
  ```

---

## 🔧 Advanced Features

### **1. Asynchronous Validation**

- Built-in support for Promise-based validation
- Automatic abort controller for canceling pending validations
- Visual feedback with `pendingClass` during async operations
- Example: Remote username availability check

### **2. Accessibility (A11Y)**

- **Automatic ARIA management**:
  - `aria-invalid="true"` on invalid fields
  - `aria-describedby` linking to error messages
  - Unique IDs generated for error containers
- Screen reader friendly error announcements

### **3. Field Dependencies**

- **Conditional validation** based on other field states:
  - `checked` - Validate only if controller is checked
  - `value:X` - Validate only if controller has specific value
  - `present` - Validate only if controller has any value

### **4. Real-time Validation**

- Validates on `blur` event (when field loses focus)
- Validates on `input` event for real-time feedback
- Can be disabled via `realTime: false` option

### **5. Dynamic Forms**

- Add/remove fields programmatically with `addField()` / `removeField()`
- Refresh field discovery with `refresh()` after DOM manipulation
- Automatic listener cleanup on field removal

### **6. Custom Rules & Messages**

- Register unlimited custom validation rules
- Override default error messages globally or per-rule
- Support for both sync and async custom rules

### **7. TypeScript Support**

- Full TypeScript definitions included
- Type-safe API with interfaces for all public methods
- Exported types: `RuleLogic`, `AsyncRuleLogic`, `CtrovalidateOptions`, `FieldObject`, etc.

### **8. Framework Agnostic**

- Zero dependencies
- Works with vanilla JS, React, Vue, Next.js, Alpine.js, HTMX
- Industrial-grade demos for all major frameworks

### **9. Developer Experience**

- **Logging system** with configurable levels (NONE, INFO, WARN, ERROR, DEBUG)
- **Error handling** with detailed console messages
- **State tracking** for dirty fields and validation errors
- **Automatic novalidate** attribute to disable browser validation

---

## 📦 Package Details

- **Bundle Size**: <5KB gzipped
- **Dependencies**: Zero
- **TypeScript**: Full support with `.d.ts` files
- **Module Formats**: ESM (`ctrovalidate.js`) and UMD (`ctrovalidate.umd.cjs`)
- **Browser Support**: Modern browsers (ES2020+)
- **Node.js**: >=18.0.0

---

## 🚀 Usage Patterns

### **Basic Usage**

```javascript
import { Ctrovalidate } from 'ctrovalidate';

const validator = new Ctrovalidate(formElement, {
  realTime: true,
  errorClass: 'border-red-500',
});

const isValid = await validator.validate();
```

### **Custom Rule**

```javascript
Ctrovalidate.addRule(
  'isCompanyEmail',
  (value) => value.endsWith('@company.com'),
  'Please use your company email address.'
);
```

### **Custom Messages**

```javascript
Ctrovalidate.setCustomMessages({
  required: 'This field cannot be empty!',
  email: 'Please enter a valid email address.',
});
```

### **State Inspection**

```javascript
if (validator.isDirty('username')) {
  const error = validator.getError('username');
  console.log(error); // "Username is required."
}
```

---

## 🎯 Key Differentiators

1. **HTML-First Philosophy** - Validation rules live in markup
2. **Industrial Design** - Built for professional, high-contrast UIs
3. **Accessibility by Default** - ARIA management out of the box
4. **Zero Dependencies** - No bloat, no conflicts
5. **TypeScript Native** - Full type safety
6. **Framework Agnostic** - Works everywhere
7. **98%+ Test Coverage** - Production-ready reliability

---

**Version**: 3.0.0  
**License**: MIT  
**Repository**: https://github.com/ctrotech-tutor/ctrovalidate  
**Documentation**: https://ctrotech-tutor.github.io/ctrovalidate/
