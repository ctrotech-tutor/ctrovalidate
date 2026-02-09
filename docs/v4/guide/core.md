if i not wrong  im very sure somepatr of this v4 docs---
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Guide
    url: https://ctrovalidate.vercel.app/v4/guide/core
  - name: "@ctrovalidate/core | Universal Validation Engine"
    url: https://ctrovalidate.vercel.app/v4/guide/core
title: "@ctrovalidate/core | Universal Validation Engine"
description: Technical overview of the platform-agnostic core validation logic.
---
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Guide
    url: https://ctrovalidate.vercel.app/v4/guide/core
  - name: "@ctrovalidate/core | Universal Validation Engine"
    url: https://ctrovalidate.vercel.app/v4/guide/core

# @ctrovalidate/core

The `@ctrovalidate/core` package contains the platform-agnostic validation engine. it is designed to run in any JavaScript environment, including Node.js, browsers, and edge runtimes.

---
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Guide
    url: https://ctrovalidate.vercel.app/v4/guide/core
  - name: "@ctrovalidate/core | Universal Validation Engine"
    url: https://ctrovalidate.vercel.app/v4/guide/core

## Technical Role

The core package maintains the "Source of Truth" for validation logic. It does not interact with the DOM or any platform-specific APIs. Instead, it provides the primitive functions used by adapters (like `@ctrovalidate/browser`).

### Key Responsibilities

1. **Rule Execution**: Running synchronous and asynchronous validation logic.
2. **Schema Parsing**: Interpreting string-based and object-based validation schemas.
3. **State Management**: Calculating validation results and error messages based on input values.
4. **I18n Engine**: Managing locale-specific error message resolution.

---
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Guide
    url: https://ctrovalidate.vercel.app/v4/guide/core
  - name: "@ctrovalidate/core | Universal Validation Engine"
    url: https://ctrovalidate.vercel.app/v4/guide/core

## Core Primitives

### `validateAsync`

The primary entry point for executing validation logic against a schema.

```typescript
import { validateAsync } from '@ctrovalidate/core';

const result = await validateAsync(value, 'required|email', {
  context: someData,
  locale: 'en'
});
```

---
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Guide
    url: https://ctrovalidate.vercel.app/v4/guide/core
  - name: "@ctrovalidate/core | Universal Validation Engine"
    url: https://ctrovalidate.vercel.app/v4/guide/core

## Extension Points

### Custom Rules

Core provides the interfaces (`RuleLogic`, `AsyncRuleLogic`) for creating universal rules that can be shared across frameworks.

### Loggers

The internal logging system can be replaced with custom implementations (e.g., Sentry, Winston) by implementing the `Logger` interface.

---
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Guide
    url: https://ctrovalidate.vercel.app/v4/guide/core
  - name: "@ctrovalidate/core | Universal Validation Engine"
    url: https://ctrovalidate.vercel.app/v4/guide/core

## Next Steps

- [**Built-in Rules**](./rules.md) — Reference for rules available in the core engine.
- [**Custom Rules**](./custom-rules.md) — How to extend the core with your own logic.
- [**Browser Adapter**](./browser.md) — How the core is used within DOM environments.






