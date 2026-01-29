// src/rules/definitions/sameAs.js

/**
 * @file The logic for the `sameAs` rule.
 */

/**
 * A helper function to get the value of another field within the same form.
 * @param {HTMLInputElement} field - The current field being validated.
 * @param {string} otherFieldName - The name of the other field to find.
 * @returns {string} The value of the other field, or an empty string if not found.
 */
const getOtherFieldValue = (field, otherFieldName) => {
  if (!field.form) {
    return '';
  }
  const otherField = /** @type {HTMLInputElement | null} */ (
    field.form.querySelector(`[name="${otherFieldName}"]`)
  );
  return otherField ? otherField.value : '';
};

/**
 * Checks if a value is the same as the value of another field.
 *
 * @param {any} value - The value of the current field.
 * @param {Array<string>} params - An array containing the `name` attribute of the other field (e.g., ["password"]).
 * @param {HTMLInputElement} field - The field element being validated.
 * @returns {boolean} - True if the values are identical, false otherwise.
 */
export const sameAs = (value, params, field) => {
  const otherFieldName = params[0];

  if (otherFieldName === undefined) {
    console.error(`[Ctrovalidate] Missing parameter for 'sameAs' rule.`);
    return false;
  }

  return value === getOtherFieldValue(field, otherFieldName);
};
