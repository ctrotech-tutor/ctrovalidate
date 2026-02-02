<div align="center">

![Ctrovalidate Logo](./dist/logo.svg)

# Ctrovalidate

**The lightweight, declarative, and accessible form validation library for modern web apps.**

[![CI Status](https://github.com/ctrotech-tutor/ctrovalidate/actions/workflows/ci.yml/badge.svg)](https://github.com/ctrotech-tutor/ctrovalidate/actions)
[![NPM Version](https://img.shields.io/npm/v/ctrovalidate.svg)](https://www.npmjs.com/package/ctrovalidate)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/ctrovalidate.svg)](https://bundlephobia.com/package/ctrovalidate)
[![Test Coverage](https://img.shields.io/badge/coverage-98%25-brightgreen.svg)](https://github.com/ctrotech-tutor/ctrovalidate)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-black.svg)](./LICENSE)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-black.svg)](https://conventionalcommits.org)

[**Documentation**](https://ctrotech-tutor.github.io/ctrovalidate/) • [**Live Demo**](./examples/demo-vanilla-js) • [**API Reference**](https://ctrotech-tutor.github.io/ctrovalidate/api/methods) • [**Contributing**](./CONTRIBUTING.md)

</div>

---

## 🎯 Why Ctrovalidate?

Ctrovalidate is a **zero-dependency**, **TypeScript-native** form validation library that bridges the gap between raw DOM power and framework-ready APIs. It embraces a **declarative, HTML-first approach**, allowing you to define validation rules directly in your markup using `data` attributes.

### ✨ Key Features

- 🎨 **HTML-First Philosophy** - Validation rules live in your markup, not scattered across JavaScript
- ♿ **Accessibility by Default** - Automatic ARIA management (`aria-invalid`, `aria-describedby`)
- ⚡ **Async Validation** - Built-in support for Promise-based rules with abort controllers
- 🔗 **Field Dependencies** - Conditional validation based on other field states
- 🎭 **Framework Agnostic** - Works with React, Vue, Next.js, Alpine.js, HTMX, or vanilla JS
- 📦 **Micro-Weight** - <5KB gzipped, zero dependencies
- 🔒 **TypeScript Native** - Full type safety with comprehensive `.d.ts` files
- 🧪 **98% Test Coverage** - Production-ready reliability
- 🎮 **Rich API** - 9 public methods for complete control
- 🌐 **21 Built-in Rules** - Common, format, and numeric validation out of the box

---

## 📦 Installation

```bash
# npm
npm install ctrovalidate

# yarn
yarn add ctrovalidate

# pnpm
pnpm add ctrovalidate
```

---

## 🚀 Quick Start

### 1. The Markup (HTML-First)

```html
<form id="registrationForm" novalidate>
  <div class="form-group">
    <label for="email">Email Address</label>
    <input
      type="email"
      name="email"
      id="email"
      data-ctrovalidate-rules="required|email"
      placeholder="john@example.com"
    />
    <div class="error-message"></div>
  </div>

  <div class="form-group">
    <label for="password">Password</label>
    <input
      type="password"
      name="password"
      id="password"
      data-ctrovalidate-rules="required|strongPassword"
    />
    <div class="error-message"></div>
  </div>

  <button type="submit">Register</button>
</form>
```

### 2. The Implementation

```typescript
import { Ctrovalidate } from 'ctrovalidate';

// Initialize validator
const validator = new Ctrovalidate(
  document.querySelector('#registrationForm'),
  {
    realTime: true, // Validate on blur/input
    errorClass: 'is-invalid', // CSS class for invalid fields
    pendingClass: 'is-validating', // CSS class during async validation
  }
);

// Validate on submit
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const isValid = await validator.validate();

  if (isValid) {
    // Submit to your API
    const formData = new FormData(form);
    await fetch('/api/register', {
      method: 'POST',
      body: formData,
    });
  }
});
```

---

## 📋 Built-in Validation Rules (21 Total)

### Common Rules

- `required` - Field must have a value
- `email` - Valid email format
- `minLength:n` - Minimum character length
- `maxLength:n` - Maximum character length
- `exactLength:n` - Exact character length
- `sameAs:fieldName` - Must match another field

### Format Rules

- `alpha` - Only alphabetic characters
- `alphaNum` - Alphanumeric characters only
- `alphaDash` - Alphanumeric with dashes/underscores
- `url` - Valid URL format
- `phone` - Valid phone number
- `creditCard` - Valid credit card (Luhn algorithm)
- `strongPassword` - Strong password requirements
- `json` - Valid JSON string
- `ipAddress` - Valid IPv4 or IPv6 address

### Numeric Rules

- `numeric` - Any numeric value
- `integer` - Integer values only
- `decimal` - Decimal/float values
- `min:n` - Minimum numeric value
- `max:n` - Maximum numeric value
- `between:min,max` - Value within range

---

## 🎮 Public API Methods

```typescript
// Validation
await validator.validate()        // Validate entire form

// Field Management
validator.addField(element)       // Add field dynamically
validator.removeField(element)    // Remove field dynamically
validator.refresh()               // Re-discover fields after DOM changes

// State Inspection
validator.isDirty('fieldName')    // Check if field was touched
validator.getError('fieldName')   // Get current error message

// Lifecycle
validator.reset()                 // Reset all validation states
validator.destroy()               // Clean up validator instance

// Static Methods (Global)
Ctrovalidate.addRule(name, logic, message?)        // Add custom rule
Ctrovalidate.addAsyncRule(name, logic, message?)   // Add async rule
Ctrovalidate.setCustomMessages(messages)           // Override messages
```

---

## 🔧 Advanced Features

### Async Validation

```typescript
// Register async rule (e.g., check username availability)
Ctrovalidate.addAsyncRule(
  'usernameAvailable',
  async (value, params, element, signal) => {
    const response = await fetch(`/api/check-username?username=${value}`, {
      signal, // Abort if user types again
    });
    const data = await response.json();
    return data.available;
  },
  'This username is already taken.'
);
```

```html
<input name="username" data-ctrovalidate-rules="required|usernameAvailable" />
```

### Conditional Validation (Dependencies)

```html
<!-- Controller field -->
<select name="contact_method">
  <option value="email">Email</option>
  <option value="phone">Phone</option>
</select>

<!-- Validates only if contact_method = "email" -->
<input
  name="email"
  data-ctrovalidate-rules="required|email"
  data-ctrovalidate-if="contact_method:value:email"
/>

<!-- Validates only if contact_method = "phone" -->
<input
  name="phone"
  data-ctrovalidate-rules="required|phone"
  data-ctrovalidate-if="contact_method:value:phone"
/>
```

### Custom Rules

```typescript
// Add custom synchronous rule
Ctrovalidate.addRule(
  'isCompanyEmail',
  (value) => value.endsWith('@company.com'),
  'Please use your company email address.'
);
```

### Custom Messages

```typescript
// Override default error messages
Ctrovalidate.setCustomMessages({
  required: 'This field cannot be empty!',
  email: 'Please enter a valid email address.',
  minLength: 'Please enter at least {0} characters.',
});
```

### Dynamic Forms

```typescript
// Add field programmatically
const newInput = document.createElement('input');
newInput.name = 'additional_email';
newInput.setAttribute('data-ctrovalidate-rules', 'required|email');
form.appendChild(newInput);
validator.addField(newInput);

// Remove field
validator.removeField(newInput);
newInput.remove();
```

---

## 🌐 Framework Integration

Ctrovalidate works seamlessly with all major frameworks:

| Framework       | Demo                                          | Documentation                                                                                |
| --------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Vanilla JS**  | [demo-vanilla-js](./examples/demo-vanilla-js) | [Getting Started](https://ctrotech-tutor.github.io/ctrovalidate/guide/getting-started)       |
| **React 18+**   | [demo-react](./examples/demo-react)           | [React Integration](https://ctrotech-tutor.github.io/ctrovalidate/integrations/react)        |
| **Next.js 15+** | [demo-nextjs](./examples/demo-nextjs)         | [Next.js Integration](https://ctrotech-tutor.github.io/ctrovalidate/integrations/nextjs)     |
| **Vue 3**       | [demo-vue](./examples/demo-vue)               | [Vue Integration](https://ctrotech-tutor.github.io/ctrovalidate/integrations/vue)            |
| **Alpine.js**   | [demo-alpine](./examples/demo-alpine)         | [Alpine.js Integration](https://ctrotech-tutor.github.io/ctrovalidate/integrations/alpinejs) |
| **HTMX**        | -                                             | [HTMX Best Practices](https://ctrotech-tutor.github.io/ctrovalidate/integrations/htmx)       |

---

## 🎓 Complete Feature Showcase

Check out our [**comprehensive demo**](./examples/demo-vanilla-js) that demonstrates **every single feature**:

- ✅ All 21 validation rules in real-world scenarios
- ✅ All 9 API methods with interactive controls
- ✅ Async validation with abort controllers
- ✅ Field dependencies (conditional validation)
- ✅ Custom rules and messages
- ✅ Dynamic field management
- ✅ State inspection panel
- ✅ Production-ready code with detailed comments

---

## 📖 Documentation

- 📚 [**Full Documentation**](https://ctrotech-tutor.github.io/ctrovalidate/)
- 🚀 [**Getting Started Guide**](https://ctrotech-tutor.github.io/ctrovalidate/guide/getting-started)
- 🔌 [**API Reference**](https://ctrotech-tutor.github.io/ctrovalidate/api/methods)
- 🎨 [**Framework Integrations**](https://ctrotech-tutor.github.io/ctrovalidate/integrations/react)
- 📋 [**Complete Feature List**](./FEATURES.md)

---

## 🧪 Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build library
npm run build

# Run documentation site locally
npm run docs:dev

# Lint code
npm run lint

# Format code
npm run format:fix
```

---

## 📊 Project Stats

- **Bundle Size**: <5KB gzipped
- **Dependencies**: Zero
- **Test Coverage**: 98.34% statements, 94.96% branches
- **TypeScript**: Full support with `.d.ts` files
- **Module Formats**: ESM + UMD
- **Browser Support**: Modern browsers (ES2020+)
- **Node.js**: >=18.0.0

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with tests
4. Run `npm run lint` and `npm test`
5. Commit using [Conventional Commits](https://conventionalcommits.org)
6. Push and create a Pull Request

---

## 📄 License

MIT © [Ctrotech](https://github.com/ctrotech-tutor)

---

## 🙏 Acknowledgments

- Built with ❤️ for the industrial web
- Inspired by modern form validation best practices
- Powered by [Vite](https://vitejs.dev/), [Vitest](https://vitest.dev/), and [TypeScript](https://www.typescriptlang.org/)

---

<div align="center">

**[⬆ Back to Top](#ctrovalidate)**

Made with ❤️ by [Ctrotech](https://github.com/ctrotech-tutor) • [Report Bug](https://github.com/ctrotech-tutor/ctrovalidate/issues) • [Request Feature](https://github.com/ctrotech-tutor/ctrovalidate/issues)

</div>
