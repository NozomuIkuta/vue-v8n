import type { RuleDefinition, RuleFactoryDefinition, V8nResult } from './types'

export function defineRule(ruleDef: RuleDefinition): RuleDefinition {
  return ruleDef
}

export function defineRuleFactory<T = Record<string, unknown>>(ruleFactoryDef: RuleFactoryDefinition<T>): (options: T) => RuleDefinition {
  const { name, create } = ruleFactoryDef

  return function (options: T) {
    return {
      name,
      run: create(options)
    }
  }
}

export function createResult(errorMessage: string | null): V8nResult {
  if (errorMessage) {
    return { ok: false, errorMessage }
  }

  return { ok: true, errorMessage: null }
}
