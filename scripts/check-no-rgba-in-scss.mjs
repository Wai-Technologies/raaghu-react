/**
 * Governance: count rgb()/rgba() color literals in SCSS.
 * Fails if any file has more than its entry in scripts/rgba-baseline.txt (count<TAB>path).
 * Prefer var(--rds-*) / color-mix / alpha tokens — migrate in Phase A.
 *
 * Usage: node scripts/check-no-rgba-in-scss.mjs
 *        node scripts/check-no-rgba-in-scss.mjs --set-baseline
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { checkFileBaseline } from './lib/file-baseline.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');
const BASELINE_FILE = path.join(__dirname, 'rgba-baseline.txt');

const SCAN_DIRS = ['raaghu-elements', 'raaghu-components', 'raaghu-layouts'];

/** Matches rgb( and rgba( (case-insensitive). */
const RGB_RE = /\brgba?\s*\(/gi;

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

function countRgbInFile(file) {
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
    RGB_RE.lastIndex = 0;
    const matches = line.match(RGB_RE);
    if (matches) count += matches.length;
  }
  return count;
}

const counts = [];
for (const dir of SCAN_DIRS) {
  for (const file of walkScss(path.join(REPO_ROOT, dir))) {
    counts.push([file, countRgbInFile(file)]);
  }
}

checkFileBaseline({
  label: 'rgb()/rgba() literals',
  baselineFile: BASELINE_FILE,
  counts,
  script: 'scripts/check-no-rgba-in-scss.mjs',
  fix: 'replace with var(--rds-*) / color-mix / alpha tokens from design-tokens.ts.',
});
