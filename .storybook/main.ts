import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    // Keep the scan restricted for performance & predictable bundling
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: [
    // Public assets folder mapping
    { from: '../.storybook/public', to: '/' },
  ],
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },

  // ✅ Root deployment safe — works at https://new-react.raaghu.ai/
  viteFinal: async (viteConfig) => {
    viteConfig.base = '/'; // Assets & iframe load from root
    viteConfig.build = viteConfig.build || {};
    viteConfig.build.assetsDir = 'assets'; // Keep chunks organized
    return viteConfig;
  },
};

export default config;
