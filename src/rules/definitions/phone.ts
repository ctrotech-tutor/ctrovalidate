// src/rules/definitions/phone.ts
import { RuleLogic } from '../../types/index';

const phoneRegex = /^\+?\d{3,15}$/;

/**
 * Checks if a value is a valid phone number format.
 */
export const phone: RuleLogic = (value, _params = [], _element = null) => {
  if (!value) return true;
  return phoneRegex.test(String(value));
};
