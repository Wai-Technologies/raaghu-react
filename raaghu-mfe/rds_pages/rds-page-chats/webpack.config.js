const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack"); // only add this if you don't have yet
const { ModuleFederationPlugin } = webpack.container;
const TerserPlugin = require("terser-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const devdeps = require("../../package.json").devDependencies;
const deps = require("../../package.json").dependencies;
const buildDate = new Date().toLocaleString();

module.exports = (env, argv) => {
    const isProduction = argv.mode === "production";
    return {
        entry: "./src/index.ts",
        mode: argv.mode || "development",
        devtool: isProduction ? false : "source-map",
        performance: {
            hints: false
        },
        devServer: {
            port: 8026,
            open: false,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                regExp: /\/([a-z0-9]+)\/[a-z0-9]+\.png$/i,
                                name: "[1]-[name].[ext]",
                            },
                        },
                    ],
                },
                {
                    test: /\.(scss|css)$/,
                    use: ["style-loader", "css-loader", "sass-loader"],
                    exclude: "/node_modules/",
                },
                {
                    test: /\.(js|jsx|tsx|ts)$/,
                    loader: "babel-loader",
                    exclude: /node_modules/,
                    options: {
                        cacheDirectory: true,
                        babelrc: false,
                        presets: [
                            [
                                "@babel/preset-env",
                                { targets: { browsers: "last 2 versions" } },
                            ],
                            "@babel/preset-typescript",
                            "@babel/preset-react",
                        ],
                        plugins: [
                            "react-hot-loader/babel",
                            ["@babel/plugin-proposal-class-properties", { loose: true }],
                            ["@babel/plugin-proposal-private-methods", { loose: true }],
                            ["@babel/plugin-transform-private-property-in-object", { loose: true }]
                        ],
                    },
                },
            ],
        },
        optimization: {
            minimize: false, // Minimize the output
            minimizer: [
                new TerserPlugin({
                    // Additional options for TerserPlugin
                    parallel: true, terserOptions: {
                        sourceMap: true, // Enable source maps
                        // ... other terser options ...
                    },  // Use multiple CPU cores for minification
                }),
            ],
            usedExports: true, // Enable tree shaking by recognizing used exports
        },

        plugins: [
            new webpack.EnvironmentPlugin({ BUILD_DATE: buildDate }),
            new webpack.DefinePlugin({
                "process.env": JSON.stringify(process.env),
            }),
            new ModuleFederationPlugin({
                name: "chats",
                filename: "remoteEntry.js",
                exposes: {
                    // expose each page
                    "./Chats": "./src/App",
                },
                shared: {
                    ...devdeps,
                    ...deps,
                    react: { singleton: true, eager: true, requiredVersion: deps.react },
                    "react-dom": {
                        singleton: true,
                        eager: true,
                        requiredVersion: deps["react-dom"],
                    }
                },
            }),
            new HtmlWebpackPlugin({
                template: "./public/index.html",
            }),
            new ForkTsCheckerWebpackPlugin(),
        ],
    };
};
