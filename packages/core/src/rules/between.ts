import { RuleLogic } from '../types';

/**
 * Checks if a value is between a min and max (inclusive).
 * Supports numbers and string lengths.
 */
export const between: RuleLogic = (value, params = []) => {
  if (value === null || value === undefined || value === '') return true;

  if (params.length < 2) {
    console.error(`[Ctrovalidate] Missing parameters for 'between' rule.`);
    return false;
  }

  const min = Number(params[0]);
  const max = Number(params[1]);

  if (isNaN(min) || isNaN(max)) {
    return false;
  }

  if (!isNaN(Number(value)) && typeof value !== 'string') {
    const num = Number(value);
    return num >= min && num <= max;
  }

  const valStr = String(value);
  // If it's a numeric string, we might want to compare as number,
  // but if it's "abc", we compare length.
  // The original behavior:
  if (!isNaN(Number(valStr)) && valStr !== '') {
    const num = Number(valStr);
    return num >= min && num <= max;
  }

  const len = valStr.length;
  return len >= min && len <= max;
};
