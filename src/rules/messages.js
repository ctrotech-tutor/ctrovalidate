// src/rules/messages.js

/**
 * @file This file contains the default English error messages for all built-in validation rules.
 * I've designed this as a simple key-value store to make it incredibly easy to
 * find, edit, or even override these messages. The use of placeholders like {param}
 * allows for dynamic messages that can adapt to the rule's parameters.
 */

export const defaultMessages = {
  // --- General & Common Rules ---
  required: 'This field is required.',
  email: 'Please enter a valid email address.',
  minLength: 'This field must be at least {param} characters long.',
  maxLength: 'This field must not exceed {param} characters.',
  exactLength: 'This field must be exactly {param} characters long.',
  sameAs: 'This field must be the same as the {param} field.',

  // --- Type & Format Rules ---
  alpha: 'This field must only contain letters.',
  alphaNum: 'This field must only contain letters and numbers.',
  alphaDash:
    'This field must only contain letters, numbers, dashes, and underscores.',
  numeric: 'This field must be a valid number.',
  integer: 'This field must be a valid integer.',
  decimal: 'This field must be a valid decimal number.',
  url: 'Please enter a valid URL.',
  phone: 'Please enter a valid phone number.', // A generic one, can be customized.

  // --- Number-based Rules ---
  min: 'The value must be at least {param}.',
  max: 'The value must not be greater than {param}.',
  between: 'The value must be between {param1} and {param2}.',

  // --- Advanced & Specific Rules ---
  creditCard: 'Please enter a valid credit card number.',
  ipAddress: 'Please enter a valid IP address.',
  json: 'Please enter a valid JSON string.',

  // --- Custom Password Rule (Example) ---
  // We can add a default message for a rule we anticipate creating, like 'strongPassword'.
  strongPassword: 'Password is not strong enough.',
};
