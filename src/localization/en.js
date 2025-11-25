// src/localization/en.js

/**
 * @file This file contains the default English error messages for all built-in validation rules.
 * This version uses a numbered placeholder system (e.g., {0}, {1}) to allow for more
 * complex and dynamic messages.
 */

export const defaultMessages = {
  // --- General & Common Rules ---
  required: 'This field is required.',
  email: 'Please enter a valid email address.',
  minLength: 'This field must be at least {0} characters long.',
  maxLength: 'This field must not exceed {0} characters.',
  exactLength: 'This field must be exactly {0} characters long.',
  sameAs: 'This field must be the same as the {0} field.',

  // --- Type & Format Rules ---
  alpha: 'This field must only contain letters.',
  alphaNum: 'This field must only contain letters and numbers.',
  alphaDash: 'This field must only contain letters, numbers, dashes, and underscores.',
  numeric: 'This field must be a valid number.',
  integer: 'This field must be a valid integer.',
  decimal: 'This field must be a valid decimal number.',
  url: 'Please enter a valid URL.',
  phone: 'Please enter a valid phone number.',

  // --- Number-based Rules ---
  min: 'The value must be at least {0}.',
  max: 'The value must not be greater than {0}.',
  // This rule now supports two distinct parameters.
  between: 'The value must be between {0} and {1}.',

  // --- Advanced & Specific Rules ---
  creditCard: 'Please enter a valid credit card number.',
  ipAddress: 'Please enter a valid IP address.',
  json: 'Please enter a valid JSON string.',
  
  // --- Custom Password Rule (Example) ---
  strongPassword: 'Password is not strong enough.',
};
