// src/rules/definitions/phone.js

/**
 * @file The logic for the `phone` rule.
 */

// A very generic regex that checks for a plus sign and at least 3 digits.
// This is intentionally loose to accommodate international formats.
const phoneRegex = /^\+?(\d.*){3,}$/;

/**
 * Checks if a value has a format that resembles a phone number.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - True if the value could be a phone number, false otherwise.
 */
export const phone = (value) => {
  // An empty value is considered valid for format rules.
  if (!value) {
    return true;
  }
  return phoneRegex.test(String(value));
};
