/**
 * Shared helpers for SCSS bare-px → token codemods.
 */
import fs from 'fs';
import path from 'path';

export const ROOTS = ['raaghu-components', 'raaghu-elements', 'raaghu-layouts'];

export function walkScss(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue;
      walkScss(full, files);
    } else if (entry.name.endsWith('.scss') && !/(stories|test|spec)/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

export function matchingParenEnd(str, openParenIndex) {
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

/**
 * Replace bare integer px lengths in a value using MAP.
 * Skips content inside var(...). Does not match fractional tails (11.2px).
 */
export function replacePxInValue(value, map) {
  let out = '';
  let i = 0;
  while (i < value.length) {
    if (value.startsWith('var(', i)) {
      const end = matchingParenEnd(value, i + 3);
      out += value.slice(i, end);
      i = end;
      continue;
    }
    const prev = i > 0 ? value[i - 1] : '';
    const m = value.slice(i).match(/^(-?\d*\.?\d+)px\b/);
    if (m && !/[\d.]/.test(prev)) {
      const key = m[0];
      out += map.has(key) ? map.get(key) : key;
      i += key.length;
      continue;
    }
    out += value[i];
    i++;
  }
  return out;
}

/**
 * Transform lines: for props matching propRe, replace px in values via map.
 * Skips comments, @media/@container lines, and --custom-prop definitions.
 */
export function transformPropsInFile(source, propRe, map) {
  const newline = source.includes('\r\n') ? '\r\n' : '\n';
  const lines = source.split(/\r?\n/);
  let changed = false;

  const result = lines.map((line) => {
    const trimmed = line.trim();
    if (
      trimmed.startsWith('//') ||
      trimmed.startsWith('*') ||
      trimmed.startsWith('/*') ||
      trimmed.startsWith('@media') ||
      trimmed.startsWith('@container') ||
      trimmed.startsWith('@include bp.')
    ) {
      return line;
    }

    const declRe =
      /(^|[{;\s])((?:--)?[a-zA-Z][\w-]*)\s*:\s*/g;
    let out = '';
    let last = 0;
    let m;
    let lineChanged = false;

    while ((m = declRe.exec(line))) {
      const prop = m[2];
      const valueStart = m.index + m[0].length;

      if (prop.startsWith('--')) {
        continue;
      }
      if (!propRe.test(prop)) continue;

      let depth = 0;
      let j = valueStart;
      for (; j < line.length; j++) {
        const ch = line[j];
        if (ch === '(') depth++;
        else if (ch === ')') depth = Math.max(0, depth - 1);
        else if ((ch === ';' || ch === '}') && depth === 0) break;
      }
      const value = line.slice(valueStart, j);
      const updated = replacePxInValue(value, map);
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

export function runOnRoots(transformFn) {
  const targets = process.argv.slice(2);
  const files = targets.length
    ? targets
    : ROOTS.flatMap((r) => walkScss(r));

  let changedCount = 0;
  for (const file of files) {
    const original = fs.readFileSync(file, 'utf8');
    const { updated, changed } = transformFn(original, file);
    if (changed) {
      fs.writeFileSync(file, updated);
      changedCount++;
      console.log('updated', file.replace(/\\/g, '/'));
    }
  }
  console.log(`Done. Updated ${changedCount} file(s).`);
}
