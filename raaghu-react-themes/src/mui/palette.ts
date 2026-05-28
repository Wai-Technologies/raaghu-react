import type { PaletteOptions } from '@mui/material/styles';
import { colorTokens } from '../../tokens/design-tokens';

const white = '#ffffff';
const black = '#000000';

/**
 * MUI palette must use resolved color strings (hex/rgba), not CSS variables.
 * MUI calls alpha(), lighten(), etc. at theme creation time, which cannot parse var(--rds-*).
 *
 * Values mirror injectTokens() / build-rds-css-vars.ts so design-tokens.ts stays the source.
 * RDS SCSS continues to use runtime --rds-* via injectTokens().
 */
export function lightMuiPalette(): PaletteOptions {
  const p = colorTokens.primary;
  const s = colorTokens.secondary;
  const n = colorTokens.neutral;
  const e = colorTokens.error;
  const w = colorTokens.warning;
  const su = colorTokens.success;
  const i = colorTokens.info;

  return {
    mode: 'light',
    common: { black, white },
    primary: {
      main: p[700],
      light: p[100],
      dark: p[600],
      contrastText: white,
    },
    secondary: {
      main: s[700],
      light: s[100],
      dark: s[750],
      contrastText: white,
    },
    error: {
      main: e[700],
      light: e[100],
      dark: e[600],
      contrastText: white,
    },
    warning: {
      main: w[700],
      light: w[100],
      dark: w[600],
      contrastText: white,
    },
    success: {
      main: su[700],
      light: su[100],
      dark: su[600],
      contrastText: white,
    },
    info: {
      main: i[400],
      light: i[50],
      dark: i[600],
      contrastText: white,
    },
    background: {
      default: white,
      paper: white,
    },
    text: {
      primary: n[900],
      secondary: n[600],
      disabled: n[400],
    },
    divider: n[300],
    action: {
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
  };
}

export function darkMuiPalette(): PaletteOptions {
  const p = colorTokens.primary;
  const s = colorTokens.secondary;
  const n = colorTokens.neutral;
  const e = colorTokens.error;
  const w = colorTokens.warning;
  const su = colorTokens.success;
  const i = colorTokens.info;

  return {
    mode: 'dark',
    common: { black, white },
    primary: {
      main: p[200],
      light: p[100],
      dark: p[400],
      contrastText: n[900],
    },
    secondary: {
      main: s[200],
      light: s[100],
      dark: s[250],
      contrastText: n[900],
    },
    error: {
      main: e[200],
      light: e[100],
      dark: e[400],
      contrastText: n[900],
    },
    warning: {
      main: w[200],
      light: w[100],
      dark: w[400],
      contrastText: n[900],
    },
    success: {
      main: su[200],
      light: su[100],
      dark: su[400],
      contrastText: n[900],
    },
    info: {
      main: p[200],
      light: p[100],
      dark: p[400],
      contrastText: n[900],
    },
    background: {
      default: n[900],
      paper: n[800],
    },
    text: {
      primary: white,
      secondary: n[400],
      disabled: n[600],
    },
    divider: n[700],
    action: {
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
    },
  };
}
