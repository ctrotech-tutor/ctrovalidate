import { RuleLogic } from '../types';

const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Checks if a value is a "strong" password.
 * (At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
 */
export const strongPassword: RuleLogic = (value) => {
  if (!value) return true;
  return strongPasswordRegex.test(String(value));
};
