/** @type {import('stylelint').Config} */
module.exports = {
  // Focused on the token policy: no authored hex in SCSS.
  // BEM selector-class-pattern remains documented in CSS_IMPLEMENTATION_GUIDE.md
  // but is not enforced here (existing codebase has many non-BEM selectors).
  plugins: ['stylelint-scss'],
  customSyntax: 'postcss-scss',
  rules: {
    // Hex may only live in design-tokens.ts; SCSS must use var(--rds-*).
    'color-no-hex': true,
  },
  overrides: [
    {
      // Attribute selectors matching third-party SVG fills (#fff).
      files: ['**/rds-comp-map/rds-comp-map.scss'],
      rules: {
        'color-no-hex': null,
      },
    },
  ],
  ignoreFiles: [
    '**/node_modules/**',
    '**/dist/**',
    '**/storybook-static/**',
  ],
};
