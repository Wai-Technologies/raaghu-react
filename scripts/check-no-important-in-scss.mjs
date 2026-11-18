/**
 * Governance: count !important in component SCSS.
 * Fails if count exceeds scripts/important-baseline.txt.
 * Prefer specificity / theme overrides / sx — migrate in Phase B.
 *
 * Usage: node scripts/check-no-important-in-scss.mjs
 *        node scripts/check-no-important-in-scss.mjs --set-baseline
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');
const BASELINE_FILE = path.join(__dirname, 'important-baseline.txt');
const SET_BASELINE = process.argv.includes('--set-baseline');

const SCAN_DIRS = ['raaghu-elements', 'raaghu-components', 'raaghu-layouts'];

/** Matches !important (case-insensitive word boundary after). */
const IMPORTANT_RE = /!important\b/gi;

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

function countImportantInFile(file) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  let count = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    if (
      trimmed.startsWith('//') ||
      trimmed.startsWith('/*') ||
      trimmed.startsWith('*') ||
      trimmed.startsWith('*/')
    ) {
      continue;
    }
    IMPORTANT_RE.lastIndex = 0;
    const matches = line.match(IMPORTANT_RE);
    if (matches) count += matches.length;
  }
  return count;
}

let TOTAL = 0;
const offending = [];
for (const dir of SCAN_DIRS) {
  for (const file of walkScss(path.join(REPO_ROOT, dir))) {
    const count = countImportantInFile(file);
    if (count > 0) {
      TOTAL += count;
      offending.push({ count, file: file.replace(/\\/g, '/') });
    }
  }
}

console.log('!important SCSS scan complete');
console.log(`  Current  : ${TOTAL}`);

if (SET_BASELINE) {
  fs.writeFileSync(BASELINE_FILE, `${TOTAL}\n`, 'utf8');
  console.log(`  Wrote baseline ${TOTAL} → ${path.relative(REPO_ROOT, BASELINE_FILE)}`);
  process.exit(0);
}

if (!fs.existsSync(BASELINE_FILE)) {
  console.error(`ERROR: Baseline file not found at ${BASELINE_FILE}`);
  console.error('       Run: node scripts/check-no-important-in-scss.mjs --set-baseline');
  process.exit(1);
}

const baselineRaw = fs.readFileSync(BASELINE_FILE, 'utf8').trim();
if (!/^\d+$/.test(baselineRaw)) {
  console.error(`ERROR: Invalid baseline '${baselineRaw}'`);
  process.exit(1);
}
const BASELINE = Number(baselineRaw);

console.log(`  Baseline : ${BASELINE}`);
console.log('');

if (TOTAL > BASELINE) {
  console.error(
    `FAIL: ${TOTAL - BASELINE} new !important(s) (current=${TOTAL}, baseline=${BASELINE})`,
  );
  offending
    .sort((a, b) => b.count - a.count)
    .slice(0, 30)
    .forEach(({ count, file }) => console.error(`${count}\t${file}`));
  console.error('');
  console.error(
    'Fix: prefer theme styleOverrides/variants, sx/slotProps, or scoped BEM specificity — not !important.',
  );
  process.exit(1);
}

console.log(`PASS: !important debt within baseline (current=${TOTAL} <= baseline=${BASELINE})`);
process.exit(0);
