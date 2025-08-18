// src/core/RuleParser.js

/**
 * @file This file contains the logic for parsing the validation rule strings from data attributes.
 * Its sole job is to convert a simple string into a structured, machine-readable format.
 * This is a critical piece of our declarative, HTML-first approach.
 */

/**
 * Parses a rule string (e.g., "required|minLength:3|between:1,10") into a structured array.
 * I've designed this to be resilient and fast. It handles whitespace, splits the rules,
 * and then processes each part to extract the rule name and any associated parameters.
 *
 * @param {string | null} rulesString - The string from the data-validus-rules attribute.
 * @returns {Array<{name: string, param?: string}>} An array of rule objects.
 *          For example: [{ name: 'required' }, { name: 'minLength', param: '3' }]
 */
export function parseRules(rulesString) {
  // If the input is null, empty, or not a string, there's nothing to parse.
  // This prevents crashes if the data attribute is missing or empty.
  if (!rulesString || typeof rulesString !== 'string') {
    return [];
  }

  const parsedRules = [];

  // 1. Split the string into individual rule parts by the pipe character.
  const ruleParts = rulesString.split('|');

  // 2. Process each part of the split string.
  for (const part of ruleParts) {
    // Trim any leading/trailing whitespace from the part, e.g., " required " -> "required".
    const trimmedPart = part.trim();

    // If, after trimming, the part is empty (e.g., from "required||email"), we just skip it.
    if (trimmedPart === '') {
      continue;
    }

    // 3. Check for a parameter, which is denoted by the first colon.
    const separatorIndex = trimmedPart.indexOf(':');

    if (separatorIndex === -1) {
      // No colon found, so this is a simple rule with no parameters.
      parsedRules.push({ name: trimmedPart });
    } else {
      // A colon was found. Split the part into a name and a parameter string.
      const ruleName = trimmedPart.substring(0, separatorIndex).trim();
      const ruleParam = trimmedPart.substring(separatorIndex + 1).trim();

      // We ensure we don't add rules with empty names or params after splitting.
      if (ruleName) {
        parsedRules.push({ name: ruleName, param: ruleParam });
      }
    }
  }

  return parsedRules;
}


