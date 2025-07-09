module.exports = {
    preset: "ts-jest",
    globals: {
        "ts-jest": {
            babelConfig: {
                presets: [
                    ["@babel/preset-env", { targets: { node: "current" } }], 
                    "@babel/preset-react", 
                    "@babel/preset-typescript"
                ],
                plugins: [
                    "@babel/plugin-syntax-jsx",
                    "@babel/plugin-transform-class-properties",
                    "@babel/plugin-transform-private-methods",
                    "@babel/plugin-transform-private-property-in-object",
                    "@babel/plugin-transform-nullish-coalescing-operator",
                    "@babel/plugin-transform-optional-chaining",
                    "@babel/plugin-transform-numeric-separator"
                ],
            },
        },
    },
    compact: true
};
