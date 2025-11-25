// src/rules/definitions/url.js

/**
 * @file The logic for the `url` rule.
 */

/**
 * Checks if a value is a valid URL by attempting to construct a URL object from it.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - True if the value is a valid URL, false otherwise.
 */
export const url = (value) => {
  // An empty value is considered valid for format rules.
  if (!value) {
    return true;
  }
  try {
    // The URL constructor is the most robust way to validate a URL.
    // It will throw a TypeError if the URL is malformed.
    new URL(String(value));
    return true;
  } catch (_) {
    // The constructor threw an error, so the URL is invalid.
    return false;
  }
};
