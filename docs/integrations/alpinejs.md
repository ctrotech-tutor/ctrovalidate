# Integration: Alpine.js

[Alpine.js](https://alpinejs.dev/) is a rugged, minimal framework for composing JavaScript behavior in your markup. Its declarative nature and ability to manipulate the DOM make it a perfect partner for Ctrovalidate, especially for creating dynamic forms.

## The Strategy

The key to a successful integration is to use Ctrovalidate's programmatic API (`addField` and `removeField`) to keep the validator synchronized with the DOM changes made by Alpine.
## Alpine.js Integration

Ctrovalidate and Alpine.js are a match made in heaven. Both libraries share a "markup-first" philosophy, allowing you to build reactive, validated forms directly in your HTML without a heavy build step.

---

## ⚙️ Setting Up Your Project

Alpine.js is famous for its simplicity. You can use it via CDN or NPM.

### 1. Using CDN (No Build Step)
Perfect for static sites or CMS integrations (WordPress, Laravel Blade).

```html
<!-- Include Alpine.js and Ctrovalidate -->
<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
<script type="module">
  import { Ctrovalidate } from 'https://cdn.jsdelivr.net/npm/ctrovalidate@2.1.1/dist/ctrovalidate.js';
  window.Ctrovalidate = Ctrovalidate;
</script>
```

### 2. Using NPM (Modern Build)
```bash
npm install alpinejs ctrovalidate
```

---

## 🏗️ The Declarative Pattern

The most elegant way to use Ctrovalidate with Alpine is to initialize the validator within Alpine's `x-init` directive.

### Complete Implementation

```html
<div x-data="{ 
    validator: null,
    async submit() {
      if (await this.validator.validate()) {
        console.log('Alpine Form Verified!');
      }
    }
  }" 
  x-init="validator = new Ctrovalidate($refs.form, { realTime: true })"
  class="max-w-md mx-auto p-6 bg-white border border-black"
>
  <form x-ref="form" @submit.prevent="submit" novalidate class="space-y-4">
    <div>
      <label class="block text-xs font-bold uppercase">Subscriber Email</label>
      <input
        name="email"
        type="email"
        data-ctrovalidate-rules="required|email"
        class="w-full border-b border-black py-2 focus:outline-none focus:bg-gray-50 transition-all"
      />
      <div class="error-message text-red-600 text-[10px] uppercase font-bold mt-1"></div>
    </div>

    <button type="submit" class="w-full bg-black text-white p-3 font-bold uppercase hover:bg-gray-800">
      Join Network
    </button>
  </form>
</div>
```

---

## 🔄 Reactive Synchronization

Because Ctrovalidate observers the DOM directly, it automatically stays in sync with Alpine's `x-model`. 

### Dynamic Fields with `x-for`
When fields are added dynamically via `x-for`, you should call the refresh method to ensure Ctrovalidate tracks the new elements.

```html
<button @click="items.push({}); $nextTick(() => validator.refresh())">
  Add Field
</button>
```

---

## ⚡ Why Use Ctrovalidate with Alpine.js?

1.  **Alignment of Philosophy**: Both libraries emphasize the power of HTML attributes over complex JS logic.
2.  **Lightweight Stack**: Combining Alpine + Ctrovalidate gives you high reactivity and robust validation for under 20KB total.
3.  **No Context Switching**: Stay in your HTML file for both layout and validation rules.

> [!TIP]
> You can use `x-show` or `x-if` to conditionally show error containers, though Ctrovalidate handles the `display: none` of error messages automatically.

## Next Steps

- **[Vanilla JS Guide](../guide/getting-started.md)** — Working without any framework.
- **[HTMX Integration](./htmx.md)** — Using Ctrovalidate with AJAX fragments.

## Example: Industrial Dynamic Registration

This example demonstrates a modern, high-standards dynamic form powered by Alpine.js and Ctrovalidate.

### 1. HTML Structure

We use `x-data` to manage the dynamic state and `showcase-container` for the premium monochrome layout.

```html
<div class="showcase-container">
  <form
    id="registration-form"
    x-data="registration"
    @submit.prevent="submitForm"
    noValidate
    className="validation-form"
  >
    <div class="form-group">
      <label htmlFor="email">Email Address</label>
      <input
        type="email"
        id="email"
        name="email"
        data-ctrovalidate-rules="required|email"
        placeholder="john@example.com"
      />
      <div class="error-message"></div>
    </div>

    <!-- Dynamic Field Example -->
    <template x-if="needsPhone">
      <div class="form-group">
        <label htmlFor="phone">Mobile Number</label>
        <input
          type="text"
          id="phone"
          name="phone"
          data-ctrovalidate-rules="required|phone"
          placeholder="+1 234 567 890"
        />
        <div class="error-message"></div>
      </div>
    </template>

    <button type="submit" class="submit-btn">Verify Alpine Integration</button>
  </form>
</div>
```

### 2. JavaScript Initialization

```javascript
import { Ctrovalidate } from 'ctrovalidate';
import Alpine from 'alpinejs';

const form = document.getElementById('registration-form');
const validator = new Ctrovalidate(form, { 
  realTime: true,
  logLevel: Ctrovalidate.LogLevel.DEBUG,
  pendingClass: 'is-validating'
});

document.addEventListener('alpine:init', () => {
  Alpine.data('registration', () => ({
    needsPhone: true,

    async submitForm() {
      const isValid = await validator.validate();
      if (isValid) {
        alert('🚀 Integration verified (Alpine JS)!');
      }
    }
  }));
});

Alpine.start();
```

This pattern ensures that Ctrovalidate's zero-dependency engine works flawlessly with Alpine's reactive DOM updates.

[**View the full working example on GitHub**](https://github.com/ctrotech-tutor/ctrovalidate/tree/main/examples/demo-alpine)
