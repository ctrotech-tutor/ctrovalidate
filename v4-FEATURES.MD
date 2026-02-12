# Ctrovalidate v4.0.0-alpha.0 - Comprehensive Feature Catalog

Following a comprehensive, file-by-file audit of the entire Ctrovalidate monorepo, this document serves as the definitive reference for all features, architectural patterns, and technical capabilities in version 4.

---

## 🏛️ Ecosystem Architecture

### **1. @ctrovalidate/core**

The platform-agnostic heart of the library. Contains pure validation logic that runs anywhere (Node.js, Edge, Browser).

- **Generic Validation Engine**: Supports synchronous and asynchronous rules with integrated `AbortController` support.
- **Recursive Rule Aliases**: Shortcuts for complex rule sets. Aliases can refer to other aliases with built-in infinite-loop protection.
- **Centralized Logger**: Configurable, multi-level logging (NONE to DEBUG) with a consistent `[Ctrovalidate]` prefix.
- **Internationalization (i18n)**: Specialized `Translator` class with locale switching and parameter interpolation (`{0}`, `{1}`).
- **Zero-Dependency**: No external runtime dependencies, ensuring maximum portability.

### **2. @ctrovalidate/browser**

The DOM-specific adapter for vanilla JS applications and declarative UIs.

- **Declarative Markup**: Define rules directly in HTML with `data-ctrovalidate-rules`.
- **Dynamic Field Support**: `refresh()` method allows the engine to re-discover fields added via AJAX or client-side routing.
- **Dependency Engine**: `data-ctrovalidate-if` allows fields to depend on the state (checked, value, presence) of other fields.
- **Intelligent Event Model**: Tracks "dirty" state to prevent premature validation errors until the first user engagement (`blur`).

### **3. Headless Framework Adapters**

Professional-grade hooks and composables providing a reactive bridge to the core engine.

- **@ctrovalidate/react**: `useCtrovalidate` hook with stable callbacks and strict type-safety.
- **@ctrovalidate/vue**: `useCtrovalidate` composable leveraging Vue 3's Reactivity API.
- **@ctrovalidate/svelte**: Reactive stores (`writable`, `derived`) for a native Svelte experience.
- **@ctrovalidate/next**: Specialized `validateAction` utility for Next.js **Server Actions**.

---

## 🛠️ Built-in Validation Rules (25+ Total)

### **Common Rules**

- **`required`**: Field must have a value (boolean `true`, non-null, non-empty string).
- **`email`**: Valid email format using optimized RFC-compliant regex.
- **`minLength:n` / `maxLength:n`**: Character length constraints.
- **`exactLength:n`**: Precise character length requirement.
- **`sameAs:fieldName`**: Must match another field's value. In the browser, this automatically resolves DOM field names.

#### **Format Rules**

- **`alpha` / `alphaNum` / `alphaDash` / `alphaSpaces`**: Character set constraints.
- **`url`**: Valid HTTP/HTTPS URL format.
- **`phone`**: International-standard phone number validation.
- **`creditCard`**: Valid credit card number using the **Luhn Algorithm**.
- **`strongPassword`**: At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char.
- **`json`**: Validates that a string is a parseable JSON object.
- **`ipAddress`**: Supports both **IPv4** and **IPv6**.

#### **Numeric Rules**

- **`numeric`**: Any numeric value.
- **`integer` / `decimal`**: Type-specific numeric checks.
- **`min:n` / `max:n` / `between:min,max`**: Numeric range constraints (inclusive).

---

## 💎 Developer Experience & Standards

### **1. Core-First Type System**

Supports standard TypeScript interfaces without requiring index signatures (`Record<string, unknown>`).

```typescript
interface User { name: string; email: string; }
const { values } = useCtrovalidate<User>({ ... });
```

### **2. Industry Standard Tooling**

- **Monorepo Management**: Powered by **pnpm workspaces** and **Turborepo**.
- **Build Quality**: Distributed as **ESM** and **CJS** with full **DTS** support via `tsup`.
- **Linting & Quality**: Strict **ESLint** flat-config and **Prettier** formatting across all packages.
- **Testing**: 100% logic coverage verified via **Vitest**.

### **3. Accessibility (A11Y) by Default**

- Automated `aria-invalid` management.
- Dynamic error container generation with unique IDs.
- Automatic linkage via `aria-describedby`.
- **Live Regions**: Uses `role="status"` and `aria-live="polite"` for non-disruptive screen reader updates.

---

**Version**: 4.0.0-alpha.0  
**Ecosystem**: Full Monorepo  
**License**: MIT  
