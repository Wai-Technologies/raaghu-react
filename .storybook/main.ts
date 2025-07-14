
import type { StorybookConfig } from "@storybook/react-vite";
import { readFileSync } from "fs";
import { join } from "path";

let version = "unknown";
try {
  const pkg = JSON.parse(readFileSync(join(__dirname, "../package.json"), "utf-8"));
  version = pkg.version || "unknown";
} catch (e) {
  // fallback
}

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

    const staticVersionScript = [
      '<script>',
      'document.addEventListener("DOMContentLoaded", function() {',
      '  const sidebarHeader = document.querySelector(".sidebar-header");',
      '  if (sidebarHeader) {',
      '    let versionContainer = sidebarHeader.querySelector(".version-container");',
      '    if (!versionContainer) {',
      '      versionContainer = document.createElement("div");',
      '      versionContainer.className = "version-container";',
      '      sidebarHeader.appendChild(versionContainer);',
      '    }',
      `    versionContainer.textContent = '${version}';`,
      '  }',
      '});',
      '</script>'
    ].join('\n');
    return `${headHtmlContent}\n${style}\n${staticVersionScript}`;
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
    },
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
