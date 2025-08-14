import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    "../raaghu-elements/src/**/*.stories.@(js|jsx|ts|tsx)",
    "../raaghu-components/**/**/*.stories.@(js|jsx|ts|tsx)",
    "../raaghu-layouts/**/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: [{ from: '../.storybook/public', to: '/' }],
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};

export default config;
