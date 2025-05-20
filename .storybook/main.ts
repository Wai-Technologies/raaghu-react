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
    "storybook-addons"
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
  const sidebarHeaderSelector = '.sidebar-header';

  let apiCallCount = 0; // To track how many times the API has been called
  const maxApiCalls = 50; // Limit the number of API calls to 10

  // Function to add or refresh the version container
  function ensureVersionContainerExists() {
    const sidebarHeader = document.querySelector(sidebarHeaderSelector);

    if (sidebarHeader) {
      let versionContainer = sidebarHeader.querySelector('.version-container');
      if (!versionContainer) {
        // If version-container is not found, create and append it
        versionContainer = document.createElement('div');
        versionContainer.className = 'version-container';
        versionContainer.textContent = '...'; // Placeholder text
        sidebarHeader.appendChild(versionContainer);
        console.log('Version container added!');
      }

      // Check if the API call limit is reached
      if (apiCallCount < maxApiCalls) {
        fetchGitHubReleases();
        apiCallCount++; // Increment the API call count
      } else {
        console.log('API call limit reached. No more API calls.');
      }
    } else {
      console.warn('Sidebar header not found.');
    }
  }

  // Periodically check and re-render the version container
  const refreshInterval = 2000; // Refresh every 2 seconds
  setInterval(() => {
    ensureVersionContainerExists();
  }, refreshInterval);

  // Initial rendering after a short delay
  setTimeout(() => {
    ensureVersionContainerExists();
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
