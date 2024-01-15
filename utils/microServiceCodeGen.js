'use strict';
let path = require("path");
let fs = require("fs");
let { execSync } = require("child_process");
const OpenAPI = require('raaghu-react-core/dist/build-proxy');
// const fetch = require('node-fetch');

const eTc = process.argv[2];
const url = process.argv[3];
const urlToReplace = process.argv[4];
const gatewayUrl = urlToReplace + '/swagger/v1/swagger.json';
const completeURL = url + '/swagger/v1/swagger.json';

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
        // clientName: 'Demo',
        // indent: OpenAPI.Indent.SPACE_2,
        // postfix: 'Service',
        // request: './test/custom/request.ts',
    });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateRealWorldSpecs = async () => {
    console.log("\x1b[32m%s\x1b[0m", `Downloading swagger json...`);
    execSync(
        `curl -o swaggerJSON.json ${completeURL}`,
        { cwd: '.', stdio: "inherit" }
    )
    execSync(
        `curl -o gatewaySwagger.json ${gatewayUrl}`,
        { cwd: '.', stdio: "inherit" }
    )

    // const response = await fetch('https://raaghu-react.azurewebsites.net/swagger/v1/swagger.json');
    // const response = require('../swaggerJSON.json');
    // const response = await fetch(url);

    // const list = await response.json();
    const list = require('../swaggerJSON.json');
    const gateway = require('../gatewaySwagger.json')

    const scope = Object.keys(gateway.components.securitySchemes.oauth2.flows.authorizationCode.scopes).map((el)=>{
        return el;
    });
    const connectTokenUrl = gateway.components.securitySchemes.oauth2.flows.authorizationCode.tokenUrl;

    console.log("This is scope buddy!!", scope);
    const proxyGeneratedFileName = (list.info.title).split(" ").map((word, index) => {
        if (index === 0) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join("")
    console.log("\x1b[32m%s\x1b[0m", `Generating proxy...`);
    await generate(list, `./raaghu-mfe/libs/${eTc}/${proxyGeneratedFileName}`);

    // Replacing the API URL in the .env file
    const envConfig = path.resolve(
        __dirname, '../', 'raaghu-mfe', 'rds_pages', 'host', '.env'
    );
    let envConfigContent = fs.readFileSync(envConfig, "utf-8");
    envConfigContent = envConfigContent.replace(`<API_URL>`, `${url}`);
    envConfigContent = envConfigContent.replace(`<CONNECT_TOKEN_URL>`, `${connectTokenUrl}`);
    fs.writeFileSync(envConfig, envConfigContent, "utf-8"); 

    const envLines = envConfigContent.split('\n');
    const scopeLineIndex = envLines.findIndex(line => line.startsWith('REACT_APP_SCOPE='));
    if (scopeLineIndex === -1) {
        console.error('Error: REACT_APP_SCOPE variable not found in .env file');
        process.exit(1);
    }
    const currentScope = envLines[scopeLineIndex].split('=')[1];
    const newScopeValue = `${currentScope} ${scope.map((el)=>{
        return el;
    })}`;
    const scopewithoutcoma = newScopeValue.replace(/,/g," ");
    envLines[scopeLineIndex] = `REACT_APP_SCOPE=${scopewithoutcoma.replace(/\s+/g, ' ')}`;
    const newEnvContent = envLines.join('\n');
    fs.writeFileSync(envConfig, newEnvContent);

    // Replacing the BASE URL in the OpenAPI.ts file

    const OpenAPIConfig = path.resolve(
        __dirname, '../', 'raaghu-mfe', 'libs', 'proxy', `${proxyGeneratedFileName}`, 'core', 'OpenAPI.ts'
    );
    let OpenAPIConfigContent = fs.readFileSync(OpenAPIConfig, "utf-8");
    OpenAPIConfigContent = OpenAPIConfigContent.replace(`<API_URL>`, `${urlToReplace}`);
    console.log("Url hoon main: ",connectTokenUrl)
    fs.writeFileSync(OpenAPIConfig, OpenAPIConfigContent, "utf-8");

    // Replacing the BASE URL in the Main.tsx file for micro service template
    const MainTSX = path.resolve(
        __dirname, '../', 'raaghu-mfe', 'rds_pages', 'host', `src`, 'Main.tsx'
    );
    let MainTSXContent = fs.readFileSync(MainTSX, "utf-8");
    MainTSXContent = MainTSXContent.replace(`openidConfig.issuer`, `"${connectTokenUrl}"`);
    fs.writeFileSync(MainTSX, MainTSXContent, "utf-8");

    // Replacing the BASE URL in the interceptor.ts file
    const interceptor = path.resolve(
        __dirname, '../', 'raaghu-mfe', 'libs', 'shared', 'interceptor.ts'
    );
    let interceptorContent = fs.readFileSync(interceptor, "utf-8");
    interceptorContent = interceptorContent.replace(`<API_URL>`, `${url}`);
    fs.writeFileSync(interceptor, interceptorContent, "utf-8");

    // Replacing the BASE URL in the index.ts file
    const NewProxyIndex = path.resolve( __dirname, '../', 'raaghu-mfe', 'libs', 'proxy',`${proxyGeneratedFileName}`, 'index.ts'
    );
        let NewProxy = fs.readFileSync(NewProxyIndex, "utf-8");
        // let NewProxy = fs.readFileSync(OpenAPIIndex, "utf-8");
        NewProxy = NewProxy.replaceAll(`export type { Volo_Abp_Application_Dtos_ListResultDto_1 } from './models/Volo_Abp_Application_Dtos_ListResultDto_1';\r\n`, ``);
        NewProxy = NewProxy.replaceAll(`export type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from './models/Volo_Abp_Application_Dtos_PagedResultDto_1';\r\n`, ``);
        NewProxy = NewProxy.replaceAll(`export { $Volo_Abp_Application_Dtos_ListResultDto_1 } from './schemas/$Volo_Abp_Application_Dtos_ListResultDto_1';\r\n`, ``);
        NewProxy = NewProxy.replaceAll(`export { $Volo_Abp_Application_Dtos_PagedResultDto_1 } from './schemas/$Volo_Abp_Application_Dtos_PagedResultDto_1';\r\n`, ``);
        fs.writeFileSync(NewProxyIndex, NewProxy, "utf-8");
        // fs.appendFile(
        //     NewProxyIndex,
        //     `export type { Volo_Abp_Application_Dtos_ListResultDto_1 } from './models/Volo_Abp_Application_Dtos_ListResultDto_1';\r\nexport type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from './models/Volo_Abp_Application_Dtos_PagedResultDto_1';\r\nexport { $Volo_Abp_Application_Dtos_PagedResultDto_1 } from './schemas/$Volo_Abp_Application_Dtos_PagedResultDto_1';\r\nexport { $Volo_Abp_Application_Dtos_ListResultDto_1 } from './schemas/$Volo_Abp_Application_Dtos_ListResultDto_1';\r\n`,
        //     "utf8",
        //     function (err) {
        //         if (err) throw err;
        //     }
        // );









    const OpenAPIIndex = path.resolve(
        __dirname, '../', 'raaghu-mfe', 'libs', 'proxy', 'index.ts'
    );

   


    if(!fs.existsSync(OpenAPIIndex)){

        fs.writeFileSync(OpenAPIIndex,"", "utf-8");
        fs.appendFile(
            OpenAPIIndex,
            `export * from './${proxyGeneratedFileName}/index';\r\n`,
            "utf8",
            function (err) {
                if (err) throw err;
            }
        );

    }else{

        let OpenAPIIndexContent = fs.readFileSync(OpenAPIIndex, "utf-8");
        OpenAPIIndexContent = OpenAPIIndexContent.replaceAll(`export type { Volo_Abp_Application_Dtos_ListResultDto_1 } from './models/Volo_Abp_Application_Dtos_ListResultDto_1';\r\n`, ``);
        OpenAPIIndexContent = OpenAPIIndexContent.replaceAll(`export type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from './models/Volo_Abp_Application_Dtos_PagedResultDto_1';\r\n`, ``);
        OpenAPIIndexContent = OpenAPIIndexContent.replaceAll(`export { $Volo_Abp_Application_Dtos_ListResultDto_1 } from './schemas/$Volo_Abp_Application_Dtos_ListResultDto_1';\r\n`, ``);
        OpenAPIIndexContent = OpenAPIIndexContent.replaceAll(`export { $Volo_Abp_Application_Dtos_PagedResultDto_1 } from './schemas/$Volo_Abp_Application_Dtos_PagedResultDto_1';\r\n`, ``);
        fs.writeFileSync(OpenAPIIndex, OpenAPIIndexContent, "utf-8");
        fs.appendFile(
            OpenAPIIndex,
            `export type { Volo_Abp_Application_Dtos_ListResultDto_1 } from './models/Volo_Abp_Application_Dtos_ListResultDto_1';\r\nexport type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from './models/Volo_Abp_Application_Dtos_PagedResultDto_1';\r\nexport * from './${proxyGeneratedFileName}/index';\r\nexport { $Volo_Abp_Application_Dtos_PagedResultDto_1 } from './schemas/$Volo_Abp_Application_Dtos_PagedResultDto_1';\r\nexport { $Volo_Abp_Application_Dtos_ListResultDto_1 } from './schemas/$Volo_Abp_Application_Dtos_ListResultDto_1';\r\n`,
            "utf8",
            function (err) {
                if (err) throw err;
            }
        );

    }


    console.log("\x1b[32m%s\x1b[0m", `proxy successfully created!!`);
};

const main = async () => {
    // await generate('./test/spec/v2.json', './test/generated/v2/');
    // await generate('./test/spec/v3.json', './test/generated/v3/');
    await generateRealWorldSpecs();
};

main();