import { createTheme, type Theme, type ThemeOptions } from '@mui/material/styles';
import { typographyTokens, shadowTokens, breakpointTokens, radiusTokens } from '../../tokens/design-tokens';
import type { RdsBrandOverrides } from '../../tokens/build-rds-css-vars';
import { designSystemComponentOverrides } from './overrides';
import { lightMuiPalette, darkMuiPalette } from './palette';
import { applyBrandOverridesToPalette } from './brand-palette';

export type RaaghuMuiTheme = Theme & {
  vars: NonNullable<Theme['vars']>;
  colorSchemes: {
    light: { palette: Theme['palette'] };
    dark: { palette: Theme['palette'] };
  };
};

const sharedThemeOptions: ThemeOptions = {
  breakpoints: {
    values: {
      xs: parseInt(breakpointTokens.xs, 10),
      sm: parseInt(breakpointTokens.sm, 10),
      md: parseInt(breakpointTokens.md, 10),
      lg: parseInt(breakpointTokens.lg, 10),
      xl: parseInt(breakpointTokens.xl, 10),
    },
  },
  typography: {
    fontFamily: typographyTokens.fontFamily.primary,
    fontSize: 14,
    h1: { fontSize: typographyTokens.fontSize['5xl'], fontWeight: typographyTokens.fontWeight.bold, lineHeight: typographyTokens.lineHeight.tight },
    h2: { fontSize: typographyTokens.fontSize['4xl'], fontWeight: typographyTokens.fontWeight.bold, lineHeight: typographyTokens.lineHeight.tight },
    h3: { fontSize: typographyTokens.fontSize['3xl'], fontWeight: typographyTokens.fontWeight.semibold, lineHeight: typographyTokens.lineHeight.snug },
    h4: { fontSize: typographyTokens.fontSize['2xl'], fontWeight: typographyTokens.fontWeight.semibold, lineHeight: typographyTokens.lineHeight.snug },
    h5: { fontSize: typographyTokens.fontSize.xl, fontWeight: typographyTokens.fontWeight.medium, lineHeight: typographyTokens.lineHeight.normal },
    h6: { fontSize: typographyTokens.fontSize.lg, fontWeight: typographyTokens.fontWeight.medium, lineHeight: typographyTokens.lineHeight.normal },
    body1: { fontSize: typographyTokens.fontSize.sm, fontWeight: typographyTokens.fontWeight.normal, lineHeight: typographyTokens.lineHeight.normal },
    body2: { fontSize: typographyTokens.fontSize.xs, fontWeight: typographyTokens.fontWeight.normal, lineHeight: typographyTokens.lineHeight.normal },
    subtitle1: { fontSize: typographyTokens.fontSize.base, fontWeight: typographyTokens.fontWeight.medium },
    subtitle2: { fontSize: typographyTokens.fontSize.sm, fontWeight: typographyTokens.fontWeight.medium },
    caption: { fontSize: typographyTokens.fontSize.xs, fontWeight: typographyTokens.fontWeight.normal, lineHeight: typographyTokens.lineHeight.normal },
    overline: { fontSize: typographyTokens.fontSize.xs, fontWeight: typographyTokens.fontWeight.semibold, letterSpacing: typographyTokens.letterSpacing.wider, textTransform: 'uppercase' },
    button: { fontSize: typographyTokens.fontSize.sm, fontWeight: typographyTokens.fontWeight.semibold, letterSpacing: typographyTokens.letterSpacing.wide, textTransform: 'none' },
  },
  shape: {
    borderRadius: parseFloat(radiusTokens.base) * 16,
  },
  shadows: [
    shadowTokens.none as 'none',
    shadowTokens.sm,
    shadowTokens.base,
    shadowTokens.md,
    shadowTokens.lg,
    shadowTokens.xl,
    shadowTokens['2xl'],
    shadowTokens['2xl'], shadowTokens['2xl'], shadowTokens['2xl'],
    shadowTokens['2xl'], shadowTokens['2xl'], shadowTokens['2xl'],
    shadowTokens['2xl'], shadowTokens['2xl'], shadowTokens['2xl'],
    shadowTokens['2xl'], shadowTokens['2xl'], shadowTokens['2xl'],
    shadowTokens['2xl'], shadowTokens['2xl'], shadowTokens['2xl'],
    shadowTokens['2xl'], shadowTokens['2xl'], shadowTokens['2xl'],
  ],
  components: designSystemComponentOverrides,
};

/**
 * Builds the single Raaghu MUI theme with light/dark `colorSchemes` and CSS variables.
 * Optional `brandOverrides` rewrite both `--rds-*` (via injectTokens) and MUI palette channels.
 */
export function createRaaghuTheme(brandOverrides?: RdsBrandOverrides): RaaghuMuiTheme {
  return createTheme({
    cssVariables: {
      colorSchemeSelector: '[data-theme="%s"]',
    },
    colorSchemes: {
      light: {
        palette: applyBrandOverridesToPalette(lightMuiPalette(), brandOverrides),
      },
      dark: {
        palette: applyBrandOverridesToPalette(darkMuiPalette(), brandOverrides),
      },
    },
    ...sharedThemeOptions,
  }) as RaaghuMuiTheme;
}

/** Default Raaghu theme (no brand overrides). Light/dark switch via `data-theme` + `useColorScheme`. */
export const raaghuTheme = createRaaghuTheme();
