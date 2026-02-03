---
title: Configuration Reference | Customizing Ctrovalidate
description: Comprehensive guide to Ctrovalidate configuration options, including error classes, logging levels, and real-time validation settings.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrotech-tutor.github.io/ctrovalidate/
  - name: Guide
    url: https://ctrotech-tutor.github.io/ctrovalidate/guide/configuration
  - name: Configuration
    url: https://ctrotech-tutor.github.io/ctrovalidate/guide/configuration
---

# Configuration Options

Ctrovalidate provides sensible defaults, but you can customize its behavior by passing an options object as the second argument to the constructor.

```javascript
import { Ctrovalidate, LogLevel } from 'ctrovalidate';

const validator = new Ctrovalidate(document.querySelector('form'), {
  realTime: true,
  logLevel: LogLevel.WARN,
  errorClass: 'field-error',
  errorMessageClass: 'error-text',
  pendingClass: 'is-validating'
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

- **Type**: `LogLevel` (enum)
- **Default**: `LogLevel.NONE` (0)
- **Description**: Controls console output detail for debugging.
- **Levels**:
  - `LogLevel.NONE` (0): No logs
  - `LogLevel.ERROR` (1): Only critical internal failures
  - `LogLevel.WARN` (2): Rule execution issues and configuration warnings
  - `LogLevel.INFO` (3): Initialization steps and field discovery
  - `LogLevel.DEBUG` (4): Full internal state transitions and event logs

**Example:**
```javascript
import { Ctrovalidate, LogLevel } from 'ctrovalidate';

const validator = new Ctrovalidate(form, {
  logLevel: LogLevel.DEBUG // Enable detailed logging
});
```

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

## All Configuration Options

Here's a complete reference:

```typescript
import { LogLevel } from 'ctrovalidate';

interface CtrovalidateOptions {
  realTime?: boolean;           // Default: true
  logLevel?: LogLevel;          // Default: LogLevel.NONE (0)
  errorClass?: string;          // Default: 'is-invalid'
  errorMessageClass?: string;   // Default: 'error-message'
  pendingClass?: string;        // Default: 'ctrovalidate-pending'
}

enum LogLevel {
  NONE = 0,
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4
}
```

## Next Steps

- **[Built-in Rules](./rules.md)** — Explore the rule library.
- **[Static Methods](../api/static-methods.md)** — Learn how to add custom rules globally.
