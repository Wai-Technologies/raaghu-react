module.exports = {
    preset: "ts-jest",
    globals: {
        "ts-jest": {
            babelConfig: {
                presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
            },
        },
    },
    plugins: ["@babel/plugin-syntax-jsx"],
    compact : true
};
