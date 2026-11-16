import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { checkFileBaseline } from './lib/file-baseline.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');
const BASELINE_FILE = path.join(__dirname, 'data-theme-baseline.txt');
const INVENTORY = process.argv.includes('--inventory');

const SCAN_DIRS = ['raaghu-elements', 'raaghu-components', 'raaghu-layouts'];

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue;
      walk(full, files);
    } else if (entry.name.endsWith('.scss')) {
      files.push(full);
    }
  }
  return files;
}

const hits = [];
const counts = [];
for (const dir of SCAN_DIRS) {
  for (const file of walk(path.join(REPO_ROOT, dir))) {
    const rel = path.relative(REPO_ROOT, file).split(path.sep).join('/');
    const before = hits.length;
    fs.readFileSync(file, 'utf8')
      .split(/\r?\n/)
      .forEach((line, i) => {
        if (line.includes('data-theme') && !line.trim().startsWith('//')) hits.push(`${rel}:${i + 1}  ${line.trim()}`);
      });
    counts.push([rel, hits.length - before]);
  }
}

if (INVENTORY) hits.forEach((h) => console.log(h));

checkFileBaseline({
  label: '[data-theme] selectors in SCSS',
  baselineFile: BASELINE_FILE,
  counts,
  script: 'scripts/check-data-theme-in-scss.mjs',
  fix: 'add a light/dark pair to componentModeTokens in design-tokens.ts and reference var(--rds-*) instead.',
});
