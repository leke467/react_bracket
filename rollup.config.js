import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.tsx', // entry point of your library
  output: [
    {
      file: 'dist/index.js',
      format: 'esm', // ES module
      sourcemap: true,
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs', // CommonJS
      sourcemap: true,
    }
  ],
  external: ['react', 'react-dom'], // don't bundle peer deps
  plugins: [
    resolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
    typescript()
  ]
};
