import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { createContext, Script } from 'node:vm'

import { HtmlRspackPlugin } from '@rspack/core'
import { transform } from '@swc/core'
import { renderToStaticMarkup } from 'react-dom/server'

const filePath = resolve(import.meta.dirname, 'app/layout.jsx')
const require = createRequire(filePath)
const faviconPath = resolve(import.meta.dirname, 'app/favicon.svg')

/** @type {import('@rspack/core').RspackPluginInstance} */
const JsxRspackPlugin = {
  apply(compiler) {
    compiler.hooks.compilation.tap('JsxRspackPlugin', compilation => {
      const hooks = HtmlRspackPlugin.getCompilationHooks(compilation)
      const { RawSource } = compiler.rspack.sources

      hooks.afterTemplateExecution.tapPromise('JsxRspackPlugin', async data => {
        const sandbox = { require, exports: {} }

        const [contents, faviconBuffer] = await Promise.all([
          readFile(filePath, 'utf-8'),
          readFile(faviconPath)
        ])

        const { code } = await transform(contents, {
          jsc: {
            parser: { jsx: true },
            transform: { react: { runtime: 'automatic' } }
          },
          module: { type: 'commonjs' }
        })

        const script = new Script(code)
        const favicon = new RawSource(faviconBuffer, false)
        const { name: font } = compilation
          .getAssets()
          .find(({ name }) => name.endsWith('.woff2'))

        createContext(sandbox)
        script.runInContext(sandbox)

        data.html = renderToStaticMarkup(sandbox.exports.default({ font }))

        compilation.emitAsset('favicon.svg', favicon)
      })
    })
  }
}

export default JsxRspackPlugin
