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
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/preset-scss",
   // "@storybook/addon-toolbars",
    // "@storybook/addon-themes",
    "@storybook/addon-mdx-gfm",
    "@chromatic-com/storybook",   
  ],
  managerHead: (headHtmlContent) => {
    const style = `
    <style>
    .sidebar-header {
        margin-bottom: 36px;
        position: relative;
    }

    .sidebar-header::after {
        content: 'Version 1.2.3';
        position: absolute;
        top: 100%;
        left: 74px;
        font-size: 14px;
        color: #5C6870;
        font-weight: bold;
    }
    </style>
    `;
    return `${headHtmlContent}\n${style}`;
},
  core: {
    builder: '@storybook/builder-vite', // 👈 The builder enabled here.
  },
  typescript: { 
    reactDocgen: 'react-docgen', // 👈 react-docgen configured here.
  },
  framework: {
    name: "@storybook/react-vite",
    options: {
      legacyRootApi: true,
    },
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: [
    {
      from : "./assets", to : "/assets"
    },
    {
      from: "./public", to: "/"
    }
  ],
  logLevel: 'debug',
};
export default config;
