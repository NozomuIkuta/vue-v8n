import { dirname, resolve } from 'node:path'
import { appendFile, readFile } from 'node:fs/promises'
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
      }
    },
    rollupOptions: {
      external: ['vue']
    }
  },
  plugins: [
    dts({
      rollupTypes: true,
      async afterBuild() {
        const marker = '// --- THE CONTENT BELOW THIS LINE WILL BE APPENDED TO DTS FILE IN DIST DIRECTORY --- //'
        const content = await readFile(resolve(projectRoot, 'src/types.ts'), 'utf8')
        const data = content.slice(content.indexOf(marker) + marker.length)
        await appendFile(resolve(projectRoot, 'dist/vue-v8n.d.ts'), data)
      }
    })
  ]
})
