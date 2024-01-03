export interface RuleDefinition {
  name: string
  run: RuleFunction
}

export interface RuleFactoryDefinition<T = Record<string, unknown>> {
  name: string
  create: (options: T) => RuleFunction
}

type RuleFunction = (value: unknown, context: RuleContext) => string | undefined

export interface RuleContext {}

export interface UseV7dOptions {
  immediate?: boolean
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
