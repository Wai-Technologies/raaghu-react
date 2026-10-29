import fs from 'fs';
import os from 'os';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath, pathToFileURL } from 'url';
import { build } from 'esbuild';
import docgen from 'react-docgen-typescript';

const require = createRequire(import.meta.url);
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'docs', 'ai');
const pkg = require(path.join(ROOT, 'package.json'));
const BARRELS = [
  ['element', 'raaghu-elements/index.ts'],
  ['component', 'raaghu-components/index.ts'],
  ['layout', 'raaghu-layouts/index.ts'],
];
const EXPORT_RE = /export\s*\{\s*default\s+as\s+(\w+)\s*(?:,[^}]*)?\}\s*from\s*['"](\.[^'"]+)['"]/g;

function readExports() {
  const entries = [];
  for (const [kind, barrel] of BARRELS) {
    const src = fs.readFileSync(path.join(ROOT, barrel), 'utf8');
    const deprecated = new Set(
      [...src.matchAll(/@deprecated[^\n]*\n\s*export\s*\{\s*default\s+as\s+(\w+)/g)].map((m) => m[1])
    );
    for (const [, name, rel] of src.matchAll(EXPORT_RE)) {
      if (deprecated.has(name)) continue;
      const base = path.join(path.dirname(path.join(ROOT, barrel)), rel);
      const file = ['.tsx', '.ts', '/index.tsx', '/index.ts'].map((ext) => base + ext).find(fs.existsSync);
      if (file) entries.push({ kind, name, file });
    }
  }
  return entries;
}

function describeProps(props) {
  return Object.values(props)
    .filter((p) => {
      const files = [p.parent, ...(p.declarations ?? [])].filter(Boolean).map((d) => d.fileName);
      return files.length > 0 && !files.every((f) => f.includes('node_modules'));
    })
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((p) => {
      const dep = (p.description ?? '').match(/@deprecated\s*([^\n]*)/);
      const description = (p.description ?? '').replace(/@deprecated[^\n]*/, '').trim();
      return {
        name: p.name,
        type: p.type?.raw ?? p.type?.name,
        required: p.required,
        ...(p.defaultValue?.value !== undefined ? { default: String(p.defaultValue.value) } : {}),
        ...(description ? { description } : {}),
        ...(dep ? { deprecated: dep[1].trim() || true } : {}),
      };
    });
}

function generateComponents() {
  const exportsList = readExports();
  const parser = docgen.withCustomConfig(path.join(ROOT, 'tsconfig.app.json'), {
    savePropValueAsString: true,
    shouldExtractLiteralValuesFromEnum: true,
    shouldRemoveUndefinedFromOptional: true,
  });
  const docs = parser.parse([...new Set(exportsList.map((e) => e.file))]);
  return exportsList.map(({ kind, name, file }) => {
    const rel = path.relative(ROOT, file).split(path.sep).join('/');
    const inFile = docs.filter((d) => path.resolve(d.filePath) === path.resolve(file));
    const doc =
      inFile.find((d) => d.displayName.toLowerCase() === name.toLowerCase()) ??
      inFile.sort((a, b) => Object.keys(b.props).length - Object.keys(a.props).length)[0] ??
      null;
    const props = doc ? describeProps(doc.props) : [];
    const muiBase = doc
      ? [...new Set(Object.values(doc.props).map((p) => p.parent).filter((p) => p?.fileName.includes('@mui')).map((p) => p.name))]
      : [];
    return {
      name,
      kind,
      import: `import { ${name} } from '${pkg.name}';`,
      source: rel,
      ...(doc?.description ? { description: doc.description } : {}),
      ...(muiBase.length ? { inheritsFrom: muiBase } : {}),
      props: props.filter((p) => !p.deprecated),
      deprecatedProps: props.filter((p) => p.deprecated).map(({ name: n, deprecated }) => ({ name: n, use: deprecated })),
    };
  });
}

async function loadTokenVars() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'rds-tokens-'));
  const outfile = path.join(tmp, 'tokens.mjs');
  await build({
    entryPoints: [path.join(ROOT, 'raaghu-react-themes/tokens/build-rds-css-vars.ts')],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile,
    logLevel: 'error',
  });
  const { buildRdsCssVars } = await import(pathToFileURL(outfile).href);
  const light = buildRdsCssVars('light');
  const dark = buildRdsCssVars('dark');
  fs.rmSync(tmp, { recursive: true, force: true });
  return Object.keys({ ...light, ...dark })
    .sort()
    .map((name) => ({ name, light: light[name] ?? null, dark: dark[name] ?? null }));
}

function category(name) {
  const m = name.match(/^--rds-(font-size|font-weight|font-family|line-height|letter-spacing|spacing|size|border-radius|border-width|elevation|z-index|motion|transition|breakpoint|color|background|text|primary|secondary|success|warning|error|info|action)/);
  return m ? m[1] : 'component';
}

function tokensMarkdown(tokens) {
  const groups = new Map();
  for (const t of tokens) {
    const c = category(t.name);
    if (!groups.has(c)) groups.set(c, []);
    groups.get(c).push(t);
  }
  const cell = (v) => (v === null ? '—' : `\`${String(v).replace(/\|/g, '\\|')}\``);
  const lines = [
    '# Raaghu Design Tokens',
    '',
    'Generated by `npm run docs:ai` from `raaghu-react-themes/tokens/build-rds-css-vars.ts`. Do not edit by hand.',
    '',
    'Use these as `var(--rds-*)` in SCSS and `sx`. Never hardcode a hex, rgba, px font size, font weight, line height or duration that one of these tokens already covers.',
    '',
    `Total: ${tokens.length} variables. Machine-readable copy: \`docs/ai/tokens.json\`.`,
    '',
  ];
  const order = [...groups.keys()].sort((a, b) => (a === 'component') - (b === 'component') || a.localeCompare(b));
  for (const g of order) {
    lines.push(`## ${g}`, '', '| Token | Light | Dark |', '|---|---|---|');
    for (const t of groups.get(g)) lines.push(`| \`${t.name}\` | ${cell(t.light)} | ${t.dark === t.light ? 'same' : cell(t.dark)} |`);
    lines.push('');
  }
  return lines.join('\n');
}

const components = generateComponents();
const tokens = await loadTokenVars();
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(
  path.join(OUT_DIR, 'components.json'),
  JSON.stringify({ package: pkg.name, version: pkg.version, components }, null, 2) + '\n'
);
fs.writeFileSync(path.join(OUT_DIR, 'tokens.json'), JSON.stringify({ package: pkg.name, version: pkg.version, tokens }, null, 2) + '\n');
fs.writeFileSync(path.join(ROOT, 'docs', 'TOKENS.md'), tokensMarkdown(tokens) + '\n');
console.log(`docs:ai — ${components.length} components, ${tokens.length} tokens`);
