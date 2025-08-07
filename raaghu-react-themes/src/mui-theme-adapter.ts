/**
 * MUI Theme Adapter for Raaghu Design System
 * 
 * This adapter creates MUI theme objects based on the Raaghu light and dark themes.
 * It maps the values directly to match your SCSS variables defined in 
 * raaghu-react-themes/src/styles/themes/light.scss and dark.scss.
 */

import { createTheme } from '@mui/material/styles';
import { colorTokens } from '../tokens/design-tokens';

/**
 * Creates an MUI theme based on the specified mode
 * This directly maps to values in your light.scss and dark.scss files
 */
export function createRaaghuMuiTheme(mode: 'light' | 'dark') {
  // Light theme values from light.scss and dark theme values from dark.scss
  const themeValues = {
    light: {
      primary: {
        main: '#7825E9',        // $btn-primary-solid-default
        light: '#EBDCFF',       // $bg-primary-light-default
        dark: '#340071',        // $txt-primary-dark-default
        contrastText: '#FFFFFF' // $btn-primary-text-invert
      },
      secondary: {
        main: '#2534E9',        // $btn-secondary-solid-default
        light: '#BCD5FF',       // $bg-secondary-light-default
        dark: '#1D2B92',        // $txt-secondary-dark-default
        contrastText: '#FFFFFF' // $btn-secondary-text-invert
      },
      error: {
        main: '#BD0D1D'         // $btn-error-solid-default
      },
      warning: {
        main: '#C2510C'         // $btn-warning-solid-default
      },
      info: {
        main: '#93B8FF'         // $bg-secondary-medium-default
      },
      success: {
        main: '#1F7630'         // $btn-success-solid-default
      },
      background: {
        default: '#FFFFFF',     // $bg-neutral-lighter-default
        paper: '#FFFFFF'        // $body-bg
      },
      text: {
        primary: '#202020',     // $txt-neutral-darker-default
        secondary: '#353535'    // $txt-neutral-medium-default
      }
    },
    dark: {
      primary: {
        main: '#A875FF',        // Dark theme primary from dark.scss
        light: '#D4BBFF',       // Dark theme light primary
        dark: '#4F00A6',        // Dark theme dark primary
        contrastText: '#FFFFFF' // Text on primary
      },
      secondary: {
        main: '#4666FF',        // Dark theme secondary
        light: '#93B8FF',       // Dark theme light secondary
        dark: '#1827BB',        // Dark theme dark secondary
        contrastText: '#FFFFFF' // Text on secondary
      },
      error: {
        main: '#FF544F'         // Dark theme error
      },
      warning: {
        main: '#F98816'         // Dark theme warning
      },
      info: {
        main: '#4666FF'         // Dark theme info
      },
      success: {
        main: '#31B64A'         // Dark theme success
      },
      background: {
        default: '#202020',     // Dark theme background
        paper: '#353535'        // Dark theme paper
      },
      text: {
        primary: '#FCFCFC',     // Dark theme text
        secondary: '#969696'    // Dark theme secondary text
      }
    }
  };
  
  return createTheme({
    palette: {
      mode,
      ...themeValues[mode]
    }
  });
}

/**
 * Get the light theme for MUI
 */
export const lightTheme = createRaaghuMuiTheme('light');

/**
 * Get the dark theme for MUI
 */
export const darkTheme = createRaaghuMuiTheme('dark');

/**
 * Get the appropriate theme based on mode
 */
export function getThemeByMode(mode: 'light' | 'dark') {
  // If we're switching themes, we need to ensure the SCSS theme is applied
  if (typeof document !== 'undefined') {
    // Set a data attribute on the document to indicate theme mode
    // This helps for any CSS that needs to switch based on theme
    document.documentElement.setAttribute('data-theme', mode);
    
    // Add or remove theme classes to body
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${mode}-theme`);
  }
  
  return mode === 'light' ? lightTheme : darkTheme;
}

export default {
  lightTheme,
  darkTheme,
  getThemeByMode,
  createRaaghuMuiTheme
};
