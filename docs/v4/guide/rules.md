---
title: Built-in Rules Catalog | Validation Syntax
description: Explore all 22 built-in validation rules in Ctrovalidate, covering essential, string, numeric, and format validation patterns.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Guide
    url: https://ctrovalidate.vercel.app/v4/guide/rules
  - name: Built-in Rules
    url: https://ctrovalidate.vercel.app/v4/guide/rules
---

# Built-in Rules Catalog

Ctrovalidate provides **22 atomic validation rules** that form the foundation of our isomorphic validation engine. These rules are zero-dependency, high-performance, and consistent across all platforms (Browser, Node.js, and Edge).

---

## 🛠️ Essential & Logical Rules

These rules handle the core requirements of form validation and field relationships.

| Rule | Behavior | Parameters |
| :--- | :--- | :--- |
| `required` | Fails if the value is empty. Works with checkboxes and multi-selects. | None |
| `sameAs` | Fails if the value does not match the value of another field. | `target_field_name` |

**Example:**

```html
<input name="email" data-ctrovalidate-rules="required" />
<input name="confirm_email" data-ctrovalidate-rules="required|sameAs:email" />
```

---

## 📏 String & Length Rules

Precise control over text density and character counts.

| Rule | Behavior | Parameters |
| :--- | :--- | :--- |
| `minLength` | Validates that character count is ≥ `N`. | `N` (Integer) |
| `maxLength` | Validates that character count is ≤ `N`. | `N` (Integer) |
| `exactLength` | Validates that character count is exactly `N`. | `N` (Integer) |
| `between` | Validates that numeric value is within the range `[min, max]` (inclusive). | `min, max` |

---

## 🔢 Numeric Logic Rules

For integers, decimals, and range-based numeric validation.

| Rule | Behavior | Parameters |
| :--- | :--- | :--- |
| `numeric` | Allows any numeric value (integer or decimal). | None |
| `integer` | Allows whole numbers only (e.g., `42`, `-7`). | None |
| `decimal` | Requires a numeric value with at least one decimal point. | None |
| `min` | Numeric value must be ≥ `N`. | `N` (Number) |
| `max` | Numeric value must be ≤ `N`. | `N` (Number) |

---

## 🛡️ Identity & Format Rules

Pre-configured regex-powered rules for common web use-cases.

| Rule | Behavior | Parameters |
| :--- | :--- | :--- |
| `alpha` | Allows A-Z and a-z only. | None |
| `alphaNum` | Allows A-Z, a-z, and 0-9. | None |
| `alphaDash` | Allows A-Z, a-z, 0-9, dashes `-`, and underscores `_`. | None |
| `alphaSpaces` | Allows A-Z, a-z, and whitespace. | None |
| `email` | Validates standard RFC email formats. | None |
| `url` | Validates absolute URL patterns (HTTP/HTTPS). | None |
| `phone` | Validates international phone number strings. | None |
| `ipAddress` | Validates IPv4 or IPv6 formats. | None |
| `creditCard` | Validates card numbers using the Luhn Algorithm. | None |
| `strongPassword` | Requires uppercase, lowercase, number, and special character. | None |
| `json` | Validates that the string is a valid JSON object/array. | None |

---

## 🧩 Advanced Syntax

### Multi-Parameter Rules

Rules like `between`, `min`, and `max` require parameters separated by colons.

```html
<input name="age" data-ctrovalidate-rules="required|numeric|between:18,99" />
<input name="price" data-ctrovalidate-rules="required|numeric|min:0|max:1000" />
```

### Passing Parameters in Objects

When using the `ValidationSchema` object, parameters are passed as an array.

```typescript
const schema = {
  age: [
    { name: 'required' },
    { name: 'between', params: [18, 99] }
  ],
  price: [
    { name: 'required' },
    { name: 'min', params: [0] },
    { name: 'max', params: [1000] }
  ]
};
```

---

## ✅ Best Practices

- **Rule Atomicity**: Combine small rules (e.g., `required|numeric`) instead of creating one "monster" custom rule.
- **Empty Values**: Most rules (except `required`) will pass if the value is empty. This allows for "Optional but Valid" fields.
- **Sequence Matters**: Put `required` first to stop execution immediately on empty fields.
- **Parameter Format**: Use colons for rule names and commas for multiple parameters (e.g., `between:18,99`).

---

## 📊 Complete Rule List

All 22 built-in rules:

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

For custom rules and async validation, see [Custom Rules](/v4/guide/custom-rules) and [Async Validation](/v4/advanced/async).
