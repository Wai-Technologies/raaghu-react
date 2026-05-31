// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist', 'node_modules', 'storybook-static']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // ── No debug output in production code ──────────────────────────────
      'no-console': ['warn', { allow: [] }],

      // ── TypeScript quality ───────────────────────────────────────────────
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],

      // ── React ────────────────────────────────────────────────────────────
      'react-hooks/exhaustive-deps': 'warn',

      // ── Accessibility (basic) ─────────────────────────────────────────────
      // Reminder: full a11y is covered by jest-axe in tests
      'no-restricted-syntax': [
        'warn',
        {
          // Flag onClick on non-interactive elements without role
          selector: 'JSXOpeningElement[name.name=/^(div|span|li|td|tr)$/] > JSXAttribute[name.name="onClick"]:not(~ JSXAttribute[name.name="role"])',
          message: 'Interactive <div>/<span> must have role="button" (or similar) and keyboard handlers.',
        },
      ],
    },
  },
  // Relax rules in test and story files
  {
    files: ['**/*.test.{ts,tsx}', '**/*.stories.{ts,tsx}', '**/tests/**'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
], storybook.configs["flat/recommended"]);
