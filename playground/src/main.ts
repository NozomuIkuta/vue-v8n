import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createV8n } from 'vue-v8n'
import { router } from './router'

const v8n = createV8n({})

createApp(App)
  .use(v8n)
  .use(router)
  .mount('#app')
