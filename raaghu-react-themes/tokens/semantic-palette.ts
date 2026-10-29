/**
 * Shared semantic color roles for MUI palette + --rds-* CSS vars.
 *
 * Raw scales live in design-tokens.ts. This module is the single place that
 * maps scale steps → semantic slots (primary.main, text.secondary, …).
 * Both build-rds-css-vars.ts and src/mui/palette.ts must consume this —
 * do not re-index colorTokens for these slots elsewhere.
 */

import { alphaTokens, colorTokens } from './design-tokens';

export type SemanticThemeMode = 'light' | 'dark';

export interface SemanticColorChannels {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}

export interface SemanticPalette {
  primary: SemanticColorChannels;
  secondary: SemanticColorChannels;
  error: SemanticColorChannels;
  warning: SemanticColorChannels;
  success: SemanticColorChannels;
  info: SemanticColorChannels;
  background: {
    default: string;
    paper: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  divider: string;
  action: {
    hover: string;
    selected: string;
    disabled: string;
    disabledBackground: string;
  };
}

const white = colorTokens.neutral[0];

function lightSemanticPalette(): SemanticPalette {
  const p = colorTokens.primary;
  const s = colorTokens.secondary;
  const n = colorTokens.neutral;
  const e = colorTokens.error;
  const w = colorTokens.warning;
  const su = colorTokens.success;
  const i = colorTokens.info;

  return {
    primary: {
      main: p[700],
      light: p[100],
      dark: p[600],
      contrastText: white,
    },
    secondary: {
      main: s[700],
      light: s[100],
      dark: s[600],
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
      default: n[50],
      paper: white,
    },
    text: {
      primary: n[900],
      secondary: n[600],
      disabled: n[400],
    },
    divider: n[200],
    action: {
      hover: alphaTokens.actionHoverLight,
      selected: alphaTokens.actionSelectedLight,
      disabled: alphaTokens.actionDisabledLight,
      disabledBackground: alphaTokens.actionDisabledBgLight,
    },
  };
}

function darkSemanticPalette(): SemanticPalette {
  const p = colorTokens.primary;
  const s = colorTokens.secondary;
  const n = colorTokens.neutral;
  const e = colorTokens.error;
  const w = colorTokens.warning;
  const su = colorTokens.success;

  return {
    primary: {
      main: p[200],
      light: p[100],
      dark: p[400],
      contrastText: n[900],
    },
    secondary: {
      main: s[200],
      light: s[100],
      dark: s[400],
      contrastText: n[900],
    },
    error: {
      main: e[200],
      light: e[100],
      dark: e[400],
      contrastText: white,
    },
    warning: {
      main: w[200],
      light: w[100],
      dark: w[400],
      contrastText: white,
    },
    success: {
      main: su[200],
      light: su[100],
      dark: su[400],
      contrastText: white,
    },
    info: {
      main: p[200],
      light: p[100],
      dark: p[400],
      contrastText: white,
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
      hover: alphaTokens.actionHoverDark,
      selected: alphaTokens.actionSelectedDark,
      disabled: alphaTokens.actionDisabledDark,
      disabledBackground: alphaTokens.actionDisabledBgDark,
    },
  };
}

/** Resolve semantic color roles for light or dark mode from design-tokens scales. */
export function resolveSemanticPalette(mode: SemanticThemeMode): SemanticPalette {
  return mode === 'dark' ? darkSemanticPalette() : lightSemanticPalette();
}
