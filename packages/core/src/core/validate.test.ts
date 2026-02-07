import { describe, it, expect } from 'vitest';
import { validate, validateValue } from './validate';

describe('Headless Validator', () => {
  describe('validateValue', () => {
    it('should pass if all rules pass', () => {
      const result = validateValue('test@example.com', 'required|email');
      expect(result.isValid).toBe(true);
    });

    it('should fail if any rule fails', () => {
      const result = validateValue('invalid-email', 'required|email');
      expect(result.isValid).toBe(false);
      expect(result.rule).toBe('email');
      expect(typeof result.error).toBe('string');
    });

    it('should return the first error found', () => {
      const result = validateValue('', 'required|email');
      expect(result.isValid).toBe(false);
      expect(result.rule).toBe('required');
    });

    it('should use custom messages from options', () => {
      const result = validateValue('', 'required', {
        messages: { required: 'SHUTDOWN_IMMEDIATE' },
      });
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('SHUTDOWN_IMMEDIATE');
    });

    it('should use catch-all custom message', () => {
      const result = validateValue('', 'required', {
        messages: { '*': 'SYSTEM_CRITICAL' },
      });
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('SYSTEM_CRITICAL');
    });
  });

  describe('validate (Object)', () => {
    it('should validate an entire object', () => {
      const data = {
        email: 'test@example.com',
        age: '25',
      };
      const schema = {
        email: 'required|email',
        age: 'required|numeric|min:18',
      };

      const result = validate(data, schema);
      expect(result.email.isValid).toBe(true);
      expect(result.age.isValid).toBe(true);
    });

    it('should report errors for specific fields', () => {
      const data = {
        email: 'invalid',
        age: '15',
      };
      const schema = {
        email: 'required|email',
        age: 'required|numeric|min:18',
      };

      const result = validate(data, schema);
      expect(result.email.isValid).toBe(false);
      expect(result.email.rule).toBe('email');
      expect(result.age.isValid).toBe(false);
      expect(result.age.rule).toBe('min');
    });
  });
});
