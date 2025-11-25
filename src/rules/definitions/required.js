// src/rules/definitions/required.js

/**
 * @file The logic for the `required` rule.
 */

/**
 * Checks if a value is present.
 * For non-boolean values, it checks for a non-empty trimmed string.
 * For booleans (like checkboxes), it checks if the value is `true`.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - True if the value is considered present, false otherwise.
 */
export const required = (value) => {
  if (value === null || value === undefined) {
    return false;
  }
  // For checkboxes, the value is its `checked` property (a boolean).
  if (typeof value === 'boolean') {
    return value;
  }
  // For all other input types, check for a non-empty string after trimming.
  return String(value).trim() !== '';
};
