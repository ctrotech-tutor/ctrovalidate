# TypeScript Support

Ctrovalidate is written in standard JavaScript with deep JSDoc integration, providing first-class IntelliSense and type safety for both JavaScript and TypeScript developers.

## 📦 Typings

Type definition files are included in the package under `dist/types`. They are automatically detected by modern IDEs and compilers.

## 🛠️ Usage in TypeScript

### Basic Initialization

```typescript
import { Ctrovalidate, type CtrovalidateOptions } from 'ctrovalidate';

const form = document.querySelector<HTMLFormElement>('#my-form')!;

const options: CtrovalidateOptions = {
  realTime: true,
  logLevel: Ctrovalidate.LogLevel.INFO,
  errorClass: 'has-error',
};

const validator = new Ctrovalidate(form, options);
```

### Custom Rule Types

When adding custom rules, you can benefit from the imported `RuleLogic` or `AsyncRuleLogic` types.

```typescript
import { Ctrovalidate, type RuleLogic } from 'ctrovalidate';

const myLogic: RuleLogic = (value, params, field) => {
  return value.includes('special');
};

Ctrovalidate.addRule('myRule', myLogic, 'Error message');
```

---

## 🧩 Key Types Reference

| Type                  | Description                                        |
| :-------------------- | :------------------------------------------------- |
| `CtrovalidateOptions` | The configuration object for the constructor.      |
| `LogLevel`            | Enum values for console output.                    |
| `ValidationResult`    | The internal object representing a field's status. |
| `RuleLogic`           | Function signature for synchronous custom rules.   |
| `AsyncRuleLogic`      | Function signature for asynchronous custom rules.  |

> [!TIP]
> You don't need to manually install `@types/ctrovalidate`. The library includes them out of the box.

## Next Steps

- **[Instance Methods](./methods.md)** — Detailed method documentation.
- **[Vite Integration](../integrations/tailwindcss.md)** — See how to use with modern bundlers.
