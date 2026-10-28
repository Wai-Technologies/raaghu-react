// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist', 'node_modules', 'storybook-static', '**/*.figma.tsx', '**/*.figma.ts']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      // Use `recommended` (not `recommended-latest`) to avoid React 19 compiler
      // rules (refs / set-state-in-effect) that flag many existing patterns.
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
    rules: {
      'no-console': 'warn',

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      // Allow ternary and short-circuit patterns used as statements (common in React)
      '@typescript-eslint/no-unused-expressions': ['error', {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      }],
      // Change @ts-ignore to @ts-expect-error only when the fix is well-understood
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',

      'react-hooks/exhaustive-deps': 'warn',
      // React Compiler rules from eslint-plugin-react-hooks@7 — opt out until
      // the codebase is ready; classic hooks rules above stay active.
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/static-components': 'off',
      'react-hooks/immutability': 'off',

      // react-refresh is designed for app HMR; library files intentionally export
      // both components and utilities from the same file
      'react-refresh/only-export-components': 'warn',
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
  // Ambient DOM lib shims legitimately use `declare var`.
  {
    files: ['**/*.d.ts'],
    rules: {
      'no-var': 'off',
    },
  },
], storybook.configs["flat/recommended"]);
