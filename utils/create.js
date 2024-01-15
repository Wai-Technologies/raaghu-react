// Imports
let path = require("path");
let { execSync } = require("child_process");
let fs = require("fs");
const portFilePath = path.join(
    __dirname,
    "../raaghu-mfe/rds_pages/",
    "port-config.ts"
);

function getPortNumber() {
    let portConfig = fs.readFileSync(portFilePath).toString();
    let portConfigJSON = JSON.parse(
        portConfig.substring(
            portConfig.indexOf("{"),
            portConfig.lastIndexOf("}") + 1
        )
    );
    let portKeys = Object.keys(portConfigJSON);
    let portArr = portKeys
        .map((val) => {
            return Number(portConfigJSON[val].port);
        })
        .filter((val) => {
            return val != 8080;
        });

    let max = Math.max(...portArr);
    let min = Math.min(...portArr);
    for (let i = min; i <= max; i++) {
        if (!portArr.includes(i) && i != 8080) {
            return i;
        }
    }
    return max + 1 == 8080 ? 8081 : max + 1;
}

let eTc = process.argv[2];
if (eTc == "core") {
    var mfeFolderPath = path.join(__dirname, "..", "raaghu-mfe");
    execSync("npm install --save raaghu-react-core", {
        cwd: ".",
        stdio: "inherit",
    });
    execSync("npm install --save raaghu-react-core", {
        cwd: mfeFolderPath,
        stdio: "inherit",
    });
    console.log("\x1b[32m%s\x1b[0m", "raaghu-react-core successfully installed!!");
    process.exit(0);
}

if (
    (process.argv[2] === "e" || process.argv[2] === "c") && process.env.npm_config_name == undefined ||
    (process.argv[2] === "p" || process.argv[2] === "m") && (process.env.npm_config_moduleName == undefined || process.env.npm_config_pageName == undefined || process.env.npm_config_projectName == undefined)
) {
    console.log("\x1b[31m%s\x1b[0m", "Invalid command!!");
    process.exit(0);
}

let name = process.env.npm_config_name;
let port = getPortNumber();

// Get hold of the app folder path inside the mfe
let appFolderPath = ".";
if (eTc == "e") {
    appFolderPath = path.join(__dirname, "..", "raaghu-elements");
} else if (eTc == "c") {
    appFolderPath = path.join(__dirname, "..", "raaghu-components");
} else if (eTc == "p") {
    name = process.env.npm_config_pageName;
    appFolderPath = path.join(__dirname, "..", "raaghu-mfe", "rds_pages");
} else if (eTc == "m") {
    name = process.env.npm_config_pageName;
    appFolderPath = path.join(__dirname, "..", "raaghu-mfe", "rds_pages");
}

// Parse the name of the mfe and the page name
let shortName = name.replace(/^rds-page-/, "");

// Convert name to "formattedName"
let formattedName = shortName
    .split("-")
    .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

// Convert name to "camelCaseName"
let camelCaseName = shortName
    .split("-")
    .map((word, index) => {
        if (index === 0) {
            return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");

// Convert name to "kebabCaseName"
let kebabCaseName = shortName.split(" ").join("-").toLowerCase();
let pageName = formattedName.replaceAll(" ", "");

// console.log(formattedName); // Output: "Api Scope"
// console.log(camelCaseName); // Output: "apiScope"
// console.log(kebabCaseName); // Output: "api-scope"
// console.log(pageName); // Output: "ApiScope"

const exportStatement = `\r\nexport {default as ${pageName}} from './${kebabCaseName}';`;

function writeFileErrorHandler(err) {
    if (err) console.log("\x1b[31m%s\x1b[0m", err);
}

// Generate the page component using angular-cli
if (fs.existsSync(appFolderPath)) {
    if (eTc == "e" || eTc == "c") {
        console.log(
            "\x1b[32m%s\x1b[0m",
            "Creating " + (eTc == "e" ? "element" : "component") + "..."
        );

        let filePath = path.join(appFolderPath, "/src", name, name + ".tsx");
        if (fs.existsSync(filePath)) {
            console.log(
                "\x1b[31m%s\x1b[0m",
                name + ".tsx already exists on this path."
            );
        } else {
            execSync(`npx generate-react-cli component ${name}`, {
                cwd: appFolderPath,
                stdio: "inherit",
            });
            // index.ts
            fs.writeFile(
                `${appFolderPath}/src/${name}/index.ts`,
                `export { default } from "./${name}";`,
                writeFileErrorHandler
            );
            // common index.ts
            fs.appendFile(
                `${appFolderPath}/src/index.ts`,
                `export { default as ${pageName} } from "./${name}";`,
                writeFileErrorHandler
            );

            console.log(
                "\x1b[32m%s\x1b[0m",
                `index.ts is successfully created at src/${name}/index.ts`
            );

      console.log("\x1b[32m%s\x1b[0m", "Done!!");
    }
  } else if (eTc == "m" || eTc == "p") {
    let newItem;
    if (eTc == "m") {
      newItem = {
        key: `${process.env.npm_config_moduleName}`,
        label: `${process.env.npm_config_moduleName}`,
        icon: "pages",
        children: [
          {
            key: `${name}`,
            label: `${formattedName}`,
            icon: "icons",
            path: `/${kebabCaseName}`,
            subTitle: "subtitle here",
          },
        ],
      };
    } else {
      newItem = {
        key: `${name}`,
        label: `${formattedName}`,
        icon: "icons",
        path: `/${kebabCaseName}`,
        permission: `${process.env.npm_config_projectName}.${formattedName}`,
        subTitle: "subtitle here",
      };
    }
    // let templateWebpackfile = path.join(
    //   __dirname,
    //   "../page-template/template/webpack.config.js"
    // );
    // let webpackConfig = fs.readFileSync(templateWebpackfile, "utf-8");
    // let updatedWebpackConfig = webpackConfig.replace(
    //   /template_port_number/g,
    //   port
    // );
    // updatedWebpackConfig = updatedWebpackConfig.replace(
    //   /{template_page_name}/g,
    //   camelCaseName
    // );
    // updatedWebpackConfig = updatedWebpackConfig.replace(
    //   /{template_Page_Name_expose}/g,
    //   pageName
    // );
    // fs.writeFileSync(templateWebpackfile, updatedWebpackConfig);

        // updating import statetement and compontnt in App.tsx file in template file
        // let templateAppFilePAth = path.join(
        //     __dirname,
        //     "../page-template/template/src/App.tsx"
        // );
        // let templateAppFileContent = fs.readFileSync(templateAppFilePAth, "utf-8");
        // let upodatedtemplateAppfileContent = templateAppFileContent.replace(
        //     /{"import_statement_for_Page_template"}/g,
        //     `import ${pageName} from "./${kebabCaseName}/${kebabCaseName}"`
        // );
        // upodatedtemplateAppfileContent = upodatedtemplateAppfileContent.replace(
        //     /{"page_template_component_in_app"}/g,
        //     `<${pageName}></${pageName}>`
        // );
        // console.log(upodatedtemplateAppfileContent);
        // fs.writeFileSync(templateAppFilePAth, upodatedtemplateAppfileContent);

        let filePath = path.join(appFolderPath, name);

        // Path to create a new directory in the src directory in the template
        // let dirName = path.join(
        //     __dirname,
        //     `../page-template/template/src/${kebabCaseName}`
        // );
        // Creating directory inside the src
        // try {
        //     if (!fs.existsSync(dirName)) {
        //         fs.mkdirSync(dirName);
        //     }
        // } catch (err) {
        //     console.error(err);
        // }
        // // Creatign a file in the src/{name}
        // try {
        //     fs.writeFileSync(
        //         `${dirName}/${kebabCaseName}.tsx`,
        //         `import React from "react";\n

        // const ${pageName} = ()=>{
        //   \treturn(
        //     \t<>
        //     \t<div>${formattedName} Page</div>
        //     \t</>
        //   \t)
        // }
        // export default ${pageName};`
        //     );
        //     // file written successfully
        // } catch (err) {
        //     console.error(err);
        // }

        // Create the directory if it doesn't exist
        //  Running the script to create page

        if (fs.existsSync(filePath)) {
            console.log(
                "\x1b[31m%s\x1b[0m",
                name + " page is already exists on this path."
            );
        } else {

            // template for public\index.html
            let htmlContent =
                `<html>
                    <head>
                    <title>${pageName} Page</title>
                </head>
                <body>
                    <div id="root"></div>
                </body>
                </html>`;

            let appContent =
                `import React, { Suspense } from "react";
                import ${pageName} from "./${camelCaseName}/${pageName}";
                
                const App = () => (
                    <Suspense>
                        <${pageName}></${pageName}>
                    </Suspense>
                );
                export default App;`;

            let bootstrapContent =
                `import ReactDOM from "react-dom";
                import React from "react";
                import App from "./App";
                
                
                ReactDOM.render(
                    <div>
                        <App />
                    </div>,
                    document.getElementById("root")
                );`;

            let indexContent =
                "import(\"./bootstrap\");";

            let pageContent =
                `import React from "react";\n

                const ${pageName} = ()=>{
                    \treturn(
                    \t<>
                    \t<div>${formattedName} Page</div>
                    \t</>
                    \t)
                }
                export default ${pageName};`;

            let packageContent =
                `{
                "name": "${kebabCaseName}",
                "version": "1.0.0",
                "description": "",
                "main": "webpack.config.js",
                "scripts": {
                "dev": "npm run start",
                "start": "webpack serve",
                "build": "webpack --mode production"
                },
                "keywords": [],
                "author": "",
                "license": "MIT",
                "dependencies": {
                "in": "^0.19.0",
                "level": "^8.0.0",
                "root": "^3.2.0"
                }
            }`;

            let tsconfigContent =
                `{
                "compilerOptions": {
                "target": "esnext",
                "lib": [
                    "dom",
                    "dom.iterable",
                    "esnext"
                ],
                "baseUrl": "./",
                "allowJs": true,
                "skipLibCheck": true,
                "esModuleInterop": true,
                "allowSyntheticDefaultImports": true,
                "strict": true,
                "forceConsistentCasingInFileNames": true,
                "noFallthroughCasesInSwitch": true,
                "module": "esnext",
                "moduleResolution": "node",
                "resolveJsonModule": true,
                "isolatedModules": false,
                "sourceMap": true,
                "noEmit": false,
                "jsx": "react-jsx",
                },
                "include": [
                "src"
                ],
                "exclude": [
                "./node_modules/**/*",
                "./dist/**/*",
                "**/*.stories.tsx"
                ]
            }`;

            let webpackContent =
                `const HtmlWebpackPlugin = require("html-webpack-plugin");
                const webpack = require("webpack"); // only add this if you don't have yet
                const { ModuleFederationPlugin } = webpack.container;
                const TerserPlugin = require("terser-webpack-plugin");
                const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
                const devdeps = require("../../package.json").devDependencies;
                const deps = require("../../package.json").dependencies;
                require("dotenv").config({ path: "./.env" });
                
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
                        port: ${port},
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
                
                            test: /.(scss|css)$/,
                
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
                        name: "${pageName}",
                        filename: "remoteEntry.js",
                        exposes: {
                            // expose each page
                            "./${pageName}": "./src/App"
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
                };`;

            // const sliceFilePath = path.join(
            //   __dirname,
            //   "..",
            //   "raaghu-mfe",
            //   "libs",
            //   "state-management",
            //   `${kebabCaseName}`
            // );
            // console.log(formattedName); // Output: "Api Scope"
            // console.log(camelCaseName); // Output: "apiScope"
            // console.log(kebabCaseName); // Output: "api-scope"
            // console.log(pageName); // Output: "ApiScope"

            let filePath = path.join(appFolderPath, `rds-page-${camelCaseName.toLowerCase()}`);
            // Creating directory inside the src
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath);
                    fs.mkdirSync(path.join(filePath, "public"));
                    let indexHtmlPath = path.join(filePath, "public");
                    fs.writeFileSync(path.join(indexHtmlPath, "index.html"), htmlContent);
                    fs.mkdirSync(path.join(filePath, "src"));
                    let srcPath = path.join(filePath, "src");
                    fs.writeFileSync(path.join(srcPath, "App.tsx"), appContent);
                    fs.writeFileSync(path.join(srcPath, "bootstrap.tsx"), bootstrapContent);
                    fs.writeFileSync(path.join(srcPath, "index.ts"), indexContent);
                    fs.mkdirSync(path.join(srcPath, `${camelCaseName}`));
                    fs.writeFileSync(path.join(srcPath, `${kebabCaseName}`, `${pageName}.tsx`), pageContent);
                    fs.writeFileSync(path.join(filePath, "package.json"), packageContent);
                    fs.writeFileSync(path.join(filePath, "tsconfig.json"), tsconfigContent);
                    fs.writeFileSync(path.join(filePath, "webpack.config.js"), webpackContent);
                }
            } catch (err) {
                console.error(err);
            }

            // execSync(
            //   `npx create-react-app rds-page-${camelCaseName.toLowerCase()} --template file:../../page-template`,
            //   { cwd: appFolderPath, stdio: "inherit" }     );

            console.log("\x1b[32m%s\x1b[0m", `${name} page is successfully created!!`);
            // console.log("\x1b[32m%s\x1b[0m", "Done!!");
        }

        // Deleting the directory from the src in the template.
        // fs.rm(dirName, { recursive: true }, (err) => {
        //     if (err) {
        //         console.error(err);
        //     }
        // });
        // Generate the new export statement with the updated list of variables

        const filePathForPageComponent =
            "raaghu-mfe/rds_pages/host/src/PageComponent.ts";
        const newImportStatementForPageComponent = `const ${pageName}Compo = React.lazy(() => import("${pageName}/${pageName}"));`;
        // Define the export statement to find and update
        const exportStatementForPageComponent = "export {";

        // Read the file contents as a string
        const fileContentsOfPageComponent = fs.readFileSync(
            filePathForPageComponent,
            "utf8"
        );

        // Find the index of the export statement in the file
        const exportIndex = fileContentsOfPageComponent.indexOf(
            exportStatementForPageComponent
        );

        // Define the start and end indices of the export block
        const exportStartIndexPageComponent =
            exportIndex + exportStatementForPageComponent.length;
        const exportEndIndexPageComponent =
            fileContentsOfPageComponent.indexOf("};", exportStartIndexPageComponent) +
            1;

        // Extract the current export block from the file
        const exportBlock = fileContentsOfPageComponent.slice(
            exportStartIndexPageComponent,
            exportEndIndexPageComponent - 1
        );
        const block = fileContentsOfPageComponent.slice(0, exportIndex);
        const updatedBlock = `${block}${newImportStatementForPageComponent}`;

        // Add the new import statement to the start of the export block
        const updatedExportBlock = `${exportBlock}\n${pageName}Compo,`;
        const updatedPage = `${updatedBlock}\n export {${updatedExportBlock}};`;

        // Use the fs.writeFile method to write the new content to the file, overwriting the old content
        fs.writeFile(filePathForPageComponent, updatedPage, (err) => {
            if (err) throw err;
            // console.log("The content has been overwritten!");
        });

        // Output a message to confirm that the script has run successfully
        // console.log(`Added ${pageName}Compo to ${filePathForPageComponent}`);
        // Creating a file for side Nav items
        let sideNavItemPath = path.join(__dirname, "../raaghu-mfe/libs/main-menu");
        try {
            fs.writeFileSync(
                `${sideNavItemPath}/${kebabCaseName}.ts`,
                `const ${pageName} =[${JSON.stringify(
                    newItem,
                    null,
                    2
                )}]; export default ${pageName};`
            );
            // file written successfully
        } catch (err) {
            console.error(err);
        }

        fs.appendFile(
            `${sideNavItemPath}/index.ts`,
            exportStatement,
            "utf8",
            // callback function
            function (err) {
                if (err) throw err;
                // if no error
                // console.log("Data is appended to file successfully.");
            }
        );

        // updating port-config and mfe-config

        const mfeConfigFilePath = path.resolve(
            __dirname,
            "../raaghu-mfe/rds_pages/mfe-config.ts"
        );
        const mfeConfigContent = fs.readFileSync(mfeConfigFilePath, "utf-8");
        const mfeConfigString = mfeConfigContent.replace(
            /^export\s+const\s+MfeConfig\s+=\s+/,
            ""
        );
        const config = JSON.parse(mfeConfigString);
        config[camelCaseName] = {
            url: `${camelCaseName}@http://localhost:${port}/remoteEntry.js`,
        };
        const updatedmfeConfigString = `export const MfeConfig = ${JSON.stringify(
            config,
            null,
            2
        )}\n`;
        fs.writeFileSync(mfeConfigFilePath, updatedmfeConfigString);

        // For port-config
        const portConfigFilePath = path.resolve(
            __dirname,
            "../raaghu-mfe/rds_pages/port-config.ts"
        );
        const portConfigContent = fs.readFileSync(portConfigFilePath, "utf-8");
        const portConfigString = portConfigContent.replace(
            /^export\s+const\s+PortConfig\s+=\s+/,
            ""
        );
        const portConfig = JSON.parse(portConfigString);
        portConfig[camelCaseName] = {
            port: `${port}`,
        };
        const updatedportConfigString = `export const PortConfig = ${JSON.stringify(
            portConfig,
            null,
            2
        )}\n`;
        fs.writeFileSync(portConfigFilePath, updatedportConfigString);

        // Updating in remote.d.ts file
        fs.readFile(
            "raaghu-mfe/rds_pages/host/src/remote.d.ts",
            "utf8",
            (err, data) => {
                if (err) {
                    console.error(err);
                    process.exit(0);
                }

                // Add the new module declaration
                const newDeclaration = `\ndeclare module "${pageName}/${pageName}" {\n\tconst ${pageName}Component: React.ComponentType;\n\texport default ${pageName}Component;\n}\n`;
                const updatedContent = data + newDeclaration;

                // Write the updated content back to the file
                fs.writeFile(
                    "raaghu-mfe/rds_pages/host/src/remote.d.ts",
                    updatedContent,
                    "utf8",
                    (err) => {
                        if (err) {
                            console.error(err);
                            process.exit(0);
                        }

                        // console.log("remote.d.ts file updated successfully!");
                    }
                );
            }
        );

        // let finalWebpackConfig = updatedWebpackConfig.replace(
        //     port,
        //     "template_port_number"
        // );
        // finalWebpackConfig = finalWebpackConfig.replace(
        //     camelCaseName,
        //     "{template_page_name}"
        // );
        // finalWebpackConfig = finalWebpackConfig.replace(
        //     pageName,
        //     "{template_Page_Name_expose}"
        // );
        // fs.writeFileSync(templateWebpackfile, finalWebpackConfig);

        // let finalAppFileContent = upodatedtemplateAppfileContent.replace(
        //     `import ${pageName} from "./${kebabCaseName}/${kebabCaseName}"`,
        //     "{\"import_statement_for_Page_template\"}"
        // );
        // finalAppFileContent = finalAppFileContent.replace(
        //     `<${pageName}></${pageName}>`,
        //     "{\"page_template_component_in_app\"}"
        // );
        // fs.writeFileSync(templateAppFilePAth, finalAppFileContent);
        // Adding url to the webpack file of the host page
        const hostWebpackpath = "raaghu-mfe/rds_pages/host/webpack.config.js";

        fs.readFile(hostWebpackpath, "utf8", (err, data) => {
            if (err) {
                console.error(err);
                process.exit(0);
            }

            const updatedData = data.replace(
                /(remotes: \{[\s\S]*?)(\n\s*\})/m,
                `$1\n     ${pageName}: mfeConfigJSON["${camelCaseName}"].url,\n}`
            );

            fs.writeFile(hostWebpackpath, updatedData, "utf8", (err) => {
                if (err) {
                    console.error(err);
                    process.exit(0);
                }
                // console.log("webpack.config.js updated successfully!");
            });
        });

        //Adding route to PrivateRoute_Auth.ts
        
        const privateRouteAuthpath = "raaghu-mfe/rds_pages/host/src/PrivateRoute_Auth.tsx";
        console.log("PrivateRoute_Auth.tsx");
        fs.readFile(privateRouteAuthpath, "utf8", (err, data) => {
            if (err) {
                console.error(err);
                process.exit(0);
            }
            const updatedData = data.replace(
                /} else \{([\s\S]*?)\n\s*setPermission\(false\);\s*\}/m,
                `\} else if \(location\.pathname == "\/${kebabCaseName}"\) {\n pagekey = "${process.env.npm_config_projectName}.${formattedName}";\n } else {\n pagekey = "extraCASE"; \n setPermission\(false\); \n}`
            );

            fs.writeFile(privateRouteAuthpath, updatedData, "utf8", (err) => {
                if (err) {
                    console.error(err);
                    process.exit(0);
                }
                // console.log("PrivateRoute_Auth.tsx updated successfully!");
            });
        });


        // Adding start script to the package.json

        const packageFile = "raaghu-mfe/package.json";
        const newScript = `cd rds_pages/rds-page-${camelCaseName} && npm run dev`;
        fs.readFile(packageFile, "utf-8", function (err, data) {
            if (err) throw err;

            // parse the package.json data into an object
            const packageObj = JSON.parse(data);

            // add the new command to the "start" script
            packageObj.scripts.start += ` "${newScript}"`;

            // write the updated package.json object back to the file
            fs.writeFile(
                packageFile,
                JSON.stringify(packageObj, null, 2),
                "utf-8",
                function (err) {
                    if (err) throw err;
                    // console.log("start script updated successfully");
                }
            );
            //routing Automation

            const componentToAdd = `${pageName}Compo`; // Replace with the name of your component
            const routeFilePath = path.join(appFolderPath, "host", "src", "MainRoutes.tsx");// Replace with the path to your Main.tsx file
            
            fs.readFile(routeFilePath, "utf8", (err, data) => {
                if (err) {
                    console.error(err);
                    process.exit(0);
                }

                const lines = data.split("\n");

                for (let i = 0; i < lines.length; i++) {
                    if (lines[i].includes("from \"./PageComponent\"")) {
                        const importIndex = i;
                        const componentIndex = lines
                            .slice(importIndex)
                            .findIndex(
                                (line) => line.includes("}") && !line.includes("import")
                            );

                        if (componentIndex > -1) {
                            lines.splice(
                                importIndex + componentIndex,
                                0,
                                `  ${componentToAdd},`
                            );
                            const result = lines.join("\n");

                            fs.writeFile(routeFilePath, result, "utf8", (err) => {
                                if (err) console.error(err);
                            });
                        }

                        break;
                    }
                }
            });

            const routeToAdd = `<Route path="/${kebabCaseName}" element={<${pageName}Compo />} />`;
            // Read the file contents
            const fileContent = fs.readFileSync(routeFilePath, { encoding: "utf-8" });

            // Find the position of the last <Route path="" element={<PrivateRoute_Auth />}> tag
            const searchText = `<Route path="" element={<PrivateRoute_Auth />}>`
            const lastRoutesTagEndIndex = fileContent.lastIndexOf(searchText);

            // Insert the new route element after the last <Route path="" element={<PrivateRoute_Auth />}> tag
            const newFileContent =
                fileContent.slice(0, lastRoutesTagEndIndex - 1) + searchText + "\n" +
                routeToAdd +
                fileContent.slice(lastRoutesTagEndIndex + searchText.length);

            // Write the modified content back to the file
            fs.writeFileSync(routeFilePath, newFileContent);
        });

        const sliceFilePath = path.join(
            __dirname,
            "..",
            "raaghu-mfe",
            "libs",
            "state-management",
            `${kebabCaseName}`
        );
        // Creating directory inside the src
        try {
            if (!fs.existsSync(sliceFilePath)) {
                fs.mkdirSync(sliceFilePath);
            }
        } catch (err) {
            console.error(err);
        }
        // Creatign a file in the src/{name}
        try {
            fs.writeFileSync(
                `${sliceFilePath}/${kebabCaseName}-slice.ts`,
                `import { createSlice, createAsyncThunk, PayloadAction, } from "@reduxjs/toolkit";\n
                export interface ${camelCaseName}InitialState {
                loading: boolean;
                ${camelCaseName}s: any;
                error: string;
                }; \n
                export const ${camelCaseName}State: ${camelCaseName}InitialState = {
                loading: false,
                ${camelCaseName}s: {},
                error: "",
                };

                // Add your Api call here

                const ${camelCaseName}Slice = createSlice({
                name: "${camelCaseName}",
                initialState: ${camelCaseName}State,
                reducers: {},
                extraReducers: (builder) => {
                    // Add your extraReducers here
                }})\n
                export default ${camelCaseName}Slice.reducer;`);

            // file written successfully
        } catch (err) {
            console.error(err);
        }
        const reducerFilePath = path.join(
            __dirname,
            "..",
            "raaghu-mfe",
            "libs",
            "state-management",
            "index.ts"
        );

        // Import statement to add
        const importStatementForReducer =
            `import ${camelCaseName}Reducer from "./${kebabCaseName}/${kebabCaseName}-slice";`;

        // Root reducer property to add
        const rootReducerProperty = `${camelCaseName}: ${camelCaseName}Reducer,`;

        // Read the content of the index.ts file
        const reducerFilecontent = fs.readFileSync(reducerFilePath, "utf-8");

        // Check if the import statement already exists in the file
        if (reducerFilecontent.includes(importStatementForReducer)) {
            console.log("\x1b[31m%s\x1b[0m", "Import statement already exists.");
        } else {
            fs.readFile(reducerFilePath, "utf8", (err, data) => {
                if (err) {
                    throw err;
                }

                // Insert the new import statement
                const updatedData = `${data.slice(0, 0)}${importStatementForReducer}\n${data.slice(0)}\n`;

                fs.writeFile(reducerFilePath, updatedData, "utf8", (err) => {
                    if (err) {
                        throw err;
                    }
                    // console.log('Import statement added successfully!');
                });
            });
        }

        // Check if the rootReducer property already exists in the file
        if (reducerFilecontent.includes(rootReducerProperty)) {
            console.log("\x1b[31m%s\x1b[0m", "Root reducer property already exists.");
        } else {
            // Add the rootReducer property at the end of the rootReducer object
            fs.writeFileSync(
                reducerFilePath,
                reducerFilecontent.replace(
                    /const rootReducer = combineReducers\({/,
                    `const rootReducer = combineReducers({\n  ${rootReducerProperty}`
                )
            );
            // console.log("Root reducer property added successfully.");
        }

        const publicApiFilePath = path.join(
            __dirname,
            "..",
            "raaghu-mfe",
            "libs",
            "state-management",
            "public.api.ts"
        );

        // Import statement to add
        const importStatementForPublicApi =
            `export * from "./${kebabCaseName}/${kebabCaseName}-slice";`;

        // Read the content of the index.ts file
        const publicApiFileContent = fs.readFileSync(publicApiFilePath, "utf-8");

        // Check if the import statement already exists in the file
        if (publicApiFileContent.includes(importStatementForPublicApi)) {
            console.log("\x1b[31m%s\x1b[0m", "Import statement already exists.");
        } else {
            fs.readFile(publicApiFilePath, "utf8", (err, data) => {
                if (err) {
                    throw err;
                }

                // Insert the new import statement
                const updatedData = `${data.slice(0, 0)}${importStatementForPublicApi}\n${data.slice(0)}\n`;

                fs.writeFile(publicApiFilePath, updatedData, "utf8", (err) => {
                    if (err) {
                        throw err;
                    }
                    // console.log('Export statement added successfully!');
                });
            });
        }
    }
} else {
    if (eTc == "e") {
        console.log("\x1b[31m%s\x1b[0m", "The elements folder is missing!!");
    } else if (eTc == "c") {
        console.log("\x1b[31m%s\x1b[0m", "The components folder is missing!!");
    } else if (eTc == "p") {
        console.log("\x1b[31m%s\x1b[0m", "The pages folder is missing!!");
    }
}