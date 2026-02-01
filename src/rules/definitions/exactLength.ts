// src/rules/definitions/exactLength.ts
import { RuleLogic } from '../../types/index';

/**
 * Checks if a value has exactly the specified length.
 */
export const exactLength: RuleLogic = (value, params = [], _element = null) => {
  if (!value) return true;

  const length = params[0];
  if (length === undefined) {
    console.error(`[Ctrovalidate] Missing parameter for 'exactLength' rule.`);
    return false;
  }

  return String(value).length === Number(length);
};
