import { RuleLogic } from '../types';

const integerRegex = /^-?\d+$/;

/**
 * Checks if a value is an integer.
 */
export const integer: RuleLogic = (value) => {
  if (!value && value !== 0) return true;
  return integerRegex.test(String(value));
};
