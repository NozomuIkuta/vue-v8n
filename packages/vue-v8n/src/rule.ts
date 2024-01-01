import type { RuleDefinition, V8nResult } from './types'

export function defineRule(ruleDef: RuleDefinition): RuleDefinition {
  return ruleDef
}

export function createResult(errorMessage: string | null): V8nResult {
  if (errorMessage) {
    return { ok: false, errorMessage }
  }

  return { ok: true, errorMessage: null }
}
