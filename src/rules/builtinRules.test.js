// src/rules/builtinRules.test.js

// We import the 'rules' object that contains all our validation functions.
import { rules } from './builtinRules.js';

// We create a main test suite for all the built-in rules.
describe('builtinRules', () => {

  // --- Test for the 'required' rule ---
  describe('required', () => {
    it('should return true for strings with non-whitespace characters', () => {
      expect(rules.required('hello')).toBe(true);
      expect(rules.required(' a ')).toBe(true); // A string that is not empty after trimming.
    });

    it('should return false for empty, whitespace-only, null, or undefined inputs', () => {
      expect(rules.required('')).toBe(false);
      expect(rules.required('   ')).toBe(false); // Correctly testing for whitespace-only strings.
      expect(rules.required(null)).toBe(false);
      expect(rules.required(undefined)).toBe(false);
    });

    it('should return the boolean value for boolean inputs', () => {
      expect(rules.required(true)).toBe(true);
      expect(rules.required(false)).toBe(false);
    });
  });

  // --- Test for the 'email' rule ---
  describe('email', () => {
    it('should return true for valid email addresses', () => {
      expect(rules.email('test@example.com')).toBe(true);
      expect(rules.email('user.name+tag@example.co.uk')).toBe(true);
    });

    it('should return false for invalid email addresses', () => {
      expect(rules.email('test@example')).toBe(false);
      expect(rules.email('test.example.com')).toBe(false);
      expect(rules.email('@example.com')).toBe(false);
    });
  });

  // --- Test for the 'minLength' rule ---
  describe('minLength', () => {
    it('should return true if string length is equal to or greater than the parameter', () => {
      expect(rules.minLength('hello', '5')).toBe(true);
      expect(rules.minLength('world!', '5')).toBe(true);
    });

    it('should return false if string length is less than the parameter', () => {
      expect(rules.minLength('hi', '3')).toBe(false);
    });
  });

  // --- Test for the 'maxLength' rule ---
  describe('maxLength', () => {
    it('should return true if string length is equal to or less than the parameter', () => {
      expect(rules.maxLength('short', '5')).toBe(true);
      expect(rules.maxLength('tiny', '5')).toBe(true);
    });

    it('should return false if string length is greater than the parameter', () => {
      expect(rules.maxLength('toolong', '5')).toBe(false);
    });
  });

  // --- Test for the 'numeric' rule ---
  describe('numeric', () => {
    it('should return true for integers, decimals, and negative numbers', () => {
      expect(rules.numeric('123')).toBe(true);
      expect(rules.numeric('123.45')).toBe(true);
      expect(rules.numeric('-50')).toBe(true);
    });

    it('should return false for non-numeric strings', () => {
      expect(rules.numeric('abc')).toBe(false);
      expect(rules.numeric('12a')).toBe(false);
    });
  });

  // --- Test for the 'alpha' rule ---
  describe('alpha', () => {
    it('should return true for strings containing only letters', () => {
      expect(rules.alpha('HelloWorld')).toBe(true);
    });

    it('should return false for strings containing numbers or symbols', () => {
      expect(rules.alpha('Hello World')).toBe(false); // space is not alpha
      expect(rules.alpha('Hello123')).toBe(false);
    });
  });

  // --- Test for the 'between' rule ---
  describe('between', () => {
    it('should return true if the number is within the specified range (inclusive)', () => {
      expect(rules.between('5', '1,10')).toBe(true);
      expect(rules.between('1', '1,10')).toBe(true);
      expect(rules.between('10', '1,10')).toBe(true);
    });

    it('should return false if the number is outside the specified range', () => {
      expect(rules.between('0', '1,10')).toBe(false);
      expect(rules.between('11', '1,10')).toBe(false);
    });
  });

});
