/*
 * @Author: Hong.Zhang
 * @Date: 2023-03-23 11:01:06
 * @Description: 
 */
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-node-externals';
import typescript from "@rollup/plugin-typescript";
import cssnano from 'cssnano';
import strip from "@rollup/plugin-strip";

export default {
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