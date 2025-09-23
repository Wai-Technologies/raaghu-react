import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../stories/Introduction.mdx',
    '../stories/**/*.mdx',
    "../raaghu-elements/**/**/*.stories.@(js|jsx|ts|tsx)",
    "../raaghu-components/**/**/*.stories.@(js|jsx|ts|tsx)",
    "../raaghu-layouts/**/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-docs', '@storybook/addon-actions'],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: undefined,
      },
    },
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
  // Build optimizations
  features: {
    buildStoriesJson: false,
  },
  core: {
    disableTelemetry: true,
  },
  // Disable source maps for faster builds
  viteFinal: async (config) => {
    if (config.build) {
      config.build.sourcemap = false;
      config.build.minify = 'terser';
      config.build.terserOptions = {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      };
    }
    return config;
  },
};

export default config;
