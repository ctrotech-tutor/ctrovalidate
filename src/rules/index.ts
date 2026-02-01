// src/rules/index.ts

import { RuleLogic, AsyncRuleLogic } from '../types/index';
import * as syncRules from './definitions/index';
// Async rules would be imported here if they existed as separate files

/**
 * A mapping of all synchronous validation rules.
 */
export const rules: Record<string, RuleLogic> = {
  ...syncRules,
};

/**
 * A mapping of all asynchronous validation rules.
 */
export const asyncRules: Record<string, AsyncRuleLogic> = {};

/**
 * Registry for all available rules and messages.
 */
export const rulesRegistry = {
  rules,
  asyncRules,
};
