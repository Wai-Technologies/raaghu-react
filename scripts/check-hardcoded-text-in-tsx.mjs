import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { checkFileBaseline } from './lib/file-baseline.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');
const BASELINE_FILE = path.join(__dirname, 'hardcoded-text-baseline.txt');
const INVENTORY = process.argv.includes('--inventory');

const SCAN_DIRS = ['raaghu-elements', 'raaghu-components', 'raaghu-layouts'];
const SKIP_FILE = /\.(test|spec|stories|figma|a11y)\.tsx?$|\.d\.ts$/;
const TEXT = `[A-Za-z][A-Za-z0-9 ,.'!?…&()-]*`;
const PATTERNS = [
  new RegExp(`\\b(?:aria-label|placeholder|title|alt|label|tooltip)=(?:"${TEXT}"|\\{\\s*['"]${TEXT}['"]\\s*\\})`, 'g'),
  /(?<![=\w])>\s*[A-Z][a-z]+(?:[ ,.'!?-]+[A-Za-z]+)*[.!?]?\s*</g,
];

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
const counts = [];
for (const dir of SCAN_DIRS) {
  for (const file of walk(path.join(REPO_ROOT, dir))) {
    const rel = path.relative(REPO_ROOT, file).split(path.sep).join('/');
    const before = hits.length;
    fs.readFileSync(file, 'utf8')
      .split(/\r?\n/)
      .forEach((line, i) => {
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) return;
        for (const re of PATTERNS) for (const m of line.matchAll(re)) hits.push(`${rel}:${i + 1}  ${m[0].trim()}`);
      });
    counts.push([rel, hits.length - before]);
  }
}

if (INVENTORY) hits.forEach((h) => console.log(h));

checkFileBaseline({
  label: 'hardcoded UI text',
  baselineFile: BASELINE_FILE,
  counts,
  script: 'scripts/check-hardcoded-text-in-tsx.mjs',
  fix: 'expose the string through a localeText prop with English defaults instead.',
});
