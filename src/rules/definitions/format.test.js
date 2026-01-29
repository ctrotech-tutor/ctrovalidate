import { describe, it, expect } from 'vitest';
import { alpha } from './alpha';
import { alphaNum } from './alphaNum';
import { alphaDash } from './alphaDash';
import { ipAddress } from './ipAddress';
import { json } from './json';
import { url } from './url';

describe('Format Rules', () => {
  describe('alpha', () => {
    it('should allow only letters', () => {
      expect(alpha('abc')).toBe(true);
      expect(alpha('123')).toBe(false);
      expect(alpha('a b')).toBe(false);
    });
  });

  describe('alphaNum', () => {
    it('should allow letters and numbers', () => {
      expect(alphaNum('abc123')).toBe(true);
      expect(alphaNum('abc-123')).toBe(false);
    });
  });

  describe('alphaDash', () => {
    it('should allow letters, numbers, dashes and underscores', () => {
      expect(alphaDash('a-b_1')).toBe(true);
      expect(alphaDash('a b')).toBe(false);
    });
  });

  describe('json', () => {
    it('should return true for valid json', () => {
      expect(json('{"a":1}')).toBe(true);
      expect(json('123')).toBe(true); // technically valid JSON
    });

    it('should return false for invalid json', () => {
      expect(json('{a:1}')).toBe(false); // keys must be quoted
    });
  });

  describe('ipAddress', () => {
    it('should validate IPv4', () => {
      expect(ipAddress('192.168.1.1')).toBe(true);
      expect(ipAddress('255.255.255.255')).toBe(true);
    });
    it('should fail invalid IP', () => {
      expect(ipAddress('256.256.256.256')).toBe(false);
      expect(ipAddress('abc')).toBe(false);
    });
  });

  describe('url', () => {
    it('should validate URL', () => {
      expect(url('https://google.com')).toBe(true);
    });
    it('should fail invalid URL', () => {
      expect(url('google.com')).toBe(false); // needs protocol usually with new URL()
    });
  });
});
