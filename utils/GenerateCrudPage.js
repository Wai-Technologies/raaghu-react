let path = require("path");
const { execSync } = require('child_process');
const fs = require("fs");


try {
  const ServicePath = process.argv[2];

  if (!fs.existsSync(ServicePath)) {
    throw new Error('Path does not exist.');
  }
  
  if (!ServicePath.endsWith('slice.ts')) {
    throw new Error('Invalid file. File must end with "slice.ts".');
  }

  const OpenAPIConfig = path.resolve(ServicePath);
  var serviceFileContent = fs.readFileSync(OpenAPIConfig, "utf-8");
  console.log('Process started successfully.');
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1); // Stop the execution of the rest of the Node.js script
}





const ServicePath = process.argv[2];
const OpenAPIConfig = path.resolve(ServicePath);
// const serviceFileContent = fs.readFileSync(OpenAPIConfig, "utf-8");
// const serviceFileContent = fs.readFileSync(OpenAPIConfig, "utf-8");








// extract the service methods from the file content
const methods = serviceFileContent
  .match(/export const (\w+)/g)
  .map((match) => match.replace("export const ", ""));
// console.log(methods)
const properties = serviceFileContent
  .match(/export const (\w+)/g)
  .map((match) => match.replace("export const ", ""));
const reducerName = serviceFileContent
  .match(/export default (\w+)/g)
  .map((match) => match.replace("export default ", "").replace("Slice", ""));
const reducers = serviceFileContent
  .match(/const initialState: \w+ = \{[\s\S]*?\};/)[0]
  .match(/\w+:/g)
  .map((match) => match.slice(0, -1));

const importDtos = serviceFileContent.match(
  /import\s+{[^}]*Dto[^}]*}\s+from\s+['"].+['"]/g
);

const dtoNames = importDtos.map((importDto) => {
  const match = importDto.match(/import\s+{([^}]*)}\s+from\s+['"].+['"]/);
  return match[1].trim();
});

const componentName = `comp-${reducerName}`;

const getdto = dtoNames.filter(
  (dto) =>
    !dto.toLowerCase().includes("create") &&
    !dto.toLowerCase().includes("update") &&
    !dto.toLowerCase().includes("pagedresult")
);



function convertToCamelCase(string) {
  const camelCaseString = string.replace(/[-_](\w)/g, (_, match) => match.toUpperCase());
  return camelCaseString.charAt(0).toUpperCase() + camelCaseString.slice(1);
}

const getCreatedto = dtoNames.filter(
  (dto) =>
    dto.toLowerCase().includes("create") &&
    !dto.toLowerCase().includes("update") &&
    !dto.toLowerCase().includes("pagedresult")
);


const getUpdatedto = dtoNames.filter(
  (dto) =>
    !dto.toLowerCase().includes("create") &&
    dto.toLowerCase().includes("update") &&
    !dto.toLowerCase().includes("pagedresult")
);

const getBothcreateUpdate = dtoNames.filter(
  (dto) =>
    dto.toLowerCase().includes("create") &&
    dto.toLowerCase().includes("update") &&
    !dto.toLowerCase().includes("pagedresult")
);
function getField(dtoName) {
  const portFilePath = path.join(
    __dirname,
    "../raaghu-mfe/libs/proxy/models",
    `${dtoName}.ts`
  );



  try {
    var dtoFile = path.resolve(portFilePath);

  
    if (!fs.existsSync(dtoFile)) {
      throw new Error('DTOs does not exist.');
    }
    console.log('Extracting information from DTOs .');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1); // Stop the execution of the rest of the Node.js script
  }





  const dtoFileContent = fs.readFileSync(dtoFile, "utf-8");
  const typeRegex = new RegExp(`export type ${dtoName} = {([^}]*)}`);
  const match = dtoFileContent.match(typeRegex);

  if (match) {
    const typeDefinition = match[1];
    let properties = typeDefinition
      .split(";")
      .map((prop) => prop.trim().replace(/\?/g, ""));
    const props = properties.filter((p) => {
      if (
        p != "" &&
        !p.includes("id") &&
        !p.includes("creationTime") &&
        !p.includes("creatorId") &&
        !p.includes("lastModificationTime") &&
        !p.includes("lastModifierId") &&
        !p.includes("isDeleted") &&
        !p.includes("deleterId") &&
        !p.includes("deletionTime")
      ) {
        return true;
      }
    });
    return props;
  }
}


const getKeysOfDto = getField(getBothcreateUpdate).map((keyString) => {
  const match = keyString.match(/^([^:]+):/);
  return match[1];
});

function getTypesForComponent(dtoName) {
  const portFilePath = path.join(
    __dirname,
    "../raaghu-mfe/libs/proxy/schemas",
    `$${dtoName}.ts`
  );



  try {
    var dtoSchemaFile = path.resolve(portFilePath);

  
    if (!fs.existsSync(dtoSchemaFile)) {
      throw new Error('Schemas does not exist.');
    }
    console.log('Extracting information from Schemas .');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1); // Stop the execution of the rest of the Node.js script
  }



  const dtoFileContent = fs.readFileSync(dtoSchemaFile, "utf-8");
  const typeRegex = new RegExp(/{[\s\S]*}/);
  const match = dtoFileContent.match(typeRegex)[0];
  return eval(`(${match})`).properties;
}
const l = getTypesForComponent(`${getBothcreateUpdate[0]}`);

// console.log("hello",l);
// console.log("world",getKeysOfDto)

const elementSelector = getKeysOfDto.map((k) => {
  if (l[k].type == "string") {
    if (l[k].format) {
      if (l[k].format == "date") {
        return {
          name: k,
          format: "date",
          element: "RdsDatePicker",
          isRequired: l[k].isRequired,
        };
      }
    } else {
      return {
        name: k,
        format: "text",
        element: "RdsInput",
        isRequired: l[k].isRequired,
      };
    }
  }

  if (l[k].type == "number") {
    return {
      name: k,
      format: "number",
      element: "RdsInput",
      isRequired: l[k].isRequired,
    };
  }
  if (l[k].type == "boolean") {
    return {
      name: k,
      format: "boolean",
      element: "Rdscheckbox",
      isRequired: l[k].isRequired,
    };
  }
  if (l[k].type == "array") {
    return { [k]: "array", format: "array", isRequired: l[k].isRequired };
  } else {
    const dto = l[k].type;
    const fileTypePath = path.join(
      __dirname,
      "../raaghu-mfe/libs/proxy/schemas",
      `$${dto}.ts`
    );
  


    try {
      var dtoSchemaFile = path.resolve(fileTypePath);
  
    
      if (!fs.existsSync(dtoSchemaFile)) {
        throw new Error('Error extracting Enum information');
      }
      console.log('Extracting information for Enum.');
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1); // Stop the execution of the rest of the Node.js script
    }




    const dtoFileContent = fs.readFileSync(dtoSchemaFile, "utf-8");
    const typeRegex = new RegExp(/{[\s\S]*}/);
    const match = dtoFileContent.match(typeRegex)[0];
    if (eval(`(${match})`).type == "Enum") {
      const enumTypePath = path.join(
        __dirname,
        "../raaghu-mfe/libs/proxy/models",
        `${dto}.ts`
      );
      const enumFile = path.resolve(enumTypePath);
      const enumFileContent = fs.readFileSync(enumFile, "utf-8");

      const enumValuesRegex = /enum\s+[^{\s]+\s*\{([^}]*)\}/s;
      const enumValuesMatch = enumValuesRegex.exec(enumFileContent);
      const enumValuesString = enumValuesMatch ? enumValuesMatch[1].trim() : "";
      const enumValuesObject = {};

      if (enumValuesString) {
        const enumValuesArray = enumValuesString.split(",");

        enumValuesArray.forEach((enumValue) => {
          const [key, value] = enumValue.split("=");
          if (key && value) {
            const parsedValue = parseInt(value.trim(), 10);
            enumValuesObject[key.trim()] = parsedValue;
          }
        });
      }
      return {
        name: k,
        format: eval(`(${match})`).type,
        element: "RdsSelectList",
        extraProp: enumValuesObject,
        isRequired: l[k].isRequired,
      };
    }
  }
});



const componentImport = `
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";   
import {
  RdsButton,RdsLabel,
  ${[...new Set(elementSelector.map((element) => element.element))].join(",")}
} from "../rds-elements";


export interface Rds${convertToCamelCase(`${componentName}`)}Props {
  ${elementSelector.map((element) => element.name + "Prop?:any;").join("")}
  onSaveHandler?: any;
}
`;

const componentLogic = `
const Rds${convertToCamelCase(`${componentName}`)} = (props: Rds${convertToCamelCase(`${componentName}`)}Props) => {
const { t } = useTranslation();
const {
  ${elementSelector.map((element) => element.name + "Prop")},
  onSaveHandler,
} = props;

const [formValid, setFormValid] = useState(true);


${elementSelector
  .map((element) => {
    if (element.element == "RdsSelectList") {
      return `const [label${element.name}, setLabel${element.name}] = useState("Select a ${element.name}");`;
    }
  })
  .join("")}

const [data, setData] = useState({
${elementSelector.map((element) => {
  if (element.format != "date") {
    return element.name + ":" + element.name + "Prop";
  } else {
    {
      return (
        element.name +
        ":" +
        `${element.name}Prop ? new Date(${element.name}Prop): new Date()`
      );
    }
  }
})}
});


useEffect(() => {
  setData({ ${elementSelector.map((element) => {
    if (element.format != "date") {
      return element.name + ":" + element.name + "Prop";
    } else {
      {
        return (
          element.name +
          ":" +
          `${element.name}Prop ? new Date(${element.name}Prop): new Date()`
        );
      }
    }
  })}
  });

}, [${elementSelector.map((element) => element.name + "Prop")}]);

${elementSelector
  .filter((element) => element?.extraProp)
  .map((prop) => {
    const options = Object.entries(prop.extraProp).map(([key, value]) => ({
      option: key,
      value: value,
    }));
    return `const ${prop.name}Enum = ${JSON.stringify(options)}`;
  })}





${elementSelector
  .map((element) => {
    if (element.format === "Enum") {
      return `const selectHandler${element.name} = (e:any)=>{
    setData((prevData)=>({...prevData, ${element.name}:e}))
  }`;
    }
  })
  .join("")}


${elementSelector
  .map((element) => {
    if (element.format == "date") {
      return `const onDateChange${element.name} = (e:any)=>{
        setData((prevData)=>({...prevData,${element.name}:e}))
  }`;
    }
  })
  .join("")}


  ${elementSelector
    .map((element) => {
      if (element.format == "boolean") {
        return `
          const checkboxHandler${element.name} = (event: any)=>{
          setData((prevData)=>({...prevData,${element.name}:event.target.checked}))
    }`
    ;
      }
    })
    .join("")}

useEffect(() => {
  const isValid = (${elementSelector
    .map((element, i) => {
      if (element.isRequired) {
        return `data.${element.name}`;
      }
    })
    .join("&&")})
  setFormValid(!isValid);
}, [data]);

const handleSave = () => {
  onSaveHandler({
    data
  });
  

  setData({${elementSelector
    .map((element) => {
      if (element.format != "date") {
        return `${element.name}: "${" "}"`;
      } else {
        return `${element.name}: new Date()`;
      }
    })
    .join(", ")}});

};

return(

`;


const componentElements = 
`${elementSelector.map((property) => {
  const upperHtml = `<div className="col-md-12 mb-3">
                   <div className="form-group mt-3">`;
  const lowerHtml = `</div>
                   </div>`;

  if (property.element == "RdsInput") {
    const convertedString = property.name.replace(/([A-Z])/g, " $1");
    const finalString =
      convertedString.charAt(0).toUpperCase() + convertedString.slice(1);
    return `${upperHtml}
    <RdsInput
    label="${finalString}"
    placeholder="${property.name}"
    value={data.${property.name}}
    onChange={(e:any) =>
      setData((prevData) => ({ ...prevData, ${property.name}: e.target.value }))
    }
    required={true}
  ></RdsInput>
  ${lowerHtml}`;
  } else if (property.element == "RdsSelectList") {
    const convertedString = property.name.replace(/([A-Z])/g, " $1");
    const finalString =
      convertedString.charAt(0).toUpperCase() + convertedString.slice(1);

    return `
    ${upperHtml}
  <RdsSelectList
    label={label${property.name}}
    selectedOption={data.${property.name}}
    selectItems={${property.name}Enum}
    onSelectListChange={selectHandler${property.name}}
    selectedValue={${property.name}Prop}
  ></RdsSelectList>
  ${lowerHtml}`;
  } else if (property.element == "RdsDatePicker") {
    const convertedString = property.name.replace(/([A-Z])/g, " $1");
    const finalString =
      convertedString.charAt(0).toUpperCase() + convertedString.slice(1);

    return `
    ${upperHtml}
    <div className="mb-2">
            <RdsLabel label="${finalString}" required={true}></RdsLabel>
            </div>
            <RdsDatePicker
            type="default"
            selectedDate={onDateChange${property.name}}
            dateForEdit={data.${property.name}}
            onDatePicker={function (start: any, end?: any) {
            return " ";
            }}
            ></RdsDatePicker>
            ${lowerHtml}`;
  } else if (property.element == "RdsCheckbox") {
    
    const convertedString = property.name.replace(/([A-Z])/g, " $1");
    const finalString =
      convertedString.charAt(0).toUpperCase() + convertedString.slice(1);

    return `
    ${upperHtml}

    <RdsCheckbox
    label="${finalString}"
    checked={data.${property.name}}
    onChange={checkboxHandler${property.name}}
  ></RdsCheckbox>

  ${lowerHtml}`


  
    

  }
}).join("")}`;

// console.log(componentElements)

const componentReturn = `
<>
        <form>
          <div className="row">
            ${componentElements}
          </div>
        </form>
        <div className="footer-buttons my-2">
          <div className="row">
            <div className="col-md-12 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2">
              <div>
                <RdsButton
                  label={("Close")}
                  type="button"
                  colorVariant="primary"
                  size="small"
                  databsdismiss="offcanvas"
                  isOutline={true}
                ></RdsButton>
              </div>
              <div>
                <RdsButton
                  label="Save"
                  type="button"
                  size="small"
                  isDisabled={formValid}
                  class="ms-2"
                  colorVariant="primary"
                  databsdismiss="offcanvas"
                  onClick={handleSave}
                ></RdsButton>
              </div>
            </div>
          </div>
        </div>
        </>
        )}
        export default Rds${convertToCamelCase(`${componentName}`)};
`;
const componentFile = `
          ${componentImport}
          ${componentLogic}
          ${componentReturn}
`

// console.log("compo",componentFile)


function createComponent(componentName) {
  const command = `npm run create:component --name=rds-${componentName}`;
  
  try {
    execSync(command);
    const componentPath = path.join(
      __dirname,
      `../raaghu-components/src/rds-${componentName}`,
      `rds-${componentName}.tsx`
    );
    const componentpathres = path.resolve(componentPath);    
    fs.writeFileSync(componentpathres, componentFile, 'utf-8');
    console.log(`Component "${componentName}" created successfully.`);
  } catch (error) {
    console.error(`Error creating component "${componentName}": ${error.message}`);
  }
}
createComponent(componentName);




const tableProps = getField(getdto);

const head = tableProps.map((tableProps) => {
  return {
    displayName: tableProps
      .match(/^(\w+)/)[1]
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, function (str) {
        return str.toUpperCase();
      }),
    key: `${tableProps.match(/^(\w+)/)[1]}`,
    datatype: "text",
    sortable: true,
  };
});

const pageimports = `
import { ${methods.map(
  (method) => method
)} } from "../../../../libs/state-management/public.api"
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    useAppDispatch,
    useAppSelector,
  } from "../../../../libs/state-management/hooks";
  import {
    RdsAlert,
    RdsButton,
    RdsDatePicker,
    RdsInput,
    RdsLabel,
    RdsOffcanvas,
    RdsSelectList,
  } from "../../../rds-elements";
  import { RdsCompAlertPopup, RdsCompDatatable, Rds${convertToCamelCase(`${componentName}`)} } from "../../../rds-components";

  const tableHeaders = ${JSON.stringify(head)}

`;
const pageLogic = `
const ${reducerName} = () => {
 const data${reducerName} = useAppSelector(
  (state) => state.persistedReducer.${reducerName});
 const dispatch = useAppDispatch();
 const { t } = useTranslation();
 const [Data, setData] = useState<any>([{}]);
 const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
 const [dataEmit, setdataEmit] = useState<{
  ${elementSelector.map((element) => {
    return ` ${element.name} : any ;`
  }).join("\n")}
 id: any;
}>({
${elementSelector.map((element)=>{
  return ` ${element.name}: "" `
}).join(",\n")},
 id: "",
});


useEffect(() => {
  const timer = setTimeout(() => {
    setAlert({ ...Alert, show: false });
  }, 3000);
  return () => clearTimeout(timer);
}, [data${reducerName}.${reducers.filter(
  (m) =>
    m.includes("get") &&
    !m.includes("1") &&
    m.toLowerCase().includes(reducerName)
)}, Alert.message]);

 useEffect(() => {
  dispatch(${methods.filter(
    (m) =>
      m.includes("get") &&
      !m.includes("1") &&
      m.toLowerCase().includes(reducerName)
  )}({}) as any);
}, []);

useEffect(() => {
  if (data${reducerName}?.${reducers.filter(
  (m) =>
    m.includes("get") &&
    !m.includes("1") &&
    m.toLowerCase().includes(reducerName)
)}?.items != null) {
    const tempData = data${reducerName}?.${reducers.filter(
  (m) =>
    m.includes("get") &&
    !m.includes("1") &&
    m.toLowerCase().includes(reducerName)
)}?.items.map(
        (item: any) => 
        {
          function getDatefortable (inputDate:any){
            const dateTimeString = inputDate;
            const date = new Date(dateTimeString);
            const formattedDate = new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }).format(date);
            return formattedDate
          }
            return{id:item.id,
              ${elementSelector.map((element)=>{
                if(element.format=="date"){
                    return `${element.name}:getDatefortable(item.${element.name})`
                }else if(element.element=="RdsSelectList"){
                    return `${element.name}:${element.name}Enum[item.type].option`
                }else{
                  return `${element.name}:item.${element.name}`
                }
                
              })}
            }
        });
    setData(tempData);
  }
}, [data${reducerName}.${reducers.filter(
  (m) =>
    m.includes("get") &&
    !m.includes("1") &&
    m.toLowerCase().includes(`${reducerName}`)
)}]); 


const actions = [${methods.filter((request)=>{
  if(request.toLowerCase().includes("put") && request.toLowerCase().includes(reducerName)){
return `{ id: "edit", displayName: t("Edit"), offId: "${reducerName}Edit" }`
  }
  else if(request.toLowerCase().includes("delete") && request.toLowerCase().includes(reducerName)){
    return `{ id: "delete", displayName: t("Delete"), modalId: "${reducerName}Del" }`
  }
  else{
    return false
  }
}).map((action)=>{
  if(action.toLowerCase().includes("put") && action.toLowerCase().includes(reducerName) && !action.toLowerCase().includes("1") ){
    return `{ id: "edit", displayName: t("Edit"), offId: "${reducerName}Edit" }`
  }else if (action.toLowerCase().includes("delete") && action.toLowerCase().includes(reducerName) && !action.toLowerCase().includes("1")){
    return `{ id: "delete", displayName: t("Delete"), modalId: "${reducerName}Del" }`
  }
})}
];

const onActionSelection = (rowData: any, actionId: any) => {

  ${elementSelector.map((element)=>{

    if(element.element=="RdsSelectList"){
      return ` let ${element.name}Index = 0
             const type${element.name} = ${element.name}Enum.map((item:any)=>{
        if(item.option == rowData.${element.name}){
          ${element.name}Index = ${element.name}Enum.indexOf(item);
        }
      })`
    }
  }).join(" ")}


  setdataEmit({
    ...dataEmit,
    ${elementSelector.map((element) => {
      if(element.element=="RdsSelectList"){
          return `${element.name}: ${element.name}Index `
      }else{
        return ` ${element.name} : rowData.${element.name}`
      }

     
    }).join(",\n")},
    id: rowData.id,
  });
};






// logic for new data field creation 

${elementSelector
  .filter((element) => element?.extraProp)
  .map((prop) => {
    const options = Object.entries(prop.extraProp).map(([key, value]) => ({
      option: key,
      value: value,
    }));
    return `const ${prop.name}Enum = ${JSON.stringify(options)}`;
  })}


const onNewCreate = (datafromcomponent: any) => {


  ${elementSelector.map((element)=>{

    if(element.element=="RdsSelectList"){
      return ` let ${element.name}Index = 0
             const type${element.name} = ${element.name}Enum.map((item:any)=>{
        if(item.value == datafromcomponent.data.${element.name}){
          ${element.name}Index = ${element.name}Enum.indexOf(item);
        }
      })`
    }
  }).join(" ")}

  const data = {\n${elementSelector.map((element)=>{
    if(element.format=="date"){
      return `${element.name}: datafromcomponent.data.${element.name}.toISOString().substring(0, 19)`
    }else if(element.element=="RdsSelectList"){
      return `${element.name}:${element.name}Index`
    }
    else{
      return `${element.name}: datafromcomponent.data.${element.name}`
    }
  }).join(",\n")}
}


  dispatch(${methods.map((method)=>{
    if(method.includes("post")&& method.toLowerCase().includes(reducerName)){
      return `${method}`
    }
    }).join("")}({requestBody:data}) as any).then((res: any) => {
    if (res.type.includes("rejected")) {
      setAlert({
        ...Alert,
        show: true,
        message: "Something went wrong",
        color: "danger",
      });
    } else {
      setAlert({
        ...Alert,
        show: true,
        message: "Added Successfully",
        color: "success",
      });
    }
    dispatch(${methods.filter(
      (m) =>
        m.includes("get") &&
        !m.includes("1") &&
        m.toLowerCase().includes(reducerName)
    )}({}) as any);
  }).catch((error: any) => {
    setAlert({
      ...Alert,
      show: true,
      message: "Something went wrong",
      color: "danger",
    });
    console.error(error);
  });
};

// Logic for Edit 

const onEdithandler = (datafromcomponent: any) => {
  const id = dataEmit.id;

  ${elementSelector.map((element)=>{

    if(element.element=="RdsSelectList"){
      return ` let ${element.name}Index = 0
             const type${element.name} = ${element.name}Enum.map((item:any)=>{
        if(item.value == datafromcomponent.data.${element.name}){
          ${element.name}Index = ${element.name}Enum.indexOf(item);
        }
      })`
    }
  }).join(" ")}


   function dateChange (inputdate:any){
    const date = new Date(inputdate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const formattedDate = \`\${year}-\${month}-\${day}T\${hours}:\${minutes}:\${seconds}\`;
    return formattedDate
   }


  const data = {\n${elementSelector.map((element)=>{
    if(element.format=="date"){
      return `${element.name}: dateChange(datafromcomponent.data.${element.name})`
    }else if(element.element=="RdsSelectList"){
      return `${element.name}:${element.name}Index`
    }
    else{
      return `${element.name}: datafromcomponent.data.${element.name}`
    }
  }).join(",\n")}
}

// this is for Edit 

  dispatch(${methods.filter(
    (m) =>
      m.includes("put") &&
      !m.includes("1") &&
      m.toLowerCase().includes(reducerName)
  )}({ id: id ,requestBody: data }) as any)
    .then((res: any) => {
      setdataEmit({
        ${elementSelector.map((element) => {
          return ` ${element.name} : "" `
        }).join(",\n")},
        id:"",
      });
      if (res.type.includes("rejected")){
        setAlert({
          ...Alert,
          show: true,
          message: "Error while updating",
          color: "danger",
        });

      }else{
        dispatch(${methods.filter(
          (m) =>
            m.includes("get") &&
            !m.includes("1") &&
            m.toLowerCase().includes(reducerName)
        )}({}) as any);
        setAlert({
          ...Alert,
          show: true,
          message: "Updated Succesfully",
          color: "success",
        });
      }  
    })
    .catch((error: any) => {
      setAlert({
        ...Alert,
        show: true,
        message: "Something went wrong",
        color: "danger",
      });
      console.error(error);
    });
};

// this is for delete

const onDeleteHandler = () => {
  dispatch(${methods.filter(
    (m) =>
      m.includes("delete") &&
      !m.includes("1") &&
      m.toLowerCase().includes(reducerName)
  )}({id:dataEmit.id}) as any)
    .then((res: any) => {
      if (res.type.includes("rejected")){
        setAlert({
          ...Alert,
          show: true,
          message: "Error while deleting",
          color: "danger",
        });

      }else{
        dispatch(${methods.filter(
          (m) =>
            m.includes("get") &&
            !m.includes("1") &&
            m.toLowerCase().includes(reducerName)
        )}({}) as any);
        setAlert({
          ...Alert,
          show: true,
          message: "Deleted Successfully",
          color: "success",
        });
      }
    })
    .catch((error: any) => {
      setAlert({
        ...Alert,
        show: true,
        message: "Something went wrong",
        color: "danger",
      });
      console.error(error);
    });
  setdataEmit({
    ${elementSelector.map((element) => {
          return ` ${element.name} : "" `
        }).join(",\n")},
        id:"",
  });
};

 `;



// generate the slice file with builder cases for each async thunk
const pagereturnContent = `
return <>
<div class="container-fluid m-0 p-0">
    <div class="row">
        <div class="col-md-12">
            <div class="card px-4 py-4 border-0 rounded-0 card-full-stretch">
                <!-- {/* add new button here with offcanvas placed here*/} -->
                <div class="mb-3 d-flex justify-content-end">
                    <RdsOffcanvas offcanvasbutton={
                      <div className="d-flex justify-content-end">
                          <RdsButton type={"button"}
                                     label={"New ${reducerName}"}
                                     iconColorVariant="light"
                                     size="small"
                                     colorVariant="primary"
                                     icon="plus"
                                     iconFill={false}
                                     iconStroke={true}
                                     iconHeight="12px"
                                     iconWidth="12px"></RdsButton>
                      </div>
                    }
                    placement={"end"}
                    backDrop={true}
                    scrolling={false}
                    preventEscapeKey={false}
                    offId={"new${reducerName}"}
                    canvasTitle={"New ${reducerName}"}
                    offcanvaswidth={550}
                  >
                    <Rds${convertToCamelCase(`${componentName}`)}
                    ${elementSelector.map((element)=>{
                      return `${element.name}Prop = {""}`
                    }).join("\n")}
                    onSaveHandler={onNewCreate}
                    ></Rds${convertToCamelCase(`${componentName}`)}>
                  </RdsOffcanvas>
                </div>


                <!-- your datatable element placed here-->
                <RdsCompDatatable classes="table__userTable"
                                  tableHeaders={tableHeaders}
                                  pagination={true} actionPosition="right"
                                  tableData={Data} // data
                                  actions={actions} // add action={[ add array of actions you require]} here to have action dropdown
                                  onActionSelection={onActionSelection}
                                  // ------add here onActionSelction for what function you want to call-----
                                  recordsPerPage={5}
                                  recordsPerPageSelectListOption={true}></RdsCompDatatable>
                <RdsOffcanvas placement={"end"}
                              backDrop={true}
                              scrolling={false}
                              preventEscapeKey={false}
                              offId={"${reducerName}Edit"}
                              canvasTitle={"Edit"}
                              offcanvaswidth={550}>
                    <>
                    <Rds${convertToCamelCase(`${componentName}`)} ${elementSelector.map((element)=>
                        {
                        return `${element.name}Prop = {dataEmit.${element.name}}`
                        }).join("\n")}



                        onSaveHandler={onEdithandler}
                        >
                    </Rds${convertToCamelCase(`${componentName}`)}>
                    </>
                </RdsOffcanvas>
                <!-- your alert element placed here -->
                <div class="offset-md-4 col-md-4 mt-3 col-12 position-absolute bottom-0 mb-3 position-lg-relative custom-responsive-alert" role="alert">
                    {Alert.show && (
                    <RdsAlert alertmessage={Alert.message}
                              colorVariant={Alert.color}></RdsAlert>
                    )}
                </div>

                <!-- {/*******************  Offcanvas all elements placed here   ***********************/} -->
            </div>

            <!-- alert popup declaration -->
            <RdsCompAlertPopup alertID={"${reducerName}Del"}
                               onSuccess={onDeleteHandler}></RdsCompAlertPopup>
            <RdsCompAlertPopup alertID="tenant-delete-off" onSuccess={handleDeleteRecord} />
        </div>
    </div>
</div>
      </>
              }
export default ${reducerName};
`;

const pageContent =` ${pageimports}
 ${pageLogic}
 ${pagereturnContent}`

//  console.log(componentFile)
//  console.log(pageContent)


 function createPage(pageName,moduleName) {
  const command = `npm run create:module --moduleName=${moduleName} --pageName=${pageName}`;
  
  try {
    execSync(command);
    const pagePath = path.join(
      __dirname,
      `../raaghu-mfe/rds_pages/rds-page-${pageName}/src/${pageName}`,
      `${pageName}.tsx`
    );
    const pagepathres = path.resolve(pagePath);
    fs.writeFileSync(pagepathres, pageContent, 'utf-8');
    console.log(`Component "${componentName}" created successfully.`);
  } catch (error) {
    console.error(`Error creating component "${componentName}": ${error.message}`);
  }
}

createPage(`${reducerName}`,`${reducerName}`)



