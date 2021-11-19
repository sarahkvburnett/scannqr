const path = require('path');

import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import banner from 'rollup-plugin-banner';
import strip from '@rollup/plugin-strip';

const config = [
    {
        input: "src/demo/demo.js",
        output: [
            {
                name: "Scanner Demo",
                file: "demo/js/demo.js",
                format: "umd",
            },
        ],
        plugins: [
            // strip(),  // removes console.log
            commonjs({
                include: "node_modules/**",
            }),
            resolve(),
            babel({
                exclude: "node_modules/**",
                babelHelpers: "bundled",
            }),
            terser(), // minify javascript
            banner('Scanner Demo\nv<%= pkg.version %>\nby <%= pkg.author %>'),
        ],
    },
];

export default config;