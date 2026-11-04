import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');
const BASELINE_FILE = path.join(__dirname, 'hardcoded-text-baseline.txt');
const SET_BASELINE = process.argv.includes('--set-baseline');
const INVENTORY = process.argv.includes('--inventory');

const SCAN_DIRS = ['raaghu-elements', 'raaghu-components', 'raaghu-layouts'];
const SKIP_FILE = /\.(test|spec|stories|figma|a11y)\.tsx?$|\.d\.ts$/;
const HARDCODED_TEXT = /\b(aria-label|placeholder|title)="[A-Z][a-z]/g;

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue;
      walk(full, files);
    } else if (/\.tsx$/.test(entry.name) && !SKIP_FILE.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

const hits = [];
for (const dir of SCAN_DIRS) {
  for (const file of walk(path.join(REPO_ROOT, dir))) {
    const rel = path.relative(REPO_ROOT, file).split(path.sep).join('/');
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    lines.forEach((line, i) => {
      for (const m of line.matchAll(HARDCODED_TEXT)) hits.push(`${rel}:${i + 1}  ${m[0]}`);
    });
  }
}

if (INVENTORY) {
  hits.forEach((h) => console.log(h));
}

if (SET_BASELINE) {
  fs.writeFileSync(BASELINE_FILE, `${hits.length}\n`);
  console.log(`Baseline set to ${hits.length}`);
  process.exit(0);
}

const baseline = fs.existsSync(BASELINE_FILE) ? parseInt(fs.readFileSync(BASELINE_FILE, 'utf8').trim(), 10) : 0;
console.log('Hardcoded UI text scan complete');
console.log(`  Current  : ${hits.length}`);
console.log(`  Baseline : ${baseline}`);

if (hits.length > baseline) {
  console.error(`\nFAIL: hardcoded UI text rose above baseline (current=${hits.length} > baseline=${baseline})`);
  console.error('Expose the string through a localeText prop with English defaults instead.');
  process.exit(1);
}
console.log(`\nPASS: hardcoded UI text within baseline (current=${hits.length} <= baseline=${baseline})`);
