# Configuration Options

When you create a new `Ctrovalidate` instance, you can pass an options object as the second argument to customize its behavior.

```javascript
import { Ctrovalidate } from 'ctrovalidate';

const form = document.getElementById('my-form');

const options = {
	realTime: true,
	logLevel: Ctrovalidate.LogLevel.INFO,
	errorClass: 'has-error',
	errorMessageClass: 'validation-feedback',
	pendingClass: 'is-loading',
};

const validator = new Ctrovalidate(form, options);
```

## Available Options

Here is a list of all available options, their types, and their default values.

- **realTime**: Type: `boolean` — Default: `true`
	- When set to `true`, validation will run automatically on input and blur events for fields that have been interacted with ("dirtied"). This provides instant feedback to the user. If set to `false`, validation will only run when you manually call `validator.validate()`.

- **logLevel**: Type: `LogLevel` (enum) — Default: `Ctrovalidate.LogLevel.NONE`
	- Controls the level of detail Ctrovalidate will log to the developer console. Useful for debugging your form or understanding the library's internal state.
	- Available levels:
		- `Ctrovalidate.LogLevel.NONE`: No logs are shown.
		- `Ctrovalidate.LogLevel.ERROR`: Only critical errors are shown.
		- `Ctrovalidate.LogLevel.WARN`: Shows warnings and errors.
		- `Ctrovalidate.LogLevel.INFO`: Shows informational messages (like initialization), warnings, and errors.
		- `Ctrovalidate.LogLevel.DEBUG`: Shows all messages, including detailed execution flow for deep debugging.

- **errorClass**: Type: `string` — Default: `'is-invalid'`
	- The CSS class that will be added to an input field when it fails validation. You can use this class to apply custom error styling, such as a red border.

- **errorMessageClass**: Type: `string` — Default: `'error-message'`
	- The CSS class used to identify the HTML element that should display the validation error message for a field. Ctrovalidate looks for an element with this class within the parent of the input field.

	Example HTML structure:

	```html
	<div> <!-- Parent -->
		<input name="username" data-ctrovalidate-rules="required">
		<!-- Ctrovalidate will find this element and put the error message here -->
		<div class="error-message"></div>
	</div>
	```

- **pendingClass**: Type: `string` — Default: `'is-validating'`
	- The CSS class that will be added to an input field while an asynchronous validation rule (like checking if a username is available on a server) is in progress. This is useful for showing a loading spinner or other visual feedback to the user.

