import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    // Keep this scoped so Vite's bundler doesn't over-scan and break chunks
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

  // ✅ Important for correct asset + iframe paths in deployments
  viteFinal: async (viteConfig, { configType }) => {
    // If Storybook is deployed under a subpath, e.g., /storybook/
    // set viteConfig.base accordingly:
    // viteConfig.base = '/storybook/';
    viteConfig.base = './'; // Safe default for same-folder assets

    // Ensure build is self-contained and paths are relative
    viteConfig.build = viteConfig.build || {};
    viteConfig.build.assetsDir = 'assets';

    return viteConfig;
  },
};

export default config;
