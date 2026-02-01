---
title: Built-in Rules Catalog | Validation Syntax
description: Explore the full library of 20+ built-in validation rules in Ctrovalidate, covering strings, numbers, emails, and complex patterns with industrial precision.
---

# Built-in Rules Catalog

Ctrovalidate provides a robust suite of validation rules out of the box. Rules are **declarative**, **composable**, and **highly efficient**.

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

## 🔣 String & Format

| Rule        | Description                              | Usage Example |
| :---------- | :--------------------------------------- | :------------ |
| `alpha`     | Only letters (A-Z, a-z).                 | `alpha`       |
| `alphaNum`  | Only letters and numbers.                | `alphaNum`    |
| `alphaDash` | Letters, numbers, `-`, and `_`.          | `alphaDash`   |
| `url`       | Standard URL format (requires protocol). | `url`         |
| `phone`     | General international phone format.      | `phone`       |
| `ipAddress` | Validates IPv4 format.                   | `ipAddress`   |
| `json`      | Validates JSON Object/Array string.      | `json`        |

---

## 🛡️ Security & Advanced

### `strongPassword`

Ensures a baseline production security level:

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one digit

**Usage:** `data-ctrovalidate-rules="required|strongPassword"`

### `creditCard`

Validates credit card numbers using the **Luhn Algorithm**.

> [!NOTE]
> This checks the format and mathematical validity, not the actual card balance or existence.

**Usage:** `data-ctrovalidate-rules="required|creditCard"`

---

## 💡 Pro-Tip: Rule Independence

Ctrovalidate treats rules as independent units. This means you can combine them in any order:
`required|numeric|min:18` is functionally identical to `numeric|min:18|required`.

## Next Steps

- **[Conditional Validation](./conditional-validation.md)** — Learn how to apply these rules dynamically.
- **[Custom Rules](./custom-rules.md)** — Build your own logic.
