// const fs = require('fs');
// //import fs from 'fs'
// const path = require('path');
// // import { flags } from './flags';

// const pathToIcon = path.join(__dirname,"./flags.tsx") 
// console.log("This is the path",pathToIcon);
// const list = fs.readFileSync(pathToIcon);
// console.log("This is slag", list);

// // create a directory to store the icon files
// fs.mkdirSync('icons');

// // loop through the icons object and create a file for each one
// for (const [key, value] of Object.entries(flags)) {
//   fs.writeFileSync(`icons/${key}.svg`, value);
// }


import fs from 'fs';
import { flags } from './flags.js';

console.log("directory created")
// fs.mkdirSync('icons');

// loop through the icons object and create a file for each one
for (const [key, value] of Object.entries(flags)) {
  console.log
  fs.writeFileSync(`icons/${key}.svg`, value);
}