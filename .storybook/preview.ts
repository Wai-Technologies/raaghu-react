import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { RaaghuThemeProvider } from '../raaghu-react-themes/src/provider/RaaghuThemeProvider';
import '../raaghu-react-themes/src/styles/index.scss';
import './custom-theme.css';

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
      viewports: [375, 768, 1920],
      delay: 1000,
      diffThreshold: 0.2,
      pauseAnimationAtEnd: true,
    },
  },
  decorators: [
    (Story, context) => {
      const mode = (context.globals.theme || 'light') as 'light' | 'dark';
      return React.createElement(
        RaaghuThemeProvider,
        { mode, initializeOnMount: true },
        React.createElement(Story),
      );
    },
  ],
};

export default preview;
