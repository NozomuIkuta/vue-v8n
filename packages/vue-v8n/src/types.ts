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
