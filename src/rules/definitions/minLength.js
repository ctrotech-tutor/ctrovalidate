// src/rules/definitions/minLength.js

/**
 * @file The logic for the `minLength` rule.
 */

/**
 * Checks if the length of a string value is greater than or equal to a specified minimum.
 *
 * @param {any} value - The value to check.
 * @param {Array<string>} params - An array containing the minimum required length (e.g., ["3"]).
 * @returns {boolean} - True if the value's length is sufficient, false otherwise.
 */
export const minLength = (value, params) => {
  // An empty value is considered valid for this rule.
  // 'required' should be used to enforce presence.
  if (!value) {
    return true;
  }

  const min = params[0];

  if (min === undefined) {
    console.error(`[Ctrovalidate] Missing parameter for 'minLength' rule.`);
    return false;
  }

  return String(value).length >= Number(min);
};
