// src/rules/definitions/sameAs.ts
import { RuleLogic } from '../../types/index';

/**
 * A helper function to get the value of another field within the same form.
 */
const getOtherFieldValue = (
  field: HTMLElement,
  otherFieldName: string
): string => {
  const input = field as HTMLInputElement;
  if (!input.form) {
    return '';
  }
  const otherField = input.form.querySelector(
    `[name="${otherFieldName}"]`
  ) as HTMLInputElement | null;
  return otherField ? otherField.value : '';
};

/**
 * Checks if a value is the same as the value of another field.
 */
export const sameAs: RuleLogic = (value, params = [], element = null) => {
  const otherFieldName = params[0];

  if (otherFieldName === undefined) {
    console.error(`[Ctrovalidate] Missing parameter for 'sameAs' rule.`);
    return false;
  }

  if (!element) return false;
  return value === getOtherFieldValue(element, otherFieldName);
};
