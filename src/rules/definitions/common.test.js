import { describe, it, expect } from 'vitest';
import { required } from './required';
import { email } from './email';
import { minLength } from './minLength';
import { maxLength } from './maxLength';
import { exactLength } from './exactLength';

describe('Common Rules', () => {
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
      expect(required(false)).toBe(false); // Special case for checkboxes: checked=false is invalid
      expect(required(true)).toBe(true);
    });
  });

  describe('email', () => {
    it('should return true for valid emails', () => {
      expect(email('test@example.com')).toBe(true);
      expect(email('user.name+tag@company.co.uk')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(email('plainaddress')).toBe(false);
      expect(email('@missingusername.com')).toBe(false);
      expect(email('username@.com')).toBe(false);
      expect(email('username@com')).toBe(false); // Simple regex typically requires a dot
    });
  });

  describe('minLength', () => {
    it('should return true if length is greater than or equal to min', () => {
      expect(minLength('abc', ['3'])).toBe(true);
      expect(minLength('abcd', ['3'])).toBe(true);
    });

    it('should return false if length is less than min', () => {
      expect(minLength('ab', ['3'])).toBe(false);
    });

    it('should handle undefined param gracefully', () => {
      // Based on implementation, console.error is called and returns false
      expect(minLength('abc', [])).toBe(false);
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
});
