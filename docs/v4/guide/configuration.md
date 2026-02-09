---
title: Configuration Reference | Customizing Ctrovalidate
description: Comprehensive guide to Ctrovalidate configuration options, including error classes, logging levels, and real-time validation settings.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Guide
    url: https://ctrovalidate.vercel.app/v4/guide/configuration
  - name: Configuration
    url: https://ctrovalidate.vercel.app/v4/guide/configuration
---

# Configuration Options

The `Ctrovalidate` constructor accepts an optional configuration object to customize behavior.

```javascript
import { Ctrovalidate } from '@ctrovalidate/browser';
import { LogLevel } from '@ctrovalidate/core';

const validator = new Ctrovalidate(document.querySelector('form'), {
  realTime: true,
  logLevel: LogLevel.WARN,
  errorClass: 'field-invalid',
  errorMessageClass: 'error-container',
  pendingClass: 'validating-state'
});
```

## Initialization Settings

### `realTime`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Automatically attaches `blur` and `input` listeners to tracked fields.

---

### `logLevel`

- **Type**: `number` | `LogLevel` (Enum)
- **Default**: `LogLevel.NONE` (0)
- **Description**: Controls console output detail levels.
- **Values**:
  - `LogLevel.NONE` (0): No output.
  - `LogLevel.ERROR` (1): Critical failures.
  - `LogLevel.WARN` (2): Rule warnings and configuration issues.
  - `LogLevel.INFO` (3): Lifecycle steps and discovery logs.
  - `LogLevel.DEBUG` (4): Full internal state transitions.

---

### `errorClass`

- **Type**: `string`
- **Default**: `'is-invalid'`
- **Description**: CSS class added to the input element when validation fails. `aria-invalid="true"` is also applied automatically.

---

### `errorMessageClass`

- **Type**: `string`
- **Default**: `'error-message'`
- **Description**: CSS class used to identify the target error container. The controller searches up to 3 parent levels to locate the container relative to the input.

---

### `pendingClass`

- **Type**: `string`
- **Default**: `'is-validating'`
- **Description**: CSS class applied to the input during active asynchronous rule execution.

---

### `schema`

- **Type**: `ValidationSchema`
- **Description**: Programmatic rule definitions. When provided, rules in the schema take precedence over `data-ctrovalidate-rules` attributes.

---

### `aliases`

- **Type**: `Record<string, SchemaRule>`
- **Description**: Definition of local rule aliases (macros) for the instance. Supports recursive rule expansion.

---

## Technical Reference

```typescript
interface CtrovalidateOptions {
  logLevel?: number;          // Default: 0
  errorClass?: string;        // Default: 'is-invalid'
  errorMessageClass?: string; // Default: 'error-message'
  pendingClass?: string;      // Default: 'is-validating'
  realTime?: boolean;         // Default: true
  schema?: ValidationSchema;  // Programmatic rules
  aliases?: Record<string, SchemaRule>; // Instance-level aliases
}
```

## Next Steps

- [**Core Logic**](./core.md) — Documentation for the underlying engine.
- [**API Reference**](/v4/api/browser) — Full instance and static method catalog.





