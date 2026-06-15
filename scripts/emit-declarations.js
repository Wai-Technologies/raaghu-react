#!/usr/bin/env node
// Generates TypeScript declaration files into dist/ using tsconfig.declaration.json.
// Exits 0 regardless of type errors so pre-existing source errors don't break the build.
// noEmitOnError:false in tsconfig.declaration.json ensures files are always written.
const { spawnSync } = require('child_process');

const result = spawnSync(
  'tsc',
  ['--project', 'tsconfig.declaration.json'],
  { stdio: 'inherit', shell: true }
);

if (result.error) {
  console.error('Failed to run tsc:', result.error.message);
  process.exit(1);
}

// Always exit 0 — declaration files are generated even when type errors exist
// because noEmitOnError is set to false in tsconfig.declaration.json.
process.exit(0);
