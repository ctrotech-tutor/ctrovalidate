import { RuleLogic } from '../types';

/**
 * Checks if a value is numeric.
 */
export const numeric: RuleLogic = (value) => {
  if (!value && value !== 0) return true;
  return !isNaN(Number(value)) && !isNaN(parseFloat(String(value)));
};
