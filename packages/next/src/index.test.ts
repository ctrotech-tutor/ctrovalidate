import { describe, it, expect } from 'vitest';
import { validateAction, formDataToValues } from './index';

describe('Next.js Utilities', () => {
  it('should export validateAction', () => {
    expect(validateAction).toBeDefined();
    expect(typeof validateAction).toBe('function');
  });

  it('should export formDataToValues', () => {
    expect(formDataToValues).toBeDefined();
    expect(typeof formDataToValues).toBe('function');
  });
});
