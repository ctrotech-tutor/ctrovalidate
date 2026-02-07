import { RuleLogic } from '../types';

/**
 * Checks if a value meets a maximum numeric requirement.
 */
export const max: RuleLogic = (value, params = []) => {
  if (value === null || value === undefined || value === '') return true;

  if (!params[0]) {
    console.error(`[Ctrovalidate] Missing parameter for 'max' rule.`);
    return false;
  }

  const maxVal = Number(params[0]);
  return Number(value) <= maxVal;
};
