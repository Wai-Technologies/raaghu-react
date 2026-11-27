import storybook from "eslint-plugin-storybook";
import noBootstrapClasses from './scripts/eslint-rule-no-bootstrap-classes.cjs';

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist', 'node_modules', 'storybook-static', 'coverage', '.claude', '**/*.figma.tsx', '**/*.figma.ts']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'custom-rules': {
        rules: {
          'no-bootstrap-classes': noBootstrapClasses,
        },
      },
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'custom-rules/no-bootstrap-classes': 'error',

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      }],
      '@typescript-eslint/no-unused-expressions': ['error', {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      }],
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',

      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/static-components': 'off',
      'react-hooks/immutability': 'off',

      'react-refresh/only-export-components': 'warn',
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/*.stories.{ts,tsx}', '**/tests/**'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      'no-var': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    ignores: [
      'raaghu-components/rds-comp-chart-*/**',
      'raaghu-components/chart-utils.ts',
      'raaghu-components/chart-js-register.ts',
      'raaghu-components/use-chart.ts',
      'raaghu-components/rds-comp-empty-state/lottie-animation-renderer.tsx',
      'raaghu-components/rds-comp-video-player/**',
      'raaghu-components/rds-comp-map/**',
      'raaghu-components/rds-comp-kanban-board/**',
      'raaghu-components/rds-comp-grid/**',
      'raaghu-components/rds-comp-text-editor/**',
      'raaghu-components/rds-comp-datepicker/**',
      'raaghu-components/rds-comp-contribution/**',
      'raaghu-components/rds-comp-date-and-time-picker/**',
      'raaghu-components/rds-comp-emoji-generator/**',
      'raaghu-elements/rds-timeline/**',
      '**/*.test.{ts,tsx}',
      '**/*.stories.{ts,tsx}',
      '**/*.figma.{ts,tsx}',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            { name: 'chart.js/auto', message: 'Import chart.js parts through chart-js-register.' },
            { name: 'emojibase-data/en/data.json', message: 'Import emojibase-data only inside rds-comp-emoji-generator.' },
          ],
          patterns: [
            {
              group: [
                'chart.js', 'chart.js/*',
                'lottie-react', 'lottie-react/*',
                'react-player', 'react-player/*',
                'react-svg-worldmap', 'react-svg-worldmap/*',
                '@dnd-kit/*',
                'lexical', '@lexical/*',
                'dayjs', 'dayjs/*',
                '@mui/x-date-pickers', '@mui/x-date-pickers/*',
                '@mui/lab', '@mui/lab/*',
              ],
              message: 'Optional peer dependency: import it only inside its feature folder, exported from a subpath entry (charts, date, editor, kanban, timeline, video, map, lottie).',
            },
          ],
        },
      ],
    },
  },
], storybook.configs["flat/recommended"]);
