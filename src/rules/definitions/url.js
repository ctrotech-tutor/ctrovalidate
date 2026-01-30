// src/rules/definitions/url.js

/**
 * @file The logic for the `url` rule.
 */

/**
 * Checks if a value is a valid URL by attempting to use the native URL constructor.
 * @param {string} value - The value to check.
 * @returns {boolean} - True if the value is a valid URL, false otherwise.
 */
export const url = (value) => {
  // An empty value is considered valid for format rules.
  if (!value) {
    return true;
  }

  try {
    // THE FINAL FIX: This pattern is explicit and satisfies all linting rules.
    // We attempt the operation, and if it doesn't throw, we return true.
    const testUrl = new URL(String(value));
    // We can add a basic check to ensure it has a protocol, which is a good sanity check.
    return testUrl.protocol === 'http:' || testUrl.protocol === 'https:';
  } catch {
    // The constructor threw an error, so the URL is invalid.
    return false;
  }
};
