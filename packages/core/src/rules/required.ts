import { RuleLogic } from '../types';

/**
 * Checks if a value is present.
 */
export const required: RuleLogic = (value) => {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === 'boolean') {
    return value;
  }
  return String(value).trim() !== '';
};
