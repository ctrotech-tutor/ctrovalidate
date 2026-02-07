import { RuleLogic } from '../types';

/**
 * Checks if a value meets a minimum length requirement.
 */
export const minLength: RuleLogic = (value, params = []) => {
  if (value === null || value === undefined || value === '') return true;

  if (!params[0]) {
    console.error(`[Ctrovalidate] Missing parameter for 'minLength' rule.`);
    return false;
  }

  const minLen = Number(params[0]);
  return String(value).length >= minLen;
};
