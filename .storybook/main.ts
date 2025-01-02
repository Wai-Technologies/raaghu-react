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

      .version-container {
        font-weight: bold;
        position: fixed;
        font-size: 14px;
        color: #5C6870;
        font-weight: bold;
        top: 50px;
        left: 98px;
      }

      // /* Responsive styles for mobile */
      // @media (max-width: 600px) {
      //   .version-container {
      //     position: fixed;
      //     font-size: 12px;
      //     top: 60px;
      //     left: 100px;
      //   }
      // }

      // @media (max-width: 480px) {
      //   .version-container {
      //     position: fixed;
      //     // font-size: 10px;
      //     // top: 70px;
      //     // left: 100px;
      //   }
      // }
    </style>
    `;

    // JavaScript for dynamically fetching the latest and pre-release versions
    const fetchVersionsScript = `
    <script>
      // Configuration variable to choose the version to display (change to 'preRelease' to show pre-release)
      //For Production change showVersion to 'production'
      //For Staging and Development change showVersion to 'preRelease'
      //
      //
      //---------------------------------------------------------------------------------
        const showVersion = 'production';
      //---------------------------------------------------------------------------------
      //
      //
      //
      async function fetchGitHubReleases() {
        try {
          // Fetch latest production release
          const productionRes = await fetch('https://api.github.com/repos/Wai-Technologies/raaghu-react/releases/latest');
          if (!productionRes.ok) {
            console.error('Failed to fetch production release:', productionRes.statusText);
            return;
          }
          const productionData = await productionRes.json();
          const productionVersion = productionData.tag_name || 'Unknown';

          // Fetch all releases to get the latest pre-release
          const releasesRes = await fetch('https://api.github.com/repos/Wai-Technologies/raaghu-react/releases');
          if (!releasesRes.ok) {
            console.error('Failed to fetch releases:', releasesRes.statusText);
            return;
          }
          const releasesData = await releasesRes.json();
          const preRelease = releasesData.find(release => release.prerelease);
          const preReleaseVersion = preRelease ? preRelease.tag_name : 'None';

          // Select which version to display based on the configuration
          const versionToDisplay = showVersion === 'preRelease' ? preReleaseVersion : productionVersion;

          // Update the sidebar header with the selected version
          const versionContainer = document.querySelector('.version-container');
          if (versionContainer) {
            versionContainer.innerHTML = \`
              v\${versionToDisplay}
            \`;
          } else {
            console.warn('No version container found in the sidebar header.');
          }
        } catch (error) {
          console.error('Error fetching GitHub releases:', error);
        }
      }

      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
          const sidebarHeader = document.querySelector('.sidebar-header');
          if (sidebarHeader) {
            const versionContainer = document.createElement('div');
            versionContainer.className = 'version-container';
            versionContainer.textContent = '...'; // Default content
            sidebarHeader.appendChild(versionContainer);

            fetchGitHubReleases();
          } else {
            console.warn('Sidebar header not found');
          }
        }, 1000);
      });
    </script>
    `;

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
    },
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: [
    {
      from: "./assets", to: "/assets"
    },
    {
      from: "./public", to: "/"
    }
  ],
  logLevel: 'debug',
};
export default config;
