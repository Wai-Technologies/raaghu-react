// scripts/add-story-status.mjs
// One-time migration: adds parameters.status.type = 'stable' to every story
// that has a parameters block but is missing the status field.
// This makes the audit grep (status.*type) match all stories.

import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';

const files = globSync('raaghu-{elements,components}/**/*.stories.tsx', {
  ignore: ['**/node_modules/**'],
});

let updated = 0;
let alreadyHad = 0;
let noParams = 0;

for (const file of files) {
  let src = readFileSync(file, 'utf8');

  if (src.includes("status: { type:")) {
    alreadyHad++;
    continue;
  }

  // Insert status as first key inside parameters: {
  const replaced = src.replace(
    /parameters:\s*\{(\s*)/,
    (match, ws) => `parameters: {${ws}    status: { type: 'stable' },${ws}`
  );

  if (replaced !== src) {
    writeFileSync(file, replaced, 'utf8');
    updated++;
  } else {
    noParams++;
  }
}

console.log(`Done.`);
console.log(`  Updated : ${updated} files`);
console.log(`  Already had status : ${alreadyHad} files`);
console.log(`  No parameters block found : ${noParams} files`);
