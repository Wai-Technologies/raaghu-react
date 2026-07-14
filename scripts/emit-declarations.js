#!/usr/bin/env node
/**
 * Generates TypeScript declaration files into dist/ using tsconfig.declaration.json.
 *
 * Usage:
 *   node scripts/emit-declarations.js          # soft: emit even with type errors (exit 0 if index.d.ts exists)
 *   node scripts/emit-declarations.js --strict # fail if tsc reports errors or index.d.ts missing
 *
 * Soft mode keeps library JS builds unblocked while declarations are still produced.
 * Strict mode is for CI and npm publish gates.
 */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const strict = process.argv.includes('--strict');
const indexDts = path.join(process.cwd(), 'dist', 'index.d.ts');

const result = spawnSync(
  'tsc',
  ['--project', 'tsconfig.declaration.json'],
  { stdio: 'inherit', shell: true }
);

if (result.error) {
  console.error('Failed to run tsc:', result.error.message);
  process.exit(1);
}

const tscCode = result.status ?? 1;
const hasIndex = fs.existsSync(indexDts);

if (!hasIndex) {
  console.error('Declaration emit failed: dist/index.d.ts was not created.');
  process.exit(1);
}

if (strict && tscCode !== 0) {
  console.error(
    `Declaration type-check failed with exit code ${tscCode}. ` +
      'Fix TypeScript errors before publishing (npm run build:types -- --strict).'
  );
  process.exit(tscCode);
}

if (!strict && tscCode !== 0) {
  console.warn(
    `Warning: declaration emit completed with type errors (tsc exit ${tscCode}). ` +
      'dist/index.d.ts was written. Run `npm run build:types -- --strict` (or `npm run type-check:declarations`) to enforce a clean type gate.'
  );
}

process.exit(0);
