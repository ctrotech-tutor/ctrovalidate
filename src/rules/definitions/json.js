// src/rules/definitions/json.js

/**
 * @file The logic for the `json` rule.
 */

/**
 * Checks if a string value is a valid JSON string.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - True if the value is a valid JSON string, false otherwise.
 */
export const json = (value) => {
  // An empty value is considered valid for format rules.
  if (!value) {
    return true;
  }

  const strValue = String(value);
  // A quick check to rule out non-object/array strings.
  if (!strValue.startsWith('{') && !strValue.startsWith('[')) {
    return false;
  }

  try {
    JSON.parse(strValue);
    return true;
  } catch (_) {
    return false;
  }
};
