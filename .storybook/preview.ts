import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// Import your theme files directly
import lightTheme from '../raaghu-react-themes/src/styles/themes/lightTheme';
import darkTheme from '../raaghu-react-themes/src/styles/themes/darkTheme';
import './custom-theme.css';
// Import Bootstrap styles and JS
import './bootstrap-globals.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// Import RDS Button styles globally
import '../raaghu-elements/rds-button/rds-button.scss';

// Need to import the React type for JSX
import { ReactElement } from 'react';

// Bootstrap decorator to ensure proper container wrapping
const withBootstrapContainer = (Story: any): ReactElement => {
  return React.createElement(
    'div', 
    { className: 'container-fluid' },
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement(Story, null)
    )
  );
};

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
  },
  decorators: [
    withBootstrapContainer,
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
