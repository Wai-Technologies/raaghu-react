module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../raaghu-elements/src/**/*.stories.@(js|jsx|ts|tsx)",
    "../raaghu-components/**/**/*.stories.@(js|jsx|ts|tsx)",
    // "../raaghu-mfe/rds_pages/**/**/**/*.stories.@(js|jsx|ts|tsx)",
    "../raaghu-components/src/rds-comp-icon-list/rds-comp-icon-list.stories.@(js|jsx|ts|tsx)",
    "../raaghu-layouts/**/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-scss",
    "storybook-addon-themes"
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  typescript: {
    reactDocgen: "react-docgen-typescript-plugin",
  },
  staticDirs: [
    // "../public",
    // "../static",
    {
      from: "./assets", to: "/assets"
    }
  ]
};
