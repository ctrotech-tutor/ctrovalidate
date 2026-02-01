// src/utils/RuleParser.test.js

import { describe, it, expect } from 'vitest';
import { parseRules } from './RuleParser';

describe('RuleParser', () => {
  it('should parse a simple rule with no parameters', () => {
    const rulesString = 'required';
    const expected = [{ name: 'required', params: [] }];
    expect(parseRules(rulesString)).toEqual(expected);
  });

  it('should parse a rule with a single parameter', () => {
    const rulesString = 'minLength:8';
    const expected = [{ name: 'minLength', params: ['8'] }];
    expect(parseRules(rulesString)).toEqual(expected);
  });

  it('should parse a rule with multiple comma-separated parameters', () => {
    const rulesString = 'between:10,20';
    const expected = [{ name: 'between', params: ['10', '20'] }];
    expect(parseRules(rulesString)).toEqual(expected);
  });

  it('should parse a complex string with multiple rules', () => {
    const rulesString = 'required|between:5,10|email';
    const expected = [
      { name: 'required', params: [] },
      { name: 'between', params: ['5', '10'] },
      { name: 'email', params: [] },
    ];
    expect(parseRules(rulesString)).toEqual(expected);
  });

  it('should handle extra whitespace around rules, parameters, and pipes', () => {
    const rulesString = '  required  |  maxLength: 50  | between: 1, 2 ';
    const expected = [
      { name: 'required', params: [] },
      { name: 'maxLength', params: ['50'] },
      { name: 'between', params: ['1', '2'] },
    ];
    expect(parseRules(rulesString)).toEqual(expected);
  });

  it('should handle empty parts from double pipes', () => {
    const rulesString = 'required||email';
    const expected = [
      { name: 'required', params: [] },
      { name: 'email', params: [] },
    ];
    expect(parseRules(rulesString)).toEqual(expected);
  });

  it('should return an empty array for null, undefined, or empty string input', () => {
    expect(parseRules(null)).toEqual([]);
    expect(parseRules(undefined)).toEqual([]);
    expect(parseRules('')).toEqual([]);
  });

  it('should handle a rule with a colon but no parameter value', () => {
    const rulesString = 'minLength:';
    const expected = [{ name: 'minLength', params: [''] }];
    expect(parseRules(rulesString)).toEqual(expected);
  });
});
