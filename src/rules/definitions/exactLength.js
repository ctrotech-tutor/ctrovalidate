// src/rules/definitions/exactLength.js

/**
 * @file The logic for the `exactLength` rule.
 */

/**
 * Checks if the length of a string value is exactly equal to a specified length.
 *
 * @param {any} value - The value to check.
 * @param {Array<string>} params - An array containing the exact required length (e.g., ["5"]).
 * @returns {boolean} - True if the value's length is correct, false otherwise.
 */
export const exactLength = (value, params) => {
  // An empty value is considered valid for this rule.
  // 'required' should be used to enforce presence.
  if (!value) {
    return true;
  }

  const length = params[0];

  if (length === undefined) {
    console.error(`[Ctrovalidate] Missing parameter for 'exactLength' rule.`);
    return false;
  }

  return String(value).length === Number(length);
};
