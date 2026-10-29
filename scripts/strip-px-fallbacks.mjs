/**
 * One-shot / reusable: strip length-containing fallbacks from var(--rds-*, …)
 * when the fallback includes px or rem (single lengths, multi-value padding,
 * or box-shadow / drop-shadow strings).
 *
 * Hex color fallbacks are handled by strip-hex-fallbacks.mjs.
 * Bare (non-var) px values are left alone.
 */
import fs from 'fs';
import path from 'path';

const ROOTS = [
  'raaghu-components',
  'raaghu-elements',
  'raaghu-layouts',
  'raaghu-react-themes',
];

const EXT = new Set(['.scss', '.css', '.ts', '.tsx']);

function matchingParenEnd(str, openParenIndex) {
  let depth = 0;
  for (let j = openParenIndex; j < str.length; j++) {
    if (str[j] === '(') depth++;
    else if (str[j] === ')') {
      depth--;
      if (depth === 0) return j + 1;
    }
  }
  return str.length;
}

/** True if fallback text contains a px or rem length token. */
function fallbackHasLength(fallback) {
  return /(-?\d*\.?\d+)(px|rem)\b/.test(fallback);
}

/**
 * Strip var() fallbacks that contain px/rem lengths.
 * Nested var() without lengths are preserved; nested with lengths are cleaned
 * recursively first.
 */
function stripPxFallbacks(source) {
  let result = '';
  let i = 0;
  while (i < source.length) {
    if (source.startsWith('var(', i)) {
      const end = matchingParenEnd(source, i + 3);
      const inner = source.slice(i + 4, end - 1);

      let depth = 0;
      let comma = -1;
      for (let k = 0; k < inner.length; k++) {
        const ch = inner[k];
        if (ch === '(') depth++;
        else if (ch === ')') depth--;
        else if (ch === ',' && depth === 0) {
          comma = k;
          break;
        }
      }

      if (comma === -1) {
        result += `var(${stripPxFallbacks(inner)})`;
      } else {
        const name = inner.slice(0, comma);
        let fallback = stripPxFallbacks(inner.slice(comma + 1));
        if (fallbackHasLength(fallback)) {
          result += `var(${name.trim()})`;
        } else {
          result += `var(${name},${fallback})`;
        }
      }
      i = end;
      continue;
    }
    result += source[i];
    i++;
  }
  return result;
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue;
      walk(full, files);
    } else if (EXT.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

const targets = process.argv.slice(2);
const files = targets.length
  ? targets
  : ROOTS.flatMap((r) => walk(r));

let changedCount = 0;
for (const file of files) {
  if (file.replace(/\\/g, '/').includes('design-tokens.ts')) continue;

  const original = fs.readFileSync(file, 'utf8');
  const updated = stripPxFallbacks(original);
  if (updated !== original) {
    fs.writeFileSync(file, updated);
    changedCount++;
    console.log('updated', file.replace(/\\/g, '/'));
  }
}

console.log(`Done. Updated ${changedCount} file(s).`);
