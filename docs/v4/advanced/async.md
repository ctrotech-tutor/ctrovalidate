---
title: Async Validation | Handling Remote Logic
description: Master Ctrovalidate's asynchronous validation engine, featuring native AbortSignal support, race-condition protection, and debouncing.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Advanced
    url: https://ctrovalidate.vercel.app/v4/advanced/async
  - name: Async Validation
    url: https://ctrovalidate.vercel.app/v4/advanced/async
---

# Async Validation

Ctrovalidate features a first-class asynchronous validation engine. It is designed to handle remote checks (like username availability or ZIP code lookups) with extreme reliability, protecting your application from race conditions and memory leaks.

---

## 🏗️ How it Works

Async rules return a `Promise<boolean>`. The engine orchestrates these promises and ensures that:

1. **Race Protection**: If a new validation starts before the previous one finishes, the previous one is automatically canceled.
2. **Pending States**: The UI is notified via the `pendingClass` and `isValidating` flag so you can show loading indicators.
3. **Sequential Execution**: Rules are still executed in order; the engine waits for async rules to resolve before moving to the next rule in the pipeline.

---

## 🛡️ The `AbortSignal` Pattern

Every custom async rule receives an `AbortSignal`. To be a "Good Citizen" in the v4 ecosystem, your rules **MUST** propagate this signal to your `fetch` calls.

```javascript
Ctrovalidate.addAsyncRule('checkUsername', async (value, params, element, signal) => {
  try {
    const response = await fetch(`/api/check?u=${value}`, { signal });
    const { available } = await response.json();
    return available;
  } catch (error) {
    // If the request was aborted by Ctrovalidate, we return true 
    // to prevent showing a false-negative error message.
    if (error.name === 'AbortError') return true;
    return false;
  }
});
```

---

## ⚡ Debouncing Strategies

For high-frequency inputs (like a search-as-you-type username field), you should use the `debounce` option to prevent overwhelming your server.

### In `@ctrovalidate/browser`

The browser controller handles standard input events. We recommend wrapping your custom rule logic in a debouncer if needed, or relying on the framework adapters' built-in debouncing.

### In `@ctrovalidate/react`

The React hook has a built-in `debounce` timer.

```javascript
const { values } = useCtrovalidate({
  schema: { username: 'required|checkUsername' },
  debounce: 500 // Wait 500ms after last keystroke before validating
});
```

---

## ✅ Best Practices

- **Propagate the Signal**: Always pass the `signal` to `fetch` or other abortable APIs.
- **Loading Indicators**: Use the `pendingClass` to prevent users from submitting the form while validation is "in flight".
- **Timeout Protection**: Consider wrapping your `fetch` calls in an `AbortSignal.timeout()` if your server fragment might take too long to respond.



