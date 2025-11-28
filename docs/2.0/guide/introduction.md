# What is Ctrovalidate?

Ctrovalidate is a modern, lightweight, and zero-dependency JavaScript library for client-side form validation. It was built from the ground up to be powerful, flexible, and incredibly easy to use, with a special focus on a **declarative, HTML-first approach**.

Our goal is to provide a validation solution that is both simple enough for a weekend project and robust enough for a large-scale production application.

## Core Philosophy

We believe that for most use cases, validation logic belongs with the HTML it is validating. This makes your code cleaner, easier to read, and faster to develop.

```html
<!-- With Ctrovalidate, this is all you need for complex validation. -->
<input
  type="email"
  name="subscriber_email"
  data-ctrovalidate-rules="required|email"
  data-ctrovalidate-if="wants_newsletter:checked"
/>
```
