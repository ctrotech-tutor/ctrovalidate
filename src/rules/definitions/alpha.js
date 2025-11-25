// src/rules/definitions/alpha.js

/**
 * @file The logic for the `alpha` rule.
 */

const alphaRegex = /^[a-zA-Z]+$/;

/**
 * Checks if a value contains only alphabetic characters.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - True if the value contains only letters, false otherwise.
 */
export const alpha = (value) => {
  // An empty value is considered valid for format rules.
  if (!value) {
    return true;
  }
  return alphaRegex.test(String(value));
};
