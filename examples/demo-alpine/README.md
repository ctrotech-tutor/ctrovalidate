# Ctrovalidate Demo: Alpine.js

**Rugged, declarative validation for minimal JavaScript applications.**

This demo illustrates the "Zero-Build" power of combining Alpine.js with Ctrovalidate for dynamic, high-standards forms.

## 🚀 Features
- **Declarative Reactivity**: Synchronized state management between Alpine and Ctrovalidate.
- **Dynamic Fields**: Shows how `addField` and `removeField` manage changing DOM structures.
- **Monochrome Styling**: Fully integrated with the industrial CSS suite.

## 🛠️ How to run
Simply open `index.html` in your browser. (Optional: Use a local server like `live-server`).

## 📝 Logic Integration
```javascript
document.addEventListener('alpine:init', () => {
  Alpine.data('registration', () => ({
    async submitForm() {
      if (await validator.validate()) {
        // Success
      }
    }
  }));
});
```

---

[Back to Framework Suite](../)
