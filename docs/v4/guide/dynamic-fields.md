---
title: Dynamic Fields | Managing Field Lifecycle
description: Learn how to manage form fields that are added or removed from the DOM at runtime using addField, removeField, and refresh methods.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Guide
    url: https://ctrovalidate.vercel.app/v4/guide/dynamic-fields
  - name: Dynamic Fields
    url: https://ctrovalidate.vercel.app/v4/guide/dynamic-fields
---

# Dynamic Fields

Ctrovalidate provides methods to manage the lifecycle of form fields that are added or removed from the DOM after initial controller initialization.

---

## Technical Lifecycle Methods

### `addField(element: HTMLElement)`

Registers a new input for validation tracking.

**Behavior:**

- Scans for `data-ctrovalidate-rules` and schema-based rules.
- Attaches event listeners if `realTime` is enabled for the instance.
- Prevents duplicate registration if the element is already tracked.

```javascript
const input = document.createElement('input');
input.name = 'new_field';
input.setAttribute('data-ctrovalidate-rules', 'required');

container.appendChild(input);
validator.addField(input);
```

---

### `removeField(element: HTMLElement)`

Unregisters an input and cleans up all associated resources.

**Behavior:**

- Removes `blur` and `input` listeners.
- Clears internal references to the field state.
- Automatically removes dependency links if the field was a controller for others.

```javascript
const field = document.querySelector('[name="obsolete_field"]');
validator.removeField(field);
field.remove();
```

---

### `refresh()`

Re-scans the entire form container to synchronize the field list with the current DOM state.

**Behavior:**

- Executes field discovery across the whole form.
- Attaches listeners to newly discovered fields.
- Note: Does not automatically remove previously tracked fields that are no longer in the DOM; use `removeField` for explicit cleanup or re-initialize if the DOM structure changes drastically.

```javascript
// Bulk DOM update
container.innerHTML = `<input name="f1" data-ctrovalidate-rules="required">`;
validator.refresh();
```

---

## Framework Lifecycle Sync

When using reactive frameworks, triggers methods within component lifecycle hooks to maintain synchronization.

### React

```javascript
useEffect(() => {
  // Sync on mount or dependency change
  validator.refresh();
  return () => validator.destroy();
}, [dependencies]);
```

### Vue

```javascript
onMounted(() => {
  const validator = new Ctrovalidate(formRef.value);
});

// Sync after DOM updates
watch(items, async () => {
  await nextTick();
  validator.refresh();
});
```

## Implementation Guidelines

1. **DOM Priority**: Always modify the DOM before calling `addField` or `refresh`.
2. **Explicit Cleanup**: Use `removeField` before removing elements from the DOM to ensure event listeners are detached correctly.
3. **Bulk Updates**: Use `refresh()` when multiple fields are modified simultaneously to avoid redundant discovery cycles.

## Next Steps

- [**API Reference**](/v4/api/browser) — Full documentation of all 9 controller methods.
- [**Custom Rules](./custom-rules.md)** — Defining custom logic for dynamic inputs.





