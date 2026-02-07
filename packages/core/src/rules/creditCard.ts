import { RuleLogic } from '../types';

/**
 * Checks if a value is a valid credit card number using the Luhn algorithm.
 */
export const creditCard: RuleLogic = (value) => {
  if (!value) return true;

  const sanitized = String(value).replace(/[- ]/g, '');
  if (!/^\d+$/.test(sanitized)) return false;

  let sum = 0;
  const parity = sanitized.length % 2;

  for (let i = 0; i < sanitized.length; i++) {
    let digit = parseInt(sanitized[i], 10);
    if (i % 2 === parity) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }

  return sum % 10 === 0;
};
