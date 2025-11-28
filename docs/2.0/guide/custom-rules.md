# Creating Custom Rules

While Ctrovalidate provides a comprehensive set of built-in rules, you will often have validation needs specific to your application. Ctrovalidate's API makes it easy to add your own custom rules, both synchronous and asynchronous.

Custom rules are added globally using static methods on the `Ctrovalidate` class. It's best practice to define your custom rules once, before you initialize any validator instances.

## `Ctrovalidate.addRule()` (Synchronous)

Use this method for rules that can be validated instantly without any delay.

The method takes three arguments:

1.  `name` (string): The name of your rule, which you will use in the `data-ctrovalidate-rules` attribute.
2.  `logic` (function): The function that performs the validation.
3.  `message` (string): The default error message to display if the rule fails.

### The Logic Function

Your logic function will receive three arguments:

- `value`: The current value of the field being validated.
- `params`: An array of strings containing any parameters passed to your rule (e.g., for a rule `myRule:foo,bar`, `params` would be `['foo', 'bar']`).
- `field`: The HTML element itself.

The function must return `true` if the validation passes and `false` if it fails.

### Example: `isPositive`

Let's create a simple rule to check if a number is greater than zero.

```javascript
import { Ctrovalidate } from 'ctrovalidate';

// Define the custom rule before initializing
Ctrovalidate.addRule(
  'isPositive',
  (value, params, field) => {
    // Don't fail on empty values; use 'required' for that.
    if (!value) {
      return true;
    }
    return Number(value) > 0;
  },
  'The value must be a positive number.'
);

// Now you can use it in your HTML
// <input type="number" data-ctrovalidate-rules="required|numeric|isPositive">
```

## `Ctrovalidate.addAsyncRule()` (Asynchronous)

Use this method for rules that require a delay, such as making an API call to a server.

The arguments are the same as `addRule`, but the logic function is slightly different.

### The Async Logic Function

Your async logic function will receive **four** arguments:

- `value`, `params`, `field`: Same as the synchronous version.
- `signal`: An `AbortSignal` object. This is crucial for handling race conditions. If the user types again while a request is in flight, Ctrovalidate will abort the previous signal. You should pass this signal to your `fetch` call or other async operation.

The function must return a `Promise` that resolves to `true` if validation passes and `false` if it fails.

### Example: `usernameAvailable`

Let's create a classic async rule that checks if a username is already taken by querying a fake API.

```javascript
import { Ctrovalidate } from 'ctrovalidate';

// Define the custom async rule
Ctrovalidate.addAsyncRule(
  'usernameAvailable',
  async (value, params, field, signal) => {
    // Don't run the check on an empty value
    if (!value) {
      return true;
    }

    try {
      // Simulate an API call
      const response = await fetch(
        `https://api.example.com/check-username?username=${value}`,
        {
          signal, // Pass the abort signal to fetch
        }
      );

      if (response.status === 404) {
        // Username is available
        return true;
      } else {
        // Username is taken
        return false;
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        // This is expected if the user types again.
        // Ctrovalidate handles this, so we can consider it a "pass" for this aborted attempt.
        console.log('Previous username check aborted.');
        return true;
      }
      // Handle other network errors
      console.error('Network error during username check.');
      return false; // Or decide how to handle network failures
    }
  },
  'This username is already taken.'
);

// Now you can use it in your HTML
// <input type="text" data-ctrovalidate-rules="required|alphaDash|usernameAvailable">
```

While the async rule is running, Ctrovalidate will automatically add the `pendingClass` (default: `is-validating`) to the input field, allowing you to show a loading spinner.
