import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin'
import { defineConfig } from '@rspack/cli'
import { CopyRspackPlugin, HtmlRspackPlugin } from '@rspack/core'
import { ReactRefreshRspackPlugin } from '@rspack/plugin-react-refresh'

import JsxRspackPlugin from './jsx-rspack-plugin'

const isDev = process.env.NODE_ENV === 'development'

export default defineConfig({
  devServer: { watchFiles: 'app/layout.jsx' },
  entry: './app/main.jsx',
  module: {
    rules: [
      {
        resolve: { fullySpecified: false },
        test: /\.(?:js|jsx)$/,
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
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        reactDom: { test: /[\\/]node_modules[\\/]react-dom[\\/]/ },
        recharts: { test: /[\\/]node_modules[\\/]recharts[\\/]/ }
      }
    }
  },
  plugins: [
    new HtmlRspackPlugin(),
    JsxRspackPlugin,
    isDev && new ReactRefreshRspackPlugin(),
    new CopyRspackPlugin({ patterns: [{ from: 'public' }] }),
    process.env.RSDOCTOR && new RsdoctorRspackPlugin()
  ].filter(Boolean),
  resolve: { extensions: ['...', '.jsx'] }
})
