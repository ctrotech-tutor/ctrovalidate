import { RuleLogic } from '../types';

const alphaDashRegex = /^[a-zA-Z0-9-_]+$/;

/**
 * Checks if a value contains only alphanumeric characters, dashes, and underscores.
 */
export const alphaDash: RuleLogic = (value) => {
  if (!value) return true;
  return alphaDashRegex.test(String(value));
};
