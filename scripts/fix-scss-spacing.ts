import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join, extname } from 'path';

const TOKEN_MAP: Record<string, string> = {
  '0px':  'var(--rds-spacing-0)',
  '1px':  'var(--rds-spacing-hairline)',
  '2px':  'var(--rds-spacing-xxs)',
  '3px':  'var(--rds-spacing-micro)',
  '4px':  'var(--rds-spacing-xs)',
  '5px':  'var(--rds-spacing-tight)',
  '6px':  'var(--rds-spacing-compact)',
  '7px':  'var(--rds-spacing-7)',
  '8px':  'var(--rds-spacing-sm)',
  '9px':  'var(--rds-spacing-9-px)',
  '10px': 'var(--rds-spacing-cozy)',
  '11px': 'var(--rds-spacing-11-px)',
  '12px': 'var(--rds-spacing-3)',
  '13px': 'var(--rds-spacing-13)',
  '14px': 'var(--rds-spacing-14)',
  '15px': 'var(--rds-spacing-15)',
  '16px': 'var(--rds-spacing-md)',
  '18px': 'var(--rds-spacing-18)',
  '20px': 'var(--rds-spacing-5)',
  '22px': 'var(--rds-spacing-22)',
  '24px': 'var(--rds-spacing-lg)',
  '25px': 'var(--rds-spacing-25)',
  '27px': 'var(--rds-spacing-27)',
  '28px': 'var(--rds-spacing-28-px)',
  '29px': 'var(--rds-spacing-29)',
  '30px': 'var(--rds-spacing-30)',
  '32px': 'var(--rds-spacing-xl)',
  '33px': 'var(--rds-spacing-33)',
  '34px': 'var(--rds-spacing-34)',
  '36px': 'var(--rds-spacing-36-px)',
  '40px': 'var(--rds-spacing-10)',
  '43px': 'var(--rds-spacing-43)',
  '44px': 'var(--rds-spacing-44)',
  '48px': 'var(--rds-spacing-2xl)',
  '52px': 'var(--rds-spacing-52)',
  '53px': 'var(--rds-spacing-53)',
  '54px': 'var(--rds-spacing-54)',
  '56px': 'var(--rds-spacing-56-px)',
  '57px': 'var(--rds-spacing-57)',
  '60px': 'var(--rds-spacing-60)',
  '64px': 'var(--rds-spacing-3xl)',
  '67px': 'var(--rds-spacing-67)',
  '68px': 'var(--rds-spacing-68)',
  '75px': 'var(--rds-spacing-75)',
  '80px': 'var(--rds-spacing-80-px)',
  '92px': 'var(--rds-spacing-92)',
  '96px': 'var(--rds-spacing-96-px)',
  '98px': 'var(--rds-spacing-98)',
  '110px': 'var(--rds-spacing-110)',
  '122px': 'var(--rds-spacing-122)',
  '124px': 'var(--rds-spacing-124)',
  '132px': 'var(--rds-spacing-132)',
  '157px': 'var(--rds-spacing-157)',
  '160px': 'var(--rds-spacing-160)',
  '170px': 'var(--rds-spacing-170)',
  '235px': 'var(--rds-spacing-235)',
  '240px': 'var(--rds-spacing-240)',
  // Negative offsets
  '-1px':  'var(--rds-spacing-neg-1)',
  '-2px':  'var(--rds-spacing-neg-2)',
  '-4px':  'var(--rds-spacing-neg-4)',
  '-5px':  'var(--rds-spacing-neg-5)',
  '-6px':  'var(--rds-spacing-neg-6)',
  '-8px':  'var(--rds-spacing-neg-8)',
  '-9px':  'var(--rds-spacing-neg-9)',
  '-14px': 'var(--rds-spacing-neg-14)',
  '-16px': 'var(--rds-spacing-neg-16)',
  '-20px': 'var(--rds-spacing-neg-20)',
  '-25px': 'var(--rds-spacing-neg-25)',
  '-35px': 'var(--rds-spacing-neg-35)',
  '-80px': 'var(--rds-spacing-neg-80)',
};

const SPACING_PROPS = new Set([
  'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  'gap', 'row-gap', 'column-gap',
]);

function replaceValue(val: string): string {
  const t = val.trim();
  if (
    t.startsWith('var(') || t.startsWith('calc(') ||
    t.includes('%') || t.includes('em') || t.includes('rem') ||
    t.includes('vw') || t.includes('vh') ||
    t === 'auto' || t === 'inherit' || t === 'initial' || t === 'unset' || t === '0'
  ) return val;
  return TOKEN_MAP[t] ?? val;
}

function replaceShorthand(value: string): string {
  if (value.includes('calc(') || value.includes('var(')) return value;
  const parts = value.trim().split(/\s+/);
  const replaced = parts.map(replaceValue);
  if (replaced.every((v, i) => v === parts[i])) return value;
  return replaced.join(' ');
}

function processLine(rawLine: string): string {
  // Strip trailing \r (CRLF on Windows)
  const line = rawLine.replace(/\r$/, '');
  const trimmed = line.trimStart();
  if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) {
    return rawLine;
  }
  // Match CSS declaration: indent + property + colon + value + optional !important + semicolon
  const m = line.match(/^(\s*)([\w-]+)(\s*:\s*)(.+?)(\s*(?:!important)?\s*;.*)$/);
  if (!m) return rawLine;
  const [, indent, prop, colon, rawValue, rest] = m;
  // Skip CSS custom property declarations
  if (prop.startsWith('--')) return rawLine;
  if (!SPACING_PROPS.has(prop)) return rawLine;
  if (rawValue.trim().startsWith('var(') || rawValue.includes('calc(') || rawValue.includes('%')) return rawLine;
  if (!/[0-9]+px/.test(rawValue)) return rawLine;

  const replaced = replaceShorthand(rawValue);
  if (replaced === rawValue) return rawLine;
  // Preserve original line ending (\r\n or \n)
  const ending = rawLine.endsWith('\r') ? '' : '';
  return `${indent}${prop}${colon}${replaced}${rest}`;
}

function walkScss(dir: string): string[] {
  const results: string[] = [];
  try {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      const stat = statSync(full);
      if (stat.isDirectory()) results.push(...walkScss(full));
      else if (extname(full) === '.scss') results.push(full);
    }
  } catch {}
  return results;
}

const ROOT = 'D:/Raaghu-Sagar/raaghu-react';
const DIRS = [
  join(ROOT, 'raaghu-elements'),
  join(ROOT, 'raaghu-components'),
];

let totalFiles = 0;
let totalLines = 0;

for (const dir of DIRS) {
  for (const file of walkScss(dir)) {
    const original = readFileSync(file, 'utf-8');
    // Detect line ending
    const useCRLF = original.includes('\r\n');
    const lines = original.split('\n');
    const fixed = lines.map(processLine);
    const changedCount = fixed.filter((l, i) => l !== lines[i]).length;
    if (changedCount > 0) {
      writeFileSync(file, fixed.join('\n'), 'utf-8');
      totalFiles++;
      totalLines += changedCount;
      const rel = file.replace(ROOT + '/', '').replace(ROOT + '\\', '');
      console.log(`  ${changedCount} lines → ${rel}`);
    }
  }
}

console.log(`\nDone. Fixed ${totalLines} lines across ${totalFiles} files.`);
