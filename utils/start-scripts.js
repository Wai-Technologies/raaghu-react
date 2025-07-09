
// Imports
const { exec } = require('child_process');

function startCmd(name, cmd, cwd = '.') {
    const process = exec(cmd, { cwd });
    process.stdout.on('data', (chunk) => {
        console.log(`[${name}]`, chunk);
    });
    process.stderr.on('data', (chunk) => {
        console.error(`[${name}]`, chunk);
    });
    process.on('close', (code) => {
        console.log(`[${name}] Process exited with code ${code}`);
    });
}

async function start() {
    const args = process.env.npm_config_projects ? process.env.npm_config_projects : undefined;

    if (args) {
        console.log('Starting specific projects...', args);
        const projects = args.split(',');
        
        for (const project of projects) {
            const trimmedProject = project.trim();
            if (['pages', 'storybook'].includes(trimmedProject)) {
                if (trimmedProject === 'pages') {
                    console.log('Starting pages...');
                    startCmd('Pages', 'npm run dev', './raaghu-pages');
                } else if (trimmedProject === 'storybook') {
                    console.log('Starting storybook...');
                    startCmd('Storybook', 'npm run storybook');
                }
            } else {
                console.log(`Unknown project: ${trimmedProject}`);
            }
        }
    } else {
        console.log('Starting Storybook by default...');
        startCmd('Storybook', 'npm run storybook');
    }
}

start();