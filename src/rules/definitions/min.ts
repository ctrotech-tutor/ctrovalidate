// src/rules/definitions/min.ts
import { RuleLogic } from '../../types/index';

/**
 * Checks if a numeric value is at least a specified minimum.
 */
export const min: RuleLogic = (value, params = [], _element = null) => {
  if (value === null || value === undefined || value === '') return true;

  const minVal = params[0];
  if (minVal === undefined) {
    console.error(`[Ctrovalidate] Missing parameter for 'min' rule.`);
    return false;
  }

  return Number(value) >= Number(minVal);
};
