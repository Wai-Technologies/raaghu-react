import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    storybookTest({
      storybookScript: 'npm run storybook -- --ci',
      storybookUrl: 'http://localhost:6006',
    }),
  ],
  optimizeDeps: {
    // Pre-scan ALL story files so Vite bundles their deps before the first test
    // run, preventing mid-test page reloads that kill the vitest browser runner.
    entries: [
      './raaghu-elements/**/*.stories.tsx',
      './raaghu-components/**/*.stories.tsx',
      './raaghu-layouts/**/*.stories.tsx',
      './.storybook/vitest.setup.ts',
      './vitest.setup.ts',
    ],
    include: [
      '@testing-library/jest-dom/matchers',
      'react',
      'react-dom',
      '@storybook/test',
      'storybook/preview-api',
    ],
    // These CJS packages use runtime require() for missing/peer deps (immutable,
    // draft-js). Excluding them prevents Vite's pre-bundle phase from crashing
    // at test startup. They are loaded on-demand by the browser at story render.
    exclude: [
      'markdown-to-jsx',
      'immutable',
      'draft-js',
      'html-to-draftjs',
      'react-draft-wysiwyg',
    ],
  },
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
    setupFiles: [
      './.storybook/vitest.setup.ts',
      './vitest.setup.ts',
    ],
  },
});
