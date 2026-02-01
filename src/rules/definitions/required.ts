// src/rules/definitions/required.ts
import { RuleLogic } from '../../types/index';

/**
 * Checks if a value is present.
 */
export const required: RuleLogic = (value, _params = [], _element = null) => {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === 'boolean') {
    return value;
  }
  return String(value).trim() !== '';
};
