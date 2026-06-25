/**
 * Fixes SonarQube mechanical issues in *.test.tsx / *.test.ts files.
 * Run: node scripts/fix-test-sonar-issues.mjs
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const SKIP_DIRS = new Set(['node_modules', 'dist', 'build', 'coverage', 'storybook-static', '.git']);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.test\.(ts|tsx)$/.test(entry.name)) files.push(full);
  }
  return files;
}

function kebabToCamel(attr) {
  return attr.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function applyContentFixes(content) {
  let next = content;

  // S7761 — dataset access for data-* attributes
  next = next.replace(/\.getAttribute\(['"]data-testid['"]\)/g, '.dataset.testid');
  next = next.replace(/\.getAttribute\(['"]data-([a-zA-Z0-9-]+)['"]\)/g, (_, attr) => {
    return `.dataset.${kebabToCamel(attr)}`;
  });

  // S4325 — remove redundant `as HTMLElement` on getByRole results (already HTMLElement)
  next = next.replace(
    /screen\.getByRole\(([^)]+)\) as HTMLElement/g,
    'screen.getByRole($1)'
  );
  next = next.replace(
    /(toggleButton|button|btn|element|el|target|node|header|fab|input|link|tab|menuItem|option\w*Button) as HTMLElement/g,
    '$1'
  );

  // S6440 — avoid hooks in jest.mock factories; use sync callback instead
  next = next.replace(
    /jest\.mock\('react-measure',\s*\(\)\s*=>\s*\{\s*return function MockMeasure\(\{ children, onResize \}: any\) \{\s*React\.useEffect\(\(\) => \{\s*onResize\(\{ bounds: \{ width: 1200, height: 300 \} \}\);\s*\}, \[onResize\]\);\s*return children\(\{\s*measure: \{ ref: jest\.fn\(\) \},\s*measureRef: jest\.fn\(\),\s*\}\);\s*\};\s*\}\);/gs,
    `jest.mock('react-measure', () => {
  return function MockMeasure({ children, onResize }: { children: (args: unknown) => React.ReactNode; onResize?: (size: unknown) => void }) {
    if (onResize) {
      queueMicrotask(() => onResize({ bounds: { width: 1200, height: 300 } }));
    }
    return children({
      measure: { ref: jest.fn() },
      measureRef: jest.fn(),
    });
  };
});`
  );

  return next;
}

function removeUnusedImportLine(content, varName) {
  const lines = content.split('\n');
  let changed = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.includes('import ')) continue;

    // import X from '...'
    if (new RegExp(`^import\\s+${varName}\\s+from\\s+`).test(line.trim())) {
      lines.splice(i, 1);
      return { content: lines.join('\n'), changed: true };
    }

    // import { a, b, c } from '...'
    const namedMatch = line.match(/^import\s+\{([^}]+)\}\s+from\s+['"][^'"]+['"];?\s*$/);
    if (namedMatch) {
      const names = namedMatch[1].split(',').map((n) => n.trim()).filter(Boolean);
      const filtered = names.filter((n) => {
        const base = n.split(/\s+as\s+/)[0].trim();
        return base !== varName;
      });
      if (filtered.length < names.length) {
        changed = true;
        if (filtered.length === 0) {
          lines.splice(i, 1);
        } else {
          lines[i] = line.replace(namedMatch[1], ` ${filtered.join(', ')} `);
        }
        return { content: lines.join('\n'), changed };
      }
    }

    // import X, { a, b } from '...'
    const mixedMatch = line.match(/^import\s+(\w+)\s*,\s*\{([^}]+)\}\s+from\s+['"]([^'"]+)['"];?\s*$/);
    if (mixedMatch) {
      const defaultName = mixedMatch[1];
      const names = mixedMatch[2].split(',').map((n) => n.trim()).filter(Boolean);
      const fromClause = `from '${mixedMatch[3]}'`;
      if (defaultName === varName) {
        changed = true;
        lines[i] = names.length === 0
          ? ''
          : `import { ${names.join(', ')} } ${fromClause};`;
        return { content: lines.filter((_, idx) => idx !== i || lines[i] !== '').join('\n'), changed };
      }
      const filtered = names.filter((n) => n.split(/\s+as\s+/)[0].trim() !== varName);
      if (filtered.length < names.length) {
        changed = true;
        lines[i] = filtered.length === 0
          ? `import ${defaultName} ${fromClause};`
          : `import ${defaultName}, { ${filtered.join(', ')} } ${fromClause};`;
        return { content: lines.join('\n'), changed };
      }
    }
  }

  return { content, changed: false };
}

function prefixUnusedVarOnLine(line, varName) {
  const prefixed = `_${varName}`;

  // Destructuring assignment: const { container } = or const { a, container, b } =
  const destructureAssign = /(const|let)\s*\{([^}]+)\}\s*=/;
  const daMatch = line.match(destructureAssign);
  if (daMatch) {
    const inner = daMatch[2];
    const updatedInner = inner.replace(
      new RegExp(`(^|[,\\s])${varName}(\\s*[,}=]|\\s*$)`),
      `$1${prefixed}$2`
    );
    if (updatedInner !== inner) {
      return line.replace(inner, updatedInner);
    }
  }

  // Function/method destructuring params: ({ a, sx, b }) or ({ sx, ...props })
  const paramDestructure = /\((\s*\{[^}]+\})/;
  const pdMatch = line.match(paramDestructure);
  if (pdMatch) {
    const inner = pdMatch[1];
    const updatedInner = inner.replace(
      new RegExp(`([,{\\s])${varName}(\\s*[:,})])`),
      `$1${prefixed}$2`
    );
    if (updatedInner !== inner) {
      return line.replace(inner, updatedInner);
    }
  }

  // Simple param: function foo(varName, or (varName,
  const simpleParam = new RegExp(`([(,\\s])${varName}(\\s*[,):])`);
  if (simpleParam.test(line)) {
    return line.replace(simpleParam, `$1${prefixed}$2`);
  }

  // Simple assignment: const varName =
  const assignRe = new RegExp(`(const|let)\\s+${varName}\\s*=`);
  if (assignRe.test(line)) {
    return line.replace(assignRe, `$1 ${prefixed} =`);
  }

  return line;
}

function prefixUnusedVar(content, lineNum, varName) {
  const lines = content.split('\n');
  const idx = lineNum - 1;
  if (idx < 0 || idx >= lines.length) return content;

  const updatedLine = prefixUnusedVarOnLine(lines[idx], varName);
  if (updatedLine === lines[idx]) return content;

  lines[idx] = updatedLine;
  return lines.join('\n');
}

function getEslintWarnings() {
  try {
    const out = execSync('npx eslint "**/*.test.tsx" -f json', {
      cwd: ROOT,
      encoding: 'utf8',
      maxBuffer: 50 * 1024 * 1024,
    });
    return JSON.parse(out);
  } catch (e) {
    if (e.stdout) return JSON.parse(e.stdout);
    throw e;
  }
}

// Phase 1: content-level mechanical fixes
let contentChanged = 0;
for (const file of walk(ROOT)) {
  const original = fs.readFileSync(file, 'utf8');
  const updated = applyContentFixes(original);
  if (updated !== original) {
    fs.writeFileSync(file, updated);
    contentChanged++;
  }
}
console.log(`Content fixes applied to ${contentChanged} files.`);

// Phase 2: eslint --fix
try {
  execSync('npx eslint "**/*.test.tsx" --fix', {
    cwd: ROOT,
    stdio: 'inherit',
    maxBuffer: 50 * 1024 * 1024,
  });
} catch {
  // eslint exits 1 when warnings remain
}

// Phase 3: prefix unused vars / remove unused imports from eslint report (iterate)
let totalFixes = 0;
for (let round = 0; round < 5; round++) {
  const report = getEslintWarnings();
  let roundFixes = 0;

  for (const fileResult of report) {
    if (!fileResult.messages?.length) continue;
    const filePath = fileResult.filePath;
    let content = fs.readFileSync(filePath, 'utf8');
    let fileChanged = false;

    const unused = fileResult.messages.filter(
      (m) => m.ruleId === '@typescript-eslint/no-unused-vars'
    );

    for (const msg of unused) {
      const match = msg.message.match(/^'([^']+)'/);
      if (!match) continue;
      const varName = match[1];
      if (varName.startsWith('_')) continue;

      if (msg.message.includes('defined but never used') && !msg.message.includes('Allowed unused args')) {
        const lineContent = content.split('\n')[msg.line - 1] || '';
        if (lineContent.trim().startsWith('import ')) {
          const result = removeUnusedImportLine(content, varName);
          if (result.changed) {
            content = result.content;
            fileChanged = true;
            roundFixes++;
            continue;
          }
        }
      }

      const updated = prefixUnusedVar(content, msg.line, varName);
      if (updated !== content) {
        content = updated;
        fileChanged = true;
        roundFixes++;
      }
    }

    if (fileChanged) {
      fs.writeFileSync(filePath, content);
    }
  }

  totalFixes += roundFixes;
  console.log(`Round ${round + 1}: ${roundFixes} unused-var fixes`);
  if (roundFixes === 0) break;
}

console.log(`Total unused-var/import fixes: ${totalFixes}`);

// Final eslint --fix pass
try {
  execSync('npx eslint "**/*.test.tsx" --fix', {
    cwd: ROOT,
    stdio: 'inherit',
    maxBuffer: 50 * 1024 * 1024,
  });
} catch {
  // expected
}

// Summary
const finalReport = getEslintWarnings();
const remaining = finalReport.reduce((n, f) => n + (f.messages?.length || 0), 0);
const changedFiles = new Set();
for (const f of finalReport) {
  if (f.messages?.length) changedFiles.add(path.relative(ROOT, f.filePath));
}
console.log(`Remaining eslint issues in test files: ${remaining}`);
