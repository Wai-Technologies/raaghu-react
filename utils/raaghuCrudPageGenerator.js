let path = require("path");
const { execSync } = require('child_process');
const fs = require("fs");

const jsonPath = require(`./${process.argv[3]}.json`)

const jsonProp = jsonPath.Properties
const jsonNavConnections = jsonPath.NavigationConnections
const jsonNavProp = jsonPath.NavigationProperties



if(jsonNavProp.length!=0 && jsonNavConnections.length!=0 && jsonProp.length!=0){

    const command = `npm run create:hybridManycrud ${process.argv[2]} ${process.argv[3]}`;

    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Error creating Page: ${error.message}`);
    }

}else if(jsonNavProp.length==0 && jsonNavConnections.length!=0 && jsonProp.length!=0){
    const command = `npm run create:manyManycrud ${process.argv[2]} ${process.argv[3]}`;

    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Error creating Page: ${error.message}`);
    }

}else if(jsonNavProp.length!=0 && jsonNavConnections.length==0 && jsonProp.length!=0){
    const command = `npm run create:oneManycrud ${process.argv[2]} ${process.argv[3]}`;

    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Error creating Page: ${error.message}`);
    }

}else{
    const command = `npm run create:simplecrud ${process.argv[2]} ${process.argv[3]}`;

    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Error creating Page: ${error.message}`);
    }
}