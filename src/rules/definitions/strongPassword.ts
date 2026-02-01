// src/rules/definitions/strongPassword.ts
import { RuleLogic } from '../../types/index';

const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Checks if a value is a "strong" password.
 */
export const strongPassword: RuleLogic = (
  value,
  _params = [],
  _element = null
) => {
  if (!value) return true;
  return strongPasswordRegex.test(String(value));
};
