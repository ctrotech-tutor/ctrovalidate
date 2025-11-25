// src/rules/definitions/alphaNum.js

/**
 * @file The logic for the `alphaNum` rule.
 */

const alphaNumRegex = /^[a-zA-Z0-9]+$/;

/**
 * Checks if a value contains only alphanumeric characters.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - True if the value contains only letters and numbers, false otherwise.
 */
export const alphaNum = (value) => {
  // An empty value is considered valid for format rules.
  if (!value) {
    return true;
  }
  return alphaNumRegex.test(String(value));
};
