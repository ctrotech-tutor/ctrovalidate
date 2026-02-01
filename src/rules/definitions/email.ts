// src/rules/definitions/email.ts
import { RuleLogic } from '../../types/index';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Checks if a value is a valid email address format.
 */
export const email: RuleLogic = (value, _params = [], _element = null) => {
  if (!value) return true;
  return emailRegex.test(String(value));
};
