import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const projectRoot = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    lib: {
      entry: resolve(projectRoot, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName (format) {
        const ext = {
          'es': 'mjs',
          'cjs': 'cjs'
        }[format]

        return `vue-v8n${ext ? `.${ext}` : ''}`
      },
    },
    rollupOptions: {
      external: ['vue'],
    },
  },
  plugins: [
    dts({ rollupTypes: true })
  ]
})
