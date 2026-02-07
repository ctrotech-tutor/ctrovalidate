import { RuleLogic } from '../types';

/**
 * Checks if a value does not exceed a maximum length requirement.
 */
export const maxLength: RuleLogic = (value, params = []) => {
  if (value === null || value === undefined || value === '') return true;

  if (!params[0]) {
    console.error(`[Ctrovalidate] Missing parameter for 'maxLength' rule.`);
    return false;
  }

  const maxLen = Number(params[0]);
  return String(value).length <= maxLen;
};
