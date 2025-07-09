import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import { babel } from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import million from "million/compiler";
import { readFileSync } from "fs";
const packageJson = JSON.parse(readFileSync("./package.json", "utf8"));

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
              babel({
                exclude: ["node_modules/**"],
                presets: ["@babel/preset-typescript"],
                babelHelpers: "runtime"
            }),
            resolve({ preferBuiltins: true, mainFields: ["browser"] }),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json", sourceMap: false }),
            postcss({
                plugins: [],
                minimize: true
            }),
            external(),
            terser()

        ]
    },
    {
        input: "dist/esm/src/index.d.ts",
        output: [{ file: "dist/types/index.d.ts", format: "esm" }],
        plugins: [dts()],

        // NEW
        external: [/\.css$/, /\.scss$/],
    },
];