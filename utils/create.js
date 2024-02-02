// Imports
let path = require("path");
let { execSync } = require("child_process");
let fs = require("fs");


let eTc = process.argv[2];
console.log(eTc);

if (
    (process.argv[2] === "e" || process.argv[2] === "c")  &&
    (process.argv[2] === "p" || process.argv[2] === "m") 
) {
    console.log("\x1b[31m%s\x1b[0m", "Invalid command!!");
    process.exit(0);
}

let name = process.env.npm_config_name;
let appFolderPath = ".";
if (eTc == "e") {
    appFolderPath = path.join(__dirname, "..", "raaghu-elements");
} else if (eTc == "c") {
    appFolderPath = path.join(__dirname, "..", "raaghu-components");
} 

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
          

            console.log(
                "\x1b[32m%s\x1b[0m",
                `index.ts is successfully created at src/${name}/index.ts`
            );

      console.log("\x1b[32m%s\x1b[0m", "Done!!");
    }
  } 
} 
else {
    if (eTc == "e") {
        console.log("\x1b[31m%s\x1b[0m", "The elements folder is missing!!");
    } else if (eTc == "c") {
        console.log("\x1b[31m%s\x1b[0m", "The components folder is missing!!");
    }
}