import type { ObjectPlugin } from 'vue'
import type { VueV8nOptions } from './types'

export function createV8n (options: VueV8nOptions = {}): ObjectPlugin {
  return {
    install(app) {
        app.config.globalProperties.vueV8n = {
          options
        }
    }
  }
}
