const path = require('path');

import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import banner from 'rollup-plugin-banner';
import typescript from '@rollup/plugin-typescript';

const config = [
    {
        input: "src/index.js",
        output: [
            {
                file: "dist/scannqr.cjs.js",
                format: "cjs",
            },
            {
                file: "dist/scannqr.esm.js",
                format: "esm",
            },
            {
                name: "Scannqr",
                file: "dist/scannqr.js",
                format: "umd",
            },
        ],
        plugins: [
            typescript(),
            commonjs({
                include: "node_modules/**",
            }),
            resolve(),
            babel({
                exclude: "node_modules/**",
                babelHelpers: "bundled",
            }),
            terser(), // minify javascript
            banner('Scannqr\nv<%= pkg.version %>\nby <%= pkg.author %>')
        ],
    },
];

export default config;
