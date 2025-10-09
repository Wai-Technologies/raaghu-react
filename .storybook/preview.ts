import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// Import your theme files directly
import lightTheme from '../raaghu-react-themes/src/styles/themes/lightTheme';
import darkTheme from '../raaghu-react-themes/src/styles/themes/darkTheme';
import './custom-theme.css';
// Import RDS Button styles globally
import '../raaghu-elements/rds-button/rds-button.scss';
import '../raaghu-elements/rds-select/rds-select.scss';

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'photo',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Introduction', 'Elements', 'Components', 'Layouts'],
      },
    },
    // Enhanced parameters for Chromatic testing
    viewport: {
      viewports: {
        iPhoneSE: {
          name: 'iPhone SE',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        iPhoneXR: {
          name: 'iPhone XR',
          styles: {
            width: '414px',
            height: '896px',
          },
        },
        iPhone12Pro: {
          name: 'iPhone 12 Pro',
          styles: {
            width: '390px',
            height: '844px',
          },
        },
        iPhone14ProMax: {
          name: 'iPhone 14 Pro Max',
          styles: {
            width: '430px',
            height: '932px',
          },
        },
        pixel7: {
          name: 'Pixel 7',
          styles: {
            width: '412px',
            height: '915px',
          },
        },
        galaxyS8Plus: {
          name: 'Samsung Galaxy S8+',
          styles: {
            width: '360px',
            height: '740px',
          },
        },
        galaxyS20Ultra: {
          name: 'Samsung Galaxy S20 Ultra',
          styles: {
            width: '412px',
            height: '915px',
          },
        },
        iPadMini: {
          name: 'iPad Mini',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        iPadAir: {
          name: 'iPad Air',
          styles: {
            width: '820px',
            height: '1180px',
          },
        },
        iPadPro: {
          name: 'iPad Pro',
          styles: {
            width: '1024px',
            height: '1366px',
          },
        },
        surfacePro7: {
          name: 'Surface Pro 7',
          styles: {
            width: '912px',
            height: '1368px',
          },
        },
        surfaceDuo: {
          name: 'Surface Duo',
          styles: {
            width: '540px',
            height: '720px',
          },
        },
        galaxyZFold5: {
          name: 'Galaxy Z Fold 5',
          styles: {
            width: '344px',
            height: '882px',
          },
        },
        zenBookFold: {
          name: 'Asus Zenbook Fold',
          styles: {
            width: '853px',
            height: '1280px',
          },
        },
        galaxyA51: {
          name: 'Samsung Galaxy A51/71',
          styles: {
            width: '412px',
            height: '914px',
          },
        },
        nestHub: {
          name: 'Nest Hub',
          styles: {
            width: '1024px',
            height: '600px',
          },
        },
        nestHubMax: {
          name: 'Nest Hub Max',
          styles: {
            width: '1280px',
            height: '800px',
          },
        },
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1920px',
            height: '1080px',
          },
        },
      },
    },
    chromatic: {
      // Chromatic-specific parameters - test on key device sizes from the screenshot
      viewports: [375, 390, 412, 430, 768, 820, 1024, 1280, 1920],
      delay: 1000, // Wait for animations/transitions
      diffThreshold: 0.2, // Visual diff threshold
      pauseAnimationAtEnd: true,
    },
  },
  decorators: [
    (Story, context) => {
      const mode = context.globals.theme || 'light';
      // Apply theme classes for CSS transitions
      if (typeof document !== 'undefined') {
        document.body.classList.remove('theme-light', 'theme-dark');
        document.body.classList.add(mode === 'dark' ? 'theme-dark' : 'theme-light');
        document.documentElement.setAttribute('data-theme', mode);
      }
      const theme = mode === 'light' ? lightTheme : darkTheme;
      return React.createElement(
        ThemeProvider,
        { theme },
        React.createElement(CssBaseline),
        React.createElement(Story)
      );
    },
  ],
};

export default preview;
