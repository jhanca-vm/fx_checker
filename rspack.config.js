import { defineConfig } from '@rspack/cli'
import { HtmlRspackPlugin } from '@rspack/core'
import { ReactRefreshRspackPlugin } from '@rspack/plugin-react-refresh'

import JsxRspackPlugin from './jsx-rspack-plugin'

const isDev = process.env.NODE_ENV === 'development'

export default defineConfig({
  devServer: { watchFiles: ['app/layout.jsx', 'app/favicon.svg'] },
  entry: './app/main.jsx',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: {
          loader: 'builtin:swc-loader',
          /** @type {import('@rspack/core').SwcLoaderOptions} */
          options: {
            detectSyntax: 'auto',
            jsc: {
              transform: {
                react: {
                  development: isDev,
                  refresh: isDev,
                  runtime: 'automatic'
                },
                reactCompiler: true
              }
            }
          }
        }
      },
      {
        test: /\.css$/,
        use: {
          loader: 'postcss-loader',
          options: {
            postcssOptions: { plugins: { '@tailwindcss/postcss': {} } }
          }
        },
        type: 'css'
      },
      {
        issuer: /\.jsx$/,
        test: /\.svg$/,
        use: ['@svgr/webpack']
      }
    ]
  },
  plugins: [
    new HtmlRspackPlugin(),
    JsxRspackPlugin,
    isDev && new ReactRefreshRspackPlugin()
  ],
  resolve: { extensions: ['...', '.jsx'] }
})
