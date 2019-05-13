import { uglify } from "rollup-plugin-uglify";
import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
    input: 'src/index.ts',
    plugins: [
        typescript(),
        resolve(),
        babel({
          exclude: 'node_modules/**' // only transpile our source code
        }),
        uglify()
    ],
    output: {
        name: 'vueDebounce',
        file: 'dist/vue-debounce.min.js',
        format: 'umd'
    }
}