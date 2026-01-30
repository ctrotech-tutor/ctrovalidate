import { describe, it, expect } from 'vitest';
import { defaultMessages as enMessages } from '../localization/en.js';
import { rules } from './index.js';
import { defaultMessages as rulesMessages } from './messages.js';

describe('Aggregators and Localization', () => {
  describe('English Localization', () => {
    it('should export defaultMessages matching the rules', () => {
      expect(enMessages).toBeDefined();
      expect(enMessages.required).toBe('This field is required.');
      expect(enMessages.phone).toBeDefined();
    });
  });

  describe('Rules Index', () => {
    it('should export all expected rules', () => {
      expect(rules).toBeDefined();
      expect(rules.required).toBeDefined();
      expect(rules.email).toBeDefined();
      expect(rules.strongPassword).toBeDefined();
      expect(rules.creditCard).toBeDefined();
    });
  });

  describe('Legacy/Rule Messages', () => {
    it('should export defaultMessages from rules/messages.js', () => {
      expect(rulesMessages).toBeDefined();
      expect(rulesMessages.required).toBeDefined();
      expect(rulesMessages.between).toContain('{param1}');
    });
  });
});
