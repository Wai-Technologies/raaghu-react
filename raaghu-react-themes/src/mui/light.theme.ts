import { createTheme } from '@mui/material/styles';
import { typographyTokens, shadowTokens, breakpointTokens } from '../../tokens/design-tokens';
import { designSystemComponentOverrides } from './overrides';
import { lightMuiPalette } from './palette';

/**
 * Light MUI theme — palette uses resolved hex from design-tokens.ts (required for MUI color math).
 * Runtime --rds-* CSS vars are injected separately for RDS SCSS via injectTokens().
 */
export const lightTheme = createTheme({
  breakpoints: {
    values: {
      xs: parseInt(breakpointTokens.xs, 10),
      sm: parseInt(breakpointTokens.sm, 10),
      md: parseInt(breakpointTokens.md, 10),
      lg: parseInt(breakpointTokens.lg, 10),
      xl: parseInt(breakpointTokens.xl, 10),
    },
  },

  palette: lightMuiPalette(),

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
    borderRadius: 4,
  },

  shadows: [
    shadowTokens.none,
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
});

export default lightTheme;
