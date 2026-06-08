---
title: Built-in Rules Catalog | Validation Syntax
description: Explore all 22 built-in validation rules in Ctrovalidate, covering essential, string, numeric, and format validation patterns.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Guide
    url: https://ctrovalidate.vercel.app/guide/rules
  - name: Built-in Rules
    url: https://ctrovalidate.vercel.app/guide/rules
---

# Built-in Rules Catalog

Ctrovalidate provides **22 atomic validation rules** that form the foundation of the validation engine. These rules are zero-dependency and consistent across all platforms (Browser, Node.js, and Edge).

---

## Skip Conditions

Most rules **skip** (return `true`) when the value is empty. This allows "optional but valid" fields — only `required` and `sameAs` always execute.

| Skip pattern | Rules affected |
|---|---|
| Never skips | `required`, `sameAs` |
| `null`, `undefined`, `""` | `min`, `max`, `minLength`, `maxLength`, `exactLength`, `between` |
| Falsy (`!value`) | `email`, `url`, `ipAddress`, `json`, `phone`, `creditCard`, `strongPassword`, `alpha`, `alphaNum`, `alphaDash`, `alphaSpaces` |
| Falsy AND not `0` | `numeric`, `integer`, `decimal` |

---

## Essential & Comparison Rules

| Rule | Behavior | Params | Skip |
|------|----------|--------|------|
| `required` | `null`, `undefined`, `""`, whitespace → fail. `false` → fail. Booleans pass as-is. | None | Never |
| `sameAs` | Strict equality (`===`) against target value. Missing param → `console.error` + fail. | `targetValue` | Never |

```html
<input name="email" data-ctrovalidate-rules="required" />
<input name="confirm" data-ctrovalidate-rules="required|sameAs:email" />
```

In `ctrovalidate-browser`, `sameAs` resolves the other field's current value from the DOM before comparing.

---

## String & Length Rules

| Rule | Behavior | Params | Skip |
|------|----------|--------|------|
| `minLength` | `String(value).length >= N` | `N` (number) | `null`, `undefined`, `""` |
| `maxLength` | `String(value).length <= N` | `N` (number) | `null`, `undefined`, `""` |
| `exactLength` | `String(value).length === N` | `N` (number) | `null`, `undefined`, `""` |
| `between` | Dual mode (see below) | `min, max` | `null`, `undefined`, `""` |

### `between` — Dual Mode

- **Number or numeric string**: compared numerically (`Number(value) >= min && Number(value) <= max`)
- **Non-numeric string**: compared by length (`value.length >= min && value.length <= max`)

```html
<input name="age" data-ctrovalidate-rules="required|numeric|between:18,120" />
<input name="bio" data-ctrovalidate-rules="between:10,200" />
<!-- bio "Hello" (length 5) → fails; "Hello World" (length 11) → passes -->
```

---

## Numeric Rules

| Rule | Behavior | Params | Skip |
|------|----------|--------|------|
| `numeric` | `!isNaN(Number(value))` | None | Falsy but not `0` |
| `integer` | Regex `/^-?\d+$/` | None | Falsy but not `0` |
| `decimal` | Regex `/^-?\d+(\.\d+)?$/` | None | Falsy but not `0` |
| `min` | `Number(value) >= N` | `N` (number) | `null`, `undefined`, `""` |
| `max` | `Number(value) <= N` | `N` (number) | `null`, `undefined`, `""` |

---

## Format Rules

| Rule | Behavior | Params | Skip |
|------|----------|--------|------|
| `alpha` | Regex `/^[a-zA-Z]+$/` | None | Falsy |
| `alphaNum` | Regex `/^[a-zA-Z0-9]+$/` | None | Falsy |
| `alphaDash` | Regex `/^[a-zA-Z0-9-_]+$/` | None | Falsy |
| `alphaSpaces` | Regex `/^[a-zA-Z\s]+$/` | None | Falsy |
| `email` | Simple regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | None | Falsy |
| `url` | Regex: must start with `http://` or `https://` | None | Falsy |
| `ipAddress` | IPv4 or IPv6 (expanded format with zone ID) | None | Falsy |
| `phone` | International format: `+` optional, 7-15 digits | None | Falsy |
| `creditCard` | Strips `-`/spaces, checks digits only, Luhn algorithm | None | Falsy |
| `json` | `JSON.parse()` then checks `typeof === 'object'` | None | Falsy |

---

## Complex Rules

| Rule | Behavior | Params | Skip |
|------|----------|--------|------|
| `strongPassword` | ≥8 chars, ≥1 lowercase, ≥1 uppercase, ≥1 digit, ≥1 special (`@$!%*?&`) | None | Falsy |

---

## Advanced Syntax

### Multi-Parameter Rules

Parameters are separated by colons for the rule name, and commas between multiple params:

```html
<input name="age" data-ctrovalidate-rules="required|numeric|between:18,99" />
<input name="price" data-ctrovalidate-rules="required|numeric|min:0|max:1000" />
```

### Array Notation (Programmatic)

When using schema objects, parameters preserve their types:

```typescript
const schema = {
  age: [
    { name: 'required' },
    { name: 'between', params: [18, 99] },
  ],
};
```

---

## Best Practices

- **Rule Atomicity**: Combine small rules (`required|numeric`) instead of creating one "monster" custom rule.
- **Empty Values**: Most rules pass on empty values — this allows "optional but valid" patterns.
- **Sequence Matters**: Put `required` first to stop early on empty fields.
- **Parameter Format**: Use colons for rule names and commas for multiple parameters (`between:18,99`).

---

## Complete Rule List

1. `required`
2. `sameAs`
3. `minLength`
4. `maxLength`
5. `exactLength`
6. `between`
7. `numeric`
8. `integer`
9. `decimal`
10. `min`
11. `max`
12. `alpha`
13. `alphaNum`
14. `alphaDash`
15. `alphaSpaces`
16. `email`
17. `url`
18. `phone`
19. `ipAddress`
20. `creditCard`
21. `strongPassword`
22. `json`

For custom rules and async validation, see [Custom Rules](/guide/custom-rules) and [Async Validation](/advanced/async).
