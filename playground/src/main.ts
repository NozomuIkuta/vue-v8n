import { createApp } from 'vue'
import App from './App.vue'
import { createV8n } from 'vue-v8n'

const v8n = createV8n()

createApp(App)
  .use(v8n)
  .mount('#app')
