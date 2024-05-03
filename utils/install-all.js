// Imports
let path = require("path");
let { execSync } = require("child_process");
const elementsFolderPath = path.join(__dirname, "..", "raaghu-elements");
const componentsFolderPath = path.join(__dirname, "..", "raaghu-components");
const layoutsFolderPath = path.join(__dirname, "..", "raaghu-layouts");
const themesFolderPath = path.join(__dirname, "..", "raaghu-react-themes");
const pagesFolderPath = path.join(__dirname, "..", "raaghu-pages");

console.log("\x1b[32m%s\x1b[0m", `Installing dependencies...`);
execSync(`npm install`, {
    cwd: elementsFolderPath,
    stdio: "inherit",
});

execSync(`npm install`, {
    cwd: componentsFolderPath,
    stdio: "inherit",
});

execSync(`npm install`, {
    cwd: layoutsFolderPath,
    stdio: "inherit",
});
execSync(`npm install`, {
    cwd: themesFolderPath,
    stdio: "inherit",
});
execSync(`npm install`, {
    cwd: pagesFolderPath,
    stdio: "inherit",
});

execSync(`npm install`, {
    cwd: ".",
    stdio: "inherit",
});

console.log("\x1b[32m%s\x1b[0m", `Dependencies installed successfully!!`);
