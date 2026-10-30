import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');
const BASELINE_FILE = path.join(__dirname, 'typography-motion-baseline.txt');
const SET_BASELINE = process.argv.includes('--set-baseline');
const INVENTORY = process.argv.includes('--inventory');
const SCAN_DIRS = ['raaghu-elements', 'raaghu-components', 'raaghu-layouts'];

const RULES = [
  { prop: /^font-size$/, value: /(^|[\s(,])-?\d*\.?\d+(px|rem)\b/ },
  { prop: /^font-weight$/, value: /^(\d{3}|bold|bolder|lighter)\b/ },
  { prop: /^line-height$/, value: /^(\d*\.?\d+)(px|rem)?$/, ignore: /^(0|1)$/ },
  { prop: /^letter-spacing$/, value: /(^|\s)-?\d*\.?\d+(px|em|rem)\b/, ignore: /^0(px|em)?$/ },
  { prop: /^(transition|animation)(-duration|-delay)?$/, value: /(^|[\s,])\d*\.?\d+m?s\b/ },
];

function stripVars(value) {
  let prev;
  do {
    prev = value;
    value = value.replace(/var\([^()]*\)/g, '');
  } while (value !== prev);
  return value.trim();
}

function walkScss(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue;
      walkScss(full, files);
    } else if (entry.name.endsWith('.scss')) {
      files.push(full);
    }
  }
  return files;
}

const hits = [];
for (const dir of SCAN_DIRS) {
  for (const file of walkScss(path.join(REPO_ROOT, dir))) {
    fs.readFileSync(file, 'utf8')
      .split(/\r?\n/)
      .forEach((line, i) => {
        const m = line.match(/^\s*([a-z-]+)\s*:\s*([^;{]+);?\s*$/);
        if (!m) return;
        const rule = RULES.find((r) => r.prop.test(m[1]));
        if (!rule) return;
        const value = stripVars(m[2].replace(/!important/, ''));
        if (!value || (rule.ignore && rule.ignore.test(value))) return;
        if (rule.value.test(value)) {
          hits.push(`${path.relative(REPO_ROOT, file).split(path.sep).join('/')}:${i + 1}  ${m[1]}: ${m[2].trim()}`);
        }
      });
  }
}

console.log('typography/motion literal SCSS scan complete');
console.log(`  Current  : ${hits.length}`);
if (INVENTORY) hits.forEach((h) => console.log(`  ${h}`));

if (SET_BASELINE) {
  fs.writeFileSync(BASELINE_FILE, `${hits.length}\n`, 'utf8');
  console.log(`  Wrote baseline ${hits.length} → ${path.relative(REPO_ROOT, BASELINE_FILE)}`);
  process.exit(0);
}

const baseline = fs.existsSync(BASELINE_FILE) ? Number(fs.readFileSync(BASELINE_FILE, 'utf8').trim()) : 0;
console.log(`  Baseline : ${baseline}`);
if (hits.length > baseline) {
  console.error(`\nFAIL: typography/motion literals increased (current=${hits.length} > baseline=${baseline}). Use tokens from docs/TOKENS.md.`);
  process.exit(1);
}
console.log(`\nPASS: typography/motion literal debt within baseline (current=${hits.length} <= baseline=${baseline})`);
