// src/localization/en.ts

/**
 * Default error messages for the English locale.
 */
export const defaultMessages: Record<string, string> = {
  required: 'This field is required.',
  minLength: 'This field must be at least {0} characters long.',
  maxLength: 'This field cannot be longer than {0} characters.',
  between: 'This field must be between {0} and {1} characters long.',
  email: 'Please enter a valid email address.',
  phone: 'Please enter a valid phone number.',
  url: 'Please enter a valid URL.',
  numeric: 'This field must contain only numbers.',
  alpha: 'This field must contain only letters.',
  alphaDash: 'This field must contain only letters, numbers, and dashes.',
  alphaSpaces: 'This field must contain only letters and spaces.',
  alphaNum: 'This field must contain only letters and numbers.',
  decimal: 'This field must be a valid decimal number.',
  integer: 'This field must be a valid integer.',
  min: 'This field must be at least {0}.',
  max: 'This field cannot be more than {0}.',
  exactLength: 'This field must be exactly {0} characters long.',
  format: 'This field format is invalid.',
  sameAs: 'This field must match {0}.',
  strongPassword:
    'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  creditCard: 'Please enter a valid credit card number.',
  ipAddress: 'Please enter a valid IP address.',
  json: 'Please enter a valid JSON string.',
};
