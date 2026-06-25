/**
 * S6440 fix: extract React hooks from Storybook render arrow functions
 * into PascalCase wrapper components.
 * Run: node scripts/fix-stories-hooks.mjs
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SKIP = new Set(['node_modules', 'dist', 'build', '.git']);
const hookRe =
  /\buse(State|Effect|Memo|Callback|Ref|Reducer|LayoutEffect|Context)\b|React\.use(State|Effect|Memo|Callback|Ref|Reducer|LayoutEffect|Context)\b/;

function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, files);
    else if (e.name.endsWith('.stories.tsx')) files.push(p);
  }
  return files;
}

function findMatchingBrace(content, openIndex) {
  let depth = 0;
  for (let i = openIndex; i < content.length; i++) {
    if (content[i] === '{') depth++;
    else if (content[i] === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function findStoryExportBefore(content, renderIndex) {
  const before = content.slice(0, renderIndex);
  const matches = [...before.matchAll(/export const (\w+):\s*Story(?:Obj<[^>]*>)?\s*=\s*\{/g)];
  if (matches.length === 0) return null;
  return matches[matches.length - 1][1];
}

function findExportStart(content, storyName) {
  const re = new RegExp(`export const ${storyName}:\\s*Story(?:Obj<[^>]*>)?\\s*=\\s*\\{`);
  const m = re.exec(content);
  return m ? m.index : -1;
}

function collectRenderMatches(content) {
  const renderPatterns = [
    /render:\s*\([^)]*\)\s*=>\s*\{/g,
    /render:\s*\(\{[^}]*\}\)\s*=>\s*\{/g,
  ];
  const matches = [];
  for (const re of renderPatterns) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(content)) !== null) {
      const bodyBraceStart = m.index + m[0].length - 1;
      const bodyBraceEnd = findMatchingBrace(content, bodyBraceStart);
      if (bodyBraceEnd === -1) continue;
      const block = content.slice(m.index, bodyBraceEnd + 1);
      if (!hookRe.test(block)) continue;
      const storyName = findStoryExportBefore(content, m.index);
      if (!storyName) continue;

      const params = m[0].slice('render:'.length, m[0].length - 4).trim(); // drop " => {"
      const body = content.slice(bodyBraceStart + 1, bodyBraceEnd);

      matches.push({
        renderStart: m.index,
        renderEnd: bodyBraceEnd + 1,
        params,
        body,
        storyName,
      });
    }
  }
  return matches;
}

function fixFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  const matches = collectRenderMatches(original);
  if (matches.length === 0) return false;

  let content = original;

  for (const match of [...matches].sort((a, b) => b.renderStart - a.renderStart)) {
    const componentName = `${match.storyName}Story`;
    content =
      content.slice(0, match.renderStart) +
      `render: ${componentName}` +
      content.slice(match.renderEnd);
  }

  const byStory = new Map();
  for (const match of matches) {
    if (!byStory.has(match.storyName)) byStory.set(match.storyName, match);
  }

  for (const [storyName, match] of [...byStory.entries()].sort((a, b) => {
    return findExportStart(content, b[0]) - findExportStart(content, a[0]);
  })) {
    const componentName = `${storyName}Story`;
    const exportStart = findExportStart(content, storyName);
    if (exportStart === -1) continue;

    const componentDecl = `const ${componentName} = ${match.params} => {${match.body}};\n\n`;
    content = content.slice(0, exportStart) + componentDecl + content.slice(exportStart);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  return false;
}

let changed = 0;
for (const file of walk(ROOT)) {
  if (fixFile(file)) {
    changed++;
    console.log('Fixed:', path.relative(ROOT, file).replace(/\\/g, '/'));
  }
}
console.log(`Updated ${changed} files.`);
