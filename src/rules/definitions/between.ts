// src/rules/definitions/between.ts
import { RuleLogic } from '../../types/index';

/**
 * Checks if a numeric value falls between a specified min and max (inclusive).
 */
export const between: RuleLogic = (value, params = [], _element = null) => {
  if (value === null || value === undefined || value === '') {
    return true;
  }

  const [min, max] = params || [];
  const numValue = Number(value);

  if (
    min === undefined ||
    max === undefined ||
    isNaN(Number(min)) ||
    isNaN(Number(max))
  ) {
    console.error(
      `[Ctrovalidate] Invalid parameters for 'between' rule. Received:`,
      params
    );
    return false;
  }

  return numValue >= Number(min) && numValue <= Number(max);
};
