import { RuleLogic } from '../types';

const alphaRegex = /^[a-zA-Z]+$/;

/**
 * Checks if a value contains only alphabetic characters.
 */
export const alpha: RuleLogic = (value) => {
  if (!value) return true;
  return alphaRegex.test(String(value));
};
