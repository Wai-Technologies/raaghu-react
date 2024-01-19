
// Imports
const path = require('path');
const child_process_1 = require("child_process");

function startCmd(name, cmd) {
    const process = child_process_1.exec(cmd);
    process.stdout.on('data', (chunk) => {
        console.log(name, chunk);
    });
    process.stderr.on('data', (chunk) => {
        console.log(name, chunk, true);
    });
}

function startApps(apps) {
    for (const app of apps) {
        const cmd = `cd .\\raaghu-mfe\\rds_pages\\${app} && npm run dev`;
        console.log('DEVSVR: ', app);
        startCmd(app, cmd);
    }
}

async function start() {

    const args = process.env.npm_config_projects ? process.env.npm_config_projects : undefined;

    if (args != undefined && args != null) {
        console.log('Starting...', args);
        let projectToBuildArray = args.split(',');

        startApps(projectToBuildArray);

    } else {
        console.log('Starting all apps...');
        const cmd = `cd .\\raaghu-mfe && npm run start`;
        startCmd('All', cmd);
    }

}

start();

