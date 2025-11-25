// src/rules/definitions/email.js

/**
 * @file The logic for the `email` rule.
 */

// A standard, widely-used regex for email validation.
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Checks if a value is a valid email address format.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - True if the value is a valid email format, false otherwise.
 */
export const email = (value) => {
  // An empty value is considered valid for format rules,
  // 'required' should be used to enforce presence.
  if (!value) {
    return true;
  }
  return emailRegex.test(String(value));
};
