// src/utils/RuleParser.ts

import { RuleDefinition } from '../types/index';

/**
 * Parses a rule string (e.g., "required|minLength:3|between:1,10") into a structured array.
 *
 * @param rulesString - The string from the data-ctrovalidate-rules attribute.
 * @returns An array of rule objects.
 */
export function parseRules(
  rulesString: string | null | undefined
): RuleDefinition[] {
  if (!rulesString || typeof rulesString !== 'string') {
    return [];
  }

  const parsedRules: RuleDefinition[] = [];
  const ruleParts = rulesString.split('|');

  for (const part of ruleParts) {
    const trimmedPart = part.trim();
    if (trimmedPart === '') {
      continue;
    }

    const separatorIndex = trimmedPart.indexOf(':');

    if (separatorIndex === -1) {
      parsedRules.push({ name: trimmedPart, params: [] });
    } else {
      const ruleName = trimmedPart.substring(0, separatorIndex).trim();
      const paramsString = trimmedPart.substring(separatorIndex + 1).trim();

      if (ruleName) {
        const params = paramsString.split(',').map((p) => p.trim());
        parsedRules.push({ name: ruleName, params });
      }
    }
  }

  return parsedRules;
}
