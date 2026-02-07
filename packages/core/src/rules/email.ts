import { RuleLogic } from '../types';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Checks if a value is a valid email address.
 */
export const email: RuleLogic = (value) => {
  if (!value) return true;
  return emailRegex.test(String(value));
};
