# Static Methods

Static methods are called directly on the `Ctrovalidate` class, not on an instance. They are used to configure the library globally.

```javascript
import { Ctrovalidate } from 'ctrovalidate';

// You call static methods directly on the class.
Ctrovalidate.addRule(/* ... */);
```

---

## `Ctrovalidate.addRule()`

Adds a new synchronous validation rule to the library. This rule will then be available to all `Ctrovalidate` instances.

- **Arguments:**
  1.  `name` (`string`): The name of the rule (e.g., `'isPositive'`).
  2.  `logic` (`Function`): The validation function. It receives `(value, params, field)` and must return a `boolean`.
  3.  `message` (`string`): The default error message for the rule.

- **Returns:** `void`

### Usage

```javascript
Ctrovalidate.addRule(
  'startsWithA',
  (value) => {
    if (!value) return true; // Don't validate empty values
    return String(value).startsWith('A');
  },
  'This field must start with the letter A.'
);

// Now you can use it in your HTML:
// <input data-ctrovalidate-rules="startsWithA">
```

For a more detailed guide, see [Creating Custom Rules](../guide/custom-rules.md).

---

## `Ctrovalidate.addAsyncRule()`

Adds a new asynchronous validation rule to the library. This is ideal for rules that require a server call or other delayed operations.

- **Arguments:**
  1.  `name` (`string`): The name of the rule (e.g., `'usernameAvailable'`).
  2.  `logic` (`Function`): The async validation function. It receives `(value, params, field, signal)` and must return a `Promise<boolean>`.
  3.  `message` (`string`): The default error message for the rule.

- **Returns:** `void`

### Usage

```javascript
Ctrovalidate.addAsyncRule(
  'usernameAvailable',
  async (value, params, field, signal) => {
    const response = await fetch(
      `https://api.example.com/check?user=${value}`,
      { signal }
    );
    const data = await response.json();
    return data.isAvailable; // Assuming the API returns { isAvailable: true/false }
  },
  'This username is already taken.'
);

// Now you can use it in your HTML:
// <input data-ctrovalidate-rules="usernameAvailable">
```

For a more detailed guide, see [Creating Custom Rules](../guide/custom-rules.md).

---

## `Ctrovalidate.LogLevel`

A static property that provides access to the `LogLevel` enum. This is used to provide a type-safe value for the `logLevel` option in the constructor.

- **Type:** `enum`

### Usage

```javascript
const validator = new Ctrovalidate(form, {
  logLevel: Ctrovalidate.LogLevel.DEBUG,
});
```

The available levels are:

- `LogLevel.NONE`
- `LogLevel.ERROR`
- `LogLevel.WARN`
- `LogLevel.INFO`
- `LogLevel.DEBUG`
