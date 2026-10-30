import type { PaletteOptions } from '@mui/material/styles';
import { colorTokens } from '../../tokens/design-tokens';
import { resolveSemanticPalette } from '../../tokens/semantic-palette';

const white = colorTokens.neutral[0];
const black = colorTokens.neutral[1000];

/**
 * MUI palette must use resolved color strings (hex/rgba), not CSS variables.
 * MUI calls alpha(), lighten(), etc. at theme creation time, which cannot parse var(--rds-*).
 *
 * Semantic slot → scale-step mapping lives in resolveSemanticPalette() so CSS
 * injection (build-rds-css-vars.ts) and MUI stay in sync. RDS SCSS continues to
 * use runtime --rds-* via injectTokens().
 */
function toMuiPalette(mode: 'light' | 'dark'): PaletteOptions {
  const sem = resolveSemanticPalette(mode);

  return {
    mode,
    common: { black, white },
    primary: { ...sem.primary },
    secondary: { ...sem.secondary },
    error: { ...sem.error },
    warning: { ...sem.warning },
    success: { ...sem.success },
    info: { ...sem.info },
    background: { ...sem.background },
    text: { ...sem.text },
    divider: sem.divider,
    action: { ...sem.action },
  };
}

export function lightMuiPalette(): PaletteOptions {
  return toMuiPalette('light');
}

export function darkMuiPalette(): PaletteOptions {
  return toMuiPalette('dark');
}
