// src/rules/definitions/numeric.js

/**
 * @file The logic for the `numeric` rule.
 */

const numericRegex = /^-?\d*\.?\d+$/;

/**
 * Checks if a value is a valid numeric value (can be integer or decimal, positive or negative).
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - True if the value is numeric, false otherwise.
 */
export const numeric = (value) => {
  // An empty value is considered valid for format rules.
  if (value === null || value === undefined || value === '') {
    return true;
  }
  return numericRegex.test(String(value));
};
