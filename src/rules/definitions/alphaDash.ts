// src/rules/definitions/alphaDash.ts
import { RuleLogic } from '../../types/index';

const alphaDashRegex = /^[a-zA-Z0-9_-]+$/;

/**
 * Checks if a value contains alphabetic, numeric characters, dashes or underscores.
 */
export const alphaDash: RuleLogic = (value, _params = [], _element = null) => {
  if (!value) return true;
  return alphaDashRegex.test(String(value));
};
