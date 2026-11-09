/**
 * Governance: count raw px/rem/em/duration literals and unitless pixel sizes
 * in TS/TSX style code (sx, style, styled objects and *.styles.ts).
 * Excludes tests, stories, figma files, comments and values inside var(...).
 * Fails if any file has more than its entry in scripts/ts-raw-values-baseline.txt (count<TAB>path).
 *
 * Usage: node scripts/check-raw-values-in-ts.mjs [--inventory] [--set-baseline]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { checkFileBaseline } from './lib/file-baseline.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');
const BASELINE_FILE = path.join(__dirname, 'ts-raw-values-baseline.txt');
const INVENTORY = process.argv.includes('--inventory');

const SCAN_DIRS = ['raaghu-elements', 'raaghu-components', 'raaghu-layouts', 'raaghu-pages'];
const SKIP_FILE = /\.(test|spec|stories|figma)\.tsx?$|\.d\.ts$/;

const UNIT_LITERAL = /(^|[\s(,/*+:])-?\d*\.?\d+(px|rem|em|ms|s)\b/g;
const UNITLESS_SIZE =
  /\b(width|height|minWidth|maxWidth|minHeight|maxHeight|top|left|right|bottom|fontSize|letterSpacing)\s*:\s*-?\d*\.?\d+\s*[,}\n]/g;
const BREAKPOINT_NUMBER = /\bbreakpoints\.(up|down|between|only)\(\s*-?\d+/g;
const STRING = /'(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`/g;

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue;
      walk(full, files);
    } else if (/\.tsx?$/.test(entry.name) && !SKIP_FILE.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function stripVars(value) {
  let prev;
  do {
    prev = value;
    value = value.replace(/var\([^()]*\)/g, '');
  } while (value !== prev);
  return value;
}

function stripComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' ')).replace(/(^|[^:'"`\\])\/\/[^\n]*/g, '$1');
}

function scanFile(file) {
  const src = stripComments(fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n'));
  const hits = [];
  const lineOf = (idx) => src.slice(0, idx).split('\n').length;
  let m;
  STRING.lastIndex = 0;
  while ((m = STRING.exec(src))) {
    const body = stripVars(m[0].slice(1, -1).replace(/\$\{[^}]*\}/g, ' '));
    const found = (body.match(UNIT_LITERAL) || []).map((f) => f.trim().replace(/^[(,/*+:]/, '')).filter((f) => parseFloat(f) !== 0);
    found.forEach((text) => hits.push({ line: lineOf(m.index), text }));
  }
  const noStrings = src.replace(STRING, (s) => s.replace(/[^\n]/g, ' '));
  for (const re of [UNITLESS_SIZE, BREAKPOINT_NUMBER]) {
    re.lastIndex = 0;
    while ((m = re.exec(noStrings))) {
      const text = m[0].replace(/[,}\n]$/, '').trim();
      if (/:\s*-?0*\.?0+$/.test(text) || /:\s*1$/.test(text)) continue;
      hits.push({ line: lineOf(m.index), text });
    }
  }
  return hits;
}

const all = [];
const counts = [];
for (const dir of SCAN_DIRS) {
  for (const file of walk(path.join(REPO_ROOT, dir))) {
    const rel = path.relative(REPO_ROOT, file).split(path.sep).join('/');
    const fileHits = scanFile(file);
    for (const h of fileHits) all.push(`${rel}:${h.line}  ${h.text}`);
    counts.push([rel, fileHits.length]);
  }
}

if (INVENTORY) all.forEach((h) => console.log(`  ${h}`));

checkFileBaseline({
  label: 'raw TS style values',
  baselineFile: BASELINE_FILE,
  counts,
  script: 'scripts/check-raw-values-in-ts.mjs',
  fix: 'use var(--rds-*) tokens from docs/TOKENS.md.',
});
