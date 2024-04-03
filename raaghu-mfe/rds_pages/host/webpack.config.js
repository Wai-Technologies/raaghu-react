const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack"); // only add this if you don't have yet
const { ModuleFederationPlugin } = webpack.container;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const devdeps = require("../../package.json").devDependencies;
const deps = require("../../package.json").dependencies;
require("dotenv").config({ path: "./.env" });

const buildDate = new Date().toLocaleString();
const path = require("path");
const fs = require("fs");
const mfeFilePath = path.join(__dirname, "../", "mfe-config.ts");
let mfeConfig = fs.readFileSync(mfeFilePath).toString();
let mfeConfigJSON = mfeConfig.substring(
    mfeConfig.indexOf("{"),
    mfeConfig.lastIndexOf("}") + 1
);
mfeConfigJSON = JSON.parse(mfeConfigJSON);

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
            port: 8080,
            open: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            hot: true,
            historyApiFallback: true,
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".ttf"],
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif|mp4)$/i,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[name].[ext]",
                                outputPath: "assets/",
                                publicPath: "assets/",
                            },
                        },
                    ],
                },
                {
                    test: /\.svg$/,
                    use: ["@svgr/webpack"],
                },

                { test: /\.(config)$/, loader: "file-loader" },
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
            minimize: false,
            minimizer: [
                new TerserPlugin({
                    // Additional options for TerserPlugin
                    // For example, you can set cache to true for faster builds
                    parallel: true, terserOptions: {
                        sourceMap: true, // Enable source maps
                        // ... other terser options ...
                    },  // Use multiple CPU cores for minification
                }),
            ],
            splitChunks: {
                chunks: 'all', // Split code into separate chunks
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
            usedExports: true, // Enable tree shaking by recognizing used exports
            concatenateModules: true, // Enable scope hoisting for better performance
        },

        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: "src/assets",
                        to: "assets",
                    },
                ],
            }),
            new webpack.EnvironmentPlugin({ BUILD_DATE: buildDate }),
            new webpack.DefinePlugin({
                "process.env": JSON.stringify(process.env),
            }),
            new ModuleFederationPlugin({
                name: "host",
                remotes: {
                    Dashboard: mfeConfigJSON["dashboard"].url,
                    Login: mfeConfigJSON["login"].url,
                    ForgotPassword: mfeConfigJSON["forgotpassword"].url,
                    Tenant: mfeConfigJSON["tenant"].url,
                    Maintainance: mfeConfigJSON["maintainance"].url,
                    Edition: mfeConfigJSON["edition"].url,
                    Settings: mfeConfigJSON["settings"].url,
                    AuditLogs: mfeConfigJSON["auditLogs"].url,
                    Users: mfeConfigJSON["users"].url,
                    Roles: mfeConfigJSON["roles"].url,
                    OrganizationUnits: mfeConfigJSON["organizationUnits"].url,
                    Language: mfeConfigJSON["language"].url,
                    IconList: mfeConfigJSON["iconlist"].url,
                    LanguageText: mfeConfigJSON["languageText"].url,
                    ClaimTypes: mfeConfigJSON["claimtypes"].url,
                    TextTemplate: mfeConfigJSON["textTemplate"].url,
                    Applications: mfeConfigJSON["applications"].url,
                    ApiScope: mfeConfigJSON["apiScope"].url,
                    SecurityLogs: mfeConfigJSON["securityLogs"].url,
                    Chats: mfeConfigJSON["chats"].url,
                    FileManagement: mfeConfigJSON["fileManagement"].url,
                    Forms: mfeConfigJSON["forms"].url,
                    FormsView: mfeConfigJSON["forms-view"].url,
                    FormsPreview: mfeConfigJSON["forms-preview"].url,
                    Blogger: mfeConfigJSON["blogger"].url,
                    Client: mfeConfigJSON["client"].url,
                    Polls: mfeConfigJSON["polls"].url,
                    UrlForwarding: mfeConfigJSON["urlForwarding"].url,
                    PaymentPlans: mfeConfigJSON["paymentPlans"].url,
                    Blogs: mfeConfigJSON["blogs"].url,
                    Comments: mfeConfigJSON["comments"].url,
                    Tags: mfeConfigJSON["tags"].url,
                    Elements: mfeConfigJSON["elements"].url,
                    PersonalData: mfeConfigJSON["personalData"].url,
                    MyAccount: mfeConfigJSON["myAccount"].url,
                    PaymentRequests: mfeConfigJSON["paymentRequests"].url,
                    Menus: mfeConfigJSON["menus"].url,
                    Components: mfeConfigJSON["components"].url,
                    Pages: mfeConfigJSON["pages"].url,
                    BlogPost: mfeConfigJSON["blogPost"].url,
                    GlobalResources: mfeConfigJSON["globalResources"].url,
                    Newsletters: mfeConfigJSON["newsletters"].url,
                    Chart: mfeConfigJSON["chart"].url,
                    ChangePassword: mfeConfigJSON["changepassword"].url,
                    Register: mfeConfigJSON["register"].url,
                    Home: mfeConfigJSON["Home"].url,
                    PageNotFound: mfeConfigJSON["PageNotFound"].url,
                    FormsResponse: mfeConfigJSON["formsResponse"].url,
                    LinkedAccounts: mfeConfigJSON["linkedAccounts"].url,
                    AuthorityDelegation: mfeConfigJSON["authorityDelegation"].url,
                },
                shared: {
                    ...devdeps,
                    ...deps,
                    react: { singleton: true, eager: true, requiredVersion: deps.react },
                    "react-dom": {
                        singleton: true,
                        eager: true,
                        requiredVersion: deps["react-dom"],
                    },
                },
            }),
            // new CopyWebpackPlugin([{ from: "./public/images", to: "./assests" }]),
            new HtmlWebpackPlugin({
                template: "./public/index.html",
            }),
            // new ForkTsCheckerWebpackPlugin(),
        ],
    };
};