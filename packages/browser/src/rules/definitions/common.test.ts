import { describe, it, expect } from 'vitest';
import { sameAs } from './index';

describe('Common Rules (Browser Adapter)', () => {
  describe('sameAs with DOM', () => {
    it('should return true if values match via form lookup', () => {
      const form = document.createElement('form');
      const otherInput = document.createElement('input');
      otherInput.name = 'other';
      otherInput.value = 'match';
      form.appendChild(otherInput);

      const field = document.createElement('input');
      form.appendChild(field); // field.form will be set

      expect(sameAs('match', ['other'], field)).toBe(true);
    });

    it('should return false if values do not match via form lookup', () => {
      const form = document.createElement('form');
      const otherInput = document.createElement('input');
      otherInput.name = 'other';
      otherInput.value = 'match';
      form.appendChild(otherInput);

      const field = document.createElement('input');
      form.appendChild(field);

      expect(sameAs('no-match', ['other'], field)).toBe(false);
    });

    it('should return false if field has no form', () => {
      const field = document.createElement('input');
      expect(sameAs('val', ['other'], field)).toBe(false);
    });

    it('should return false if other field is not found', () => {
      const form = document.createElement('form');
      const field = document.createElement('input');
      form.appendChild(field);
      expect(sameAs('val', ['nonexistent'], field)).toBe(false);
    });

    it('should return false if element is null', () => {
      expect(sameAs('val', ['other'], null)).toBe(false);
    });
  });
});
