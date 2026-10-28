/**
 * Fail CI when raw hex colors appear outside the allowlisted token source
 * and narrow legitimate exceptions (color-picker spectrum, parse APIs, etc.).
 *
 * Policy: hex may only be authored in design-tokens.ts (and allowlisted paths).
 * Consumers must use var(--rds-*) with no color hex fallback.
 */
import fs from 'fs';
import path from 'path';

const ROOTS = [
  'raaghu-components',
  'raaghu-elements',
  'raaghu-layouts',
  'raaghu-react-themes',
];

const EXT = new Set(['.ts', '.tsx', '.scss', '.css']);

/** Paths (posix, relative to repo root) that may contain authored hex. */
const ALLOW_PATH_EXACT = new Set([
  'raaghu-react-themes/tokens/design-tokens.ts',
]);

/** Path substrings / patterns that are allowlisted. */
const ALLOW_PATH_INCLUDES = [
  // Color-picker hue spectrum + checkerboard (fixed paint, not theme chrome)
  'rds-comp-color-picker/color-picker-components.tsx',
  // Parse / API logic that matches hex string inputs
  'rds-comp-color-picker/rds-comp-color-picker.tsx',
  // Doc comments describing hex format
  'rds-comp-color-picker/rds-comp-color-picker.types.ts',
  // SVG attribute selectors matching third-party map fills
  'rds-comp-map/rds-comp-map.scss',
  // Maintenance scripts (not product paint)
  'scripts/strip-hex-fallbacks.mjs',
  'scripts/check-no-hex.mjs',
];

/** Filename suffixes allowlisted (fixtures / demos / brand SVG / Code Connect). */
const ALLOW_SUFFIXES = [
  '.test.ts',
  '.test.tsx',
  '.spec.ts',
  '.spec.tsx',
  '.stories.ts',
  '.stories.tsx',
  '.figma.ts',
  '.figma.tsx',
];

const HEX_RE = /#[0-9a-fA-F]{3,8}\b/g;

function toPosix(p) {
  return p.split(path.sep).join('/');
}

function isAllowlisted(relPosix) {
  if (ALLOW_PATH_EXACT.has(relPosix)) return true;
  if (ALLOW_PATH_INCLUDES.some((s) => relPosix.includes(s))) return true;
  if (ALLOW_SUFFIXES.some((s) => relPosix.endsWith(s))) return true;
  return false;
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'storybook-static') continue;
      walk(full, files);
    } else if (EXT.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

const violations = [];

for (const root of ROOTS) {
  for (const file of walk(root)) {
    const rel = toPosix(path.relative(process.cwd(), file));
    if (isAllowlisted(rel)) continue;

    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    lines.forEach((line, i) => {
      const trimmed = line.trim();
      // Doc comments / block comments illustrating overrides are not product paint.
      if (trimmed.startsWith('*') || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*/')) {
        return;
      }
      HEX_RE.lastIndex = 0;
      if (!HEX_RE.test(line)) return;
      HEX_RE.lastIndex = 0;
      const matches = line.match(HEX_RE) || [];
      for (const m of matches) {
        violations.push({ file: rel, line: i + 1, match: m, text: trimmed.slice(0, 120) });
      }
    });
  }
}

if (violations.length) {
  console.error(`check-no-hex: found ${violations.length} hex color(s) outside allowlist:\n`);
  for (const v of violations.slice(0, 50)) {
    console.error(`  ${v.file}:${v.line}  ${v.match}  ${v.text}`);
  }
  if (violations.length > 50) {
    console.error(`  … and ${violations.length - 50} more`);
  }
  console.error(`\nAuthor hex only in design-tokens.ts (or an allowlisted exception). Use var(--rds-*).`);
  process.exit(1);
}

console.log('check-no-hex: OK (no unauthorized hex colors)');
