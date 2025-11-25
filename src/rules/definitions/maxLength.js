// src/rules/definitions/maxLength.js

/**
 * @file The logic for the `maxLength` rule.
 */

/**
 * Checks if the length of a string value is less than or equal to a specified maximum.
 *
 * @param {any} value - The value to check.
 * @param {Array<string>} params - An array containing the maximum allowed length (e.g., ["255"]).
 * @returns {boolean} - True if the value's length is within the limit, false otherwise.
 */
export const maxLength = (value, params) => {
  const max = params[0];

  if (max === undefined) {
    console.error(`[Ctrovalidate] Missing parameter for 'maxLength' rule.`);
    return false;
  }

  // An empty value automatically passes a maxLength check.
  return String(value).length <= Number(max);
};
