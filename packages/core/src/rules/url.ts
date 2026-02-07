import { RuleLogic } from '../types';

const urlRegex = /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

/**
 * Checks if a value is a valid URL.
 */
export const url: RuleLogic = (value) => {
  if (!value) return true;
  return urlRegex.test(String(value));
};
