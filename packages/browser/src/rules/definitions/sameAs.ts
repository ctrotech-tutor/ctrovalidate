import { RuleLogic } from '../../types/index';
import { sameAs as coreSameAs } from '@ctrovalidate/core';

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
 * Adapter: Resolves DOM dependency, then calls Core rule.
 */
export const sameAs: RuleLogic = (value, params = [], element = null) => {
  const otherFieldName = String(params[0] || '');

  if (otherFieldName === undefined) {
    console.error(`[Ctrovalidate] Missing parameter for 'sameAs' rule.`);
    return false;
  }

  if (!element) return false;

  // Resolve the actual value from the other field
  const otherValue = getOtherFieldValue(element, otherFieldName);

  // Call core rule with the resolved value
  return coreSameAs(value, [otherValue], element);
};
