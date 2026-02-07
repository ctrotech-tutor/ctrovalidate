import { RuleLogic } from '../types';

/**
 * Checks if a value is valid JSON.
 */
export const json: RuleLogic = (value) => {
  if (!value) return true;
  try {
    const result = JSON.parse(String(value));
    return typeof result === 'object' && result !== null;
  } catch {
    return false;
  }
};
