import { RuleLogic } from '../types';

const alphaNumRegex = /^[a-zA-Z0-9]+$/;

/**
 * Checks if a value contains only alphanumeric characters.
 */
export const alphaNum: RuleLogic = (value) => {
  if (!value) return true;
  return alphaNumRegex.test(String(value));
};
