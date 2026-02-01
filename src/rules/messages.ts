// src/rules/messages.ts

import { defaultMessages } from '../localization/en';

export { defaultMessages };

/**
 * A central registry for all validation error messages.
 */
export const messages: Record<string, string> = {
  ...defaultMessages,
};

/**
 * Adds or updates a set of custom messages.
 */
export function addMessages(customMessages: Record<string, string>): void {
  Object.assign(messages, customMessages);
}
