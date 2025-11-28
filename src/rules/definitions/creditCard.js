// src/rules/definitions/creditCard.js

/**
 * @file The logic for the `creditCard` rule using the Luhn algorithm.
 */

/**
 * Checks if a value is a valid credit card number according to the Luhn algorithm.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - True if the value is a valid credit card number format, false otherwise.
 */
export const creditCard = (value) => {
  // An empty value is considered valid for format rules.
  if (!value) {
    return true;
  }

  const s = String(value).replace(/\D/g, '');

  // Basic length check (13 to 19 digits)
  if (!/^\d{13,19}$/.test(s)) {
    return false;
  }

  // Luhn algorithm implementation
  let n = 0;
  let c = 0;
  let b = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    c = parseInt(s.charAt(i), 10);
    // Double every second digit from the right
    b = i % 2 === s.length % 2 ? c * 2 : c;
    // If doubling results in a two-digit number, add the digits
    n += b > 9 ? b - 9 : b;
  }

  return n % 10 === 0;
};
