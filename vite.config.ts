import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs';
import path from "path";
import pkg from './package.json';
import { buildStaticCssSnapshot } from './raaghu-react-themes/tokens/build-rds-css-vars';

/**
 * Every dependency and peer dependency stays external so consumers (and their bundlers)
 * decide what to include. In particular `react-player` (and the hls/dash players it pulls in)
 * is no longer inlined into the library output (RDS-066).
 */
const externalPackages = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
];
const isExternal = (id: string) =>
  !/\.(css|scss|json)$/.test(id) &&
  externalPackages.some((name) => id === name || id.startsWith(`${name}/`));

/** Prepends light+dark --rds-* tokens so styles.css works without JS (RDS-035). */
function prependStaticTokensCss(): Plugin {
  return {
    name: 'prepend-static-tokens-css',
    writeBundle(outputOptions) {
      const outDir = outputOptions.dir ?? path.dirname(outputOptions.file ?? 'dist');
      const cssPath = path.join(outDir, 'raaghu-react.css');
      if (!fs.existsSync(cssPath)) return;
      const tokens = `/* Raaghu static design tokens (light + dark) */\n${buildStaticCssSnapshot()}\n\n`;
      const existing = fs.readFileSync(cssPath, 'utf8');
      if (existing.includes('/* Raaghu static design tokens')) return;
      fs.writeFileSync(cssPath, tokens + existing);
    },
  };
}

/** Prepends "use client" to component, index, provider and hook modules for React Server Components. */
function addUseClientDirective(): Plugin {
  const directive = '"use client";\n';
  const isClientModule = (fileName: string) =>
    !fileName.includes('vendor') &&
    (/\/rds-[^/]+\/rds-[^/]+\.(mjs|cjs)$/.test(fileName) ||
      /^index\.(mjs|cjs)$/.test(fileName) ||
      /provider|hooks/.test(fileName));
  return {
    name: 'add-use-client-directive',
    generateBundle(_, bundle) {
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'chunk' && isClientModule(fileName) && !chunk.code.startsWith(directive)) {
          chunk.code = directive + chunk.code;
        }
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      prependStaticTokensCss(),
      addUseClientDirective(),
    ],
    resolve: {
      alias: {
        '@icons/material/UnfoldMoreHorizontalIcon': '@mui/icons-material/UnfoldMore',
        '@icons/material/CheckIcon': '@mui/icons-material/Check',
      },
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'index.ts'),
        name: 'RaaghuReact',
        formats: ['es', 'cjs'],
        // With preserveModules, `entryName` is the module path relative to
        // `preserveModulesRoot` (e.g. `index`, `raaghu-elements/rds-button/rds-button`).
        // `.mjs` / `.cjs` keep Node resolving each file with the right module system
        // (package.json has no "type" field).
        // Inlined third-party JSON (e.g. emojibase-data) is rewritten from `node_modules/` to
        // `vendor/` because npm never packs nested `node_modules` directories.
        fileName: (format, entryName) =>
          `${entryName.replace(/(^|\/)node_modules\//g, '$1vendor/')}.${format === 'es' ? 'mjs' : 'cjs'}`,
        // Keep the stylesheet at dist/raaghu-react.css (package exports + prependStaticTokensCss).
        cssFileName: 'raaghu-react',
      },
      rollupOptions: {
        external: isExternal,
        output: {
          interop: 'auto',
          // One output file per source module so bundlers can tree-shake per component (RDS-066).
          preserveModules: true,
          preserveModulesRoot: __dirname,
        },
      },
      sourcemap: true,
      emptyOutDir: true,
    },
    optimizeDeps: {
      include: ["chart.js"],
    },
  };
})
