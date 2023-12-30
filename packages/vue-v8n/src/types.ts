export interface VueV8nOptions {}

// --- COPY TO DIST --- //
export interface VueV8n {
  options: VueV8nOptions
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    vueV8n: VueV8n
  }
}
