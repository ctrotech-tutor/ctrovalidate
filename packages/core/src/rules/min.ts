import { RuleLogic } from '../types';

/**
 * Checks if a value meets a minimum numeric requirement.
 */
export const min: RuleLogic = (value, params = []) => {
  if (value === null || value === undefined || value === '') return true;

  if (!params[0]) {
    console.error(`[Ctrovalidate] Missing parameter for 'min' rule.`);
    return false;
  }

  const minVal = Number(params[0]);
  return Number(value) >= minVal;
};
