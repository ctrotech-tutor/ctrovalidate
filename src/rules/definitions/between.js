// src/rules/definitions/between.js

/**
 * @file The logic for the `between` rule.
 */

/**
 * Checks if a numeric value falls between a specified min and max (inclusive).
 *
 * @param {any} value - The value to check.
 * @param {Array<string>} params - An array containing the min and max values (e.g., ["18", "65"]).
 * @returns {boolean} - True if the value is within the range, false otherwise.
 */
export const between = (value, params) => {
  // An empty value is considered valid for this rule.
  if (value === null || value === undefined || value === '') {
    return true;
  }
  
  // The parser now provides a clean array.
  const [min, max] = params;
  const numValue = Number(value);

  // Ensure both min and max are valid numbers before comparing.
  if (min === undefined || max === undefined || isNaN(Number(min)) || isNaN(Number(max))) {
    console.error(`[Ctrovalidate] Invalid parameters for 'between' rule. Expected two numbers. Received:`, params);
    return false;
  }

  return numValue >= Number(min) && numValue <= Number(max);
};
