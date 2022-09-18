import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import json from '@rollup/plugin-json';
import css from 'rollup-plugin-import-css';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: './src/index.js',
    plugins: [nodeResolve(), commonjs(), nodePolyfills(), json(), css()],
    output: {
      file: './dist/adf2md.js',
      format: 'iife',
      strict: false,
      name: 'ADF2MD',
    },
  },
  {
    input: './src/index.js',
    plugins: [
      nodeResolve(),
      commonjs(),
      nodePolyfills(),
      json(),
      css({ minify: true }),
      terser(),
    ],
    output: {
      file: './dist/adf2md.min.js',
      format: 'iife',
      strict: false,
      name: 'ADF2MD',
    },
  },
];
