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
  // All values sourced from colorTokens (design-tokens.ts) — single source of truth.
  // Light/dark variant keys map to the annotated slots in design-tokens.ts.
  const themeValues = {
    light: {
      primary: {
        main:         colorTokens.primary[700],    // #3C98FF — light-theme normal
        light:        colorTokens.primary[300],    // #64b5f6
        dark:         colorTokens.primary[800],    // #1565c0
        contrastText: colorTokens.neutral[0],      // #ffffff
      },
      secondary: {
        main:         colorTokens.secondary[700],  // #2534E9 — light-theme normal
        light:        colorTokens.secondary[100],  // #93B8FF
        dark:         colorTokens.secondary[700],  // #2534E9
        contrastText: colorTokens.neutral[0],      // #ffffff
      },
      error: {
        main:  colorTokens.error[700],             // #BD0D1D — light-theme normal
        light: colorTokens.error[300],             // #e57373
        dark:  colorTokens.error[800],             // #c62828
      },
      warning: {
        main:  colorTokens.warning[700],           // #C2510C — light-theme normal
        light: colorTokens.warning[100],           // #fff9c4
        dark:  colorTokens.warning[800],           // #f9a825
      },
      info: {
        main:  colorTokens.primary[500],           // #2196f3 — MUI blue base
        light: colorTokens.primary[100],           // #bbdefb
        dark:  colorTokens.primary[800],           // #1565c0
      },
      success: {
        main:  colorTokens.success[700],           // #1F7630 — light-theme normal
        light: colorTokens.success[100],           // #c8e6c8
        dark:  colorTokens.success[800],           // #2e7d32
      },
      background: {
        default: colorTokens.neutral[0],           // #ffffff
        paper:   colorTokens.neutral[0],           // #ffffff
      },
      text: {
        primary:   colorTokens.neutral[900],       // #212121
        secondary: colorTokens.neutral[700],       // #646464
        disabled:  colorTokens.neutral[500],       // #9e9e9e
      },
      divider: colorTokens.neutral[300],           // #e0e0e0
    },
    dark: {
      primary: {
        main:         colorTokens.primary[200],    // #3C98FF — dark-theme normal
        light:        colorTokens.primary[100],    // #bbdefb
        dark:         colorTokens.primary[400],    // #42a5f5
        contrastText: colorTokens.neutral[900],    // #212121
      },
      secondary: {
        main:         colorTokens.secondary[200],  // #2534E9 — dark-theme normal
        light:        colorTokens.secondary[100],  // #93B8FF
        dark:         colorTokens.secondary[600],  // #1827BB
        contrastText: colorTokens.neutral[900],    // #212121
      },
      error: {
        main:  colorTokens.error[200],             // #BD0D1D — dark-theme normal
        light: colorTokens.error[100],             // #ffcdd2
        dark:  colorTokens.error[400],             // #ef5350
      },
      warning: {
        main:  colorTokens.warning[200],           // #C2510C — dark-theme normal
        light: colorTokens.warning[100],           // #fff9c4
        dark:  colorTokens.warning[400],           // #ffee58
      },
      info: {
        main:  colorTokens.primary[200],           // #3C98FF
        light: colorTokens.primary[100],           // #bbdefb
        dark:  colorTokens.primary[400],           // #42a5f5
      },
      success: {
        main:  colorTokens.success[200],           // #58D06E — dark-theme normal
        light: colorTokens.success[100],           // #90E5A0
        dark:  colorTokens.success[400],           // #1F7630
      },
      background: {
        default: colorTokens.neutral[900],         // #212121
        paper:   colorTokens.neutral[800],         // #424242
      },
      text: {
        primary:   colorTokens.neutral[0],         // #ffffff
        secondary: colorTokens.neutral[500],       // #9e9e9e
        disabled:  colorTokens.neutral[600],       // #757575
      },
      divider: colorTokens.neutral[700],           // #646464
    },
  };

  return createTheme({
    palette: {
      mode,
      ...themeValues[mode],
    },
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
