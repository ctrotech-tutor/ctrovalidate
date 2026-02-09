---
title: State Management | Field & Form Lifecycle
description: Understand how Ctrovalidate tracks field states like isDirty, pending, and valid, and how these transition into visual feedback and accessibility attributes.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Guide
    url: https://ctrovalidate.vercel.app/v4/guide/state
  - name: State Management
    url: https://ctrovalidate.vercel.app/v4/guide/state
---

# State Management

Ctrovalidate tracks the lifecycle of every form field to provide real-time, meaningful feedback without overwhelming the user. Understanding these states is key to building a high-standard user experience.

---

## 🔄 Field States

Every tracked field maintains a set of boolean flags that represent its current status in the validation cycle.

| State | Description | Implementation Detail |
| :--- | :--- | :--- |
| `valid` | The field has passed all assigned validation rules. | `true` by default until a rule fails. |
| `invalid` | The field has failed at least one rule. | Triggers `aria-invalid="true"` and `errorClass`. |
| `dirty` | The user has interacted with (touched) the field. | Set to `true` on the first `blur` or `input` event. |
| `pending` | An asynchronous validation rule is currently executing. | Triggers `pendingClass` for loading indicators. |

---

## 🎨 Visual Feedback (CSS)

Ctrovalidate automatically maps internal states to CSS classes on the field element. You can customize these classes in the `Ctrovalidate` options.

```javascript
const validator = new Ctrovalidate(form, {
  errorClass: 'field-invalid border-red-500', // Applied when invalid
  pendingClass: 'is-validating',              // Applied during async checks
});
```

### Preferred Pattern (Tailwind CSS)

We recommend using the `.dirty` state to ensure users only see errors after they have finished typing or moved to the next field.

```css
/* Only show errors on dirty (touched) fields */
.field-invalid {
  border-color: #ef4444;
}

.is-validating {
  opacity: 0.7;
  cursor: wait;
}
```

---

## ♿ Automated Accessibility (A11Y)

Ctrovalidate manages ARIA attributes automatically, ensuring your forms are "accessible by default" for screen reader users.

1. **`aria-invalid`**: Set to `"true"` when a field fails validation.
2. **`aria-describedby`**: Automatically generated and linked to the error message container.
3. **`role="status"`**: Applied to generated error containers to ensure announcements of new error messages.

---

## 🚀 Programmatic Access

You can query the state of any field or the entire form at any time.

### Check Field State

```javascript
if (validator.isDirty('email')) {
  const error = validator.getError('email');
  console.log('User touched email and it has error:', error);
}
```

### Check Form State

```javascript
// Returns boolean without triggering visual errors
const isAllValid = await validator.validate(); 

// Returns full object with isValid and results
const { isValid, results } = await validator.validateForm();
```

---

## ✅ Best Practices

- **Respect the User**: Only show errors after a field becomes `dirty` (on blur) to avoid "aggressive validation" while the user is still typing.
- **Loading Indicators**: Always provide a visual cue when `pending` is true to bridge the gap during network-based validation.
- **Resetting**: Use `validator.reset()` when clearing a form to wipe the `dirty` and `error` states simultaneously.





