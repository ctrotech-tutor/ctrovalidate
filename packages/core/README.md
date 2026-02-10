# @ctrovalidate/core

**The platform-agnostic heart of the Ctrovalidate ecosystem.**

`@ctrovalidate/core` contains the pure validation logic, parsing engine, and rule definitions. It is a zero-dependency package that runs in any JavaScript environment.

## 🚀 Installation

```bash
pnpm add @ctrovalidate/core
```

## 🛠️ Usage

### Synchronous Validation

Use `validate` when all your rules are synchronous (e.g., regex checks, length).

```typescript
import { validate } from '@ctrovalidate/core';

const data = {
  email: 'invalid',
  age: 17,
};

const schema = {
  email: 'required|email',
  age: 'required|min:18',
};

const results = validate(data, schema);

/*
results = {
  email: { isValid: false, error: 'Please enter a valid email address.', rule: 'email' },
  age: { isValid: false, error: 'Value must be at least 18.', rule: 'min' }
}
*/
```

### Asynchronous Validation

Use `validateAsync` if you have custom async rules (e.g., database checks) or want uniform Promise handling.

```typescript
import { validateAsync } from '@ctrovalidate/core';

const results = await validateAsync(data, schema);
```

### Validator Options

Both functions accept an options object as the third argument:

```typescript
validate(data, schema, {
  // Custom rule definitions
  customRules: {
    isEven: (val) => Number(val) % 2 === 0,
  },

  // Define aliases/macros
  aliases: {
    password: 'required|minLength:8',
  },

  // Override specific messages
  messages: {
    required: 'This field cannot be empty!',
    'email.required': 'We need your email to contact you.',
  },

  // Localization code (requires i18n setup)
  locale: 'fr',
});
```

## 📦 Exports

- **Validation**: `validate`, `validateAsync`, `validateValue`
- **Rules**: `rules` object containing all 25+ built-in validators.
- **Types**: `ValidationSchema`, `RuleLogic`, `ValidationResult`.

## 📄 License

MIT © [Ctrotech](https://github.com/ctrotech-tutor)
