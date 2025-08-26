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
      // Chromatic-specific parameters
      viewports: [375, 768, 1920],
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
