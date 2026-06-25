import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SKIP = new Set(['node_modules', 'dist', 'build', '.git']);

function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, files);
    else if (e.name.endsWith('.stories.tsx')) files.push(p);
  }
  return files;
}

const hookRe = /\buse(State|Effect|Memo|Callback|Ref|Reducer|LayoutEffect|Context)\b/;

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

function analyze(file) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const issues = [];

  const renderPatterns = [
    /render:\s*\([^)]*\)\s*=>\s*\{/g,
    /render:\s*\(\{[^}]*\}\)\s*=>\s*\{/g,
  ];
  const renderBlocks = renderPatterns.flatMap((re) => [...content.matchAll(re)]);
  for (const m of renderBlocks) {
    const braceStart = m.index + m[0].length - 1;
    const braceEnd = findMatchingBrace(content, braceStart);
    if (braceEnd === -1) continue;
    const block = content.slice(m.index, braceEnd + 1);
    if (hookRe.test(block)) {
      issues.push({ type: 'S6440', start: m.index });
    }
  }

  return { rel, issues, file };
}

const files = walk(ROOT);
const withIssues = files.map(analyze).filter((f) => f.issues.length > 0);
console.log(`Files with hooks in render arrow functions: ${withIssues.length}`);
for (const f of withIssues) {
  console.log(`${f.rel} (${f.issues.length})`);
}
