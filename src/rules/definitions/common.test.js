import { describe, it, expect, vi } from 'vitest';
import { required } from './required';
import { email } from './email';
import { minLength } from './minLength';
import { maxLength } from './maxLength';
import { exactLength } from './exactLength';
import { sameAs } from './sameAs';

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

    it('should handle missing param', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      expect(maxLength('abcd', [])).toBe(false);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
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

    it('should handle missing param', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      expect(exactLength('abc', [])).toBe(false);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('sameAs', () => {
    it('should return true if values match', () => {
      const form = document.createElement('form');
      const otherInput = document.createElement('input');
      otherInput.name = 'other';
      otherInput.value = 'match';
      form.appendChild(otherInput);

      const field = document.createElement('input');
      form.appendChild(field); // field.form will be set

      expect(sameAs('match', ['other'], field)).toBe(true);
    });

    it('should return false if values do not match', () => {
      const form = document.createElement('form');
      const otherInput = document.createElement('input');
      otherInput.name = 'other';
      otherInput.value = 'match';
      form.appendChild(otherInput);

      const field = document.createElement('input');
      form.appendChild(field);

      expect(sameAs('no-match', ['other'], field)).toBe(false);
    });

    it('should return empty string if field has no form', () => {
      const field = document.createElement('input');
      expect(sameAs('val', ['other'], field)).toBe(false);
    });

    it('should handle missing parameter', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      expect(sameAs('val', [], {})).toBe(false);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
