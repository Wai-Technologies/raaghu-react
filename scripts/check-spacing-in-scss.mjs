/**
 * Governance: count bare px spacing declarations in SCSS.
 * Fails if count exceeds scripts/spacing-baseline.txt.
 *
 * Usage: node scripts/check-spacing-in-scss.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');
const BASELINE_FILE = path.join(__dirname, 'spacing-baseline.txt');

const SCAN_DIRS = ['raaghu-elements', 'raaghu-components', 'raaghu-layouts'];

/** padding/margin/gap (+ longhands, row/column-gap) starting with integer px */
const SPACING_PATTERN =
  /(^|[\s;{])(padding|margin|gap|row-gap|column-gap)(-[a-z]+)?:\s*[0-9]+px/;

function walkScss(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue;
      walkScss(full, files);
    } else if (entry.name.endsWith('.scss') && !/(stories|test|spec)/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

if (!fs.existsSync(BASELINE_FILE)) {
  console.error(`ERROR: Baseline file not found at ${BASELINE_FILE}`);
  process.exit(1);
}

const baselineRaw = fs.readFileSync(BASELINE_FILE, 'utf8').trim();
if (!/^\d+$/.test(baselineRaw)) {
  console.error(`ERROR: Baseline file does not contain a valid integer (got: '${baselineRaw}')`);
  process.exit(1);
}
const BASELINE = Number(baselineRaw);

let TOTAL = 0;
const offending = [];

for (const dir of SCAN_DIRS) {
  const target = path.join(REPO_ROOT, dir);
  for (const file of walkScss(target)) {
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    let count = 0;
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) continue;
      if (trimmed.startsWith('--')) continue;
      if (line.includes('var(--rds')) continue;
      if (SPACING_PATTERN.test(line)) count++;
    }
    if (count > 0) {
      TOTAL += count;
      offending.push({ count, file: file.replace(/\\/g, '/') });
    }
  }
}

console.log('Spacing px scan complete');
console.log(`  Baseline : ${BASELINE}`);
console.log(`  Current  : ${TOTAL}`);
console.log('');

if (TOTAL > BASELINE) {
  console.error(
    `FAIL: ${TOTAL - BASELINE} new hardcoded px spacing value(s) detected (current=${TOTAL}, baseline=${BASELINE})`,
  );
  console.error('');
  console.error('Offending files (file-level counts):');
  offending
    .sort((a, b) => b.count - a.count)
    .slice(0, 30)
    .forEach(({ count, file }) => console.error(`${count}\t${file}`));
  console.error('');
  console.error('Fix: replace hardcoded px values with var(--rds-spacing-*) CSS custom properties.');
  console.error('     See raaghu-react-themes/tokens/design-tokens.ts for the spacing token scale.');
  process.exit(1);
}

console.log(`PASS: No new spacing debt introduced (current=${TOTAL} <= baseline=${BASELINE})`);
process.exit(0);
