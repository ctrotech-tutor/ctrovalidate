import { describe, it, expect } from 'vitest';
import { useCtrovalidate } from './useCtrovalidate';

describe('useCtrovalidate (Vue)', () => {
  it('should be exported correctly', () => {
    expect(useCtrovalidate).toBeDefined();
    expect(typeof useCtrovalidate).toBe('function');
  });
});
