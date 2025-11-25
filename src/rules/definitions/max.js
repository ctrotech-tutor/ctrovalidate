// src/rules/definitions/max.js

/**
 * @file The logic for the `max` rule.
 */

/**
 * Checks if a numeric value is less than or equal to a specified maximum.
 *
 * @param {any} value - The value to check.
 * @param {Array<string>} params - An array containing the maximum allowed value (e.g., ["100"]).
 * @returns {boolean} - True if the value is within the limit, false otherwise.
 */
export const max = (value, params) => {
  // An empty value is considered valid for this rule.
  if (value === null || value === undefined || value === '') {
    return true;
  }

  const maxValue = params[0];

  if (maxValue === undefined) {
    console.error(`[Ctrovalidate] Missing parameter for 'max' rule.`);
    return false;
  }

  return Number(value) <= Number(maxValue);
};
