# Ctrovalidate

![Ctrovalidate Logo](./public/og-img.png)

**The lightweight, declarative, and type-safe form validation ecosystem for modern web applications.**

[![License](https://img.shields.io/badge/license-MIT-black.svg)](./LICENSE)

---

## Packages

Ctrovalidate is split into standalone packages, each in its own repository.

| Package                  | Description                                                                                | Links                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ctrovalidate-core**    | Platform-agnostic validation engine. Zero dependencies. 4 validation functions + 22 rules. | [GitHub](https://github.com/ctrotech-tutor/ctrovalidate-core) · [npm](https://www.npmjs.com/package/ctrovalidate-core) · [Docs](https://ctrovalidate.vercel.app/api/core)          |
| **ctrovalidate-browser** | DOM adapter with declarative HTML-first API using data attributes.                         | [GitHub](https://github.com/ctrotech-tutor/ctrovalidate-browser) · [npm](https://www.npmjs.com/package/ctrovalidate-browser) · [Docs](https://ctrovalidate.vercel.app/api/browser) |
| **ctrovalidate-react**   | Headless hook for React 18+ with controlled input pattern.                                 | [GitHub](https://github.com/ctrotech-tutor/ctrovalidate-react) · [npm](https://www.npmjs.com/package/ctrovalidate-react) · [Docs](https://ctrovalidate.vercel.app/api/react)       |
| **ctrovalidate-vue**     | Reactive composable for Vue 3 with v-model integration and watcher.                        | [GitHub](https://github.com/ctrotech-tutor/ctrovalidate-vue) · [npm](https://www.npmjs.com/package/ctrovalidate-vue) · [Docs](https://ctrovalidate.vercel.app/api/vue)             |
| **ctrovalidate-svelte**  | Store-based integration for Svelte with auto-subscription.                                 | [GitHub](https://github.com/ctrotech-tutor/ctrovalidate-svelte) · [npm](https://www.npmjs.com/package/ctrovalidate-svelte) · [Docs](https://ctrovalidate.vercel.app/api/svelte)    |
| **ctrovalidate-next**    | Server-side utilities for Next.js Server Actions.                                          | [GitHub](https://github.com/ctrotech-tutor/ctrovalidate-next) · [npm](https://www.npmjs.com/package/ctrovalidate-next) · [Docs](https://ctrovalidate.vercel.app/platform/nextjs)   |

---

## Key Features

- **HTML-First Philosophy** — Define rules in markup with `data-ctrovalidate-rules` (browser package)
- **22 Built-in Rules** — `required`, `email`, `minLength`, `between`, `strongPassword`, `alpha`, `alphaNum`, `alphaDash`, `alphaSpaces`, and more
- **Async Validation** — Native `AbortController` integration for race-condition-free remote checks
- **Conditional Validation** — Field dependencies via `data-ctrovalidate-if` with `checked`, `value=`, `present` types
- **Framework Adapters** — Headless hooks for React, Vue, Svelte, and Next.js Server Actions
- **Rule Aliases** — Reusable validation macros with cycle protection
- **Zero Dependencies** — Core package has no runtime dependencies
- **TypeScript First** — Strict type safety with generics across all packages
- **i18n Ready** — Built-in `Translator` with locale switching and message interpolation
- **ARIA Management** — Automatic `aria-invalid` and `aria-describedby` in the browser adapter

---

## Quick Start

```bash
npm install ctrovalidate-browser ctrovalidate-core
```

```html
<form id="signup" novalidate>
  <input name="email" data-ctrovalidate-rules="required|email" />
  <div class="error-message"></div>
  <button type="submit">Submit</button>
</form>
```

```typescript
import { Ctrovalidate } from 'ctrovalidate-browser';

const validator = new Ctrovalidate(document.querySelector('#signup'));
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (await validator.validate()) {
    // Submit
  }
});
```

For framework-specific setup, see:

- [React](https://ctrovalidate.vercel.app/api/react) · [Vue](https://ctrovalidate.vercel.app/api/vue) · [Svelte](https://ctrovalidate.vercel.app/api/svelte) · [Next.js](https://ctrovalidate.vercel.app/platform/nextjs)

---

## Documentation

Full documentation is available at [**ctrovalidate.vercel.app**](https://ctrovalidate.vercel.app).

- [Getting Started](https://ctrovalidate.vercel.app/guide/getting-started) — Installation and basic setup
- [Guide](https://ctrovalidate.vercel.app/guide/introduction) — Core concepts, browser adapter, rules, schemas
- [API Reference](https://ctrovalidate.vercel.app/api/core) — Core, browser, and framework API docs
- [Advanced](https://ctrovalidate.vercel.app/advanced/async) — Async validation, custom rules, i18n, testing

---

## License

MIT © [Ctrotech](https://github.com/ctrotech-tutor)
