/**
 * Applies high-volume SonarQube mechanical fixes across source files.
 * Run: node scripts/sonar-mechanical-fixes.mjs
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SKIP_DIRS = new Set(['node_modules', 'dist', 'build', 'coverage', 'storybook-static', '.git']);

const EXTENSIONS = new Set(['.ts', '.tsx']);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (EXTENSIONS.has(path.extname(entry.name))) files.push(full);
  }
  return files;
}

function applyFixes(content, filePath) {
  let next = content;
  const rel = path.relative(ROOT, filePath).replace(/\\/g, '/');
  const isTestOrStory = /\.(test|spec|stories)\.(ts|tsx)$/.test(rel);

  // S7773 — prefer Number static methods
  next = next.replace(/\bisNaN\(/g, 'Number.isNaN(');
  next = next.replace(/\bparseInt\(/g, 'Number.parseInt(');
  next = next.replace(/\bparseFloat\(/g, 'Number.parseFloat(');

  // S7764 — globalThis in production source (keep window in test setup / stories mocks)
  if (!isTestOrStory && !rel.includes('setup.ts') && !rel.includes('vitest.setup.ts')) {
    next = next.replace(/\bwindow\.(?!matchMedia|IntersectionObserver|ResizeObserver)/g, 'globalThis.');
  }

  // S7761 — dataset access patterns in tests and source
  next = next.replace(/\.getAttribute\(['"]data-([a-zA-Z0-9-]+)['"]\)/g, '.dataset.$1');
  next = next.replace(/\.getAttribute\(['"]data-testid['"]\)/g, '.dataset.testid');

  // dataset camelCase for kebab attributes
  next = next.replace(/\.dataset\.([a-z]+)-([a-z])/g, (m, a, b) => `.dataset.${a}${b.toUpperCase()}`);

  return next;
}

let changed = 0;
for (const file of walk(ROOT)) {
  const original = fs.readFileSync(file, 'utf8');
  const updated = applyFixes(original, file);
  if (updated !== original) {
    fs.writeFileSync(file, updated);
    changed++;
  }
}

console.log(`Updated ${changed} files.`);
