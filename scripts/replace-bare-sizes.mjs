/**
 * Replace bare width/height/min/max/flex-basis px with --rds-size-*.
 * Unmapped values that appear in a file are lifted to component-local
 * --rds-<slug>-dim-N custom properties at the first block root.
 *
 * Usage: node scripts/replace-bare-sizes.mjs [file...]
 */
import fs from 'fs';
import path from 'path';
import {
  ROOTS,
  walkScss,
  replacePxInValue,
  matchingParenEnd,
} from './lib/scss-px-replace.mjs';

const SIZE_PROP =
  /^(width|height|min-width|max-width|min-height|max-height|flex-basis)$/i;

/** Global size map */
const MAP = new Map([
  ['0px', '0'],
  ['4px', 'var(--rds-size-xs)'],
  ['8px', 'var(--rds-size-sm)'],
  ['12px', 'var(--rds-size-12)'],
  ['14px', 'var(--rds-size-14)'],
  ['16px', 'var(--rds-size-md)'],
  ['18px', 'var(--rds-size-18)'],
  ['20px', 'var(--rds-size-20)'],
  ['24px', 'var(--rds-size-lg)'],
  ['28px', 'var(--rds-size-28)'],
  ['32px', 'var(--rds-size-xl)'],
  ['36px', 'var(--rds-size-36)'],
  ['40px', 'var(--rds-size-40)'],
  ['44px', 'var(--rds-size-44)'],
  ['48px', 'var(--rds-size-2xl)'],
  ['56px', 'var(--rds-size-56)'],
  ['64px', 'var(--rds-size-3xl)'],
  ['80px', 'var(--rds-size-4xl)'],
  ['96px', 'var(--rds-size-5xl)'],
]);

function slugFromFile(file) {
  const base = path.basename(file, '.scss');
  return base.replace(/^rds-comp-/, '').replace(/^rds-/, '').replace(/_/g, '-');
}

function collectUnmappedSizes(source) {
  const counts = new Map();
  const lines = source.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (
      trimmed.startsWith('//') ||
      trimmed.startsWith('*') ||
      trimmed.startsWith('/*') ||
      trimmed.startsWith('@media') ||
      trimmed.startsWith('@container') ||
      trimmed.startsWith('--')
    ) {
      continue;
    }
    const declRe = /(^|[{;\s])([a-zA-Z][\w-]*)\s*:\s*/g;
    let m;
    while ((m = declRe.exec(line))) {
      const prop = m[2];
      if (!SIZE_PROP.test(prop)) continue;
      const valueStart = m.index + m[0].length;
      let depth = 0;
      let j = valueStart;
      for (; j < line.length; j++) {
        const ch = line[j];
        if (ch === '(') depth++;
        else if (ch === ')') depth = Math.max(0, depth - 1);
        else if ((ch === ';' || ch === '}') && depth === 0) break;
      }
      let value = line.slice(valueStart, j);
      let cleaned = '';
      let i = 0;
      while (i < value.length) {
        if (value.startsWith('var(', i)) {
          i = matchingParenEnd(value, i + 3);
          cleaned += 'VAR';
          continue;
        }
        cleaned += value[i];
        i++;
      }
      const pxRe = /(-?\d+)px\b/g;
      let pm;
      while ((pm = pxRe.exec(cleaned))) {
        const key = pm[1] + 'px';
        if (MAP.has(key) || key === '0px') continue;
        if (key.includes('.') || Number(pm[1]) < 0) continue;
        counts.set(key, (counts.get(key) || 0) + 1);
      }
      declRe.lastIndex = j;
    }
  }
  return counts;
}

function insertLocalVars(source, slug, unmapped) {
  if (unmapped.size === 0) return { source, localMap: new Map() };

  const localMap = new Map();
  const entries = [...unmapped.keys()].sort(
    (a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10),
  );
  const declLines = entries.map((px, idx) => {
    const name = `--rds-${slug}-dim-${idx + 1}`;
    localMap.set(px, `var(${name})`);
    return `  ${name}: ${px};`;
  });

  const newline = source.includes('\r\n') ? '\r\n' : '\n';
  const lines = source.split(/\r?\n/);

  let insertAt = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*\.rds[\w-]*\s*\{/.test(lines[i]) || /^\s*\.rds[\w-]*\s*,/.test(lines[i])) {
      if (lines[i].includes('{')) {
        insertAt = i + 1;
        break;
      }
      for (let k = i + 1; k < Math.min(i + 5, lines.length); k++) {
        if (lines[k].includes('{')) {
          insertAt = k + 1;
          break;
        }
      }
      if (insertAt >= 0) break;
    }
  }

  if (insertAt < 0) {
    return {
      source: [`/* auto size dims */`, ...declLines.map((l) => l.trim()), '', ...lines].join(
        newline,
      ),
      localMap,
    };
  }

  lines.splice(insertAt, 0, ...declLines, '');
  return { source: lines.join(newline), localMap };
}

function transformFile(source, file) {
  const slug = slugFromFile(file);
  const unmapped = collectUnmappedSizes(source);
  const { source: withLocals, localMap } = insertLocalVars(source, slug, unmapped);

  const combined = new Map([...MAP, ...localMap]);
  const newline = withLocals.includes('\r\n') ? '\r\n' : '\n';
  const lines = withLocals.split(/\r?\n/);
  let changed = withLocals !== source;

  const result = lines.map((line) => {
    const trimmed = line.trim();
    if (
      trimmed.startsWith('//') ||
      trimmed.startsWith('*') ||
      trimmed.startsWith('/*') ||
      trimmed.startsWith('@media') ||
      trimmed.startsWith('@container') ||
      trimmed.startsWith('--')
    ) {
      return line;
    }

    const declRe = /(^|[{;\s])([a-zA-Z][\w-]*)\s*:\s*/g;
    let out = '';
    let last = 0;
    let m;
    let lineChanged = false;

    while ((m = declRe.exec(line))) {
      const prop = m[2];
      const valueStart = m.index + m[0].length;
      if (!SIZE_PROP.test(prop)) continue;

      let depth = 0;
      let j = valueStart;
      for (; j < line.length; j++) {
        const ch = line[j];
        if (ch === '(') depth++;
        else if (ch === ')') depth = Math.max(0, depth - 1);
        else if ((ch === ';' || ch === '}') && depth === 0) break;
      }
      const value = line.slice(valueStart, j);
      const updated = replacePxInValue(value, combined);
      if (updated !== value) lineChanged = true;
      out += line.slice(last, valueStart) + updated;
      last = j;
      declRe.lastIndex = j;
    }

    if (!lineChanged) return line;
    changed = true;
    return out + line.slice(last);
  });

  return { updated: result.join(newline), changed };
}

const targets = process.argv.slice(2);
const files = targets.length ? targets : ROOTS.flatMap((r) => walkScss(r));

let changedCount = 0;
for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  const { updated, changed } = transformFile(original, file);
  if (changed) {
    fs.writeFileSync(file, updated);
    changedCount++;
    console.log('updated', file.replace(/\\/g, '/'));
  }
}
console.log(`Done. Updated ${changedCount} file(s).`);
