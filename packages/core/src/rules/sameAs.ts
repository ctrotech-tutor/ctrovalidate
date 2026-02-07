import { RuleLogic } from '../types';

/**
 * Checks if a value is the same as a target value.
 */
export const sameAs: RuleLogic = (value, params = []) => {
  if (params.length === 0 || params[0] === undefined) {
    console.error(`[Ctrovalidate] Missing parameter for 'sameAs' rule.`);
    return false;
  }

  const targetValue = params[0];
  return value === targetValue;
};
