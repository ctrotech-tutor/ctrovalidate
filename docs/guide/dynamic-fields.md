---
title: Dynamic Fields | Managing Field Lifecycle
description: Learn how to manage form fields that are added or removed from the DOM at runtime using addField, removeField, and refresh methods.
---

# Dynamic Fields

When form fields are added or removed from the DOM after initialization, you need to manually update the validator instance. Ctrovalidate provides three methods for managing field lifecycle.

---

## Field Lifecycle Methods

### `addField(element)`

Registers a new field for validation tracking.

**When to use:**
- Adding a single field to the DOM
- User clicks "Add Item" in a dynamic list
- Conditional field becomes visible

**Example:**

```javascript
const validator = new Ctrovalidate(document.querySelector('#myForm'));

// Create and add new field
const newInput = document.createElement('input');
newInput.name = 'phone';
newInput.setAttribute('data-ctrovalidate-rules', 'required|phone');

// Add to DOM
document.querySelector('#contact-fields').appendChild(newInput);

// Register with validator
validator.addField(newInput);
```

**Behavior:**
- Automatically attaches event listeners (if `realTime: true`)
- Safe to call on already-tracked fields (no duplicate tracking)
- Does nothing if element has no `data-ctrovalidate-rules` attribute

---

### `removeField(element)`

Unregisters a field from validation tracking and cleans up event listeners.

**When to use:**
- Removing a field from the DOM
- User clicks "Remove Item" in a dynamic list
- Conditional field becomes hidden

**Example:**

```javascript
const fieldToRemove = document.querySelector('[name="optional_field"]');

// 1. Unregister from validator
validator.removeField(fieldToRemove);

// 2. Remove from DOM
fieldToRemove.remove();
```

**Behavior:**
- Removes all event listeners attached to the field
- Cleans up internal references (prevents memory leaks)
- Safe to call on non-tracked fields (no error)

---

### `refresh()`

Re-scans the entire form and updates field tracking.

**When to use:**
- Multiple fields are added/removed at once
- Replacing entire sections of the form
- Framework re-renders (React, Vue, Svelte)

**Example:**

```javascript
// Update DOM (e.g., via innerHTML or framework render)
document.querySelector('#form-section').innerHTML = generateNewFields();

// Re-scan form
validator.refresh();
```

**Behavior:**
- Discovers all fields with `data-ctrovalidate-rules`
- Removes tracking for fields no longer in the DOM
- Attaches event listeners to new fields
- More efficient than calling `addField`/`removeField` individually

---

## Framework Integration

### React

Use `useEffect` to sync validator with component state:

```javascript
import { useEffect, useRef } from 'react';
import { Ctrovalidate } from 'ctrovalidate';

function DynamicForm({ items }) {
  const validatorRef = useRef(null);

  useEffect(() => {
    const form = document.querySelector('#myForm');
    validatorRef.current = new Ctrovalidate(form, { realTime: true });
    
    return () => validatorRef.current?.destroy();
  }, []);

  useEffect(() => {
    // Refresh when items change
    if (validatorRef.current) {
      validatorRef.current.refresh();
    }
  }, [items]);

  return (
    <form id="myForm">
      {items.map(item => (
        <input
          key={item.id}
          name={`item_${item.id}`}
          data-ctrovalidate-rules="required"
        />
      ))}
    </form>
  );
}
```

### Vue

Use `nextTick` to ensure DOM updates before refreshing:

```javascript
import { ref, nextTick, onMounted } from 'vue';
import { Ctrovalidate } from 'ctrovalidate';

export default {
  setup() {
    const items = ref([]);
    let validator = null;

    onMounted(() => {
      validator = new Ctrovalidate(
        document.querySelector('#myForm'),
        { realTime: true }
      );
    });

    async function addItem() {
      items.value.push({ id: Date.now() });
      await nextTick();
      validator?.refresh();
    }

    return { items, addItem };
  }
};
```

### Alpine.js

Use `x-init` to refresh after Alpine renders:

```html
<div x-data="{ items: [] }">
  <form id="myForm">
    <template x-for="item in items" :key="item.id">
      <input 
        :name="`item_${item.id}`" 
        data-ctrovalidate-rules="required"
        x-init="$nextTick(() => validator.refresh())"
      />
    </template>
  </form>
</div>
```

---

## Best Practices

### 1. Order Matters

Always update the DOM **before** calling validator methods:

```javascript
// ✅ Correct
container.appendChild(newField);
validator.addField(newField);

// ❌ Wrong
validator.addField(newField);
container.appendChild(newField); // Field not in DOM yet
```

### 2. Clean Up on Remove

Always call `removeField` before removing from DOM to prevent memory leaks:

```javascript
// ✅ Correct
validator.removeField(field);
field.remove();

// ⚠️ Works but may leak memory
field.remove();
// validator still tracking removed field
```

### 3. Use `refresh()` for Bulk Changes

For multiple field changes, `refresh()` is more efficient:

```javascript
// ❌ Inefficient
fields.forEach(field => validator.addField(field));

// ✅ Better
container.innerHTML = generateFields();
validator.refresh();
```

---

## Next Steps

- **[API Methods](../api/methods.md)** — Complete API reference for all 9 methods
- **[Examples](./examples.md)** — See dynamic fields in real-world scenarios
- **[Framework Integrations](../integrations/react.md)** — React, Vue, Next.js guides
