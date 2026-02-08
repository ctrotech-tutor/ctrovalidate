import { describe, it, expect } from 'vitest';
import { useCtrovalidate } from './index';

describe('useCtrovalidate (Svelte)', () => {
  it('should be exported correctly', () => {
    expect(useCtrovalidate).toBeDefined();
    expect(typeof useCtrovalidate).toBe('function');
  });
});
