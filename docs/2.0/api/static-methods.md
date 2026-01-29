# Static API

Static methods and properties are accessed directly on the `Ctrovalidate` class. They control global behavior across all instances.

---

## `Ctrovalidate.addRule()`

Register a standard synchronous rule.

- **Signature**: `(name: string, logic: Function, message: string) => void`
- **Logic Signature**: `(value, params, field) => boolean`

---

## `Ctrovalidate.addAsyncRule()`

Register an asynchronous rule.

- **Signature**: `(name: string, logic: Function, message: string) => void`
- **Logic Signature**: `(value, params, field, signal) => Promise<boolean>`

---

## `Ctrovalidate.LogLevel`

The logging configuration enum.

| Level   | Value | Description                                               |
| :------ | :---- | :-------------------------------------------------------- |
| `NONE`  | 0     | Silent mode. Recommended for production.                  |
| `ERROR` | 1     | Log only critical library failures.                       |
| `WARN`  | 2     | Log configuration issues (e.g. missing error containers). |
| `INFO`  | 3     | Log initialization and field registration.                |
| `DEBUG` | 4     | Verbose output of every rule execution and event.         |

**Usage:**

```javascript
const validator = new Ctrovalidate(form, {
  logLevel: Ctrovalidate.LogLevel.DEBUG,
});
```

## Next Steps

- **[Instance Methods](./methods.md)** — Reference for validator instances.
- **[GitHub Projects](https://github.com/ctrotech-tutor/ctrovalidate)** — Source code and issues.
