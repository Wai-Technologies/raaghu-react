// import { Preview } from "@storybook/react"; // Import the 'Story' component
// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle';
// import '../raaghu-react-themes/src/styles/default.scss';
// import { themes } from '@storybook/theming';

// // Helper function to apply the theme class to the document's body
// const applyTheme = (theme) => {
//   document.body.classList.remove('theme-light', 'theme-dark');
//   document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
// };

// // Storybook configuration
// const preview: Preview = {
//   parameters: {
//     actions: { argTypesRegex: "^on[A-Z].*" },
//     controls: {
//       matchers: {
//         color: /(background|color)$/i,
//         date: /Date$/i,
//       },
//     },
//     docs: {
//       theme: themes.light,
//     },
//   },
//   globals: {
//     theme: 'light', // Default theme
//   },
//   globalTypes: {
//     theme: {
//       name: 'Theme',
//       description: 'Change the theme of the preview',
//       defaultValue: 'light',
//       toolbar: {
//         icon: 'photo',
//         items: [
//           { value: 'light', title: 'light' },
//           { value: 'dark', title: 'dark' },
//         ],
//          showName: true,
//         // dynamicTitle: true, // Use dynamic titles for buttons
//       },
//     },
//   },
// };

// // Decorator to apply the theme dynamically
// const withTheme = (Story: React.FC, context: any) => { // Specify the type of 'Story' and 'context'
//   const selectedTheme = context.globals.theme; // Get the current selected theme
//   applyTheme(selectedTheme); // Apply the selected theme
//   return <Story/>;
// };

// export const decorators = [withTheme];

// export default preview;


import { Preview } from "@storybook/react";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../raaghu-react-themes/src/styles/default.scss';
import { themes } from '@storybook/theming';
import { action } from '@storybook/addon-actions'; // Import the correct action function

// Helper function to apply the theme class to the document's body
const applyTheme = (theme) => {
  document.body.classList.remove('theme-light', 'theme-dark');
  document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
};

// Storybook configuration
const preview: Preview = {
  parameters: {
    actions: {
      // Explicitly define action handlers with 'action' from '@storybook/addon-actions'
      onClick: action('onClick'),
      onChange: action('onChange'),
      onInput: action('onInput'),
    },
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
    customText: {
      name: 'Custom Text',
      description: 'Display custom text on the toolbar',
      defaultValue: 'Raaghu Storybook v1.2.3', // Customize the text here
      toolbar: {
        icon: 'info', // Use an info icon
        items: [],
        title: 'Raaghu Storybook v1.2.3', // The text you want to show
        showName: true,
      },
    },
  },
};

// Decorator to apply the theme dynamically
const withTheme = (Story: React.FC, context: any) => {
  const selectedTheme = context.globals.theme; // Get the current selected theme
  applyTheme(selectedTheme); // Apply the selected theme
  return <Story />;
};

// Export decorators to wrap stories with the theme change
export const decorators = [withTheme];

export default preview;