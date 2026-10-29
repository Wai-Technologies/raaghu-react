/** @type {import('stylelint').Config} */
module.exports = {
  plugins: ['stylelint-scss'],
  customSyntax: 'postcss-scss',
  rules: {
    'color-no-hex': true,
  },
  overrides: [
    {
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
