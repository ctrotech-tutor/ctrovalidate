import { RuleLogic, AsyncRuleLogic, SchemaRule } from '../types/index';
import * as syncRules from './definitions/index';

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
 * A mapping of all rule aliases (macros).
 */
export const aliases: Record<string, SchemaRule> = {};

/**
 * Registry for all available rules, messages, and aliases.
 */
export const rulesRegistry = {
  rules,
  asyncRules,
  aliases,
};
