# Integration: Alpine.js

[Alpine.js](https://alpinejs.dev/) is a rugged, minimal framework for composing JavaScript behavior in your markup. Its declarative nature and ability to manipulate the DOM make it a perfect partner for Ctrovalidate, especially for creating dynamic forms.

## The Strategy

The key to a successful integration is to use Ctrovalidate's programmatic API (`addField` and `removeField`) to keep the validator synchronized with the DOM changes made by Alpine.

1.  **Initialize Ctrovalidate Once:** Create a single validator instance for your form.
2.  **Register Alpine Component:** Use the `alpine:init` event to safely register your component data. This is the recommended pattern.
3.  **Call `addField`:** When your Alpine component adds a new form field to the DOM, use `$nextTick` to wait for the DOM to update, then call `validator.addField()` on the new element(s).
4.  **Call `removeField`:** *Before* your Alpine component removes a field, call `validator.removeField()` on the element(s) to be removed.

## Example: Dynamic Invoice Form

This example shows how to build a form where users can dynamically add and remove invoice items.

### 1. HTML Structure with Alpine Directives

The form is controlled by an Alpine component defined in `x-data="invoice"`. We use `x-for` to loop over an `items` array and render the fields.

```html
<form id="invoice-form" x-data="invoice" @submit.prevent="submitForm" novalidate>
	<header>
		<button type="button" @click="addItem">Add Item</button>
	</header>

	<template x-for="(item, index) in items" :key="item.id">
		<div class="item-row">
			<div>
				<label :for="`description-${item.id}`">Description</label>
				<input type="text" :id="`description-${item.id}`" data-ctrovalidate-rules="required|minLength:5">
			</div>
			<div>
				<button type="button" @click="removeItem(index)">Remove</button>
			</div>
		</div>
	</template>

	<button type="submit">Submit Invoice</button>
</form>
```

### 2. JavaScript Initialization

In our script, we initialize Ctrovalidate and then register our Alpine component, which contains the core logic.

```javascript
import { Ctrovalidate } from 'ctrovalidate';
import Alpine from 'alpinejs'; // Assuming ESM import

const form = document.getElementById('invoice-form');
const validator = new Ctrovalidate(form, { realTime: true });

document.addEventListener('alpine:init', () => {
	Alpine.data('invoice', () => ({
		items: [{ id: 1 }],
		nextId: 2,

		addItem() {
			this.items.push({ id: this.nextId++ });

			// Use $nextTick to wait for the DOM to update
			this.$nextTick(() => {
				const newId = this.items[this.items.length - 1].id;
				const newField = form.querySelector(`#description-${newId}`);
        
				// Tell Ctrovalidate about the new field
				validator.addField(newField);
			});
		},

		removeItem(index) {
			const itemToRemove = this.items[index];
			const fieldToRemove = form.querySelector(`#description-${itemToRemove.id}`);

			// Tell Ctrovalidate to forget the field *before* removing it
			validator.removeField(fieldToRemove);

			this.items.splice(index, 1);
		},

		async submitForm() {
			const isFormValid = await validator.validate();
			if (isFormValid) {
				alert('Invoice is valid!');
			}
		}
	}));
});

Alpine.start();
```

This pattern ensures that Ctrovalidate's internal tracking of fields is always perfectly in sync with the dynamic DOM managed by Alpine.js.

[**View the full working example on GitHub**](https://github.com/ctrotech-tutor/ctrovalidate/blob/main/examples/with-alpinejs/index.html)

