// src/rules/definitions/alphaDash.js

/**
 * @file The logic for the `alphaDash` rule.
 */

const alphaDashRegex = /^[a-zA-Z0-9_-]+$/;

/**
 * Checks if a value contains only alphanumeric characters, dashes, and underscores.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - True if the value is valid, false otherwise.
 */
export const alphaDash = (value) => {
  // An empty value is considered valid for format rules.
  if (!value) {
    return true;
  }
  return alphaDashRegex.test(String(value));
};
