import { Preview } from "@storybook/react"; // Import the 'Story' component
import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../raaghu-react-themes/src/styles/default.scss';
import { themes } from '@storybook/theming';

// Helper function to apply the theme class to the document's body
const applyTheme = (theme) => {
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
  globals: {
    theme: 'light', // Default theme
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
      },
    },
  },
};

// Single decorator that handles both theme and routing
const withThemeAndRouter = (Story: React.FC, context: any) => {
  const selectedTheme = context.globals.theme;
  applyTheme(selectedTheme);
  
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/*" element={<Story />} />
      </Routes>
    </MemoryRouter>
  );
};

export const decorators = [withThemeAndRouter];

export default preview;