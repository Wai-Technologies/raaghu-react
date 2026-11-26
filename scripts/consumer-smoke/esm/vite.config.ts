import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const dir = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(dir, '../../..');

/**
 * Consumer builds of the packaged ESM entry (dist/index.mjs, preserveModules output).
 * `SMOKE_ENTRY` selects the fixture:
 *   - `main.ts`        imports the whole package (default)
 *   - `main-button.ts` imports only RdsButton (tree-shaking check, RDS-066)
 *   - `main-mui-button.ts` imports only MUI Button (baseline for the check above)
 */
const entry = process.env.SMOKE_ENTRY ?? 'main.ts';
const outDir = process.env.SMOKE_OUT_DIR ?? '.consumer-smoke-esm';

export default defineConfig({
  logLevel: 'error',
  root: dir,
  resolve: {
    alias: {
      '@waiin/raaghu-react': path.join(repo, 'dist/index.mjs'),
    },
  },
  build: {
    outDir: path.join(repo, outDir),
    emptyOutDir: true,
    rollupOptions: {
      input: path.join(dir, entry),
    },
  },
});
