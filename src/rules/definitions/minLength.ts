// src/rules/definitions/minLength.ts
import { RuleLogic } from '../../types/index';

/**
 * Checks if the length of a string value is greater than or equal to a specified minimum.
 */
export const minLength: RuleLogic = (value, params = [], _element = null) => {
  if (!value) return true;

  const min = params[0];
  if (min === undefined) {
    console.error(`[Ctrovalidate] Missing parameter for 'minLength' rule.`);
    return false;
  }

  return String(value).length >= Number(min);
};
