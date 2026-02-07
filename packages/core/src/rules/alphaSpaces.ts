import { RuleLogic } from '../types';

const alphaSpacesRegex = /^[a-zA-Z\s]+$/;

/**
 * Checks if a value contains only alphabetic characters and spaces.
 */
export const alphaSpaces: RuleLogic = (value) => {
  if (!value) return true;
  return alphaSpacesRegex.test(String(value));
};
