// Imports
let path = require("path");
let { execSync } = require("child_process");
let fs = require("fs");

// Get the component name from the command line argument
let name = process.env.npm_config_name;
if (!name) {
  console.log(
    "\x1b[31m%s\x1b[0m",
    "Component name is required. Use --name=your-component-name"
  );
  process.exit(0);
}

// Convert the name to PascalCase
function toPascalCase(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

let pascalCaseName = toPascalCase(name);

// Define the folder paths
let appFolderPath = ".";
let mainIndexFilePath = "";
if (process.argv[2] === "e") {
  appFolderPath = path.join(__dirname, "..", "raaghu-elements");
  mainIndexFilePath = path.join(
    __dirname,
    "..",
    "raaghu-elements",
    "src",
    "index.ts"
  );
} else if (process.argv[2] === "c") {
  appFolderPath = path.join(__dirname, "..", "raaghu-components");
  mainIndexFilePath = path.join(
    __dirname,
    "..",
    "raaghu-components",
    "src",
    "index.ts"
  );
} else {
  console.log(
    "\x1b[31m%s\x1b[0m",
    "Invalid argument! Use 'e' for elements or 'c' for components."
  );
  process.exit(0);
}

function writeFileErrorHandler(err) {
  if (err) console.log("\x1b[31m%s\x1b[0m", err);
}

// Generate the component
if (fs.existsSync(appFolderPath)) {
  console.log(
    "\x1b[32m%s\x1b[0m",
    "Creating " + (process.argv[2] === "e" ? "element" : "component") + "..."
  );

  let filePath = path.join(appFolderPath, "src", name, name + ".tsx");
  let storyFilePath = path.join(appFolderPath, "src", name, name + ".stories.tsx");
  let cssFilePath = path.join(appFolderPath, "src", name, name + ".css");

  if (fs.existsSync(filePath)) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      name + ".tsx already exists at this path."
    );
  } else {
    // Create the component folder if it doesn't exist
    let componentFolder = path.join(appFolderPath, "src", name);
    if (!fs.existsSync(componentFolder)) {
      fs.mkdirSync(componentFolder, { recursive: true });
    }

    // Create the .tsx file with the specified content
    let componentContent = `
import React from "react";
import './${name}.css';

interface ${pascalCaseName}Props {}

const ${pascalCaseName} = (props: ${pascalCaseName}Props) => (
  <div>${pascalCaseName} Component</div>
);

export default ${pascalCaseName};
        `;
    fs.writeFile(filePath, componentContent.trim(), writeFileErrorHandler);

    // Create the .stories.tsx file with the specified content
    let storyContent = `
import React from 'react';
import { Story, Meta } from '@storybook/react';
import ${pascalCaseName} from './${name}';

export default {
  title: 'Components/${pascalCaseName}',
  component: ${pascalCaseName},
} as Meta;

const Template: Story<{}> = (args) => <${pascalCaseName} {...args} />;

export const Default = Template.bind({});
Default.args = {};
        `;
    fs.writeFile(storyFilePath, storyContent.trim(), writeFileErrorHandler);

    // Create the .css file with some initial content
    let cssContent = `
.${name} {
  /* Add your styles here */
}
        `;
    fs.writeFile(cssFilePath, cssContent.trim(), writeFileErrorHandler);

    // Create the index.ts file
    fs.writeFile(
      path.join(appFolderPath, "src", name, "index.ts"),
      `export { default } from "./${name}";`,
      writeFileErrorHandler
    );

    // Append the export line to the main index.ts in raaghu-elements or raaghu-components
    let exportLine = `export { default as ${pascalCaseName} } from "./${name}";\n`;
    fs.appendFile(mainIndexFilePath, exportLine, writeFileErrorHandler);

    console.log(
      "\x1b[32m%s\x1b[0m",
      `Component ${name + ".tsx"} file created successfully.`
    );
    console.log(
      "\x1b[32m%s\x1b[0m",
      `Stories ${name + ".stories.tsx"} file created successfully.`
    );
    console.log(
      "\x1b[32m%s\x1b[0m",
      `CSS ${name + ".css"} file created successfully.`
    );
    if (process.argv[2] === "e") {
      console.log(
        "\x1b[32m%s\x1b[0m",
        `Export line added to elements index.ts`
      );
    } else if (process.argv[2] === "c") {
      console.log(
        "\x1b[32m%s\x1b[0m",
        `Export line added to components index.ts`                  
      );
    }
  }
} else {
  if (process.argv[2] === "e") {
    console.log("\x1b[31m%s\x1b[0m", "The elements folder is missing!!");
  } else if (process.argv[2] === "c") {
    console.log("\x1b[31m%s\x1b[0m", "The components folder is missing!!");
  }
}
