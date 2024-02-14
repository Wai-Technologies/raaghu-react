import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import million from "million/compiler";

const packageJson = require("./package.json");

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: false,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: false,
                exports: "named",
            },
        ],
        plugins: [
            million.rollup({
                auto: {
                  threshold: 0.05,
                  skip: ["useBadHook", /badVariable/g],
                },
              }),
            resolve({ preferBuiltins: true, mainFields: ["browser"] }),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json", sourceMap: false }),
            postcss({
                plugins: [],
                minimize: true
            }),
            peerDepsExternal(),
            terser()

        ]
    }
];