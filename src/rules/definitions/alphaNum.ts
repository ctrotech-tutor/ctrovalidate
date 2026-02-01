// src/rules/definitions/alphaNum.ts
import { RuleLogic } from '../../types/index.ts';

const alphaNumRegex = /^[a-zA-Z0-9]+$/;

/**
 * Checks if a value contains only alphanumeric characters.
 */
export const alphaNum: RuleLogic = (value, _params = [], _element = null) => {
  if (!value) return true;
  return alphaNumRegex.test(String(value));
};
