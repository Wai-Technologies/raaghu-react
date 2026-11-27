import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { RaaghuThemeProvider } from '../raaghu-react-themes/src/provider/RaaghuThemeProvider';
import '../raaghu-react-themes/src/styles/index.scss';
import './custom-theme.css';
import './storybook-theme-sync';
import {
  reactNodeArgTypesEnhancer,
  sanitizeArrayArgs,
  sanitizeReactNodeArgs,
} from './sanitize-react-node-args';
import type { ArgTypes } from 'storybook/internal/types';

// `sx`, `className`, `ref` and CSS-only `style` are custom-styling hooks every component
// accepts; hide them from Controls/Docs. A `style` that is a visual variant (union with
// string values, e.g. Button) stays visible.
const hideStylingPropsEnhancer = ({ argTypes }: { argTypes: ArgTypes }): ArgTypes => {
  const result: ArgTypes = { ...argTypes };
  for (const [name, argType] of Object.entries(result)) {
    const summary = String(argType?.table?.type?.summary ?? '');
    const isCssStyle = name === 'style' && /CSSProperties/.test(summary) && !/['"]/.test(summary);
    if (name === 'sx' || name === 'className' || name === 'ref' || isCssStyle) {
      result[name] = { ...argType, control: false, table: { ...(argType?.table ?? {}), disable: true } };
    }
  }
  return result;
};

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
  argTypesEnhancers: [reactNodeArgTypesEnhancer, hideStylingPropsEnhancer],
  parameters: {
    controls: {
      exclude: ['component'],
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
    a11y: {
      config: {},

      options: {
        checks: {
          'color-contrast': { enabled: false },
        },
        restoreScroll: true,
      },

      test: 'off'
    },
    badgesConfig: {
      stable: {
        styles: {
          backgroundColor: '#1a7f37',
          borderColor: '#1a7f37',
          color: '#fff',
        },
        title: 'Stable',
      },
      beta: {
        styles: {
          backgroundColor: '#9a6700',
          borderColor: '#9a6700',
          color: '#fff',
        },
        title: 'Beta',
      },
      experimental: {
        styles: {
          backgroundColor: '#cf222e',
          borderColor: '#cf222e',
          color: '#fff',
        },
        title: 'Experimental',
      },
    },
  },
  decorators: [
    (Story, context) => {
      const mode = (context.globals.theme || 'system') as 'light' | 'dark' | 'system';
      const fallback = (context.initialArgs ?? {}) as Record<string, unknown>;
      context.args = sanitizeArrayArgs(
        sanitizeReactNodeArgs((context.args ?? {}) as Record<string, unknown>, context.argTypes, fallback),
        context.argTypes,
        fallback,
      );
      return React.createElement(
        RaaghuThemeProvider,
        { mode, initializeOnMount: false },
        React.createElement(Story),
      );
    },
  ],
};

export default preview;
