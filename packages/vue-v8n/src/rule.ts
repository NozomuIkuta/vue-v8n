import type { RuleDefinition, RuleFactoryDefinition } from './types'

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
