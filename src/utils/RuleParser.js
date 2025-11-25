// src/utils/RuleParser.js

/**
 * @file This file contains the logic for parsing validation rule strings from data attributes.
 * This version is upgraded to handle multiple comma-separated parameters, returning them
 * as a structured array.
 */

/**
 * Parses a rule string (e.g., "required|minLength:3|between:1,10") into a structured array.
 *
 * @param {string | null} rulesString - The string from the data-ctrovalidate-rules attribute.
 * @returns {Array<{name: string, params: Array<string>}>} An array of rule objects.
 *          For example: [{ name: 'required', params: [] }, { name: 'minLength', params: ['3'] }]
 */
export function parseRules(rulesString) {
  if (!rulesString || typeof rulesString !== 'string') {
    return [];
  }

  const parsedRules = [];
  const ruleParts = rulesString.split('|');

  for (const part of ruleParts) {
    const trimmedPart = part.trim();
    if (trimmedPart === '') {
      continue;
    }

    const separatorIndex = trimmedPart.indexOf(':');

    if (separatorIndex === -1) {
      // No colon found, so this is a simple rule with no parameters.
      parsedRules.push({ name: trimmedPart, params: [] });
    } else {
      // A colon was found. Split into name and parameter string.
      const ruleName = trimmedPart.substring(0, separatorIndex).trim();
      const paramsString = trimmedPart.substring(separatorIndex + 1).trim();

      if (ruleName) {
        // Split the parameters string by commas to get an array of params.
        const params = paramsString.split(',').map(p => p.trim());
        parsedRules.push({ name: ruleName, params: params });
      }
    }
  }

  return parsedRules;
}
