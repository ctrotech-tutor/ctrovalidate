---
title: TypeScript Types | Shared Ecosystem
description: Consolidated reference for the shared TypeScript types used across the Ctrovalidate monorepo ecosystem.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: API
    url: https://ctrovalidate.vercel.app/v4/api/types
  - name: Types
    url: https://ctrovalidate.vercel.app/v4/api/types
---

# TypeScript Types

Ctrovalidate is built with TypeScript from the ground up. This page documents the core types that are shared across all packages (`@ctrovalidate/core`, `@ctrovalidate/browser`, etc.).

---

## 🏗️ Schema Types

### `ValidationSchema`

The central type for defining validation logic.

```typescript
type ValidationSchema = string | RuleDefinition[] | Record<string, SchemaRule>;
```

### `RuleDefinition`

The normalized object representation of a validation rule.

```typescript
interface RuleDefinition {
  name: string;
  params?: any[];
  message?: string;
}
```

---

## 🛠️ Execution Types

### `ValidationResult`

The object returned after executing a validation rule or a full schema subset.

```typescript
interface ValidationResult {
  isValid: boolean;
  error: string | null;
  rule: string | null;
}
```

### `RuleLogic`

The function signature for synchronous validation rules.

```typescript
type RuleLogic = (
  value: any, 
  params: any[], 
  context?: RuleContext
) => boolean;
```

### `AsyncRuleLogic`

The function signature for asynchronous validation rules.

```typescript
type AsyncRuleLogic = (
  value: any, 
  params: any[], 
  context?: RuleContext, 
  signal?: AbortSignal
) => Promise<boolean>;
```

---

## 🎨 Browser Specifics

### `CtrovalidateOptions`

Configuration interface for the browser controller.

```typescript
interface CtrovalidateOptions {
  realTime?: boolean;
  errorClass?: string;
  errorMessageClass?: string;
  pendingClass?: string;
  logLevel?: number;
}
```

---

## ✅ Best Practices

- **Type Inference**: Use `keyof T` when defining schemas for specific data interfaces to ensure full type safety in frameworks like React and Vue.
- **Exported Types**: All packages export their specific types; however, core logic types always originate from `@ctrovalidate/core`.



