"use strict";
let path = require("path");
let fs = require("fs");
const dotenv = require('dotenv');
let { execSync } = require("child_process");
const OpenAPI = require("../raaghu-react-core/dist/build-proxy");
const { current } = require("@reduxjs/toolkit");
// const fetch = require('node-fetch');

const eTc = process.argv[2];
const url = process.env.npm_config_url;
const completeURL = url + "/swagger/v1/swagger.json";

const generate = async (input, output) => {
    await OpenAPI.generate({
        input,
        output,
        httpClient: OpenAPI.HttpClient.AXIOS,
        useOptions: true,
        useUnionTypes: false,
        exportCore: true,
        exportSchemas: true,
        exportModels: true,
        exportServices: true,
        // clientName: 'Demo',
        // indent: OpenAPI.Indent.SPACE_2,
        // postfix: 'Service',
        // request: './test/custom/request.ts',
    });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars 
const generateRealWorldSpecs = async () => {
    console.log("\x1b[32m%s\x1b[0m", "Downloading swagger json...");
    execSync(
        `curl -o swaggerJSON.json ${completeURL}`,
        { cwd: ".", stdio: "inherit" }
    );

    // const response = await fetch('https://raaghu-react.azurewebsites.net/swagger/v1/swagger.json');
    const response = require("../swaggerJSON.json");
    // const response = await fetch(completeURL, { insecure: true });

    const list = await response;
    const scope = Object.keys(list.components.securitySchemes.oauth2.flows.authorizationCode.scopes)[0];
    // const list = require('../swaggerJSON.json');

    console.log("\x1b[32m%s\x1b[0m", "Generating proxy...");
    await generate(list, `./raaghu-mfe/libs/${eTc}`);

    // Replacing the API URL in the .env file
    const envConfig = path.resolve(
        __dirname, "../", "raaghu-mfe", "rds_pages", "host", ".env"
    );



    let envConfigContent = fs.readFileSync(envConfig, "utf-8");
    const env = dotenv.parse(fs.readFileSync(envConfig, "utf-8"));
    const tempUrl = env.REACT_APP_API_URL;
    const tempClientID = env.REACT_APP_CLIENT_ID
    env.REACT_APP_API_URL = url;
    const tempScope = env.REACT_APP_SCOPE
    envConfigContent = envConfigContent.replace(`${tempUrl}`, `${url}`);
    envConfigContent = envConfigContent.replace(`REACT_APP_CLIENT_ID=${tempClientID}`, `REACT_APP_CLIENT_ID=${scope}_App`);

    fs.writeFileSync(envConfig, envConfigContent, "utf-8");

    const envLines = envConfigContent.split("\n");
    const scopeLineIndex = envLines.findIndex(line => line.startsWith("REACT_APP_SCOPE="));
    if (scopeLineIndex === -1) {
        console.error("Error: REACT_APP_SCOPE variable not found in .env file");
        process.exit(1);
    }
    const currentScope = envLines[scopeLineIndex].split("=")[1];
    const newScopeValue = `address email phone profile roles openid offline_access ${scope}`;
    // const newScopeValue = `${currentScope} ${scope}`;
    envLines[scopeLineIndex] = `REACT_APP_SCOPE=${newScopeValue.replace(/\s+/g, " ")}`;
    const newEnvContent = envLines.join("\n");
    fs.writeFileSync(envConfig, newEnvContent);

    // Replacing the BASE URL in the OpenAPI.ts file
    const OpenAPIConfig = path.resolve(
        __dirname, "../", "raaghu-mfe", "libs", "proxy", "core", "OpenAPI.ts"
    );
    let OpenAPIConfigContent = fs.readFileSync(OpenAPIConfig, "utf-8");
    OpenAPIConfigContent = OpenAPIConfigContent.replace("<API_URL>", `${url}`);
    fs.writeFileSync(OpenAPIConfig, OpenAPIConfigContent, "utf-8");


    // Replacing the Permission in the PrivateRouteAuth.tss file and MainMenu.ts
    const PermissionContentpath = path.resolve(
        __dirname, "../", "raaghu-mfe", "rds_pages", "host", "src", "PrivateRoute_Auth.tsx"
    );
    //
    const MainMenuDashboardPath = path.resolve(
        __dirname, "../", "raaghu-mfe", "libs", "main-menu", "main-menu.ts"
    );
    let MainMenuDashboardContent = fs.readFileSync(MainMenuDashboardPath, "utf-8");
    MainMenuDashboardContent = MainMenuDashboardContent.replace(`"${currentScope.split(" ")[currentScope.split(" ").length - 1]}.Dashboard.Host"`, `"${scope}.Dashboard.Host"`);
    let PermissionDataContent = fs.readFileSync(PermissionContentpath, "utf-8");
    PermissionDataContent = PermissionDataContent.replace(`"${currentScope.split(" ")[currentScope.split(" ").length - 1]}.Dashboard.Host"`, `"${scope}.Dashboard.Host"`);
    fs.writeFileSync(PermissionContentpath, PermissionDataContent, "utf-8");
    fs.writeFileSync(MainMenuDashboardPath, MainMenuDashboardContent, "utf-8");

    // Replacing the BASE URL in the Login.tsx file
    const LoginTSX = path.resolve(
        __dirname, "../", "raaghu-mfe", "rds_pages", "rds-page-login", "src", "Login", "Login.tsx"
    );
    let LoginTSXContent = fs.readFileSync(LoginTSX, "utf-8");
    LoginTSXContent = LoginTSXContent.replace("<API_URL>", `${url}`);
    fs.writeFileSync(LoginTSX, LoginTSXContent, "utf-8");

    // Replacing the BASE URL in the interceptor.ts file
    const interceptor = path.resolve(
        __dirname, "../", "raaghu-mfe", "libs", "shared", "interceptor.ts"
    );
    let interceptorContent = fs.readFileSync(interceptor, "utf-8");
    interceptorContent = interceptorContent.replace("<API_URL>", `${url}`);
    fs.writeFileSync(interceptor, interceptorContent, "utf-8");

    // Replacing the BASE URL in the index.ts file
    const OpenAPIIndex = path.resolve(
        __dirname, "../", "raaghu-mfe", "libs", "proxy", "index.ts"
    );
    let OpenAPIIndexContent = fs.readFileSync(OpenAPIIndex, "utf-8");
    OpenAPIIndexContent = OpenAPIIndexContent.replaceAll("export type { Volo_Abp_Application_Dtos_ListResultDto_1 } from './models/Volo_Abp_Application_Dtos_ListResultDto_1';\r\n", "");
    OpenAPIIndexContent = OpenAPIIndexContent.replaceAll("export type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from './models/Volo_Abp_Application_Dtos_PagedResultDto_1';\r\n", "");
    OpenAPIIndexContent = OpenAPIIndexContent.replaceAll("export { $Volo_Abp_Application_Dtos_ListResultDto_1 } from './schemas/$Volo_Abp_Application_Dtos_ListResultDto_1';\r\n", "");
    OpenAPIIndexContent = OpenAPIIndexContent.replaceAll("export { $Volo_Abp_Application_Dtos_PagedResultDto_1 } from './schemas/$Volo_Abp_Application_Dtos_PagedResultDto_1';\r\n", "");
    fs.writeFileSync(OpenAPIIndex, OpenAPIIndexContent, "utf-8");
    fs.appendFile(
        OpenAPIIndex,
        "export type { Volo_Abp_Application_Dtos_ListResultDto_1 } from './models/Volo_Abp_Application_Dtos_ListResultDto_1';\r\nexport type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from './models/Volo_Abp_Application_Dtos_PagedResultDto_1';\r\nexport { $Volo_Abp_Application_Dtos_ListResultDto_1 } from './schemas/$Volo_Abp_Application_Dtos_ListResultDto_1';\r\nexport { $Volo_Abp_Application_Dtos_PagedResultDto_1 } from './schemas/$Volo_Abp_Application_Dtos_PagedResultDto_1';\r\n",
        "utf8",
        function (err) {
            if (err) throw err;
        }
    );

    console.log("\x1b[32m%s\x1b[0m", "proxy successfully created!!");
};

const main = async () => {
    // await generate('./test/spec/v2.json', './test/generated/v2/');
    // await generate('./test/spec/v3.json', './test/generated/v3/');
    await generateRealWorldSpecs();
};

main();
