/**
 * One-shot / reusable: strip color hex fallbacks from var(--rds-*, #hex)
 * and nested var(--rds-*, var(--rds-*, #hex)) patterns in SCSS/CSS/TS/TSX.
 *
 * Non-color fallbacks (px, rem, numbers) are left alone.
 */
import fs from 'fs';
import path from 'path';

const ROOTS = [
  'raaghu-components',
  'raaghu-elements',
  'raaghu-layouts',
  'raaghu-react-themes',
];

const EXT = new Set(['.scss', '.css', '.ts', '.tsx']);

/** Match a hex color (#rgb, #rrggbb, #rrggbbaa) */
const HEX = '#[0-9a-fA-F]{3,8}\\b';

/**
 * Remove `, #hex` from the innermost var() that has a hex fallback.
 * Also collapses nested `var(--a, var(--b, #hex))` → `var(--a, var(--b))`
 * then a second pass can strip further if needed.
 *
 * Strategy: repeatedly replace `, #hex` that appears as a var() fallback
 * when the preceding token looks like a CSS custom property name.
 */
function stripHexFallbacks(source) {
  let result = source;
  let prev;
  // Collapse nested: var(--x, var(--y, #hex)) → var(--x, var(--y))
  // Then: var(--y, #hex) → var(--y)
  // Also: var(--x, #hex) → var(--x)
  // And double-nested already partially cleaned.
  const nestedHex = new RegExp(
    `(var\\(\\s*--[\\w-]+)\\s*,\\s*var\\((\\s*--[\\w-]+)\\s*,\\s*${HEX}\\s*\\)`,
    'g',
  );
  const simpleHex = new RegExp(
    `(var\\(\\s*--[\\w-]+)\\s*,\\s*${HEX}(\\s*\\))`,
    'g',
  );
  // Triple nesting: var(--a, var(--b, var(--c, #hex)))
  const tripleHex = new RegExp(
    `(var\\(\\s*--[\\w-]+)\\s*,\\s*var\\((\\s*--[\\w-]+)\\s*,\\s*var\\((\\s*--[\\w-]+)\\s*,\\s*${HEX}\\s*\\)\\s*\\)`,
    'g',
  );

  do {
    prev = result;
    result = result.replace(tripleHex, '$1, var($2, var($3))');
    result = result.replace(nestedHex, '$1, var($2)');
    result = result.replace(simpleHex, '$1$2');
  } while (result !== prev);

  return result;
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue;
      walk(full, files);
    } else if (EXT.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

const targets = process.argv.slice(2);
const files = targets.length
  ? targets
  : ROOTS.flatMap((r) => walk(r));

let changedCount = 0;
for (const file of files) {
  // Skip design-tokens (hex source of truth) and generated/check scripts
  if (file.replace(/\\/g, '/').includes('design-tokens.ts')) continue;

  const original = fs.readFileSync(file, 'utf8');
  const updated = stripHexFallbacks(original);
  if (updated !== original) {
    fs.writeFileSync(file, updated);
    changedCount++;
    console.log('updated', file.replace(/\\/g, '/'));
  }
}

console.log(`Done. Updated ${changedCount} file(s).`);
