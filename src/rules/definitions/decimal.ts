// src/rules/definitions/decimal.ts
import { RuleLogic } from '../../types/index';

const decimalRegex = /^-?\d*(\.\d+)?$/;

/**
 * Checks if a value is a valid decimal number.
 */
export const decimal: RuleLogic = (value, _params = [], _element = null) => {
  if (!value) return true;
  return decimalRegex.test(String(value));
};
