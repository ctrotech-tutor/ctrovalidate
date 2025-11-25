# Conditional Validation

In many forms, a field may only be required or need validation if
another field has a certain value. Ctrovalidate handles this
declaratively with the `data-ctrovalidate-if` attribute.

This attribute allows you to define a condition that must be met for the
validation rules on an element to be applied. If the condition is not
met, the field is considered valid by default, and no errors will be
shown for it.

## How It Works

You add the `data-ctrovalidate-if` attribute to the field you want to
make conditional. The value of the attribute is a string that specifies
the "controller" field and the condition to check.

The format is `controllerName:condition`.

-   `controllerName`: The `name` attribute of the field that controls
    the validation.
-   `condition`: The state to check for on the controller field.

## Available Conditions

### `:checked`

The most common condition, used for checkboxes. The validation will only
run if the controller checkbox is checked.

**Example:** An email field that is only required if the user subscribes
to a newsletter.

``` html
<div>
  <input type="checkbox" id="subscribe" name="subscribe_newsletter">
  <label for="subscribe">Subscribe to our newsletter</label>
</div>

<div>
  <label for="email">Email Address</label>
  <input 
    type="email" 
    id="email" 
    name="email"
    placeholder="Required if you subscribe"
    data-ctrovalidate-rules="required|email"
    data-ctrovalidate-if="subscribe_newsletter:checked"
  >
  <div class="error-message"></div>
</div>
```

In this example, the `email` field will only be validated if the
`subscribe_newsletter` checkbox is checked.

### `:present`

The validation will run if the controller field has any value (i.e.,
it's not an empty string).

**Example:** A "Reason for contact" field that is only required if the
user selects "Other" from a dropdown.

``` html
<select name="contact_reason">
  <option value="sales">Sales Inquiry</option>
  <option value="support">Support Request</option>
  <option value="other">Other</option>
</select>

<textarea
  name="other_reason"
  placeholder="Please specify"
  data-ctrovalidate-rules="required|minLength:10"
  data-ctrovalidate-if="contact_reason:present" 
></textarea>
```

Wait, the above example has a flaw. The `:present` condition would
trigger on *any* selection. A better condition is needed for this use
case.

### `:value=some_value`

The validation will run if the controller field's value is exactly equal
to `some_value`. This is perfect for the "Other" reason example.

**Example (Corrected):**

``` html
<select name="contact_reason">
  <option value="sales">Sales Inquiry</option>
  <option value="support">Support Request</option>
  <option value="other">Other</option>
</select>

<textarea
  name="other_reason"
  placeholder="Please specify"
  data-ctrovalidate-rules="required|minLength:10"
  data-ctrovalidate-if="contact_reason:value=other" 
></textarea>
```

Now, the `other_reason` textarea will only be required if the user
specifically selects the "Other" option from the dropdown. This is a
very powerful and common pattern.

By combining these simple, declarative attributes, you can build
complex, dynamic forms with very little JavaScript, keeping your logic
clean and your HTML as the single source of truth.
