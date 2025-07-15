import type { Preview, Decorator } from "@storybook/react";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../raaghu-react-themes/src/styles/default.scss';
import { themes } from '@storybook/theming';
 
// Helper function to apply the theme class to the document's body
const applyTheme = (theme: string) => {
  document.body.classList.remove('theme-light', 'theme-dark');
  document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
};
 
// Storybook configuration
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.light,
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Change the theme of the preview',
      defaultValue: 'light',
      toolbar: {
        icon: 'photo',
        items: [
          { value: 'light', title: 'light' },
          { value: 'dark', title: 'dark' },
        ],
         showName: true,
        // dynamicTitle: true, // Use dynamic titles for buttons
      },
    },
  },
  initialGlobals: {
    theme: 'light', // Default theme
  },
};
 
// Decorator to apply the theme dynamically
const withTheme: Decorator = (Story, context) => {
  const selectedTheme = context.globals.theme;
  applyTheme(selectedTheme);
  return <Story />;
};

export const decorators = [withTheme];

export default preview;