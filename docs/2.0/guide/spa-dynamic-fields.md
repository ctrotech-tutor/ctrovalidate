# SPAs & Dynamic Fields

Modern web applications (React, Vue, Svelte, etc.) frequently add or remove form fields from the DOM at runtime. Ctrovalidate provides a powerful API to keep your validation instance in sync with these changes.

## 🔄 Managing Field Lifecycle

When you initialize a `Ctrovalidate` instance, it performs a "discovery" pass of the specified form. For any fields added later, you must manually register them.

### `addField(element)`

Tells the validator to start tracking a new DOM element.

```javascript
const newField = document.createElement('input');
newField.name = 'dynamic_input';
newField.setAttribute('data-ctrovalidate-rules', 'required');

// Add to DOM
document.querySelector('#dynamic-form').appendChild(newField);

// Register with Ctrovalidate
validator.addField(newField);
```

### `removeField(element)`

Tells the validator to stop tracking an element and cleans up all internal listeners and caches.

```javascript
const fieldToRemove = document.querySelector('[name="expired_field"]');

// Clean up first
validator.removeField(fieldToRemove);

// Then remove from DOM
fieldToRemove.remove();
```

---

## 🧩 Framework Patterns

### Vue / React (Lifecycle Hooks)

In component-based frameworks, use the lifecycle hooks to manage registration.

```javascript
// React Example using useEffect
useEffect(() => {
  const field = fieldRef.current;
  validator.addField(field);

  return () => {
    validator.removeField(field);
  };
}, []);
```

### HTMX / Alpine.js (Auto-Discovery)

If you are using tools like HTMX to swap fragments, you can re-run field discovery or specifically add the new fragments.

> [!TIP]
> Calling `addField` on an already tracked field is safe; Ctrovalidate will simply update internal metadata if rules have changed.

## Next Steps

- **[Custom Rules](./custom-rules.md)** — Learn how to build complex logic for dynamic apps.
- **[API Methods](../api/methods.md)** — Detailed technical reference for all instance methods.
