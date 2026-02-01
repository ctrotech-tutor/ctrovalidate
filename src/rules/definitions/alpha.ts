// src/rules/definitions/alpha.ts
import { RuleLogic } from '../../types/index';

const alphaRegex = /^[a-zA-Z]+$/;

/**
 * Checks if a value contains only alphabetic characters.
 */
export const alpha: RuleLogic = (value, _params = [], _element = null) => {
  if (!value) return true;
  return alphaRegex.test(String(value));
};
