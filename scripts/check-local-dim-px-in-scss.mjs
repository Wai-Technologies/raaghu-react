/**
 * Governance: count bare px/rem inside --custom-property definitions in SCSS.
 * Closes the loophole where check-raw-px / check-spacing skip lines starting with --.
 * Fails if count exceeds scripts/local-dim-px-baseline.txt.
 *
 * Counts length literals on definition lines like:
 *   --rds-app-bar-dim-8: 100px;
 * Does not count values that are only var(--rds-...).
 *
 * Usage: node scripts/check-local-dim-px-in-scss.mjs
 *        node scripts/check-local-dim-px-in-scss.mjs --set-baseline
 *        node scripts/check-local-dim-px-in-scss.mjs --inventory
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');
const BASELINE_FILE = path.join(__dirname, 'local-dim-px-baseline.txt');
const SET_BASELINE = process.argv.includes('--set-baseline');
const INVENTORY = process.argv.includes('--inventory');

const SCAN_DIRS = ['raaghu-elements', 'raaghu-components', 'raaghu-layouts'];

/** Bare px or rem length (not inside a word). */
const LENGTH_RE = /-?\d*\.?\d+(?:px|rem)\b/g;

/**
 * Known central token pixel values (from spacingExact / sizeTokens / common spacing).
 * Used only for --inventory classification (Phase A backlog).
 */
const TOKEN_PX = new Map([
  [1, '--rds-spacing / hairline'],
  [2, '--rds-spacing-xxs'],
  [3, '--rds-spacing-micro'],
  [4, '--rds-spacing-xs / --rds-size-xs'],
  [5, '--rds-spacing-tight'],
  [6, '--rds-spacing-compact'],
  [7, '--rds-spacing-7'],
  [8, '--rds-spacing-sm / --rds-size-sm'],
  [10, '--rds-spacing-cozy'],
  [12, '--rds-size-12 / spacing 0.75rem'],
  [13, '--rds-spacing-13'],
  [14, '--rds-size-14 / --rds-spacing-14'],
  [15, '--rds-spacing-15'],
  [16, '--rds-spacing-md / --rds-size-md'],
  [18, '--rds-size-18 / --rds-spacing-18'],
  [20, '--rds-size-20'],
  [22, '--rds-spacing-22'],
  [24, '--rds-spacing-lg / --rds-size-lg'],
  [25, '--rds-spacing-25'],
  [27, '--rds-spacing-27'],
  [28, '--rds-size-28'],
  [29, '--rds-spacing-29'],
  [30, '--rds-spacing-30'],
  [32, '--rds-spacing-xl / --rds-size-xl'],
  [33, '--rds-spacing-33'],
  [34, '--rds-spacing-34'],
  [35, '--rds-spacing-35'],
  [36, '--rds-size-36'],
  [40, '--rds-size-40'],
  [43, '--rds-spacing-43'],
  [44, '--rds-size-44 / --rds-spacing-44'],
  [45, '--rds-spacing-45'],
  [48, '--rds-spacing-2xl / --rds-size-2xl'],
  [50, '--rds-spacing-50'],
  [52, '--rds-spacing-52'],
  [53, '--rds-spacing-53'],
  [54, '--rds-spacing-54'],
  [55, '--rds-spacing-55'],
  [56, '--rds-size-56'],
  [57, '--rds-spacing-57'],
  [60, '--rds-spacing-60'],
  [63, '--rds-spacing-63'],
  [64, '--rds-spacing-3xl / --rds-size-3xl'],
  [67, '--rds-spacing-67'],
  [68, '--rds-spacing-68'],
  [70, '--rds-spacing-70'],
  [75, '--rds-spacing-75'],
  [76, '--rds-spacing-76'],
  [80, '--rds-size-4xl'],
  [84, '--rds-spacing-84'],
  [90, '--rds-spacing-90'],
  [92, '--rds-spacing-92'],
  [96, '--rds-size-5xl'],
  [98, '--rds-spacing-98'],
  [100, '--rds-spacing-100'],
  [110, '--rds-spacing-110'],
  [122, '--rds-spacing-122'],
  [124, '--rds-spacing-124'],
  [132, '--rds-spacing-132'],
  [157, '--rds-spacing-157'],
  [160, '--rds-spacing-160'],
  [170, '--rds-spacing-170'],
  [200, '--rds-spacing-200'],
  [210, '--rds-spacing-210'],
  [235, '--rds-spacing-235'],
  [240, '--rds-spacing-240'],
  [250, '--rds-spacing-250'],
]);

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

/**
 * Strip var(...) from a value so only bare lengths remain.
 */
function stripVars(value) {
  let cleaned = '';
  let i = 0;
  while (i < value.length) {
    if (value.startsWith('var(', i)) {
      let d = 0;
      let k = i + 3;
      for (; k < value.length; k++) {
        if (value[k] === '(') d++;
        else if (value[k] === ')') {
          d--;
          if (d === 0) {
            k++;
            break;
          }
        }
      }
      i = k;
      continue;
    }
    cleaned += value[i];
    i++;
  }
  return cleaned;
}

/**
 * Extract custom-property definitions from a line and count bare lengths.
 * Returns { count, entries: [{ name, lengths: string[] }] }
 */
function analyzeCustomPropLine(line) {
  const defRe = /(--[a-zA-Z0-9-_]+)\s*:\s*([^;{}]+)/g;
  let count = 0;
  const entries = [];
  let m;
  while ((m = defRe.exec(line))) {
    const name = m[1];
    const rawValue = m[2].trim();
    const cleaned = stripVars(rawValue);
    LENGTH_RE.lastIndex = 0;
    const lengths = cleaned.match(LENGTH_RE) || [];
    if (lengths.length > 0) {
      count += lengths.length;
      entries.push({ name, lengths, rawValue });
    }
  }
  return { count, entries };
}

function countLocalDimInFile(file) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  let count = 0;
  const details = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (
      trimmed.startsWith('//') ||
      trimmed.startsWith('/*') ||
      trimmed.startsWith('*') ||
      trimmed.startsWith('*/')
    ) {
      continue;
    }
    // Only lines that define custom properties (start with -- after trim, or block of --)
    if (!trimmed.startsWith('--')) continue;

    const { count: lineCount, entries } = analyzeCustomPropLine(line);
    if (lineCount > 0) {
      count += lineCount;
      for (const e of entries) {
        details.push({ line: i + 1, ...e });
      }
    }
  }
  return { count, details };
}

let TOTAL = 0;
const offending = [];
const allDetails = [];

for (const dir of SCAN_DIRS) {
  for (const file of walkScss(path.join(REPO_ROOT, dir))) {
    const { count, details } = countLocalDimInFile(file);
    if (count > 0) {
      TOTAL += count;
      const rel = path.relative(REPO_ROOT, file).replace(/\\/g, '/');
      offending.push({ count, file: rel });
      for (const d of details) {
        allDetails.push({ file: rel, ...d });
      }
    }
  }
}

console.log('Local custom-property bare px/rem scan complete');
console.log(`  Current  : ${TOTAL}`);

if (INVENTORY) {
  console.log('');
  console.log('=== Phase A inventory (map-to-token vs keep-local) ===');
  const mapToToken = [];
  const keepLocal = [];
  for (const d of allDetails) {
    for (const len of d.lengths) {
      const n = parseFloat(len);
      const unit = len.replace(/^-?\d*\.?\d+/, '');
      let px = n;
      if (unit === 'rem') px = n * 16;
      const token = Number.isInteger(px) ? TOKEN_PX.get(px) : undefined;
      const row = {
        file: d.file,
        line: d.line,
        name: d.name,
        value: len,
        suggestion: token || null,
      };
      if (token) mapToToken.push(row);
      else keepLocal.push(row);
    }
  }
  console.log(`\nMap to existing token (${mapToToken.length}):`);
  mapToToken
    .sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line)
    .forEach((r) => console.log(`  ${r.file}:${r.line}  ${r.name}: ${r.value}  →  ${r.suggestion}`));
  console.log(`\nKeep local / rename (${keepLocal.length}):`);
  keepLocal
    .sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line)
    .forEach((r) => console.log(`  ${r.file}:${r.line}  ${r.name}: ${r.value}`));
  console.log(`\nTotals: map=${mapToToken.length} keep=${keepLocal.length} all=${TOTAL}`);
  if (!SET_BASELINE) process.exit(0);
}

if (SET_BASELINE) {
  fs.writeFileSync(BASELINE_FILE, `${TOTAL}\n`, 'utf8');
  console.log(`  Wrote baseline ${TOTAL} → ${path.relative(REPO_ROOT, BASELINE_FILE)}`);
  process.exit(0);
}

if (!fs.existsSync(BASELINE_FILE)) {
  console.error(`ERROR: Baseline file not found at ${BASELINE_FILE}`);
  console.error('       Run: node scripts/check-local-dim-px-in-scss.mjs --set-baseline');
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
    `FAIL: ${TOTAL - BASELINE} new bare px/rem in --custom-property defs (current=${TOTAL}, baseline=${BASELINE})`,
  );
  offending
    .sort((a, b) => b.count - a.count)
    .slice(0, 30)
    .forEach(({ count, file }) => console.error(`${count}\t${file}`));
  console.error('');
  console.error(
    'Fix: point at var(--rds-spacing-*) / var(--rds-size-*) when values match; otherwise use a semantic local name (not dim-N).',
  );
  process.exit(1);
}

console.log(
  `PASS: local custom-property length debt within baseline (current=${TOTAL} <= baseline=${BASELINE})`,
);
process.exit(0);
