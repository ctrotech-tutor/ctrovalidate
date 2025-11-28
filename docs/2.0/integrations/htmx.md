# Integration: htmx

[htmx](https://htmx.org/) allows you to access modern browser features like AJAX directly from HTML, without writing much JavaScript. Ctrovalidate can act as a powerful client-side "gatekeeper" for htmx, preventing unnecessary server requests for forms with invalid data.

## The Strategy

The key is to hook into htmx's event lifecycle. We will listen for the `htmx:beforeRequest` event, which is dispatched on an element just before an AJAX request is made.

1.  **Set up htmx:** Add `hx-*` attributes to your form fields to trigger server requests (e.g., `hx-post` on blur).
2.  **Initialize Ctrovalidate:** Set up your validator instance as usual.
3.  **Listen for `htmx:beforeRequest`:** Add an event listener for this event on the element that will trigger the request.
4.  **Validate and Prevent:** Inside the listener, call `await validator.validate()`. If validation fails, call `event.preventDefault()` on the event object. This will cancel the htmx request.

## Example: Username Availability Checker

This example shows how to validate a username field on the client-side before htmx makes a server request to check if it's available.

### 1. HTML Structure with htmx Attributes

The `input` field has `hx-post` to trigger a request and `hx-trigger="blur"` to specify when it happens.

```html
<form id="signup-form" novalidate>
	<div>
		<label for="username">Username</label>
		<input 
			type="text" 
			id="username" 
			name="username"
			data-ctrovalidate-rules="required|minLength:4|alphaDash"
      
			hx-post="/mock-username-check" 
			hx-trigger="blur"
			hx-target="#username-feedback"
		>
		<div id="username-feedback" class="error-message"></div>
	</div>
</form>
```

### 2. JavaScript Integration

The JavaScript sets up the validator and the crucial event listener.

```javascript
import { Ctrovalidate } from 'ctrovalidate';

const form = document.getElementById('signup-form');
const usernameField = document.getElementById('username');
const validator = new Ctrovalidate(form);

// Listen for htmx's 'beforeRequest' event on the input field
usernameField.addEventListener('htmx:beforeRequest', async (event) => {
	console.log('htmx:beforeRequest triggered. Validating field first...');
  
	// We only want to validate the specific field that triggered the request.
	const isFieldValid = await validator.validate([usernameField]);

	if (!isFieldValid) {
		console.log('Client-side validation failed. Cancelling htmx request.');
    
		// If validation fails, prevent the htmx request from being sent.
		event.preventDefault();
	} else {
		console.log('Client-side validation passed. Allowing htmx request.');
	}
});
```

### How It Works

-   If you type "abc" (which fails `minLength:4`) and tab away, Ctrovalidate will immediately show an error. The `htmx:beforeRequest` listener will run, `validator.validate()` will return `false`, and `event.preventDefault()` will be called. No server request is made.
-   If you type "validuser", Ctrovalidate passes. The listener allows the event to proceed, and htmx sends the AJAX request to the server to check for availability.

This pattern provides the best of both worlds: instant client-side feedback and powerful server-side interactions, all with minimal JavaScript.

[**View the full working example on GitHub**](https://github.com/ctrotech-tutor/ctrovalidate/blob/main/examples/with-htmx/index.html)

