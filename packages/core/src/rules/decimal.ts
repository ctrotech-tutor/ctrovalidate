import { RuleLogic } from '../types';

const decimalRegex = /^-?\d+(\.\d+)?$/;

/**
 * Checks if a value is a valid decimal number.
 */
export const decimal: RuleLogic = (value) => {
  if (!value && value !== 0) return true;
  return decimalRegex.test(String(value));
};
