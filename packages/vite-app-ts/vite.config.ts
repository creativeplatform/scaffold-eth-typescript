import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import macrosPlugin from 'vite-plugin-babel-macros';
import tsconfigPaths from 'vite-tsconfig-paths';
import path, { resolve } from 'path';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import request from 'request/lib/helpers';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [nodePolyfills(), reactRefresh(), macrosPlugin(), tsconfigPaths()],
  build: {
    sourcemap: true,
  },
  esbuild: {
    jsxFactory: 'jsx',
    jsxInject: `import {jsx, css} from '@emotion/react'`,
  },
  define: {
    process: {},
    'process.platform': JSON.stringify('win32'),
    'process.env': {},
  },
  optimizeDeps: {
    exclude: ['@apollo/client', `..\\..\\node_modules\\@apollo\\client\\utilities\\globals\\graphql`],
  },
  resolve: {
    alias: {
      '~~': resolve(__dirname, 'src'),
      /** browserify for web3 components */
      stream: 'stream-browserify',
      http: 'http-browserify',
      https: 'http-browserify',
      timers: 'timers-browserify',
      process: 'process',
    },
  },
});
