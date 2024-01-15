let path = require("path");
const fs = require("fs");

const ServicePath = path.join(__dirname,`../raaghu-mfe/libs/proxy/services/${process.argv[2]}Service.ts`)
const OpenAPIConfig = path.resolve(ServicePath);
const serviceFileContent = fs.readFileSync(OpenAPIConfig, "utf-8"); 

// extract the service methods from the file content
const methods = serviceFileContent.match(/public static ([^({}]+\([^)]*\))/g);
const ServiceName = serviceFileContent.match(/export class (\w+)/g)[0].split(" ")[2].replace(/Service/g,"")
const GetStates = serviceFileContent.match(/\bget\w*\s*(?=\()/gi);

const typeNames = serviceFileContent.match(/\{([^}]+)\}/g).map(match => match.slice(1, -1));
if(typeNames.indexOf(' CancelablePromise ') && typeNames.indexOf(' CancelablePromise ')!==0){
var importTypes = typeNames.slice(0,typeNames.indexOf(' CancelablePromise '))
}

const inputString = ServiceName.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2').toLowerCase();
const words = inputString.split(' ');
const firstWord = words[0].toLowerCase();
const remainingWords = words.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());


//camel case Service Name
const camelCaseString = [firstWord, ...remainingWords].join('');



// // Convert name to "kebabCaseName"
let kebabCaseName = inputString.split(" ").join("-").toLowerCase();
// let pageName = formattedName.replaceAll(" ", "");

// generate the async thunks for each service method
const InitialStates = GetStates.map((state)=>{
  return `${state}:{},`
})
const InitialStatestypes = GetStates.map((state)=>{
  return `${state}:any;`
})
// console.log(InitialStates)
const asyncThunks = methods.map((method) => {
  const codeBlock = method.split(" ")[2]; 
  const regex = /[a-zA-Z0-9]+(?=\()/;
  const methodName = codeBlock.match(regex);
  const params = method.split("(")[1].replace(/[:]/g, "");
  if(params.indexOf("{")===0){
    const parameter =params.slice(0,params.indexOf("}")+1)
    const paramsTypes = method.split("}: {")[1];
    // console.log(paramsTypes)
    return `export const ${methodName}Request = createAsyncThunk(
      '${ServiceName.toLowerCase()}/${methodName}Request',
      async (${parameter}:{${paramsTypes} => {
          const response = await ${ServiceName}Service.${methodName}(${parameter});
          return response;
      }
    );`
  }else{return `export const ${methodName}Request = createAsyncThunk(
    '${ServiceName.toLowerCase()}/${methodName}Request',
    async () => {
        const response = await ${ServiceName}Service.${methodName}();
        return response;
    }
  );`}
});

// console.log(asyncThunks.join("\n\n"))

if(importTypes.length!==0){
var importStatement = importTypes.map((importType)=>{ 

  return `import {${importType}} from '../../proxy/index';`

})
}


// generate the slice file with builder cases for each async thunk
const sliceFileContent = `
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
//import { ${ServiceName}Service } from '../../proxy/index';
${importStatement.join("\n\n")}

let ${ServiceName}Service:any;
const module = await import("../../proxy");
if ("${ServiceName}Service" in module) {
  ${ServiceName}Service = module.${ServiceName}Service;
}




${asyncThunks.join("\n\n")}

export interface ${ServiceName}State {
  loading: boolean;
  error: string;
  alert: boolean;
  alertMessage: string;
  ${InitialStatestypes.join("\n\n")}
};


const initialState: ${ServiceName}State = {
  loading: false,
  error: "",
  alert: false,
  alertMessage: "",
  ${InitialStates.join("\n\n")}
};

const ${ServiceName.toLowerCase()}Slice = createSlice({
  name: "${ServiceName.toLowerCase()}",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    ${methods
      .map((method) => {
        const codeBlock = method.split(" ")[2];
        const regex = /[a-zA-Z0-9]+(?=\()/;
        const thunkName = codeBlock.match(regex);
        return `
  builder.addCase(${thunkName}Request.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(${thunkName}Request.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        ${
          // Check if ServiceName contains an integer
          thunkName!==null? `${ thunkName[0].match("get")=="get"? `state.${thunkName} = action.payload`: ``}`
            : ``
        }
      });
  builder.addCase(${thunkName}Request.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });`;
      })
      .join("\n\n")}
  },
});

export default ${ServiceName.toLowerCase()}Slice.reducer;
`;
// console.log(sliceFileContent)
// write the slice file



//hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh


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
    `${sliceFilePath}\\${kebabCaseName}-slice.ts`,
    sliceFileContent
  );
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
  `import ${camelCaseString}Reducer from "./${kebabCaseName}/${kebabCaseName}-slice";`;

// Root reducer property to add
const rootReducerProperty = `${camelCaseString}: ${camelCaseString}Reducer,`;

// Read the content of the index.ts file
const reducerFilecontent = fs.readFileSync(reducerFilePath, "utf-8");

// Check if the import statement already exists in the file
if (reducerFilecontent.includes(importStatementForReducer)) {
  console.log("\x1b[31m%s\x1b[0m", "Import statement already exists.");
} else {
  fs.readFile(reducerFilePath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    // Insert the new import statement
    const updatedData = `${data.slice(0, 0)}${importStatementForReducer}\n${data.slice(0)}\n`;

    fs.writeFile(reducerFilePath, updatedData, 'utf8', (err) => {
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
  fs.readFile(publicApiFilePath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    // Insert the new import statement
    const updatedData = `${data.slice(0, 0)}${importStatementForPublicApi}\n${data.slice(0)}\n`;

    fs.writeFile(publicApiFilePath, updatedData, 'utf8', (err) => {
      if (err) {
        throw err;
      }
      console.log('Slice Added Successfully');
    });
  });
}