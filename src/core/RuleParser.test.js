// src/core/RuleParser.test.js

// We import the function we want to test.
import { parseRules } from './RuleParser.js';

// 'describe' creates a test suite, a container for a group of related tests.
// This helps organize our tests as the project grows.
describe('RuleParser', () => {

  // 'it' or 'test' defines an individual test case.
  // The description should clearly state what this specific test is verifying.
  it('should parse a single rule without parameters', () => {
    const rulesString = 'required';
    const result = parseRules(rulesString);

    // 'expect' is our assertion. We are stating what we expect the result to be.
    // 'toEqual' is a "matcher" that performs a deep equality check on objects and arrays.
    // We expect the result to be an array containing one object.
    expect(result).toEqual([{ name: 'required' }]);
  });

  it('should parse a single rule with a numeric parameter', () => {
    const rulesString = 'minLength:3';
    const result = parseRules(rulesString);
    expect(result).toEqual([{ name: 'minLength', param: '3' }]);
  });

  it('should parse a single rule with a string parameter', () => {
    const rulesString = 'sameAs:password';
    const result = parseRules(rulesString);
    expect(result).toEqual([{ name: 'sameAs', param: 'password' }]);
  });

  it('should parse multiple rules separated by a pipe', () => {
    const rulesString = 'required|email|maxLength:100';
    const result = parseRules(rulesString);
    expect(result).toEqual([
      { name: 'required' },
      { name: 'email' },
      { name: 'maxLength', param: '100' },
    ]);
  });

  it('should handle extra whitespace around rules and pipes', () => {
    const rulesString = '  required |  minLength:5  ';
    const result = parseRules(rulesString);
    expect(result).toEqual([
      { name: 'required' },
      { name: 'minLength', param: '5' },
    ]);
  });

  it('should handle rules with multiple parameters separated by a comma', () => {
    const rulesString = 'between:1,10';
    const result = parseRules(rulesString);
    expect(result).toEqual([{ name: 'between', param: '1,10' }]);
  });

  // These are "edge case" tests. They ensure our function is robust and doesn't crash.
  it('should return an empty array for a null or undefined input', () => {
    expect(parseRules(null)).toEqual([]);
    expect(parseRules(undefined)).toEqual([]);
  });

  it('should return an empty array for an empty string', () => {
    const rulesString = '';
    const result = parseRules(rulesString);
    expect(result).toEqual([]);
  });

  it('should ignore empty segments caused by extra pipe characters', () => {
    const rulesString = 'required||email';
    const result = parseRules(rulesString);
    expect(result).toEqual([
      { name: 'required' },
      { name: 'email' },
    ]);
  });

});
