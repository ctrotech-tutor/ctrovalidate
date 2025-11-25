// src/rules/definitions/ipAddress.js

/**
 * @file The logic for the `ipAddress` rule.
 */

// Regex for validating a standard IPv4 address.
const ipAddressRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

/**
 * Checks if a value is a valid IPv4 address.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - True if the value is a valid IPv4 address, false otherwise.
 */
export const ipAddress = (value) => {
  // An empty value is considered valid for format rules.
  if (!value) {
    return true;
  }
  return ipAddressRegex.test(String(value));
};
