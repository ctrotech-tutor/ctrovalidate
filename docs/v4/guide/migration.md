---
title: Migration Guide | Upgrading from v3 to v4
description: A comprehensive guide for migrating your projects from Ctrovalidate v3 to the v4 monorepo architecture.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Guide
    url: https://ctrovalidate.vercel.app/v4/guide/migration
  - name: Migration
    url: https://ctrovalidate.vercel.app/v4/guide/migration
---

# Migration Guide: v3 to v4

Ctrovalidate v4 is a significant architectural evolution, moving from a single package to a **universal monorepo ecosystem**. While the declarative HTML API remains largely compatible, several key technical shifts require attention.

---

## 🚀 Key Architectural Changes

### 1. Scoped Packages

In v3, everything was in a single `ctrovalidate` package. In v4, we have split the library into specialized packages for better bundle optimization and platform support.

| v3 Package | v4 Package | Purpose |
| :--- | :--- | :--- |
| `ctrovalidate` | `@ctrovalidate/core` | Logic engine (Isomorphic) |
| `ctrovalidate` | `@ctrovalidate/browser` | DOM Controller (Browser only) |
| `ctrovalidate` | `@ctrovalidate/react` | Headless React Hooks |

### 2. Import Changes

The main change is the package name - the API remains largely compatible.

| v3 Import | v4 Import | Notes |
| :--- | :--- | :--- |
| `import { Ctrovalidate } from 'ctrovalidate'` | `import { Ctrovalidate } from '@ctrovalidate/browser'` | Scoped package name |
| `import { validate } from 'ctrovalidate'` | `import { validate } from '@ctrovalidate/core'` | Core validation function |

---

## 🛠️ Step-by-Step Migration

### Step 1: Update Dependencies

Uninstall the legacy package and install the new scoped ones.

```bash
# Remove v3
npm uninstall ctrovalidate

# Install v4
npm install @ctrovalidate/browser
```

### Step 2: Update Import Statements

Update your JavaScript or TypeScript files to use the new scoped exports.

```javascript
// ❌ v3 (Legacy)
import { Ctrovalidate } from 'ctrovalidate';

// ✅ v4 (Modern)
import { Ctrovalidate } from '@ctrovalidate/browser';
```

### Step 3: Update Async Rules

In v4, async rules are "Good Citizens" and must utilize the provided `AbortSignal` to participate in the engine's race-condition protection.

```javascript
// ❌ v3 Logic
Ctrovalidate.addAsyncRule('check', async (val) => {
  return (await fetch(`/api?v=${val}`)).ok;
});

// ✅ v4 Logic
Ctrovalidate.addAsyncRule('check', async (val, params, el, signal) => {
  const res = await fetch(`/api?v=${val}`, { signal });
  return res.ok;
});
```

---

## 🎯 Breaking Changes & Nuances

### Error Container Discovery

V3 searched up to 3 parent levels for an error container. V4 initially simplified this to 1, but we have **restored the 3-level-up search** in `v4.0.0-alpha.6+` to maintain layout flexibility.

### Dependency Strategy

The `data-ctrovalidate-if` logic now triggers more precise re-validation events. Ensure that dependent fields have unique `name` attributes for accurate tracking.

---

## ✅ Summary Checklist

- [ ] Uninstall `ctrovalidate` and install `@ctrovalidate/browser`.
- [ ] Update all `import { Ctrovalidate }` statements to use `@ctrovalidate/browser`.
- [ ] Verify `validator.validate()` method calls (API unchanged).
- [ ] Pass `signal` to custom `fetch` calls in async rules.
- [ ] Update CSS selectors if you were relying on internal classes (now use `errorMessageClass` configuration).
