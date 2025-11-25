// src/rules/definitions/integer.js

/**
 * @file The logic for the `integer` rule.
 */

const integerRegex = /^-?\d+$/;

/**
 * Checks if a value is a valid integer (positive or negative).
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - True if the value is an integer, false otherwise.
 */
export const integer = (value) => {
  // An empty value is considered valid for format rules.
  if (value === null || value === undefined || value === '') {
    return true;
  }
  return integerRegex.test(String(value));
};
