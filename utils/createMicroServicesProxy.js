"use strict";
let path = require("path");
let fs = require("fs");
const dotenv = require("dotenv");
let { execSync } = require("child_process");
const OpenAPI = require("../raaghu-react-core/dist/build-proxy");
const { current } = require("@reduxjs/toolkit");

const url = process.env.npm_config_url;
const gatewayUrl = process.env.npm_config_gateway;
const completeURL = url + "/swagger/v1/swagger.json";

const generate = async (input, output) => {
  await OpenAPI.generate({
    input,
    output,
    httpClient: OpenAPI.HttpClient.AXIOS,
    useOptions: true,
    useUnionTypes: false,
    exportCore: true,
    exportSchemas: false,
    exportModels: true,
    exportServices: true,
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateRealWorldSpecs = async () => {
  console.log("\x1b[32m%s\x1b[0m", "Downloading swagger json...");
  execSync(`curl -o swaggerJSON.json ${completeURL}`, {
    cwd: ".",
    stdio: "inherit",
  });

  // const response = await fetch('https://raaghu-react.azurewebsites.net/swagger/v1/swagger.json');
  const response = require("../swaggerJSON.json");
  // const response = await fetch(completeURL, { insecure: true });

  const list = await response;

  // const scope = Object.keys(list.components.securitySchemes.oauth2.flows.authorizationCode.scopes)[0];
  // const list = require('../swaggerJSON.json');

  const eTc = `${list.info.title.split(" ")[0]}-Proxy`;
  console.log("\x1b[32m%s\x1b[0m", "Generating proxy...");
  await generate(list, `./raaghu-mfe/libs/proxy/${eTc}`);

  const microserviceFolderPath = path.resolve(
    __dirname,
    "../raaghu-mfe/libs/proxy"
  );


  const loginGateway = list.components.securitySchemes.oidc.openIdConnectUrl.match(/^(https?:\/\/[^/]+)/);
  console.log(loginGateway);

  const indexPath = path.join(microserviceFolderPath, "index.ts");
  //    fs.writeFileSync(indexPath, indexFileContent);

  // Replacing the API URL in the .env file
  const envConfig = path.resolve(
    __dirname,
    "../",
    "raaghu-mfe",
    "rds_pages",
    "host",
    ".env"
  );

  let envConfigContent = fs.readFileSync(envConfig, "utf-8");
  const env = dotenv.parse(fs.readFileSync(envConfig, "utf-8"));
  const tempUrl = env.REACT_APP_API_URL;
  const tempClientID = env.REACT_APP_CLIENT_ID;
  env.REACT_APP_API_URL = gatewayUrl;
  env.REACT_APP_MICRO_SERVICES_API_URL = loginGateway;
  // const tempScope = env.REACT_APP_SCOPE
  envConfigContent = envConfigContent.replace(`${tempUrl}`, `${gatewayUrl}`);
  // envConfigContent = envConfigContent.replace(`REACT_APP_CLIENT_ID=${tempClientID}`, `REACT_APP_CLIENT_ID=${scope}_App`);

  fs.writeFileSync(envConfig, envConfigContent, "utf-8");

  const envLines = envConfigContent.split("\n");

  // const scopeLineIndex = envLines.findIndex(line => line.startsWith("REACT_APP_SCOPE="));
  // if (scopeLineIndex === -1) {
  //     console.error("Error: REACT_APP_SCOPE variable not found in .env file");
  //     process.exit(1);
  // }
  // const currentScope = envLines[scopeLineIndex].split("=")[1];
  // const newScopeValue = `address email phone profile roles offline_access ${scope}`;
  // const newScopeValue = `${currentScope} ${scope}`;
  // envLines[scopeLineIndex] = `REACT_APP_SCOPE=${newScopeValue.replace(/\s+/g, " ")}`;
  const newEnvContent = envLines.join("\n");
  fs.writeFileSync(envConfig, newEnvContent);

  // Replacing the BASE URL in the OpenAPI.ts file
  const OpenAPIConfig = path.resolve(
    __dirname,
    "../",
    "raaghu-mfe",
    "libs",
    "proxy",
    `${eTc}`,
    "core",
    "OpenAPI.ts"
  );
  let OpenAPIConfigContent = fs.readFileSync(OpenAPIConfig, "utf-8");
  OpenAPIConfigContent = OpenAPIConfigContent.replace(
    "<API_URL>",
    `${gatewayUrl}`
  );
  fs.writeFileSync(OpenAPIConfig, OpenAPIConfigContent, "utf-8");

  // Replacing the Permission in the PrivateRouteAuth.tss file and MainMenu.ts
  const PermissionContentPath = path.resolve(
    __dirname,
    "../",
    "raaghu-mfe",
    "rds_pages",
    "host",
    "src",
    "PrivateRoute_Auth.tsx"
  );
  //
  const MainMenuDashboardPath = path.resolve(
    __dirname,
    "../",
    "raaghu-mfe",
    "libs",
    "main-menu",
    "main-menu.ts"
  );
  let MainMenuDashboardContent = fs.readFileSync(
    MainMenuDashboardPath,
    "utf-8"
  );
  // MainMenuDashboardContent = MainMenuDashboardContent.replace(`"${currentScope.split(" ")[currentScope.split(" ").length - 1]}.Dashboard.Host"`, `"${scope}.Dashboard.Host"`);
  let PermissionDataContent = fs.readFileSync(PermissionContentPath, "utf-8");
  // PermissionDataContent = PermissionDataContent.replace(`"${currentScope.split(" ")[currentScope.split(" ").length - 1]}.Dashboard.Host"`, `"${scope}.Dashboard.Host"`);
  fs.writeFileSync(PermissionContentPath, PermissionDataContent, "utf-8");
  fs.writeFileSync(MainMenuDashboardPath, MainMenuDashboardContent, "utf-8");

  // Replacing the BASE URL in the Login.tsx file
  const LoginTSX = path.resolve(
    __dirname,
    "../",
    "raaghu-mfe",
    "rds_pages",
    "rds-page-login",
    "src",
    "Login",
    "Login.tsx"
  );
  let LoginTSXContent = fs.readFileSync(LoginTSX, "utf-8");
  LoginTSXContent = LoginTSXContent.replace("<API_URL>", `${gatewayUrl}`);
  fs.writeFileSync(LoginTSX, LoginTSXContent, "utf-8");

  // Replacing the BASE URL in the interceptor.ts file
  const interceptor = path.resolve(
    __dirname,
    "../",
    "raaghu-mfe",
    "libs",
    "shared",
    "interceptor.ts"
  );
  let interceptorContent = fs.readFileSync(interceptor, "utf-8");
  interceptorContent = interceptorContent.replace("<API_URL>", `${url}`);
  fs.writeFileSync(interceptor, interceptorContent, "utf-8");

  // Replacing the BASE URL in the index.ts file
  const OpenAPIIndex = path.resolve(
    __dirname,
    "../",
    "raaghu-mfe",
    "libs",
    "proxy",
    `${eTc}`,
    "index.ts"
  );


  let OpenAPIIndexContent = fs.readFileSync(OpenAPIIndex, "utf-8");

  OpenAPIIndexContent = OpenAPIIndexContent.replaceAll(
    "export type { Volo_Abp_Application_Dtos_ListResultDto_1 } from './models/Volo_Abp_Application_Dtos_ListResultDto_1';\r\n",
    ""
  );
  OpenAPIIndexContent = OpenAPIIndexContent.replaceAll(
    "export type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from './models/Volo_Abp_Application_Dtos_PagedResultDto_1';\r\n",
    ""
  );
  OpenAPIIndexContent = OpenAPIIndexContent.replaceAll(
    "export { $Volo_Abp_Application_Dtos_ListResultDto_1 } from './schemas/$Volo_Abp_Application_Dtos_ListResultDto_1';\r\n",
    ""
  );
  OpenAPIConfigContent = OpenAPIIndexContent.replaceAll(
    "export { $Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationAuthConfigurationDto } from './schemas/$Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationAuthConfigurationDto';\r\n",
    ""
  );
  OpenAPIIndexContent = OpenAPIIndexContent.replaceAll(
    "export { $Volo_Abp_Application_Dtos_PagedResultDto_1 } from './schemas/$Volo_Abp_Application_Dtos_PagedResultDto_1';\r\n",
    ""
  );
  fs.writeFileSync(OpenAPIIndex, OpenAPIIndexContent, "utf-8");
  if (eTc == "")
    fs.appendFile(
      OpenAPIIndex,
      "export type { Volo_Abp_Application_Dtos_ListResultDto_1 } from './models/Volo_Abp_Application_Dtos_ListResultDto_1';\r\nexport type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from './models/Volo_Abp_Application_Dtos_PagedResultDto_1';\r\nexport { $Volo_Abp_Application_Dtos_ListResultDto_1 } from './schemas/$Volo_Abp_Application_Dtos_ListResultDto_1';\r\nexport { $Volo_Abp_Application_Dtos_PagedResultDto_1 } from './schemas/$Volo_Abp_Application_Dtos_PagedResultDto_1';\r\n",
      "utf8",
      function (err) {
        if (err) throw err;
      }
    );


    const ProxyIndex = path.resolve(
        __dirname,
        "../",
        "raaghu-mfe",
        "libs",
        "proxy",
        "index.ts"
      );


  const regex = /export { [\w\s]+ } from '\.\/services\/[\w]+';/g;
  const matches = [...OpenAPIIndexContent.matchAll(regex)];


if(fs.existsSync(ProxyIndex)){
    let ProxyIndexContent = fs.readFileSync(ProxyIndex, "utf-8");
    const regexForAlreadyPresentExports = /export \{([^}]+)\} from ".+?";/g;
    const matchesFromIndex = [...ProxyIndexContent.matchAll(regexForAlreadyPresentExports)]
    const matchNewExport = matchesFromIndex.map((match)=>match[0]).filter((name) => name.includes(`./${list.info.title.split(" ")[0]}`));
    if (matches) {
       if(eTc == "Account-Proxy") {
          const exportedNames = matches.map((match) => match[0].split(" ")[2]);
          const exportStatement = `export {${exportedNames.join(
            ","
          )}} from "./${eTc}";`;
    
    
            if(matchNewExport.length==0){
                fs.appendFile(
                    indexPath,
                    `${exportStatement};\r\n`,
                    "utf8",
                    function (err) {
                      if (err) throw err;
                    }
                  );
            }else{
    
                ProxyIndexContent = ProxyIndexContent.replaceAll(`${matchNewExport[0]}\r\n`,`${`${exportStatement};\r\n`}`)
                fs.writeFileSync(ProxyIndex, ProxyIndexContent, "utf-8");
            }
    
        } else {
          const excludedNames = [
            "AbpApiDefinitionService",
            "AbpApplicationConfigurationService",
            "AbpApplicationLocalizationService",
            "AbpTenantService",
            "FeaturesService",
            "UserService"
          ];
          const exportedNames = matches
            .map((match) => match[0].split(" ")[2]).filter((name) => !excludedNames.includes(name));
          const exportStatement = `export {${exportedNames.join(
            ","
          )}} from "./${eTc}"`;


    
          if(matchNewExport.length==0){
            
          fs.appendFile(
            indexPath,
            `${exportStatement};\r\n`,
            "utf8",
            function (err) {
              if (err) throw err;
            }
          );

          }else{
            ProxyIndexContent = ProxyIndexContent.replaceAll(`${matchNewExport[0]}\r\n`,`${`${exportStatement};\r\n`}`)
            fs.writeFileSync(ProxyIndex, ProxyIndexContent, "utf-8");

          }

        }
    
        // console.log(extractedStatements);
      } else {
        console.log("No Services found.");
      }
}else{
    if (matches) {
        if (eTc == "Account-Proxy") {
          const exportedNames = matches.map((match) => match[0].split(" ")[2]);
          const exportStatement = `export {${exportedNames.join(
            ","
          )}} from "./${eTc}";`;
                fs.appendFile(
                    indexPath,
                    `${exportStatement};\r\n`,
                    "utf8",
                    function (err) {
                      if (err) throw err;
                    }
                  );
        } else if(eTc == "Administration-Proxy") {
          const excludedNames = [
            "AbpApiDefinitionService",
            "AbpApplicationConfigurationService",
            "AbpApplicationLocalizationService",
            "AbpTenantService",
            "FeaturesService",
          ];
          const exportedNames = matches
            .map((match) => match[0].split(" ")[2]).filter((name) => !excludedNames.includes(name));
          const exportStatement = `export {${exportedNames.join(
            ","
          )}} from "./${eTc}"`;
          fs.appendFile(
            indexPath,
            `${exportStatement};\r\n`,
            "utf8",
            function (err) {
              if (err) throw err;
            }
          )
        } else if(eTc == "Web-Proxy"){
          const excludedNames = [
            "AbpApiDefinitionService",
            "AbpApplicationConfigurationService",
            "AbpApplicationLocalizationService",
            "AbpTenantServices",
          ];
          const exportedNames = matches
            .map((match) => match[0].split(" ")[2]).filter((name) => !excludedNames.includes(name));
          const exportStatement = `export {${exportedNames.join(
            ","
          )}} from "./${eTc}"`;
          fs.appendFile(
            indexPath,
            `${exportStatement};\r\n`,
            "utf8",
            function (err) {
              if (err) throw err;
            }
          );
        } else if(eTc == "Identity-Proxy"){
          const excludedNames = [
            "AbpApiDefinitionService",
            "AbpApplicationConfigurationService",
            "AbpApplicationLocalizationService",
            "AbpTenantServices",
            "UserService",
          ];
          const exportedNames = matches
            .map((match) => match[0].split(" ")[2]).filter((name) => !excludedNames.includes(name));
          const exportStatement = `export {${exportedNames.join(
            ","
          )}} from "./${eTc}"`;
          fs.appendFile(
            indexPath,
            `${exportStatement};\r\n`,
            "utf8",
            function (err) {
              if (err) throw err;
            }
          );
        } 
        
    
        // console.log(extractedStatements);
      } else {
        console.log("No Services found.");
      }

}



  console.log("\x1b[32m%s\x1b[0m", "proxy successfully created!!");
};

const main = async () => {
  // await generate('./test/spec/v2.json', './test/generated/v2/');
  // await generate('./test/spec/v3.json', './test/generated/v3/');
  await generateRealWorldSpecs();
};

main();
