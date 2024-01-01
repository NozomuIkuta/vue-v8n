export interface RuleDefinition {
  name: string
  run: (value: unknown, context: RuleContext) => V8nResult
}

export interface RuleContext {
  createResult: (errorMessage: string | null) => V8nResult
}

export type V8nResult = V8nResultSuccess | V8nResultFailure

export interface V8nResultSuccess {
  ok: true
  errorMessage: null
}

export interface V8nResultFailure {
  ok: false
  errorMessage: string
}

export interface UseV7dOptions {
  immediate: boolean
}

export interface VueV8nOptions {}

// --- THE CONTENT BELOW THIS LINE WILL BE APPENDED TO DTS FILE IN DIST DIRECTORY --- //
export interface VueV8n {
  options: VueV8nOptions
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    vueV8n: VueV8n
  }
}
