/**
 * Replace bare px lengths on spacing properties with var(--rds-spacing-*).
 * Only touches padding/margin/gap/inset/offsets — not width/height/border/font.
 *
 * Usage: node scripts/replace-bare-spacing.mjs [file...]
 */
import fs from 'fs';
import path from 'path';

const ROOTS = ['raaghu-components', 'raaghu-elements', 'raaghu-layouts'];

const SPACING_PROP =
  /^(padding|margin|gap|row-gap|column-gap|inset|top|right|bottom|left|scroll-margin|scroll-padding)(-[a-z]+)?$/i;

/** Exact px → CSS var name (without var()) */
const MAP = new Map([
  ['0px', '0'], // unitless zero; avoids spacing token noise
  ['1px', 'var(--rds-spacing-hairline)'],
  ['-1px', 'var(--rds-spacing-neg-1)'],
  ['2px', 'var(--rds-spacing-xxs)'],
  ['-2px', 'var(--rds-spacing-neg-2)'],
  ['3px', 'var(--rds-spacing-micro)'],
  ['4px', 'var(--rds-spacing-xs)'],
  ['-4px', 'var(--rds-spacing-neg-4)'],
  ['5px', 'var(--rds-spacing-tight)'],
  ['-5px', 'var(--rds-spacing-neg-5)'],
  ['6px', 'var(--rds-spacing-compact)'],
  ['-6px', 'var(--rds-spacing-neg-6)'],
  ['7px', 'var(--rds-spacing-7)'],
  ['8px', 'var(--rds-spacing-sm)'],
  ['-8px', 'var(--rds-spacing-neg-8)'],
  ['-9px', 'var(--rds-spacing-neg-9)'],
  ['9px', 'var(--rds-spacing-9-px)'],
  ['10px', 'var(--rds-spacing-cozy)'],
  ['11px', 'var(--rds-spacing-11-px)'],
  ['12px', 'var(--rds-spacing-3)'],
  ['-12px', 'calc(-1 * var(--rds-spacing-3))'],
  ['13px', 'var(--rds-spacing-13)'],
  ['14px', 'var(--rds-spacing-14)'],
  ['-14px', 'var(--rds-spacing-neg-14)'],
  ['15px', 'var(--rds-spacing-15)'],
  ['16px', 'var(--rds-spacing-md)'],
  ['-16px', 'var(--rds-spacing-neg-16)'],
  ['18px', 'var(--rds-spacing-18)'],
  ['20px', 'var(--rds-spacing-5)'],
  ['-20px', 'var(--rds-spacing-neg-20)'],
  ['22px', 'var(--rds-spacing-22)'],
  ['24px', 'var(--rds-spacing-lg)'],
  ['-25px', 'var(--rds-spacing-neg-25)'],
  ['25px', 'var(--rds-spacing-25)'],
  ['27px', 'var(--rds-spacing-27)'],
  ['28px', 'var(--rds-spacing-28-px)'],
  ['29px', 'var(--rds-spacing-29)'],
  ['30px', 'var(--rds-spacing-30)'],
  ['32px', 'var(--rds-spacing-xl)'],
  ['33px', 'var(--rds-spacing-33)'],
  ['34px', 'var(--rds-spacing-34)'],
  ['-35px', 'var(--rds-spacing-neg-35)'],
  ['36px', 'var(--rds-spacing-36-px)'],
  ['40px', 'var(--rds-spacing-10)'],
  ['43px', 'var(--rds-spacing-43)'],
  ['44px', 'var(--rds-spacing-44)'],
  ['48px', 'var(--rds-spacing-2xl)'],
  ['52px', 'var(--rds-spacing-52)'],
  ['53px', 'var(--rds-spacing-53)'],
  ['54px', 'var(--rds-spacing-54)'],
  ['56px', 'var(--rds-spacing-56-px)'],
  ['57px', 'var(--rds-spacing-57)'],
  ['60px', 'var(--rds-spacing-60)'],
  ['64px', 'var(--rds-spacing-3xl)'],
  ['67px', 'var(--rds-spacing-67)'],
  ['68px', 'var(--rds-spacing-68)'],
  ['75px', 'var(--rds-spacing-75)'],
  ['80px', 'var(--rds-spacing-80-px)'],
  ['-80px', 'var(--rds-spacing-neg-80)'],
  ['92px', 'var(--rds-spacing-92)'],
  ['96px', 'var(--rds-spacing-96-px)'],
  ['98px', 'var(--rds-spacing-98)'],
  ['110px', 'var(--rds-spacing-110)'],
  ['122px', 'var(--rds-spacing-122)'],
  ['124px', 'var(--rds-spacing-124)'],
  ['132px', 'var(--rds-spacing-132)'],
  ['157px', 'var(--rds-spacing-157)'],
  ['160px', 'var(--rds-spacing-160)'],
  ['170px', 'var(--rds-spacing-170)'],
  ['235px', 'var(--rds-spacing-235)'],
  ['240px', 'var(--rds-spacing-240)'],
  // Repeated legacy offsets (centralized rather than left bare)
  ['17px', 'var(--rds-spacing-17)'],
  ['35px', 'var(--rds-spacing-35)'],
  ['45px', 'var(--rds-spacing-45)'],
  ['50px', 'var(--rds-spacing-50)'],
  ['55px', 'var(--rds-spacing-55)'],
  ['63px', 'var(--rds-spacing-63)'],
  ['70px', 'var(--rds-spacing-70)'],
  ['76px', 'var(--rds-spacing-76)'],
  ['84px', 'var(--rds-spacing-84)'],
  ['90px', 'var(--rds-spacing-90)'],
  ['100px', 'var(--rds-spacing-100)'],
  ['200px', 'var(--rds-spacing-200)'],
  ['210px', 'var(--rds-spacing-210)'],
  ['250px', 'var(--rds-spacing-250)'],
  ['-17px', 'var(--rds-spacing-neg-17)'],
  ['-18px', 'var(--rds-spacing-neg-18)'],
  ['-67px', 'var(--rds-spacing-neg-67)'],
  ['-93px', 'var(--rds-spacing-neg-93)'],
  ['-180px', 'var(--rds-spacing-neg-180)'],
]);

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue;
      walk(full, files);
    } else if (entry.name.endsWith('.scss') && !/(stories|test|spec)/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

/** Scan from openParenIndex (pointing at '(') to matching ')'. Returns end index exclusive. */
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

/**
 * Replace bare px in a declaration value.
 * Inside var(--name, fallback), the fallback is processed so mixed
 * fallbacks like `var(--x, var(--y) 5px)` become tokenized.
 */
function replaceInValue(value) {
  let out = '';
  let i = 0;
  while (i < value.length) {
    if (value.startsWith('var(', i)) {
      const innerStart = i + 4; // after 'var('
      const end = matchingParenEnd(value, i + 3);
      const inner = value.slice(innerStart, end - 1);
      // Split name / fallback at first top-level comma
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
        out += `var(${inner})`;
      } else {
        const name = inner.slice(0, comma);
        const fallback = replaceInValue(inner.slice(comma + 1));
        out += `var(${name},${fallback})`;
      }
      i = end;
      continue;
    }
    // Do not match the fractional part of decimals (e.g. 2px inside -11.2px)
    const prev = i > 0 ? value[i - 1] : '';
    const m = value.slice(i).match(/^(-?\d+)px\b/);
    if (m && !/[\d.]/.test(prev)) {
      const key = m[0];
      out += MAP.has(key) ? MAP.get(key) : key;
      i += key.length;
      continue;
    }
    out += value[i];
    i++;
  }
  return out;
}

/**
 * Replace spacing props anywhere on a line (supports one-liner blocks like
 * `&__x { padding-right: 84px; right: 2px; }`).
 */
function transformLine(line) {
  const trimmed = line.trim();
  if (
    trimmed.startsWith('//') ||
    trimmed.startsWith('*') ||
    trimmed.startsWith('/*')
  ) {
    return line;
  }

  const propRe = /(^|[{;\s])((?:padding|margin|gap|row-gap|column-gap|inset|top|right|bottom|left|scroll-margin|scroll-padding)(?:-[a-z]+)?)\s*:\s*/gi;
  let out = '';
  let last = 0;
  let m;
  let changed = false;
  while ((m = propRe.exec(line))) {
    const propStart = m.index + m[1].length;
    const valueStart = m.index + m[0].length;
    // Skip CSS custom property definitions (--foo:)
    const before = line.slice(Math.max(0, propStart - 2), propStart);
    if (before.endsWith('--')) continue;

    // Value ends at ; or } at depth 0 (wrt var/calc parens)
    let depth = 0;
    let j = valueStart;
    for (; j < line.length; j++) {
      const ch = line[j];
      if (ch === '(') depth++;
      else if (ch === ')') depth = Math.max(0, depth - 1);
      else if ((ch === ';' || ch === '}') && depth === 0) break;
    }
    const value = line.slice(valueStart, j);
    const updated = replaceInValue(value);
    if (updated !== value) changed = true;
    out += line.slice(last, valueStart) + updated;
    last = j;
    propRe.lastIndex = j;
  }
  if (!changed) return line;
  return out + line.slice(last);
}

function transformFile(source) {
  const newline = source.includes('\r\n') ? '\r\n' : '\n';
  const lines = source.split(/\r?\n/);
  let changed = false;
  const result = lines.map((line) => {
    const updated = transformLine(line);
    if (updated !== line) changed = true;
    return updated;
  });
  return { updated: result.join(newline), changed };
}

const targets = process.argv.slice(2);
const files = targets.length ? targets : ROOTS.flatMap((r) => walk(r));

let changedCount = 0;
let replaceCount = 0;
for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  // count replacements roughly
  const before = original;
  const { updated, changed } = transformFile(original);
  if (changed) {
    fs.writeFileSync(file, updated);
    changedCount++;
    console.log('updated', file.replace(/\\/g, '/'));
  }
}

console.log(`Done. Updated ${changedCount} file(s).`);
