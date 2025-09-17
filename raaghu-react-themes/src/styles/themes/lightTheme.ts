import { createTheme } from '@mui/material/styles';
import { colorTokens } from '../../../tokens/design-tokens';

/**
 * Light theme configuration for Raaghu Design System
 * Uses color tokens from design-tokens.ts for consistency
 */
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { 
      main: colorTokens.primary[700],
      light: colorTokens.primary[500],
      dark: colorTokens.primary[800],
      contrastText: colorTokens.neutral[0],
    },
    secondary: { 
      main: colorTokens.secondary[700],
      light: colorTokens.secondary[500],
      dark: colorTokens.secondary[800],
      contrastText: colorTokens.neutral[0],
    },
    background: { 
      default: colorTokens.neutral[100],
      paper: colorTokens.neutral[0],
    },
    text: { 
      primary: colorTokens.neutral[900],
      secondary: colorTokens.neutral[700],
      disabled: colorTokens.neutral[500],
    },
    error: {
      main: colorTokens.error[700],
      light: colorTokens.error[500],
      dark: colorTokens.error[800],
      contrastText: colorTokens.neutral[0],
    },
    warning: {
      main: colorTokens.warning[700],
      light: colorTokens.warning[500],
      dark: colorTokens.warning[800],
      contrastText: colorTokens.neutral[900],
    },
    success: {
      main: colorTokens.success[700],
      light: colorTokens.success[500],
      dark: colorTokens.success[800],
      contrastText: colorTokens.neutral[0],
    },
    divider: colorTokens.neutral[300],
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Additional button-specific overrides
        },
        containedPrimary: {
          backgroundColor: colorTokens.primary[700],
          '&:hover': {
            backgroundColor: colorTokens.primary[750],
          },
        },
        containedSecondary: {
          backgroundColor: colorTokens.secondary[700],
          '&:hover': {
            backgroundColor: colorTokens.secondary[750],
          },
        },
        containedSuccess: {
          backgroundColor: colorTokens.success[700],
          '&:hover': {
            backgroundColor: colorTokens.success[750],
          },
        },
        containedWarning: {
          backgroundColor: colorTokens.warning[700],
          '&:hover': {
            backgroundColor: colorTokens.warning[750],
          },
        },
        containedError: {
          backgroundColor: colorTokens.error[700],
          '&:hover': {
            backgroundColor: colorTokens.error[750],
          },
        }

      },
    },
  },
  // Typography, spacing, breakpoints, etc. can be added here as needed
});

export default lightTheme;
