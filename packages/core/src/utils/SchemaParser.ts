import { RuleDefinition, SchemaRule } from '../types';
import { parseRules } from './RuleParser';

/**
 * Normalizes a SchemaRule (string, string[], or RuleDefinition[]) into a uniform RuleDefinition[].
 * This provides high flexibility for developers to define rules as they prefer.
 * Supports recursive expansion of aliases.
 *
 * @param rules - The rules to normalize.
 * @param aliases - Optional dictionary of rule aliases.
 * @param seen - Used internally to prevent infinite recursion.
 * @returns An array of normalized rule definitions.
 */
export function normalizeRules(
  rules: SchemaRule,
  aliases: Record<string, SchemaRule> = {},
  seen: Set<string> = new Set()
): RuleDefinition[] {
  if (!rules) return [];

  let rawRules: (string | RuleDefinition)[];

  if (typeof rules === 'string') {
    rawRules = parseRules(rules);
  } else if (Array.isArray(rules)) {
    rawRules = rules;
  } else {
    return [];
  }

  return rawRules.flatMap((rule) => {
    const name = typeof rule === 'string' ? rule.split(':')[0] : rule.name;

    // If it's an alias and we haven't seen it in this branch, expand it
    if (aliases[name] && !seen.has(name)) {
      const newSeen = new Set(seen);
      newSeen.add(name);
      return normalizeRules(aliases[name], aliases, newSeen);
    }

    // If it was a string that wasn't an alias, it might have been multiple rules (e.g. "req|min:3")
    if (typeof rule === 'string') {
      return parseRules(rule);
    }

    return [rule];
  });
}
