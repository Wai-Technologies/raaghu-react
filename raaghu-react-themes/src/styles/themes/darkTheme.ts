import { createTheme } from '@mui/material/styles';
import { colorTokens } from '../../../tokens/design-tokens';

/**
 * Dark theme configuration for Raaghu Design System
 * Uses color tokens from design-tokens.ts for consistency
 */
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { 
      main: colorTokens.primary[200],
      light: colorTokens.primary[100],
      dark: colorTokens.primary[400],
      contrastText: colorTokens.neutral[900],
    },
    secondary: { 
      main: colorTokens.secondary[200],
      light: colorTokens.secondary[100],
      dark: colorTokens.secondary[400],
      contrastText: colorTokens.neutral[900],
    },
    background: { 
      default: colorTokens.neutral[1000],
      paper: colorTokens.neutral[800],
    },
    text: { 
      primary: colorTokens.neutral[0],
      secondary: colorTokens.neutral[400],
      disabled: colorTokens.neutral[600],
    },
    error: {
      main: colorTokens.error[200],
      light: colorTokens.error[100],
      dark: colorTokens.error[400],
      contrastText: colorTokens.neutral[900],
    },
    warning: {
      main: colorTokens.warning[200],
      light: colorTokens.warning[100],
      dark: colorTokens.warning[400],
      contrastText: colorTokens.neutral[900],
    },
    success: {
      main: colorTokens.success[200],
      light: colorTokens.success[100],
      dark: colorTokens.success[400],
      contrastText: colorTokens.neutral[900],
    },
    divider: colorTokens.neutral[700],
  },
  // Typography, spacing, breakpoints, etc. can be added here as needed
});

export default darkTheme;
