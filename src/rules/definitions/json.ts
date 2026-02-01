// src/rules/definitions/json.ts
import { RuleLogic } from '../../types/index';

/**
 * Checks if a value is a valid JSON string.
 */
export const json: RuleLogic = (value, _params = [], _element = null) => {
  if (!value) return true;
  try {
    const parsed = JSON.parse(String(value));
    return typeof parsed === 'object' && parsed !== null;
  } catch {
    return false;
  }
};
