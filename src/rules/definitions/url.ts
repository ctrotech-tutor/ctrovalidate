// src/rules/definitions/url.ts
import { RuleLogic } from '../../types/index';

/**
 * Checks if a value is a valid URL format.
 */
export const url: RuleLogic = (value, _params = [], _element = null) => {
  if (!value) return true;
  try {
    new URL(String(value));
    return true;
  } catch {
    return false;
  }
};
