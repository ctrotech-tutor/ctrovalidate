// src/rules/definitions/min.js

/**
 * @file The logic for the `min` rule.
 */

/**
 * Checks if a numeric value is greater than or equal to a specified minimum.
 *
 * @param {any} value - The value to check.
 * @param {Array<string>} params - An array containing the minimum required value (e.g., ["18"]).
 * @returns {boolean} - True if the value is sufficient, false otherwise.
 */
export const min = (value, params) => {
  // An empty value is considered valid for this rule.
  if (value === null || value === undefined || value === '') {
    return true;
  }

  const minValue = params[0];

  if (minValue === undefined) {
    console.error(`[Ctrovalidate] Missing parameter for 'min' rule.`);
    return false;
  }

  return Number(value) >= Number(minValue);
};
