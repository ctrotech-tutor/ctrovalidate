import { RuleLogic } from '../types';

/**
 * Checks if a value has an exact length.
 */
export const exactLength: RuleLogic = (value, params = []) => {
  if (value === null || value === undefined || value === '') return true;

  if (!params[0]) {
    console.error(`[Ctrovalidate] Missing parameter for 'exactLength' rule.`);
    return false;
  }

  const len = Number(params[0]);
  return String(value).length === len;
};
