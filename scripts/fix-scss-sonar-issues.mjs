/**
 * Fix SonarQube SCSS issues:
 * - S4657: shorthand properties overriding longhand in the same rule block
 * - S4666: duplicate leaf selectors — merge declarations
 *
 * Run: node scripts/fix-scss-sonar-issues.mjs
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SKIP_DIRS = new Set(['node_modules', 'dist', 'build', 'coverage', 'storybook-static', '.git']);

const SHORTHAND_MAP = {
  background: [
    'background-color',
    'background-image',
    'background-position',
    'background-size',
    'background-repeat',
    'background-origin',
    'background-clip',
    'background-attachment',
  ],
  border: ['border-width', 'border-style', 'border-color'],
  'border-top': ['border-top-width', 'border-top-style', 'border-top-color'],
  'border-right': ['border-right-width', 'border-right-style', 'border-right-color'],
  'border-bottom': ['border-bottom-width', 'border-bottom-style', 'border-bottom-color'],
  'border-left': ['border-left-width', 'border-left-style', 'border-left-color'],
  padding: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'],
  margin: ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'],
  font: ['font-style', 'font-variant', 'font-weight', 'font-size', 'line-height', 'font-family'],
  flex: ['flex-grow', 'flex-shrink', 'flex-basis'],
  overflow: ['overflow-x', 'overflow-y'],
  transition: [
    'transition-property',
    'transition-duration',
    'transition-timing-function',
    'transition-delay',
  ],
  animation: [
    'animation-name',
    'animation-duration',
    'animation-timing-function',
    'animation-delay',
    'animation-iteration-count',
    'animation-direction',
    'animation-fill-mode',
    'animation-play-state',
  ],
  'list-style': ['list-style-type', 'list-style-position', 'list-style-image'],
  outline: ['outline-width', 'outline-style', 'outline-color'],
};

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.scss')) files.push(full);
  }
  return files;
}

function parseProperty(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
    return null;
  }
  const match = trimmed.match(/^([\w-]+)\s*:\s*(.+)$/);
  if (!match) return null;
  const value = match[2].replace(/;\s*$/, '');
  if (!value) return null;
  return { prop: match[1], value, raw: line };
}

function isColorOnlyBackground(value) {
  const v = value.trim();
  if (
    v === 'none' ||
    v === 'transparent' ||
    v === 'inherit' ||
    v === 'initial' ||
    v === 'unset' ||
    v === 'currentColor'
  ) {
    return true;
  }
  if (/^var\(/.test(v) || /^#[\da-f]{3,8}$/i.test(v) || /^rgba?\(/i.test(v) || /^hsla?\(/i.test(v)) {
    return true;
  }
  return !/[/,]/.test(v) && !/\s/.test(v);
}

function normalizeBackgroundShorthand(content) {
  return content.replace(/^(\s*)background\s*:\s*([^;{]+);/gm, (match, indent, value) => {
    if (isColorOnlyBackground(value)) {
      return `${indent}background-color: ${value.trim()};`;
    }
    return match;
  });
}

function fixDeclarationsInBlock(body) {
  const lines = body.split('\n');
  const decls = [];
  const declLineIdx = [];

  for (let i = 0; i < lines.length; i++) {
    const parsed = parseProperty(lines[i]);
    if (parsed) {
      decls.push({ ...parsed, lineIdx: i });
      declLineIdx.push(i);
    }
  }

  if (decls.length < 2) return body;

  const toRemove = new Set();

  for (let i = 0; i < decls.length; i++) {
    const decl = decls[i];

    const shorthandLonghands = SHORTHAND_MAP[decl.prop];
    if (shorthandLonghands) {
      for (let j = 0; j < i; j++) {
        if (shorthandLonghands.includes(decls[j].prop)) {
          toRemove.add(decls[j].lineIdx);
        }
      }
    }

    for (const [shorthand, longhands] of Object.entries(SHORTHAND_MAP)) {
      if (longhands.includes(decl.prop)) {
        for (let j = i + 1; j < decls.length; j++) {
          if (decls[j].prop === shorthand) {
            toRemove.add(decl.lineIdx);
          }
        }
      }
      if (decl.prop === shorthand) {
        for (let j = i + 1; j < decls.length; j++) {
          if (longhands.includes(decls[j].prop)) {
            toRemove.add(decls[j].lineIdx);
          }
        }
      }
    }

    // Duplicate same property — keep the last declaration
    for (let j = i + 1; j < decls.length; j++) {
      if (decls[j].prop === decl.prop) {
        toRemove.add(decl.lineIdx);
      }
    }
  }

  if (toRemove.size === 0) return body;

  return lines.filter((_, idx) => !toRemove.has(idx)).join('\n');
}

function processBlocks(content) {
  let result = '';
  let i = 0;

  while (i < content.length) {
    const brace = content.indexOf('{', i);
    if (brace === -1) {
      result += content.slice(i);
      break;
    }

    result += content.slice(i, brace + 1);
    let depth = 1;
    let j = brace + 1;
    const bodyStart = j;

    while (j < content.length && depth > 0) {
      if (content[j] === '{') depth++;
      else if (content[j] === '}') depth--;
      j++;
    }

    const body = content.slice(bodyStart, j - 1);
    const hasNested = body.includes('{');
    const fixedBody = hasNested ? processBlocks(body) : fixDeclarationsInBlock(body);
    result += fixedBody;
    result += '}';
    i = j;
  }

  return result;
}

function extractTopLevelBlocks(content) {
  const blocks = [];
  let depth = 0;
  let blockStart = -1;
  let selectorStart = -1;

  for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    if (ch === '{') {
      if (depth === 0) {
        selectorStart = content.lastIndexOf('\n', i);
        if (selectorStart === -1) selectorStart = 0;
        else selectorStart += 1;
        blockStart = i;
      }
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0 && blockStart !== -1) {
        const selector = content.slice(selectorStart, blockStart).trim();
        const body = content.slice(blockStart + 1, i);
        blocks.push({
          selector,
          selectorStart,
          openBrace: blockStart,
          closeBrace: i,
          body,
          hasNested: body.includes('{'),
        });
        blockStart = -1;
      }
    }
  }

  return blocks;
}

function normalizeSelector(selector) {
  return selector.replace(/\s+/g, ' ').trim();
}

function mergeDuplicateSelectors(content) {
  const blocks = extractTopLevelBlocks(content);
  const leafBlocks = blocks.filter((b) => !b.hasNested && !b.selector.startsWith('@'));

  const bySelector = new Map();
  for (const block of leafBlocks) {
    const key = normalizeSelector(block.selector);
    if (!bySelector.has(key)) bySelector.set(key, []);
    bySelector.get(key).push(block);
  }

  let result = content;
  const ops = [];

  for (const [, group] of bySelector) {
    if (group.length < 2) continue;

    const sorted = [...group].sort((a, b) => a.selectorStart - b.selectorStart);
    const declLines = [];
    const seenProps = new Map();

    for (const block of sorted) {
      for (const line of block.body.split('\n')) {
        const parsed = parseProperty(line);
        if (parsed) {
          seenProps.set(parsed.prop, line);
        } else if (line.trim()) {
          declLines.push({ type: 'other', line, key: line.trim() });
        }
      }
    }

    const mergedLines = [];
    const addedProps = new Set();
    for (const block of sorted) {
      for (const line of block.body.split('\n')) {
        const parsed = parseProperty(line);
        if (parsed) {
          if (!addedProps.has(parsed.prop)) {
            mergedLines.push(seenProps.get(parsed.prop));
            addedProps.add(parsed.prop);
          }
        } else if (line.trim()) {
          const key = line.trim();
          if (!mergedLines.some((l) => l.trim() === key)) {
            mergedLines.push(line);
          }
        }
      }
    }

    const first = sorted[0];
    const mergedFull = `${first.selector} {\n${mergedLines.join('\n')}\n}`;

    ops.push({
      replace: { start: first.selectorStart, end: first.closeBrace + 1, text: mergedFull },
      remove: sorted.slice(1).map((b) => ({ start: b.selectorStart, end: b.closeBrace + 1 })),
    });
  }

  ops.sort((a, b) => b.replace.start - a.replace.start);

  for (const op of ops) {
    for (const rem of op.remove.sort((a, b) => b.start - a.start)) {
      let start = rem.start;
      while (start > 0 && (result[start - 1] === '\n' || result[start - 1] === '\r')) start--;
      result = result.slice(0, start) + result.slice(rem.end);
      if (op.replace.start > rem.start) {
        op.replace.start -= rem.end - start;
        op.replace.end -= rem.end - start;
      }
    }
    result = result.slice(0, op.replace.start) + op.replace.text + result.slice(op.replace.end);
  }

  return result;
}

let totalChanged = 0;

for (const file of walk(ROOT)) {
  const original = fs.readFileSync(file, 'utf8');
  let updated = normalizeBackgroundShorthand(original);
  updated = processBlocks(updated);
  updated = mergeDuplicateSelectors(updated);

  if (updated !== original) {
    fs.writeFileSync(file, updated);
    totalChanged++;
    console.log('Fixed:', path.relative(ROOT, file));
  }
}

console.log(`\nUpdated ${totalChanged} SCSS files.`);
