import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    // "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../raaghu-elements/src/**/*.stories.@(js|jsx|ts|tsx)",
    "../raaghu-components/**/**/*.stories.@(js|jsx|ts|tsx)",
    "../raaghu-layouts/**/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-onboarding",
    "@storybook/preset-scss",
    "@chromatic-com/storybook",
    "storybook-addons",
    // "@storybook/addon-actions",
    "@storybook/addon-docs"
  ],

  managerHead: (headHtmlContent) => {
    const style = `
    <style>
      .sidebar-header {
        margin-bottom: 36px;
        position: relative;
      }

      .version-container {
        font-weight: bold;
        position: absolute;
        font-size: 12px;
        color:rgb(197, 204, 209);
        font-weight: bold;
        top: 34px;
        left: 74px;
      }

      /* Responsive styles for mobile */
      @media (max-width: 737px) {
        .version-container {
          position: absolute;
          font-size: 11px;
          top: 34px;
          left: 73px;
        }
      }

      // @media (max-width: 480px) {
      //   .version-container {
      //     position: absolute;
      //     // font-size: 10px;
      //     // top: 70px;
      //     // left: 100px;
      //   }
      // }
    </style>
    `;

    // Version-fetching script removed to prevent any API calls and ensure Storybook works without 403 errors
    const fetchVersionsScript = '';

    return `${headHtmlContent}\n${style}\n${fetchVersionsScript}`;
  },

  core: {
    builder: '@storybook/builder-vite',
  },

  typescript: {
    reactDocgen: 'react-docgen',
  },

  framework: {
    name: "@storybook/react-vite",
    options: {
      legacyRootApi: true,
      builder: {
        viteConfigPath: undefined,
      },
    },
  },

  viteFinal: async (config, { configType }) => {
    // Handle build optimization for preventing object extensibility issues
    if (config.build) {
      config.build.rollupOptions = {
        ...config.build.rollupOptions,
        output: {
          ...config.build.rollupOptions?.output,
          // Disable property mangling that could cause extensibility issues
          manualChunks: undefined,
        },
        // Add preserveEntrySignatures to prevent aggressive optimization
        preserveEntrySignatures: 'strict',
        // Disable tree shaking for problematic patterns
        treeshake: {
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
        },
      };
    }
    
    return config;
  },

  staticDirs: [
    {
      from: "./assets", to: "/assets"
    },
    {
      from: "./public", to: "/"
    }
  ],

  logLevel: 'debug'
};
export default config;
