import type { Preview } from '@storybook/react-vite';
import React from 'react';
import {
  getStorybookThemeFromUrl,
  type RaaghuThemeMode,
} from '../raaghu-react-themes/src/provider/theme-utils';
import { RaaghuThemeProvider } from '../raaghu-react-themes/src/provider/RaaghuThemeProvider';
import '../raaghu-react-themes/src/styles/index.scss';
import './custom-theme.css';
import { getDocsTheme } from './storybook-docs-theme';
import './storybook-theme-sync';
import {
  reactNodeArgTypesEnhancer,
  sanitizeArrayArgs,
  sanitizeReactNodeArgs,
} from './sanitize-react-node-args';

const preview: Preview = {
  initialGlobals: {
    theme: 'system',
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'system',
      toolbar: {
        icon: 'photo',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'system', title: 'System' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  argTypesEnhancers: [reactNodeArgTypesEnhancer],
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
      options: {
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
    a11y: {
      options: {
        checks: {
          'color-contrast': { enabled: false },
        },
        restoreScroll: true,
      },
      test: 'off',
    },
    docs: {
      theme: getDocsTheme('system'),
    },
  },
  decorators: [
    (Story, context) => {
      const mode = (context.globals.theme ??
        getStorybookThemeFromUrl() ??
        'system') as RaaghuThemeMode;
      const docsTheme = getDocsTheme(mode);

      context.parameters.docs = {
        ...context.parameters.docs,
        theme: docsTheme,
      };

      const safeArgs = sanitizeArrayArgs(
        sanitizeReactNodeArgs((context.args ?? {}) as Record<string, unknown>),
        context.argTypes,
      );
      context.args = safeArgs;

      return React.createElement(
        RaaghuThemeProvider,
        {
          mode,
          initializeOnMount: false,
        },
        React.createElement(Story, { args: safeArgs }),
      );
    },
  ],
};

export default preview;
