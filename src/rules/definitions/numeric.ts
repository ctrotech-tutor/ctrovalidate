// src/rules/definitions/numeric.ts
import { RuleLogic } from '../../types/index';

const numericRegex = /^-?\d*(\.\d+)?$/;

/**
 * Checks if a value is a valid numeric string.
 */
export const numeric: RuleLogic = (value, _params = [], _element = null) => {
  if (!value) return true;
  return numericRegex.test(String(value));
};
