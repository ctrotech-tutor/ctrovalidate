import { describe, it, expect } from 'vitest';
import { normalizeRules } from './SchemaParser';

describe('SchemaParser', () => {
  it('should normalize strings', () => {
    const rules = 'required|min:5';
    const normalized = normalizeRules(rules);
    expect(normalized).toHaveLength(2);
    expect(normalized[0].name).toBe('required');
    expect(normalized[1].name).toBe('min');
    expect(normalized[1].params).toEqual(['5']);
  });

  it('should normalize arrays of strings', () => {
    const rules = ['required', 'email'];
    const normalized = normalizeRules(rules);
    expect(normalized).toHaveLength(2);
    expect(normalized[0].name).toBe('required');
    expect(normalized[1].name).toBe('email');
  });

  it('should normalize arrays of rule definitions', () => {
    const rules = [{ name: 'required', params: [] }];
    const normalized = normalizeRules(rules);
    expect(normalized).toHaveLength(1);
    expect(normalized[0].name).toBe('required');
  });

  it('should handle hybrid arrays (DX support)', () => {
    const rules = ['required', { name: 'custom', params: ['arg'] }];
    const normalized = normalizeRules(rules);
    expect(normalized).toHaveLength(2);
    expect(normalized[0].name).toBe('required');
    expect(normalized[1].name).toBe('custom');
  });

  it('should return empty array for null/undefined', () => {
    expect(normalizeRules(null as any)).toEqual([]);
    expect(normalizeRules(undefined as any)).toEqual([]);
  });
});
