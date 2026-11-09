import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');
const BASELINE_FILE = path.join(__dirname, 'data-theme-baseline.txt');
const SET_BASELINE = process.argv.includes('--set-baseline');
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
for (const dir of SCAN_DIRS) {
  for (const file of walk(path.join(REPO_ROOT, dir))) {
    const rel = path.relative(REPO_ROOT, file).split(path.sep).join('/');
    fs.readFileSync(file, 'utf8')
      .split(/\r?\n/)
      .forEach((line, i) => {
        if (line.includes('data-theme') && !line.trim().startsWith('//')) hits.push(`${rel}:${i + 1}  ${line.trim()}`);
      });
  }
}

if (INVENTORY) hits.forEach((h) => console.log(h));

if (SET_BASELINE) {
  fs.writeFileSync(BASELINE_FILE, `${hits.length}\n`);
  console.log(`Baseline set to ${hits.length}`);
  process.exit(0);
}

const baseline = fs.existsSync(BASELINE_FILE) ? parseInt(fs.readFileSync(BASELINE_FILE, 'utf8').trim(), 10) : 0;
console.log('data-theme selector scan complete');
console.log(`  Current  : ${hits.length}`);
console.log(`  Baseline : ${baseline}`);

if (hits.length > baseline) {
  console.error(`\nFAIL: [data-theme] selectors in SCSS increased (current=${hits.length} > baseline=${baseline}).`);
  console.error('Add a light/dark pair to componentModeTokens in design-tokens.ts and reference var(--rds-*) instead.');
  process.exit(1);
}
console.log(`\nPASS: [data-theme] selector debt within baseline (current=${hits.length} <= baseline=${baseline})`);
