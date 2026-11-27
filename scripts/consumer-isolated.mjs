/**
 * Isolated consumer test: packs the library, installs it outside the repository with only the
 * required peers, and checks that the core entry works without any optional peer installed.
 *
 * Run after `npm run build`. Needs network access for `npm install`.
 * Set RAAGHU_CONSUMER_DIR to choose the folder (default: OS temp dir). It must not sit inside
 * this repository, otherwise packages resolve from the repo's node_modules and hide failures.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const optionalPeers = Object.keys(pkg.peerDependenciesMeta ?? {}).filter((name) => pkg.peerDependenciesMeta[name]?.optional);
const requiredPeers = Object.entries(pkg.peerDependencies).filter(([name]) => !optionalPeers.includes(name));
const viteBin = path.join(root, 'node_modules/vite/bin/vite.js');
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const work = path.resolve(process.env.RAAGHU_CONSUMER_DIR ?? path.join(os.tmpdir(), `raaghu-consumer-${Date.now()}`));
if (!path.relative(root, work).startsWith('..') && path.relative(root, work) !== '') {
  console.error(`RAAGHU_CONSUMER_DIR must be outside ${root}.`);
  process.exit(1);
}
const app = path.join(work, 'app');
fs.mkdirSync(path.join(app, 'src'), { recursive: true });

let failed = false;
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
  if (!ok) failed = true;
};
const run = (cmd, args, cwd, extra = {}) =>
  spawnSync(cmd, args, { cwd, encoding: 'utf8', shell: process.platform === 'win32' && cmd === npm, ...extra });

if (!fs.existsSync(path.join(root, 'dist/index.mjs'))) {
  console.error('dist is missing. Run `npm run build` first.');
  process.exit(1);
}

const packed = run(npm, ['pack', '--ignore-scripts', '--pack-destination', work], root);
const tarball = packed.stdout.trim().split(/\r?\n/).pop();
if (packed.status !== 0 || !tarball) {
  console.error(packed.stderr);
  process.exit(1);
}

fs.writeFileSync(path.join(app, 'package.json'), JSON.stringify({ name: 'raaghu-consumer', private: true, type: 'module' }, null, 2));
const install = run(
  npm,
  ['install', path.join(work, tarball), ...requiredPeers.map(([name, range]) => `${name}@${range}`), '--no-audit', '--no-fund'],
  app,
);
const installLog = `${install.stdout}\n${install.stderr}`;
check('npm install (core peers only)', install.status === 0, install.status === 0 ? '' : installLog.slice(-400));
check('no ERESOLVE warnings', !/ERESOLVE/.test(installLog));
check('no deprecated packages', !/npm warn deprecated/i.test(installLog), (installLog.match(/npm warn deprecated[^\n]*/gi) ?? []).join('; '));
check('npm ls --all', run(npm, ['ls', '--all'], app).status === 0);

const resolvable = optionalPeers.filter((name) => run(process.execPath, ['-e', `require.resolve(${JSON.stringify(`${name}/package.json`)})`], app).status === 0);
check('optional peers not installed', resolvable.length === 0, resolvable.join(', '));

fs.writeFileSync(
  path.join(app, 'src/main.js'),
  [
    "import { createElement as h } from 'react';",
    "import { createRoot } from 'react-dom/client';",
    "import { RaaghuThemeProvider, RdsButton, RdsTextField, RdsCard, RdsAlert, RdsCompEmptyState, RdsCompToolbar } from '@waiin/raaghu-react';",
    "import '@waiin/raaghu-react/styles.css';",
    "createRoot(document.getElementById('root')).render(h(RaaghuThemeProvider, null, h(RdsButton, { label: 'Save' }), h(RdsTextField, { label: 'Name' }), h(RdsCard, { title: 'Card' }), h(RdsAlert, { message: 'Hi' }), h(RdsCompEmptyState, { label: 'Empty', animated: true }), h(RdsCompToolbar)));",
  ].join('\n'),
);
fs.writeFileSync(path.join(app, 'index.html'), '<!doctype html><html><body><div id="root"></div><script type="module" src="/src/main.js"></script></body></html>');
fs.writeFileSync(path.join(app, 'vite.config.mjs'), "export default { logLevel: 'error', build: { chunkSizeWarningLimit: 100000 } };");
const build = run(process.execPath, [viteBin, 'build'], app);
check('Vite build of core components (root import)', build.status === 0, build.status === 0 ? '' : `${build.stdout}${build.stderr}`.slice(-400));

const ssrScript = (loader) => `
const { createElement: h } = ${loader === 'esm' ? "await import('react')" : "require('react')"};
const { renderToString } = ${loader === 'esm' ? "await import('react-dom/server')" : "require('react-dom/server')"};
const lib = ${loader === 'esm' ? "await import('@waiin/raaghu-react')" : "require('@waiin/raaghu-react')"};
const html = renderToString(h(lib.RaaghuThemeProvider, null, h(lib.RdsButton, { label: 'Save' }), h(lib.RdsCard, { title: 'Card' })));
if (!html.includes('Save')) throw new Error('SSR output missing content');
`;
const esm = run(process.execPath, ['--input-type=module', '-e', ssrScript('esm')], app);
check('Node ESM import + SSR', esm.status === 0, esm.status === 0 ? '' : esm.stderr.split('\n').find(Boolean));
const cjs = run(process.execPath, ['-e', ssrScript('cjs')], app);
check('Node CJS require + SSR', cjs.status === 0, cjs.status === 0 ? '' : cjs.stderr.split('\n').find(Boolean));

for (const [subpath, peer] of [['charts', 'chart.js'], ['editor', 'lexical'], ['kanban', '@dnd-kit/core'], ['timeline', '@mui/lab']]) {
  const sub = run(process.execPath, ['--input-type=module', '-e', `await import('@waiin/raaghu-react/${subpath}')`], app);
  const message = `${sub.stderr}`;
  check(`/${subpath} fails fast without ${peer}`, sub.status !== 0 && message.includes(peer), message.split('\n').find((l) => l.includes('Cannot find')) ?? '');
}

console.log(`\nConsumer folder: ${work}`);
process.exit(failed ? 1 : 0);
