const path = require('path');

import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import banner from 'rollup-plugin-banner';
import strip from '@rollup/plugin-strip';

const config = [
    {
        input: "src/Scanner.js",
        output: [
            {
                file: "dist/Scanner.cjs.js",
                format: "cjs",
            },
            {
                file: "dist/Scanner.esm.js",
                format: "esm",
            },
            {
                name: "Scanner",
                file: "dist/Scanner.js",
                format: "umd",
            },
        ],
        plugins: [
            strip(),  // removes console.log
            commonjs({
                include: "node_modules/**",
            }),
            resolve(),
            babel({
                exclude: "node_modules/**",
                babelHelpers: "bundled",
            }),
            terser(), // minify javascript
            banner('Scanner\nv<%= pkg.version %>\nby <%= pkg.author %>'),
        ],
    },
];

export default config;
