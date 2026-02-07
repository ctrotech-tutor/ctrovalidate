import { RuleLogic } from '../types';

const phoneRegex =
  /^[+]?([(]?[0-9]{1,4}[)]?)[-\s.]?[0-9]{3,4}[-\s.]?[0-9]{4,6}$/;

/**
 * Checks if a value is a valid phone number.
 */
export const phone: RuleLogic = (value) => {
  if (!value) return true;
  return phoneRegex.test(String(value));
};
