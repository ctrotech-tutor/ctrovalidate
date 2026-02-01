// src/rules/definitions/integer.ts
import { RuleLogic } from '../../types/index';

const integerRegex = /^-?\d+$/;

/**
 * Checks if a value is a valid integer.
 */
export const integer: RuleLogic = (value, _params = [], _element = null) => {
  if (!value) return true;
  return integerRegex.test(String(value));
};
