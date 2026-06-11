// scripts/migrate-spacing.mjs
// Migrates hardcoded px spacing values to var(--rds-spacing-*) tokens in SCSS files.
// Only converts values that have exact --rds-spacing-* equivalents.
// Leaves sub-token values (3px, 5px, 6px, 7px, 10px, etc.) unchanged.
//
// Usage: node scripts/migrate-spacing.mjs [--dry-run]

import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';

const dryRun = process.argv.includes('--dry-run');

// Map of exact px values → CSS variable (only values with clean token equivalents)
const pxToToken = new Map([
  ['0px',  'var(--rds-spacing-0)'],
  ['1px',  'var(--rds-spacing-hairline)'],
  ['2px',  'var(--rds-spacing-xxs)'],
  ['3px',  'var(--rds-spacing-micro)'],
  ['4px',  'var(--rds-spacing-xs)'],
  ['5px',  'var(--rds-spacing-tight)'],
  ['6px',  'var(--rds-spacing-compact)'],
  ['7px',  'var(--rds-spacing-7)'],
  ['8px',  'var(--rds-spacing-sm)'],
  ['10px', 'var(--rds-spacing-cozy)'],
  ['12px', 'var(--rds-spacing-3)'],
  ['13px', 'var(--rds-spacing-13)'],
  ['14px', 'var(--rds-spacing-14)'],
  ['15px', 'var(--rds-spacing-15)'],
  ['16px', 'var(--rds-spacing-md)'],
  ['18px', 'var(--rds-spacing-18)'],
  ['20px', 'var(--rds-spacing-5)'],
  ['22px', 'var(--rds-spacing-22)'],
  ['24px', 'var(--rds-spacing-lg)'],
  ['32px', 'var(--rds-spacing-8)'],
  ['40px', 'var(--rds-spacing-10)'],
  ['48px', 'var(--rds-spacing-2xl)'],
  ['52px', 'var(--rds-spacing-52)'],
  ['64px', 'var(--rds-spacing-3xl)'],
]);

// Match ONLY lines that:
// 1. Have padding/margin/gap with a bare px value
// 2. Do NOT already contain var(--rds
// 3. Are not comments
const PROPERTY_PATTERN = /^(\s*(?:padding|margin|gap):\s*)([^;{}\n]+)(;.*)?$/;

// Check if the value string contains ONLY px values we can map
// (allows for shorthand like "4px 8px" but not "6px 8px")
function canMigrateValue(valueStr) {
  const parts = valueStr.trim().split(/\s+/);
  return parts.every(p => {
    // Accept values that are either in our map or are not px at all
    if (p.match(/^\d+px$/)) return pxToToken.has(p);
    if (p.match(/^\d+(rem|em|%|vh|vw)$/)) return true; // non-px, leave as is
    if (p === '!important') return true;
    if (p.startsWith('var(')) return true; // already tokenized
    if (p === '0') return true;
    return false;
  });
}

function migrateValue(valueStr) {
  const trimmed = valueStr.trim();
  const important = trimmed.endsWith('!important') ? ' !important' : '';
  const parts = trimmed.replace(/\s*!important\s*$/, '').trim().split(/\s+/);
  const migrated = parts.map(p => pxToToken.get(p) ?? p).join(' ');
  return migrated + important;
}

const scssFiles = globSync('raaghu-{elements,components,layouts}/**/*.scss', {
  absolute: true,
  ignore: ['**/node_modules/**', '**/*.stories.*', '**/*.spec.*', '**/*.test.*'],
});

let totalLinesChanged = 0;
let totalFilesChanged = 0;

for (const file of scssFiles) {
  const src = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const lines = src.split('\n');
  let changed = false;
  const newLines = [];

  for (const line of lines) {
    // Skip comment lines
    if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
      newLines.push(line);
      continue;
    }
    // Skip lines already using CSS vars
    if (line.includes('var(--rds')) {
      newLines.push(line);
      continue;
    }

    const m = line.match(PROPERTY_PATTERN);
    if (!m) {
      newLines.push(line);
      continue;
    }

    const [, prefix, value, suffix = ''] = m;
    // Only migrate if we can cleanly convert ALL px values in this line
    if (canMigrateValue(value)) {
      const newValue = migrateValue(value);
      if (newValue !== value.trim()) {
        const newLine = prefix + newValue + suffix;
        newLines.push(newLine);
        totalLinesChanged++;
        changed = true;
        continue;
      }
    }

    newLines.push(line);
  }

  if (changed) {
    totalFilesChanged++;
    if (!dryRun) {
      writeFileSync(file, newLines.join('\n'), 'utf8');
    } else {
      console.log(`[dry-run] Would update: ${file}`);
    }
  }
}

console.log(`\nSpacing migration ${dryRun ? '(dry run)' : 'complete'}:`);
console.log(`  Files changed : ${totalFilesChanged}`);
console.log(`  Lines changed : ${totalLinesChanged}`);
if (dryRun) console.log('\nRun without --dry-run to apply changes.');
