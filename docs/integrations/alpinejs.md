---
title: Alpine.js Integration | Markup-First Validation
description: Integrate Ctrovalidate with Alpine.js for reactive, validated forms using x-init and x-data directives.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Integrations
    url: https://ctrovalidate.vercel.app/integrations/alpinejs
  - name: Alpine.js
    url: https://ctrovalidate.vercel.app/integrations/alpinejs
---

# Alpine.js Integration

Ctrovalidate and Alpine.js share a "markup-first" philosophy, making them a perfect match for building reactive, validated forms directly in HTML.

---

## Installation

### Using CDN

Perfect for static sites or CMS integrations:

```html
<!-- Include Alpine.js -->
<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Include Ctrovalidate -->
<script type="module">
  import { Ctrovalidate } from 'https://cdn.jsdelivr.net/npm/ctrovalidate@3.0.0/dist/ctrovalidate.js';
  window.Ctrovalidate = Ctrovalidate;
</script>
```

### Using NPM

```bash
npm install alpinejs ctrovalidate
```

---

## Basic Pattern

Initialize Ctrovalidate within Alpine's `x-init` directive.

### Complete Example

```html
<div 
  x-data="{ 
    validator: null,
    async submit() {
      if (await this.validator.validate()) {
        console.log('Form valid!');
      }
    }
  }" 
  x-init="validator = new Ctrovalidate($refs.form, { realTime: true })"
>
  <form x-ref="form" @submit.prevent="submit" novalidate>
    <div>
      <label>Email</label>
      <input
        name="email"
        type="email"
        data-ctrovalidate-rules="required|email"
      />
      <div class="error-message"></div>
    </div>

    <div>
      <label>Password</label>
      <input
        name="password"
        type="password"
        data-ctrovalidate-rules="required|minLength:8"
      />
      <div class="error-message"></div>
    </div>

    <button type="submit">Sign Up</button>
  </form>
</div>
```

---

## Dynamic Fields

When adding fields dynamically with `x-for`, call `refresh()` after the DOM updates.

### Example: Dynamic List

```html
<div 
  x-data="{ 
    validator: null,
    items: [{ id: 1 }],
    addItem() {
      this.items.push({ id: Date.now() });
      this.$nextTick(() => this.validator.refresh());
    }
  }"
  x-init="validator = new Ctrovalidate($refs.form, { realTime: true })"
>
  <form x-ref="form" novalidate>
    <template x-for="item in items" :key="item.id">
      <div>
        <label>Item Name</label>
        <input
          :name="`item_${item.id}`"
          data-ctrovalidate-rules="required"
        />
        <div class="error-message"></div>
      </div>
    </template>

    <button type="button" @click="addItem">Add Item</button>
    <button type="submit">Submit</button>
  </form>
</div>
```

---

## NPM Usage

When using a build step:

```javascript
import Alpine from 'alpinejs';
import { Ctrovalidate, LogLevel } from 'ctrovalidate';

// Make Ctrovalidate available globally for Alpine
window.Ctrovalidate = Ctrovalidate;
window.LogLevel = LogLevel;

Alpine.start();
```

Then use in HTML:

```html
<div 
  x-data="{ validator: null }"
  x-init="validator = new Ctrovalidate($refs.form, { 
    realTime: true,
    logLevel: LogLevel.WARN
  })"
>
  <form x-ref="form" novalidate>
    <!-- form fields -->
  </form>
</div>
```

---

## Best Practices

### 1. Use `x-init` for Initialization

Initialize the validator when the component mounts:

```html
<div x-init="validator = new Ctrovalidate($refs.form)">
```

### 2. Use `$nextTick` for Dynamic Changes

Wait for DOM updates before calling `refresh()`:

```html
<button @click="items.push({}); $nextTick(() => validator.refresh())">
  Add Field
</button>
```

### 3. Store Validator in `x-data`

Keep the validator instance accessible:

```html
<div x-data="{ validator: null }">
```

### 4. Use `novalidate`

Disable browser validation:

```html
<form x-ref="form" novalidate>
```

---

## Benefits

- **Markup-First**: Both libraries emphasize HTML attributes over complex JS
- **Lightweight**: Alpine + Ctrovalidate = ~20KB total
- **No Build Step**: Can be used via CDN for simple projects
- **Reactive**: Works seamlessly with Alpine's reactivity

---

## Next Steps

- **[Dynamic Fields Guide](../guide/dynamic-fields.md)** — Managing field lifecycle
- **[API Reference](../api/methods.md)** — All 9 instance methods
- **[Getting Started](../guide/getting-started.md)** — Vanilla JS usage
- **[HTMX Integration](./htmx.md)** — Using with AJAX fragments
