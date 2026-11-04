import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const REPO_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SCAN_DIRS = ['raaghu-elements', 'raaghu-components', 'raaghu-layouts', 'raaghu-react-themes'];
const ALLOWED = new Set(['raaghu-react-themes/tokens/_breakpoints.scss']);
const LITERAL = /\d(?:px|rem|em)\b/;

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== 'dist') walk(full, files);
    } else if (entry.name.endsWith('.scss')) {
      files.push(full);
    }
  }
  return files;
}

const violations = [];
for (const dir of SCAN_DIRS) {
  for (const file of walk(path.join(REPO_ROOT, dir))) {
    const rel = path.relative(REPO_ROOT, file).split(path.sep).join('/');
    if (ALLOWED.has(rel)) continue;
    const text = fs.readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' '));
    for (const match of text.matchAll(/@media[^{;]*/g)) {
      const query = match[0].split('\n').map((l) => l.replace(/\/\/.*$/, '')).join(' ');
      if (!LITERAL.test(query)) continue;
      const line = text.slice(0, match.index).split('\n').length;
      violations.push(`${rel}:${line}  ${query.trim()}`);
    }
  }
}

if (violations.length) {
  console.error(`FAIL: ${violations.length} @media quer${violations.length === 1 ? 'y uses' : 'ies use'} a literal length.`);
  console.error('Use bp.up()/bp.down()/bp.between() or #{bp.bp(key)} from raaghu-react-themes/tokens/_breakpoints.scss.\n');
  for (const v of violations) console.error(`  ${v}`);
  process.exit(1);
}
console.log('PASS: no literal lengths in SCSS @media queries');
