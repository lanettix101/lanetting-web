import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const UNSUPPORTED_DECLARATIONS = [
  /-webkit-text-size-adjust:\s*100%;/g,
  /-moz-text-size-adjust:\s*100%;/g,
]

function stripUnsupportedCss(): Plugin {
  const strip = (code: string) => {
    let out = code
    for (const pattern of UNSUPPORTED_DECLARATIONS) out = out.replace(pattern, '')
    return out
  }

  return {
    name: 'strip-unsupported-css',
    enforce: 'post',
    transform(code, id) {
      if (id.split('?')[0].endsWith('.css')) return strip(code)
      return undefined
    },
    generateBundle(_options, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type !== 'asset' || !file.fileName.endsWith('.css')) continue
        const source = String(file.source)
        const next = strip(source)
        if (next === source) this.warn(`strip-unsupported-css: nada que borrar en ${file.fileName}`)
        file.source = next
      }
    },
  }
}

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/lanetting-web/' : '/',
  plugins: [react(), tailwindcss(), stripUnsupportedCss()],
})
