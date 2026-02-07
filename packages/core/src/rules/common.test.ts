import { describe, it, expect } from 'vitest';
import {
  required,
  email,
  minLength,
  maxLength,
  exactLength,
  sameAs,
} from './index';

describe('Common Rules (Core Logic)', () => {
  describe('required', () => {
    it('should return false for null or undefined', () => {
      expect(required(null)).toBe(false);
      expect(required(undefined)).toBe(false);
    });

    it('should return false for empty strings', () => {
      expect(required('')).toBe(false);
      expect(required('   ')).toBe(false);
    });

    it('should return true for valid values', () => {
      expect(required('hello')).toBe(true);
      expect(required(0)).toBe(true);
      expect(required(false)).toBe(false);
      expect(required(true)).toBe(true);
    });
  });

  describe('email', () => {
    it('should return true for valid emails', () => {
      expect(email('test@example.com')).toBe(true);
      expect(email('user.name+tag@company.co.uk')).toBe(true);
      expect(email('')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(email('plainaddress')).toBe(false);
      expect(email('@missingusername.com')).toBe(false);
      expect(email('username@.com')).toBe(false);
      expect(email('username@com')).toBe(false);
    });
  });

  describe('minLength', () => {
    it('should return true if length is greater than or equal to min', () => {
      expect(minLength('abc', ['3'])).toBe(true);
      expect(minLength('abcd', ['3'])).toBe(true);
      expect(minLength('', ['3'])).toBe(true);
    });

    it('should return false if length is less than min', () => {
      expect(minLength('ab', ['3'])).toBe(false);
    });
  });

  describe('maxLength', () => {
    it('should return true if length is less than or equal to max', () => {
      expect(maxLength('abc', ['3'])).toBe(true);
      expect(maxLength('ab', ['3'])).toBe(true);
    });

    it('should return false if length is greater than max', () => {
      expect(maxLength('abcd', ['3'])).toBe(false);
    });

    it('should return true for empty value', () => {
      expect(maxLength('', ['3'])).toBe(true);
    });
  });

  describe('exactLength', () => {
    it('should return true if length is exactly param', () => {
      expect(exactLength('abc', ['3'])).toBe(true);
    });

    it('should return false if length is not exactly param', () => {
      expect(exactLength('ab', ['3'])).toBe(false);
      expect(exactLength('abcd', ['3'])).toBe(false);
    });
  });

  describe('sameAs (Logic)', () => {
    it('should return true if values match directly', () => {
      expect(sameAs('match', ['match'])).toBe(true);
    });

    it('should return false if values do not match', () => {
      expect(sameAs('no-match', ['match'])).toBe(false);
    });

    it('should handle missing parameter', () => {
      expect(sameAs('val', [])).toBe(false);
    });
  });
});
