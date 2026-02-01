// src/rules/definitions/max.ts
import { RuleLogic } from '../../types/index';

/**
 * Checks if a numeric value is no more than a specified maximum.
 */
export const max: RuleLogic = (value, params = [], _element = null) => {
  if (value === null || value === undefined || value === '') return true;

  const maxVal = params[0];
  if (maxVal === undefined) {
    console.error(`[Ctrovalidate] Missing parameter for 'max' rule.`);
    return false;
  }

  return Number(value) <= Number(maxVal);
};
