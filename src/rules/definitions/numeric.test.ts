import { describe, it, expect, vi } from 'vitest';
import { min } from './min';
import { max } from './max';
import { between } from './between';
import { numeric } from './numeric';
import { integer } from './integer';
import { decimal } from './decimal';

describe('Number Rules', () => {
  describe('numeric', () => {
    it('should return true for valid numbers', () => {
      expect(numeric(123)).toBe(true);
      expect(numeric('123')).toBe(true);
      expect(numeric('-123.45')).toBe(true);
    });
    it('should return false for invalid numbers', () => {
      expect(numeric('abc')).toBe(false);
      expect(numeric('123a')).toBe(false);
    });

    it('should return true for empty value', () => {
      expect(numeric('')).toBe(true);
      expect(numeric(null)).toBe(true);
    });
  });

  describe('integer', () => {
    it('should return true for integers', () => {
      expect(integer(123)).toBe(true);
      expect(integer('-123')).toBe(true);
    });
    it('should return false for decimals', () => {
      expect(integer('123.45')).toBe(false);
    });

    it('should return true for empty value', () => {
      expect(integer('')).toBe(true);
      expect(integer(null)).toBe(true);
    });
  });

  describe('decimal', () => {
    it('should return true for decimals', () => {
      expect(decimal('0.5')).toBe(true);
      expect(decimal('-10.55')).toBe(true);
    });

    it('should return true for empty value', () => {
      expect(decimal('')).toBe(true);
      expect(decimal(null)).toBe(true);
    });
  });

  describe('min', () => {
    it('should return true if value is greater than or equal to min', () => {
      expect(min(10, ['5'])).toBe(true);
      expect(min(5, ['5'])).toBe(true);
      expect(min('10', ['5'])).toBe(true); // string coercion
    });

    it('should return false if value is less than min', () => {
      expect(min(4, ['5'])).toBe(false);
    });

    it('should handle missing param', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      expect(min(10, [])).toBe(false);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('max', () => {
    it('should return true if value is less than or equal to max', () => {
      expect(max(5, ['10'])).toBe(true);
      expect(max(10, ['10'])).toBe(true);
    });

    it('should return false if value is greater than max', () => {
      expect(max(11, ['10'])).toBe(false);
    });

    it('should handle missing param', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      expect(max(5, [])).toBe(false);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('between', () => {
    it('should return true if value is within range (inclusive)', () => {
      expect(between(5, ['1', '10'])).toBe(true);
      expect(between(1, ['1', '10'])).toBe(true);
      expect(between(10, ['1', '10'])).toBe(true);
    });

    it('should return false if value is out of range', () => {
      expect(between(0, ['1', '10'])).toBe(false);
      expect(between(11, ['1', '10'])).toBe(false);
    });

    it('should handle invalid params', () => {
      expect(between(5, ['a', 'b'])).toBe(false);
      expect(between(5, ['1'])).toBe(false);
    });

    it('should return true for empty value', () => {
      expect(between('', ['1', '10'])).toBe(true);
      expect(between(null, ['1', '10'])).toBe(true);
    });
  });
});
