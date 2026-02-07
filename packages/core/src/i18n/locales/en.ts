export const en = {
  required: 'This field is required.',
  email: 'Please enter a valid email address.',
  min: 'Minimum value is {0}.',
  max: 'Maximum value is {0}.',
  minLength: 'Minimum length is {0} characters.',
  maxLength: 'Maximum length is {0} characters.',
  alpha: 'This field may only contain alphabetic characters.',
  alphaNum: 'This field may only contain alpha-numeric characters.',
  alphaDash:
    'This field may only contain alpha-numeric characters as well as dashes and underscores.',
  alphaSpaces: 'This field may only contain alphabetic characters and spaces.',
  numeric: 'This field must be a number.',
  integer: 'This field must be an integer.',
  decimal: 'This field must be a decimal number.',
  url: 'Please enter a valid URL.',
  ipAddress: 'Please enter a valid IP address.',
  json: 'Please enter a valid JSON string.',
  phone: 'Please enter a valid phone number.',
  creditCard: 'Please enter a valid credit card number.',
  strongPassword:
    'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a symbol.',
  exactLength: 'This field must be exactly {0} characters long.',
  between: 'This field must be between {0} and {1}.',
  sameAs: 'This field must match {0}.',
};

export type LocaleMessages = typeof en;
