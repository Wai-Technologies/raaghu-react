/**
 * Consumer smoke: Vite-build an ESM import of dist/index.mjs,
 * require dist/index.cjs, and SSR-render every Rds* export.
 *
 * Run after `npm run build`.
 */
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cjsPath = path.join(root, 'dist/index.cjs');
const esmPath = path.join(root, 'dist/index.mjs');

if (!fs.existsSync(cjsPath) || !fs.existsSync(esmPath)) {
  console.error('dist bundles are missing. Run `npm run build` before test:consumer-smoke.');
  process.exit(1);
}

const viteBin = path.join(root, 'node_modules/vite/bin/vite.js');

/** Runs a consumer Vite build of one fixture from scripts/consumer-smoke/esm. */
function consumerBuild(entry, outDir) {
  const result = spawnSync(process.execPath, [
    viteBin,
    'build',
    '--config',
    path.join(root, 'scripts/consumer-smoke/esm/vite.config.ts'),
  ], {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, SMOKE_ENTRY: entry, SMOKE_OUT_DIR: outDir },
  });
  if (result.status !== 0) {
    console.error(`Vite ESM consumer build failed for ${entry}.`);
    process.exit(result.status ?? 1);
  }
  const assetsDir = path.join(root, outDir, 'assets');
  const chunks = fs.existsSync(assetsDir)
    ? fs.readdirSync(assetsDir).filter((file) => file.endsWith('.js'))
    : [];
  const bytes = chunks.reduce((sum, file) => sum + fs.statSync(path.join(assetsDir, file)).size, 0);
  return { chunks, bytes };
}

if (process.env.SMOKE_SKIP_VITE !== '1') {
  consumerBuild('main.ts', '.consumer-smoke-esm');
  console.log('Vite ESM consumer build passed.');

  // RDS-066: importing only RdsButton must not pull heavy optional libraries into the consumer.
  const button = consumerBuild('main-button.ts', '.consumer-smoke-button');
  const muiBaseline = consumerBuild('main-mui-button.ts', '.consumer-smoke-mui-button');
  const heavy = button.chunks.filter((file) => /hls|dash|draft|chart|react-player|emoji/i.test(file));
  const extraKb = (button.bytes - muiBaseline.bytes) / 1024;
  console.log(
    `Tree-shaking: RdsButton consumer ${(button.bytes / 1024).toFixed(1)} kB JS, ` +
      `MUI Button baseline ${(muiBaseline.bytes / 1024).toFixed(1)} kB, delta ${extraKb.toFixed(1)} kB.`,
  );
  if (heavy.length > 0) {
    console.error(`RdsButton-only consumer pulled in heavy chunks: ${heavy.join(', ')}`);
    process.exit(1);
  }
  const maxDeltaKb = Number(process.env.SMOKE_BUTTON_MAX_DELTA_KB ?? 50);
  if (extraKb > maxDeltaKb) {
    console.error(`RdsButton-only consumer is ${extraKb.toFixed(1)} kB over MUI Button alone (limit ${maxDeltaKb} kB).`);
    process.exit(1);
  }
}

const require = createRequire(import.meta.url);
let lib;
try {
  lib = require(cjsPath);
} catch (error) {
  console.error('CJS require failed:', error);
  process.exit(1);
}
console.log('CJS require passed.');

const Provider = lib.RaaghuThemeProvider;
if (typeof Provider !== 'function') {
  console.error('RaaghuThemeProvider is not a function export on the CJS bundle.');
  process.exit(1);
}

/** Props required for a component to render at all. */
const requiredProps = {
  RdsBreadcrumbs: { items: [{ label: 'Home' }] },
  RdsSidebar: { items: [{ label: 'Home' }] },
  RdsTable: { columns: [{ id: 'name', label: 'Name' }], rows: [] },
  RdsPagination: { count: 1 },
  RdsRadio: { options: [{ label: 'A', value: 'a' }] },
  RdsSelect: { options: [{ label: 'A', value: 'a' }] },
  RdsAutocomplete: { options: [{ label: 'A' }] },
  RdsCompAppShell: { children: 'app' },
  RdsLayout: { children: 'page' },
  RdsTabs: { tabs: [{ label: 'One' }] },
  RdsStepper: { steps: [{ label: 'One' }] },
  RdsCarousel: { items: ['One'] },
  RdsList: { items: [{ primary: 'One' }] },
  RdsMenu: { items: [{ label: 'One' }] },
  RdsCompNotification: { notifications: [] },
  RdsCompChartArea: { labels: ['A'], series: [1] },
  RdsCompAreaChart: { labels: ['A'], series: [1] },
  RdsCompLineChart: { labels: ['A'], series: [1] },
  RdsBottomNavigation: { items: [{ label: 'Home', value: 'home' }] },
  RdsButtonDropdown: { options: [{ id: 'a', label: 'A' }] },
  RdsCompAiChatBot: { messages: [] },
  RdsTimeline: { items: [{ label: 'One' }] },
  RdsToggleButton: { options: [{ label: 'A', value: 'a' }] },
};

const names = Object.keys(lib).filter((name) => name.startsWith('Rds') && typeof lib[name] === 'function');
const failures = [];

for (const name of names) {
  const Comp = lib[name];
  const props = requiredProps[name] ?? {};
  try {
    renderToString(
      createElement(Provider, { defaultMode: 'light', initializeOnMount: false }, createElement(Comp, props)),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    failures.push({ name, message });
  }
}

if (failures.length > 0) {
  console.error(`SSR failed for ${failures.length} of ${names.length} Rds* exports:`);
  for (const failure of failures) {
    console.error(`- ${failure.name}: ${failure.message.split('\n')[0]}`);
  }
  process.exit(1);
}

console.log(`Consumer smoke passed (${names.length} Rds* exports SSR-rendered).`);
