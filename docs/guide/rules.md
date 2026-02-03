---
title: Built-in Rules Catalog | Validation Syntax
description: Explore all 21 built-in validation rules in Ctrovalidate, covering common, format, and numeric validation patterns.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrotech-tutor.github.io/ctrovalidate/
  - name: Guide
    url: https://ctrotech-tutor.github.io/ctrovalidate/guide/rules
  - name: Built-in Rules
    url: https://ctrotech-tutor.github.io/ctrovalidate/guide/rules
---

# Built-in Rules Catalog

Ctrovalidate provides **21 built-in validation rules** out of the box. Rules are declarative, composable, and can be combined in any order.

---

## 🏗️ Composition Syntax

Rules are defined in the `data-ctrovalidate-rules` attribute.

- Use a **pipe** (`|`) to separate rules: `required|email`
- Use a **colon** (`:`) for parameters: `minLength:8`
- Use **commas** (`,`) for multiple parameters: `between:18,65`

---

## 📋 General & Essential Rules

| Rule          | Description                                                | Usage Example     |
| :------------ | :--------------------------------------------------------- | :---------------- |
| `required`    | Field cannot be empty. For checkboxes, requires `checked`. | `required`        |
| `email`       | Validates standard email formats.                          | `email`           |
| `minLength`   | String must be $\ge$ specified length.                     | `minLength:8`     |
| `maxLength`   | String must be $\le$ specified length.                     | `maxLength:250`   |
| `exactLength` | String must be exactly $N$ characters.                     | `exactLength:10`  |
| `sameAs`      | Must match the value of another field.                     | `sameAs:password` |

---

## 🔢 Numeric & Counting

| Rule      | Description                          | Usage Example  |
| :-------- | :----------------------------------- | :------------- |
| `numeric` | Allows integers and decimals.        | `numeric`      |
| `integer` | Allows only whole numbers.           | `integer`      |
| `decimal` | Requires at least one decimal point. | `decimal`      |
| `min`     | Number must be $\ge$ target.         | `min:18`       |
| `max`     | Number must be $\le$ target.         | `max:100`      |
| `between` | Number must be in range `min,max`.   | `between:1,10` |

---

## 🔣 Format & Pattern Rules

| Rule        | Description                              | Usage Example |
| :---------- | :--------------------------------------- | :------------ |
| `alpha`     | Only letters (A-Z, a-z).                 | `alpha`       |
| `alphaNum`  | Only letters and numbers.                | `alphaNum`    |
| `alphaDash` | Letters, numbers, `-`, and `_`.          | `alphaDash`   |
| `url`       | Standard URL format (requires protocol). | `url`         |
| `phone`     | General international phone format.      | `phone`       |
| `ipAddress` | Validates IPv4 and IPv6 formats.         | `ipAddress`   |
| `json`      | Validates JSON Object/Array string.      | `json`        |
| `creditCard`| Validates credit card using Luhn Algorithm. | `creditCard` |

---

## 💡 Rule Composition

Rules are independent and can be combined in any order:
- `required|numeric|min:18` is identical to `numeric|min:18|required`
- All rules are executed in the order they appear
- Validation stops at the first failing rule

## Total: 21 Built-in Rules

- **Common Rules (6)**: required, email, minLength, maxLength, exactLength, sameAs
- **Numeric Rules (6)**: numeric, integer, decimal, min, max, between
- **Format Rules (9)**: alpha, alphaNum, alphaDash, url, phone, ipAddress, json, creditCard

## Next Steps

- **[Conditional Validation](./conditional-validation.md)** — Apply rules dynamically based on other fields
- **[Custom Rules](./custom-rules.md)** — Create your own validation logic
- **[API Reference](/api/methods)** — Explore all 9 public methods
