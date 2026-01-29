# Configuration Options

Ctrovalidate is designed with sensible defaults, but it provides deep customization for production requirements. You can pass an options object as the second argument to the `Ctrovalidate` constructor.

```javascript
import { Ctrovalidate } from 'ctrovalidate';

const validator = new Ctrovalidate(document.querySelector('form'), {
  realTime: true,
  errorClass: 'field-error',
  logLevel: Ctrovalidate.LogLevel.WARN,
});
```

## Available Options

### `realTime`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: When enabled, the library automatically attaches `blur` and `input` listeners to every tracked field.
- > [!TIP]
  > For long, complex forms, `realTime` provides the best UX by preventing "error shock" at the end of the form.

---

### `logLevel`

- **Type**: `Ctrovalidate.LogLevel` (enum)
- **Default**: `LogLevel.NONE`
- **Description**: Controls console output detail.
- **Levels**:
  - `NONE`: No logs.
  - `ERROR`: Only critical internal failures.
  - `WARN`: Rule execution issues and configuration warnings.
  - `INFO`: Initialization steps and field discovery info.
  - `DEBUG`: Full internal state transitions and event logs.

---

### `errorClass`

- **Type**: `string`
- **Default**: `'is-invalid'`
- **Description**: The class added to the input element itself when validation fails.
- > [!IMPORTANT]
  > Ctrovalidate also adds `aria-invalid="true"` automatically to the element whenever this class is present.

---

### `errorMessageClass`

- **Type**: `string`
- **Default**: `'error-message'`
- **Description**: The class identifier used to find the error container for each field.

**How discovery works:**
By default, the library looks for an element with this class that shares the same parent as the input element. If not found, it continues up the DOM tree (up to 3 levels) to find a logical container.

---

### `pendingClass`

- **Type**: `string`
- **Default**: `'is-validating'`
- **Description**: Applied to the field while asynchronous rules are executing.
- **Example Usage**: Use this class to show a spinner or disable the submit button during a "Username Available" check.

---

## Advanced: Global Configuration

While the constructor handles instance-specific settings, some behaviors are global.

### `Ctrovalidate.LogLevel`

The enum used for logging. Always use the static property to ensure type safety.

```javascript
import { Ctrovalidate } from 'ctrovalidate';
console.log(Ctrovalidate.LogLevel.DEBUG); // 4
```

## Next Steps

- **[Built-in Rules](./rules.md)** — Explore the rule library.
- **[Static Methods](../api/static-methods.md)** — Learn how to add custom rules globally.
