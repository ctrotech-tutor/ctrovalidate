import { describe, it, expect } from 'vitest';
import { alpha } from './alpha';
import { alphaNum } from './alphaNum';
import { alphaDash } from './alphaDash';
import { ipAddress } from './ipAddress';
import { json } from './json';
import { url } from './url';
import { creditCard } from './creditCard';
import { phone } from './phone';
import { strongPassword } from './strongPassword';

describe('Format Rules', () => {
  describe('alpha', () => {
    it('should allow only letters', () => {
      expect(alpha('abc')).toBe(true);
      expect(alpha('123')).toBe(false);
      expect(alpha('a b')).toBe(false);
    });

    it('should return true for empty value', () => {
      expect(alpha('')).toBe(true);
      expect(alpha(null)).toBe(true);
    });
  });

  describe('alphaNum', () => {
    it('should allow letters and numbers', () => {
      expect(alphaNum('abc123')).toBe(true);
      expect(alphaNum('abc-123')).toBe(false);
    });

    it('should return true for empty value', () => {
      expect(alphaNum('')).toBe(true);
      expect(alphaNum(null)).toBe(true);
    });
  });

  describe('alphaDash', () => {
    it('should allow letters, numbers, dashes and underscores', () => {
      expect(alphaDash('a-b_1')).toBe(true);
      expect(alphaDash('a b')).toBe(false);
    });

    it('should return true for empty value', () => {
      expect(alphaDash('')).toBe(true);
      expect(alphaDash(null)).toBe(true);
    });
  });

  describe('json', () => {
    it('should return true for valid json object or array', () => {
      expect(json('{"a":1}')).toBe(true);
      expect(json('123')).toBe(false); // Primitive values are valid JSON but not typically what we want in form inputs
    });

    it('should return false for invalid json', () => {
      expect(json('{a:1}')).toBe(false); // keys must be quoted
    });

    it('should return true for empty value', () => {
      expect(json('')).toBe(true);
      expect(json(null)).toBe(true);
      expect(json(undefined)).toBe(true);
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

    it('should return true for empty value', () => {
      expect(ipAddress('')).toBe(true);
      expect(ipAddress(null)).toBe(true);
      expect(ipAddress(undefined)).toBe(true);
    });
  });

  describe('url', () => {
    it('should validate URL', () => {
      expect(url('https://google.com')).toBe(true);
    });
    it('should fail invalid URL', () => {
      expect(url('google.com')).toBe(false); // needs protocol usually with new URL()
    });

    it('should return true for empty value', () => {
      expect(url('')).toBe(true);
      expect(url(null)).toBe(true);
      expect(url(undefined)).toBe(true);
    });
  });

  describe('creditCard', () => {
    it('should validate credit card', () => {
      expect(creditCard('4242424242424242')).toBe(true);
      expect(creditCard('123')).toBe(false);
    });

    it('should return true for empty value', () => {
      expect(creditCard('')).toBe(true);
      expect(creditCard(null)).toBe(true);
      expect(creditCard(undefined)).toBe(true);
    });
  });

  describe('phone', () => {
    it('should validate phone', () => {
      expect(phone('+123456789')).toBe(true);
      expect(phone('09041622945')).toBe(true); // Local
      expect(phone('+2349041622945')).toBe(true); // E.164
      expect(phone('12')).toBe(false);
      expect(phone('123abc')).toBe(false);
    });

    it('should return true for empty value', () => {
      expect(phone('')).toBe(true);
      expect(phone(null)).toBe(true);
      expect(phone(undefined)).toBe(true);
    });
  });

  describe('strongPassword', () => {
    it('should validate strong password', () => {
      expect(strongPassword('Password123!')).toBe(true);
      expect(strongPassword('weak')).toBe(false);
    });

    it('should return true for empty value', () => {
      expect(strongPassword('')).toBe(true);
      expect(strongPassword(null)).toBe(true);
      expect(strongPassword(undefined)).toBe(true);
    });
  });
});
