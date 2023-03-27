/*
 * @Author: Hong.Zhang
 * @Date: 2023-03-23 11:01:06
 * @Description: 
 */
const postcss = require('rollup-plugin-postcss');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const external = require('rollup-plugin-node-externals');
const typescript = require("@rollup/plugin-typescript");
const cssnano = require('cssnano');
const strip = require("@rollup/plugin-strip");

module.exports = {
  input: 'src/index.tsx',
  output: [{
    dir: 'es',
    format: 'es',
    exports: 'named',
    preserveModules: true,
    preserveModulesRoot: 'src',
  }],
  plugins: [
    resolve(),
    commonjs(),
    external({
      devDeps: false,
    }),
    postcss({
      plugins: [cssnano()],
    }),
    typescript({
      outDir: "es",
      declaration: true,
    }),
    strip(),
  ]
};