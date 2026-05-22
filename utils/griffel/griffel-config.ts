/**
 * Griffel Configuration for Raaghu Design System
 * 
 * This file provides Griffel utilities and configuration for the design system.
 * It integrates with the existing MUI theme system and design tokens.
 */

import { makeStyles, mergeClasses } from '@griffel/react';
import { lightTheme, darkTheme } from '../../raaghu-react-themes/src/mui';
import { designTokens as originalDesignTokens } from '../../raaghu-react-themes/tokens/design-tokens';

/**
 * Theme-aware design tokens for Griffel
 * These tokens automatically adapt based on the current theme using existing theme files
 */
export const createThemeAwareTokens = (theme: 'light' | 'dark') => {
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  
  return {
    colors: {
      primary: {
        main: currentTheme.palette.primary.main,
        light: currentTheme.palette.primary.light,
        dark: currentTheme.palette.primary.dark,
        contrast: currentTheme.palette.primary.contrastText
      },
      secondary: {
        main: currentTheme.palette.secondary.main,
        light: currentTheme.palette.secondary.light,
        dark: currentTheme.palette.secondary.dark,
        contrast: currentTheme.palette.secondary.contrastText
      },
      error: currentTheme.palette.error.main,
      warning: currentTheme.palette.warning.main,
      success: currentTheme.palette.success.main,
      background: {
        default: currentTheme.palette.background.default,
        paper: currentTheme.palette.background.paper
      },
      text: {
        primary: currentTheme.palette.text.primary,
        secondary: currentTheme.palette.text.secondary
      }
    },
    spacing: originalDesignTokens.spacing,
    typography: originalDesignTokens.typography,
    borderRadius: originalDesignTokens.radius,
    shadows: originalDesignTokens.shadow,
    animation: originalDesignTokens.animation,
    zIndex: originalDesignTokens.zIndex,
    breakpoint: originalDesignTokens.breakpoint,
    component: originalDesignTokens.component
  };
};

// Default design tokens (light theme)
export const designTokens = createThemeAwareTokens('light');

/**
 * Global Griffel styles that override MUI and provide base styling
 * These styles use the proper design tokens and adapt to theme changes
 */
export const createGlobalStyles = (theme: 'light' | 'dark') => {
  const tokens = createThemeAwareTokens(theme);
  
  return makeStyles({
    // Root level styles that take precedence over MUI
    root: {
      fontFamily: tokens.typography.fontFamily.primary,
      fontSize: tokens.typography.fontSize.base,
      lineHeight: tokens.typography.lineHeight.normal,
      color: tokens.colors.text.primary,
      backgroundColor: tokens.colors.background.default,
    },
    
    // Override MUI's global button styles
    muiButtonOverride: {
      '& .MuiButton-root': {
        fontFamily: tokens.typography.fontFamily.primary,
        fontWeight: tokens.typography.fontWeight.medium,
        textTransform: 'none',
        borderRadius: tokens.borderRadius.md,
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: tokens.shadows.md,
        },
      },
    },
    
    // Override MUI's global input styles
    muiInputOverride: {
      '& .MuiInputBase-root': {
        fontFamily: tokens.typography.fontFamily.primary,
        fontSize: tokens.typography.fontSize.base,
        borderRadius: tokens.borderRadius.md,
      },
      '& .MuiOutlinedInput-root': {
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: tokens.colors.primary.main,
        } as any,
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: tokens.colors.primary.main,
          borderWidth: 2,
        } as any,
      },
    },
    
    // Override MUI's global typography
    muiTypographyOverride: {
      '& .MuiTypography-root': {
        fontFamily: tokens.typography.fontFamily.primary,
      },
      '& .MuiTypography-h1': {
        fontSize: tokens.typography.fontSize['4xl'],
        fontWeight: tokens.typography.fontWeight.bold,
      },
      '& .MuiTypography-h2': {
        fontSize: tokens.typography.fontSize['3xl'],
        fontWeight: tokens.typography.fontWeight.semibold,
      },
      '& .MuiTypography-h3': {
        fontSize: tokens.typography.fontSize['2xl'],
        fontWeight: tokens.typography.fontWeight.semibold,
      },
    },
    
    // Override MUI's global paper styles
    muiPaperOverride: {
      '& .MuiPaper-root': {
        fontFamily: tokens.typography.fontFamily.primary,
        borderRadius: tokens.borderRadius.lg,
        boxShadow: tokens.shadows.base,
        backgroundColor: tokens.colors.background.paper,
        color: tokens.colors.text.primary,
      },
    },
    
    // Override MUI's global container styles
    muiContainerOverride: {
      '& .MuiContainer-root': {
        fontFamily: tokens.typography.fontFamily.primary,
      },
    },
  });
};

// Default global styles (light theme)
export const globalStyles = createGlobalStyles('light');

/**
 * Common Griffel styles that can be reused across components
 * These styles use the proper design tokens and adapt to theme changes
 */
export const createCommonStyles = (theme: 'light' | 'dark') => {
  const tokens = createThemeAwareTokens(theme);
  
  return makeStyles({
    // Button variants
    buttonPrimary: {
      backgroundColor: tokens.colors.primary.main,
      color: tokens.colors.primary.contrast,
      border: 'none',
      borderRadius: tokens.borderRadius.md,
      padding: `${tokens.spacing[2]} ${tokens.spacing[4]}`,
      fontFamily: tokens.typography.fontFamily.primary,
      fontSize: tokens.typography.fontSize.base,
      fontWeight: tokens.typography.fontWeight.medium,
      cursor: 'pointer',
      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        backgroundColor: tokens.colors.primary.dark,
        transform: 'translateY(-1px)',
        boxShadow: tokens.shadows.md
      },
      '&:active': {
        transform: 'translateY(0)',
        boxShadow: tokens.shadows.sm
      },
      '&:disabled': {
        backgroundColor: '#E0E0E0',
        color: '#9E9E9E',
        cursor: 'not-allowed',
        transform: 'none',
        boxShadow: 'none'
      }
    },
    
    buttonSecondary: {
      backgroundColor: 'transparent',
      color: tokens.colors.secondary.main,
      border: `2px solid ${tokens.colors.secondary.main}`,
      borderRadius: tokens.borderRadius.md,
      padding: `${tokens.spacing[2]} ${tokens.spacing[4]}`,
      fontFamily: tokens.typography.fontFamily.primary,
      fontSize: tokens.typography.fontSize.base,
      fontWeight: tokens.typography.fontWeight.medium,
      cursor: 'pointer',
      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        backgroundColor: tokens.colors.secondary.light,
        transform: 'translateY(-1px)',
        boxShadow: tokens.shadows.md
      },
      '&:active': {
        transform: 'translateY(0)',
        boxShadow: tokens.shadows.sm
      }
    },

    // Card styles
    card: {
      backgroundColor: tokens.colors.background.paper,
      borderRadius: tokens.borderRadius.lg,
      boxShadow: tokens.shadows.base,
      padding: tokens.spacing[6],
      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        boxShadow: tokens.shadows.md,
        transform: 'translateY(-2px)'
      }
    },

    // Input styles
    input: {
      border: `1px solid #E0E0E0`,
      borderRadius: tokens.borderRadius.md,
      padding: `${tokens.spacing[2]} ${tokens.spacing[4]}`,
      fontFamily: tokens.typography.fontFamily.primary,
      fontSize: tokens.typography.fontSize.base,
      transition: 'border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:focus': {
        outline: 'none',
        borderColor: tokens.colors.primary.main,
        boxShadow: `0 0 0 2px ${tokens.colors.primary.light}`
      } as any,
      '&:disabled': {
        backgroundColor: '#F5F5F5',
        color: '#9E9E9E',
        cursor: 'not-allowed'
      }
    },

    // Typography styles
    heading1: {
      fontFamily: tokens.typography.fontFamily.primary,
      fontSize: tokens.typography.fontSize['4xl'],
      fontWeight: tokens.typography.fontWeight.bold,
      color: tokens.colors.text.primary,
      margin: 0,
      lineHeight: tokens.typography.lineHeight.tight
    },

    heading2: {
      fontFamily: tokens.typography.fontFamily.primary,
      fontSize: tokens.typography.fontSize['3xl'],
      fontWeight: tokens.typography.fontWeight.semibold,
      color: tokens.colors.text.primary,
      margin: 0,
      lineHeight: tokens.typography.lineHeight.snug
    },

    bodyText: {
      fontFamily: tokens.typography.fontFamily.primary,
      fontSize: tokens.typography.fontSize.base,
      fontWeight: tokens.typography.fontWeight.normal,
      color: tokens.colors.text.primary,
      lineHeight: tokens.typography.lineHeight.normal
    },

    // Layout utilities
    flexCenter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },

    flexBetween: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },

    flexColumn: {
      display: 'flex',
      flexDirection: 'column'
    },

    // Spacing utilities
    marginXs: { margin: tokens.spacing[1] },
    marginSm: { margin: tokens.spacing[2] },
    marginMd: { margin: tokens.spacing[4] },
    marginLg: { margin: tokens.spacing[6] },
    marginXl: { margin: tokens.spacing[8] },

    paddingXs: { padding: tokens.spacing[1] },
    paddingSm: { padding: tokens.spacing[2] },
    paddingMd: { padding: tokens.spacing[4] },
    paddingLg: { padding: tokens.spacing[6] },
    paddingXl: { padding: tokens.spacing[8] }
  });
};

// Default common styles (light theme)
export const commonStyles = createCommonStyles('light');

/**
 * Utility function to merge Griffel classes with existing MUI classes
 */
export const mergeGriffelClasses = (griffelClasses: string, muiClasses?: string) => {
  return mergeClasses(griffelClasses, muiClasses);
};

/**
 * Theme-aware styles using proper design tokens
 */
export const createThemeAwareStyles = (theme: 'light' | 'dark') => {
  const tokens = createThemeAwareTokens(theme);
  
  return makeStyles({
    themedBackground: {
      backgroundColor: tokens.colors.background.default,
      color: tokens.colors.text.primary
    },
    themedPrimary: {
      backgroundColor: tokens.colors.primary.main,
      color: tokens.colors.primary.contrast
    },
    themedSecondary: {
      backgroundColor: tokens.colors.secondary.main,
      color: tokens.colors.secondary.contrast
    },
    themedPaper: {
      backgroundColor: tokens.colors.background.paper,
      color: tokens.colors.text.primary,
      boxShadow: tokens.shadows.base,
      borderRadius: tokens.borderRadius.lg
    },
    themedText: {
      color: tokens.colors.text.primary,
      fontFamily: tokens.typography.fontFamily.primary
    },
    themedTextSecondary: {
      color: tokens.colors.text.secondary,
      fontFamily: tokens.typography.fontFamily.primary
    }
  });
};

// Default theme-aware styles (light theme)
export const useLightThemeStyles = createThemeAwareStyles('light');
export const useDarkThemeStyles = createThemeAwareStyles('dark');

/**
 * Hook to get theme-aware styles
 */
export const useThemeAwareStyles = (theme: 'light' | 'dark' = 'light') => {
  const lightClasses = useLightThemeStyles();
  const darkClasses = useDarkThemeStyles();
  
  return theme === 'light' ? lightClasses : darkClasses;
};
