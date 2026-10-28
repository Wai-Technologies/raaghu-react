/**
 * Governance: count bare px on size/border/radius/font-size properties in SCSS.
 * Excludes --custom-property definitions, @media/@container, and comments.
 * Fails if count exceeds scripts/raw-px-baseline.txt.
 *
 * Usage: node scripts/check-raw-px-in-scss.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');
const BASELINE_FILE = path.join(__dirname, 'raw-px-baseline.txt');

const SCAN_DIRS = ['raaghu-elements', 'raaghu-components', 'raaghu-layouts'];

const TARGET_PROP =
  /^(width|height|min-width|max-width|min-height|max-height|flex-basis|font-size|border-radius|border-top-left-radius|border-top-right-radius|border-bottom-left-radius|border-bottom-right-radius|outline|outline-width|border|border-width|border-top|border-right|border-bottom|border-left)$/i;

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

function countBarePxInFile(file) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  let count = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    if (
      trimmed.startsWith('//') ||
      trimmed.startsWith('/*') ||
      trimmed.startsWith('*') ||
      trimmed.startsWith('@media') ||
      trimmed.startsWith('@container') ||
      trimmed.startsWith('--')
    ) {
      continue;
    }

    const declRe = /(^|[{;\s])([a-zA-Z][\w-]*)\s*:\s*/g;
    let m;
    while ((m = declRe.exec(line))) {
      const prop = m[2];
      if (!TARGET_PROP.test(prop)) continue;
      const valueStart = m.index + m[0].length;
      let depth = 0;
      let j = valueStart;
      for (; j < line.length; j++) {
        const ch = line[j];
        if (ch === '(') depth++;
        else if (ch === ')') depth = Math.max(0, depth - 1);
        else if ((ch === ';' || ch === '}') && depth === 0) break;
      }
      let value = line.slice(valueStart, j);
      // Strip var() so only bare lengths remain
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
      const hits = cleaned.match(/-?\d*\.?\d+px\b/g);
      if (hits) count += hits.length;
      declRe.lastIndex = j;
    }
  }
  return count;
}

if (!fs.existsSync(BASELINE_FILE)) {
  console.error(`ERROR: Baseline file not found at ${BASELINE_FILE}`);
  process.exit(1);
}

const baselineRaw = fs.readFileSync(BASELINE_FILE, 'utf8').trim();
if (!/^\d+$/.test(baselineRaw)) {
  console.error(`ERROR: Invalid baseline '${baselineRaw}'`);
  process.exit(1);
}
const BASELINE = Number(baselineRaw);

let TOTAL = 0;
const offending = [];
for (const dir of SCAN_DIRS) {
  for (const file of walkScss(path.join(REPO_ROOT, dir))) {
    const count = countBarePxInFile(file);
    if (count > 0) {
      TOTAL += count;
      offending.push({ count, file: file.replace(/\\/g, '/') });
    }
  }
}

console.log('Raw px (size/border/radius/font) scan complete');
console.log(`  Baseline : ${BASELINE}`);
console.log(`  Current  : ${TOTAL}`);
console.log('');

if (TOTAL > BASELINE) {
  console.error(
    `FAIL: ${TOTAL - BASELINE} new bare px value(s) (current=${TOTAL}, baseline=${BASELINE})`,
  );
  offending
    .sort((a, b) => b.count - a.count)
    .slice(0, 30)
    .forEach(({ count, file }) => console.error(`${count}\t${file}`));
  process.exit(1);
}

console.log(`PASS: raw px debt within baseline (current=${TOTAL} <= baseline=${BASELINE})`);
process.exit(0);
