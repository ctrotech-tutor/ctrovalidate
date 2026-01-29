# Conditional Validation

In real-world applications, fields are often only required based on the state of other fields. Ctrovalidate handles this elegantly through the `data-ctrovalidate-if` attribute.

## 🧠 The Logic

The `if` attribute follows a simple controller-condition pattern:
`data-ctrovalidate-if="controllerName:condition"`

- **controllerName**: The `name` attribute of the field to watch.
- **condition**: The state to check for.

---

## 🛠️ Supported Conditions

### `:checked`

Validation runs only if the target checkbox or radio is checked.

```html
<input type="checkbox" name="newsletter" id="news" />
<label for="news">Subscribe?</label>

<!-- Email is only validated if 'newsletter' is checked -->
<input
  name="email"
  data-ctrovalidate-rules="required|email"
  data-ctrovalidate-if="newsletter:checked"
/>
```

### `:present`

Validation runs if the target field has any non-empty value.

```html
<input name="coupon_code" placeholder="Have a code?" />

<!-- Discount info required only if coupon is entered -->
<input
  name="referral"
  data-ctrovalidate-rules="required"
  data-ctrovalidate-if="coupon_code:present"
/>
```

### `:value=...`

Validation runs only if the target field exactly matches the specified value.

```html
<select name="contact_method">
  <option value="email">Email</option>
  <option value="phone">Phone</option>
</select>

<!-- Phone rules only apply if 'phone' is selected -->
<input
  name="mobile"
  data-ctrovalidate-rules="required|phone"
  data-ctrovalidate-if="contact_method:value=phone"
/>
```

---

## ⚡ Real-Time Reactivity

Because Ctrovalidate uses a centralized `RuleEngine`, it automatically detects when a "controller" field changes and updates the validation state of all dependent fields instantly.

> [!IMPORTANT]
> When a condition is **not met**, the field is considered valid and any existing error messages are automatically cleared.

## Next Steps

- **[Built-in Rules](./rules.md)** — See all rules you can apply conditionally.
- **[SPAs & Dynamic Fields](./spa-dynamic-fields.md)** — Learn how to handle fields added after page load.
