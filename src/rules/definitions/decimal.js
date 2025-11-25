// src/rules/definitions/decimal.js

/**
 * @file The logic for the `decimal` rule.
 */

const decimalRegex = /^-?\d*\.\d+$/;

/**
 * Checks if a value is a valid decimal number. It must contain a decimal point.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - True if the value is a decimal, false otherwise.
 */
export const decimal = (value) => {
  // An empty value is considered valid for format rules.
  if (value === null || value === undefined || value === '') {
    return true;
  }
  return decimalRegex.test(String(value));
};
