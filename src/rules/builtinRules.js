// src/rules/builtinRules.js

/**
 * @file This file contains the core logic for all built-in validation rules.
 * Each function here is designed to be a pure, high-performance check that takes
 * a value and an optional parameter, returning a simple boolean. This separation
 * of logic makes the entire system clean and highly testable.
 */

/**
 * A helper function to get the value of another field by its name.
 * This is crucial for rules like 'sameAs'.
 * @param {HTMLInputElement} field - The current field being validated.
 * @param {string} otherFieldName - The name of the other field to find.
 * @returns {string} The value of the other field.
 */
const getOtherFieldValue = (field, otherFieldName) => {
  if (!field.form) return '';
  const otherField = field.form.querySelector(`[name="${otherFieldName}"]`);
  return otherField ? otherField.value : '';
};

export const rules = {
  // --- General & Common Rules ---
  required: (value) => {
    if (value === null || value === undefined) return false;
    // For checkboxes, we need to check the 'checked' property, not the value.
    if (typeof value === 'boolean') return value;
    return String(value).trim() !== '';
  },
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)),
  minLength: (value, param) => String(value).length >= Number(param),
  maxLength: (value, param) => String(value).length <= Number(param),
  exactLength: (value, param) => String(value).length === Number(param),
  sameAs: (value, param, field) => value === getOtherFieldValue(field, param),

  // --- Type & Format Rules ---
  alpha: (value) => /^[a-zA-Z]+$/.test(String(value)),
  alphaNum: (value) => /^[a-zA-Z0-9]+$/.test(String(value)),
  alphaDash: (value) => /^[a-zA-Z0-9_-]+$/.test(String(value)),
  numeric: (value) => /^-?\d*\.?\d+$/.test(String(value)),
  integer: (value) => /^-?\d+$/.test(String(value)),
  decimal: (value) => /^-?\d*\.\d+$/.test(String(value)),
  url: (value) => {
    try {
      new URL(String(value));
      return true;
    } catch (_) {
      return false;
    }
  },
  phone: (value) => /^\+?(\d.*){3,}$/.test(String(value)), // A very generic check for phone-like numbers.

  // --- Number-based Rules ---
  min: (value, param) => Number(value) >= Number(param),
  max: (value, param) => Number(value) <= Number(param),
  between: (value, params) => {
    const [min, max] = params.split(',');
    const numValue = Number(value);
    return numValue >= Number(min) && numValue <= Number(max);
  },

  // --- Advanced & Specific Rules ---
  // Using the Luhn algorithm for a basic credit card number check.
  creditCard: (value) => {
    const s = String(value).replace(/\D/g, '');
    if (!/^\d{13,19}$/.test(s)) return false;
    let n = 0, c = 0, b = 0;
    for (let i = s.length - 1; i >= 0; i--) {
      c = parseInt(s.charAt(i), 10);
      b = (i % 2) === (s.length % 2) ? c * 2 : c;
      n += b > 9 ? b - 9 : b;
    }
    return (n % 10) === 0;
  },
  ipAddress: (value) => /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(String(value)),
  json: (value) => {
    try {
      JSON.parse(String(value));
      return true;
    } catch (_) {
      return false;
    }
  },
  
  // --- Placeholder for a custom rule we'll add later ---
  strongPassword: (value) => {
    // A common example: at least 8 chars, 1 number, 1 uppercase, 1 lowercase.
    return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(String(value));
  },
};


