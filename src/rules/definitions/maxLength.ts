// src/rules/definitions/maxLength.ts
import { RuleLogic } from '../../types/index';

/**
 * Checks if the length of a string value is less than or equal to a specified maximum.
 */
export const maxLength: RuleLogic = (value, params = [], _element = null) => {
  const max = params[0];
  if (max === undefined) {
    console.error(`[Ctrovalidate] Missing parameter for 'maxLength' rule.`);
    return false;
  }

  return String(value).length <= Number(max);
};
