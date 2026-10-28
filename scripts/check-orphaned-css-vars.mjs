/**
 * Governance: fail if var(--rds-*) is used but never defined.
 *
 * Definitions come from:
 *   - SCSS/CSS custom property declarations (--rds-*: …)
 *   - build-rds-css-vars.ts / design-tokens.ts quoted '--rds-*' keys
 *   - TS/TSX object keys ('--rds-*': …) and setProperty('--rds-*', …)
 *
 * Usage: node scripts/check-orphaned-css-vars.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');

const SCAN_DIRS = [
  'raaghu-elements',
  'raaghu-components',
  'raaghu-layouts',
  'raaghu-react-themes',
];

const EXTS = new Set(['.scss', '.css', '.ts', '.tsx', '.js', '.jsx', '.mjs']);
const SKIP_DIRS = new Set([
  'node_modules',
  'dist',
  '.git',
  'coverage',
  'storybook-static',
]);

const USE_RE = /var\(\s*(--rds-[a-zA-Z0-9_-]+)/g;
const DEF_SCSS_RE = /(--rds-[a-zA-Z0-9_-]+)\s*:/g;
const DEF_STR_RE = /['"](--rds-[a-zA-Z0-9_-]+)['"]\s*:/g;
const DEF_SET_RE = /setProperty\(\s*['"](--rds-[a-zA-Z0-9_-]+)['"]/g;
const ANY_QUOTED_RE = /['"](--rds-[a-zA-Z0-9_-]+)['"]/g;

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (EXTS.has(path.extname(entry.name))) files.push(full);
  }
  return files;
}

function typoHint(name, defined) {
  const alts = [
    name
      .replace(/-sm$/, '-small')
      .replace(/-md$/, '-medium')
      .replace(/-lg$/, '-large'),
    name
      .replace(/-small$/, '-sm')
      .replace(/-medium$/, '-md')
      .replace(/-large$/, '-lg'),
    name.replace(/-size-sm/, '-size-small').replace(/-size-md/, '-size-medium'),
  ].filter((a) => a !== name && defined.has(a));
  return [...new Set(alts)];
}

const files = SCAN_DIRS.flatMap((d) => walk(path.join(REPO_ROOT, d)));
const defined = new Set();
/** @type {Map<string, {file: string, line: number}[]>} */
const uses = new Map();

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  const rel = path.relative(REPO_ROOT, file).replace(/\\/g, '/');
  const isTokenSource =
    rel.includes('build-rds-css-vars') || rel.includes('design-tokens');
  const isStyleSheet = file.endsWith('.scss') || file.endsWith('.css');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let m;

    if (isStyleSheet) {
      DEF_SCSS_RE.lastIndex = 0;
      while ((m = DEF_SCSS_RE.exec(line))) defined.add(m[1]);
    }

    DEF_STR_RE.lastIndex = 0;
    while ((m = DEF_STR_RE.exec(line))) defined.add(m[1]);

    DEF_SET_RE.lastIndex = 0;
    while ((m = DEF_SET_RE.exec(line))) defined.add(m[1]);

    if (isTokenSource) {
      ANY_QUOTED_RE.lastIndex = 0;
      while ((m = ANY_QUOTED_RE.exec(line))) defined.add(m[1]);
    }

    USE_RE.lastIndex = 0;
    while ((m = USE_RE.exec(line))) {
      const name = m[1];
      // Incomplete template prefixes like var(--rds-alert-${x}-text) — skip trailing '-'
      if (name.endsWith('-')) continue;
      if (!uses.has(name)) uses.set(name, []);
      uses.get(name).push({ file: rel, line: i + 1 });
    }
  }
}

const orphans = [...uses.keys()].filter((n) => !defined.has(n)).sort();

if (orphans.length === 0) {
  console.log('PASS: no orphaned var(--rds-*) references');
  process.exit(0);
}

const instances = orphans.reduce((n, k) => n + uses.get(k).length, 0);
console.error(
  `FAIL: ${orphans.length} unique orphaned --rds-* var(s) (${instances} use site(s))`,
);
console.error('');

for (const name of orphans) {
  const hints = typoHint(name, defined);
  const hint =
    hints.length > 0 ? `  [typo-candidate → ${hints.join(', ')}]` : '';
  console.error(`${name}${hint}`);
  for (const loc of uses.get(name).slice(0, 5)) {
    console.error(`  ${loc.file}:${loc.line}`);
  }
  if (uses.get(name).length > 5) {
    console.error(`  … +${uses.get(name).length - 5} more`);
  }
}

process.exit(1);
