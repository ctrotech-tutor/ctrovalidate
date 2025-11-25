# TypeScript Types

For developers using TypeScript, Ctrovalidate exports several types and interfaces to ensure type safety and provide excellent editor autocompletion.

When you import `Ctrovalidate` in a TypeScript file, you can also import these helper types.

```typescript
import { Ctrovalidate, CtrovalidateOptions, LogLevel } from 'ctrovalidate';
```

---

## `CtrovalidateOptions`

This is the interface for the options object that can be passed to the `Ctrovalidate` constructor.

### Definition

```typescript
interface CtrovalidateOptions {
	logLevel?: LogLevel;
	errorClass?: string;
	errorMessageClass?: string;
	pendingClass?: string;
	realTime?: boolean;
}
```

### Properties

- **`logLevel?: LogLevel`**
	The logging level for the console. Defaults to `LogLevel.NONE`.

- **`errorClass?: string`**
	The CSS class applied to an invalid field. Defaults to `'is-invalid'`.

- **`errorMessageClass?: string`**
	The CSS class to identify the error message container. Defaults to `'error-message'`.

- **`pendingClass?: string`**
	The CSS class applied during async validation. Defaults to `'is-validating'`.

- **`realTime?: boolean`**
	Whether to enable real-time validation. Defaults to `true`.

### Usage

```typescript
const options: CtrovalidateOptions = {
	realTime: false,
	errorClass: 'form-error'
};

const validator = new Ctrovalidate(form, options);
```

---

## `LogLevel`

This is an enum representing the available logging levels.

### Definition

```typescript
enum LogLevel {
	NONE = 0,
	ERROR = 1,
	WARN = 2,
	INFO = 3,
	DEBUG = 4,
}
```

### Usage

Use this enum to provide a type-safe value for the `logLevel` option.

```typescript
import { Ctrovalidate, LogLevel, CtrovalidateOptions } from 'ctrovalidate';

const options: CtrovalidateOptions = {
	logLevel: LogLevel.DEBUG
};

const validator = new Ctrovalidate(form, options);
```

