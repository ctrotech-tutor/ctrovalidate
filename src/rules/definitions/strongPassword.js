// src/rules/definitions/strongPassword.js

/**
 * @file The logic for the `strongPassword` rule.
 */

// Regex to check for at least 8 characters, 1 number, 1 lowercase, and 1 uppercase letter.
const strongPasswordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

/**
 * Checks if a password meets a set of minimum strength requirements.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - True if the password is considered strong, false otherwise.
 */
export const strongPassword = (value) => {
  // An empty value is considered valid for format rules.
  if (!value) {
    return true;
  }
  return strongPasswordRegex.test(String(value));
};
