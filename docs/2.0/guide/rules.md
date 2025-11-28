# Built-in Rules

Ctrovalidate comes with a wide variety of built-in rules to cover the most common validation scenarios. You can combine multiple rules by separating them with a pipe (`|`) character in the `data-ctrovalidate-rules` attribute.

## General & Common Rules

---

### `required`
Ensures the field is not empty. For checkboxes, it ensures the box is checked.

- **Usage:** `data-ctrovalidate-rules="required"`

---

### `email`
Ensures the value is in a valid email format (e.g., `name@example.com`).

- **Usage:** `data-ctrovalidate-rules="email"`

---

### `minLength`
Ensures the string length is greater than or equal to a specified minimum.

- **Parameter:** The minimum number of characters.
- **Usage:** `data-ctrovalidate-rules="minLength:8"`

---

### `maxLength`
Ensures the string length is less than or equal to a specified maximum.

- **Parameter:** The maximum number of characters.
- **Usage:** `data-ctrovalidate-rules="maxLength:255"`

---

### `exactLength`
Ensures the string length is exactly equal to a specified value.

- **Parameter:** The exact number of characters.
- **Usage:** `data-ctrovalidate-rules="exactLength:10"`

---

### `sameAs`
Ensures the value is identical to the value of another field.

- **Parameter:** The `name` attribute of the other field.
- **Usage:** `data-ctrovalidate-rules="sameAs:password"` (for a password confirmation field)

## Type & Format Rules

---

### `alpha`
Ensures the value contains only alphabetic characters (`a-z`, `A-Z`).

- **Usage:** `data-ctrovalidate-rules="alpha"`

---

### `alphaNum`
Ensures the value contains only alphanumeric characters (`a-z`, `A-Z`, `0-9`).

- **Usage:** `data-ctrovalidate-rules="alphaNum"`

---

### `alphaDash`
Ensures the value contains only alphanumeric characters, dashes (`-`), and underscores (`_`).

- **Usage:** `data-ctrovalidate-rules="alphaDash"`

---

### `numeric`
Ensures the value is a valid number (can be an integer or decimal).

- **Usage:** `data-ctrovalidate-rules="numeric"`

---

### `integer`
Ensures the value is a valid integer (no decimal point).

- **Usage:** `data-ctrovalidate-rules="integer"`

---

### `decimal`
Ensures the value is a valid decimal number (must contain a decimal point).

- **Usage:** `data-ctrovalidate-rules="decimal"`

---

### `url`
Ensures the value is a valid URL format.

- **Usage:** `data-ctrovalidate-rules="url"`

---

### `phone`
Ensures the value has a generic phone number format.

- **Usage:** `data-ctrovalidate-rules="phone"`

## Number-based Rules

---

### `min`
Ensures a numeric value is greater than or equal to a specified minimum.

- **Parameter:** The minimum numeric value.
- **Usage:** `data-ctrovalidate-rules="min:18"`

---

### `max`
Ensures a numeric value is less than or equal to a specified maximum.

- **Parameter:** The maximum numeric value.
- **Usage:** `data-ctrovalidate-rules="max:65"`

---

### `between`
Ensures a numeric value is between a specified minimum and maximum, inclusive.

- **Parameters:** The min and max values, separated by a comma.
- **Usage:** `data-ctrovalidate-rules="between:18,65"`

## Advanced & Specific Rules

---

### `creditCard`
Ensures the value is a valid credit card number according to the Luhn algorithm.

- **Usage:** `data-ctrovalidate-rules="creditCard"`

---

### `ipAddress`
Ensures the value is a valid IPv4 address.

- **Usage:** `data-ctrovalidate-rules="ipAddress"`

---

### `json`
Ensures the value is a valid JSON string.

- **Usage:** `data-ctrovalidate-rules="json"`

---

### `strongPassword`
A pre-built example rule that checks for a common password policy: at least 8 characters, one uppercase letter, one lowercase letter, and one number.

- **Usage:** `data-ctrovalidate-rules="strongPassword"`
