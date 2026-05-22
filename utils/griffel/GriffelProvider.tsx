/**
 * Griffel Provider Component
 * 
 * This component provides Griffel context and utilities to the entire application.
 * It integrates with the existing MUI theme system and provides theme-aware styling.
 */

import React, { createContext, useContext, useEffect, type ReactNode } from 'react';
import { RendererProvider } from '@griffel/react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../../raaghu-react-themes/src/mui';
import { designTokens, useLightThemeStyles, useDarkThemeStyles, createGlobalStyles, createThemeAwareTokens } from './griffel-config';
import { applyRaaghuTheme, initializeRaaghuTheme } from '../../raaghu-react-themes/src/provider/theme-utils';

// Create a custom renderer for Griffel (only for SSR)
const renderer = typeof window === 'undefined' ? {
  renderRule: () => '',
  renderKeyframe: () => '',
  renderFontFace: () => '',
} as any : undefined;

// Pre-define theme style hooks at module level (React hooks must be unconditional)
const useLightGlobalStyles = createGlobalStyles('light');
const useDarkGlobalStyles = createGlobalStyles('dark');


interface GriffelContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  designTokens: typeof designTokens;
}

const GriffelContext = createContext<GriffelContextType | undefined>(undefined);

export const useGriffelContext = () => {
  const context = useContext(GriffelContext);
  if (!context) {
    throw new Error('useGriffelContext must be used within a GriffelProvider');
  }
  return context;
};

interface GriffelProviderProps {
  children: ReactNode;
  initialTheme?: 'light' | 'dark';
}

export function GriffelProvider({ 
  children, 
  initialTheme = 'light' 
}: Readonly<GriffelProviderProps>) {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(initialTheme);
  const lightStyles = useLightGlobalStyles();
  const darkStyles = useDarkGlobalStyles();
  const globalStyleClasses = theme === 'light' ? lightStyles : darkStyles;
  const currentDesignTokens = createThemeAwareTokens(theme);
  
  const toggleTheme = React.useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // Update the document theme attributes for SCSS compatibility
    applyRaaghuTheme(newTheme);
  }, [theme]);

  // Initialize theme on mount
  useEffect(() => {
    const detectedTheme = initializeRaaghuTheme();
    setTheme(detectedTheme);
  }, []);

  const muiTheme = React.useMemo(() => {
    return theme === 'light' ? lightTheme : darkTheme;
  }, [theme]);

  const contextValue = React.useMemo(() => ({
    theme,
    toggleTheme,
    designTokens: currentDesignTokens
  }), [theme, toggleTheme, currentDesignTokens]);

  return (
    <RendererProvider renderer={renderer}>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <GriffelContext.Provider value={contextValue}>
            <div className={globalStyleClasses.root}>
              <div className={globalStyleClasses.muiButtonOverride}>
                <div className={globalStyleClasses.muiInputOverride}>
                  <div className={globalStyleClasses.muiTypographyOverride}>
                    <div className={globalStyleClasses.muiPaperOverride}>
                      <div className={globalStyleClasses.muiContainerOverride}>
                        {children}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GriffelContext.Provider>
        </ThemeProvider>
      </RendererProvider>
  );
}

/**
 * Higher-order component to wrap components with Griffel utilities
 */
export const withGriffel = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return React.forwardRef<any, P>((props, ref) => {
    const { theme, designTokens } = useGriffelContext();
    const lightClasses = useLightThemeStyles();
    const darkClasses = useDarkThemeStyles();
    const themeAwareStyles = theme === 'light' ? lightClasses : darkClasses;
    
    return (
      <Component
        {...(props as any)}
        ref={ref}
        theme={theme}
        designTokens={designTokens}
        themeAwareStyles={themeAwareStyles}
      />
    );
  });
};

/**
 * Hook to get theme-aware design tokens
 */
export const useDesignTokens = () => {
  const { designTokens, theme } = useGriffelContext();
  
  return {
    ...designTokens,
    currentTheme: theme,
    isLight: theme === 'light',
    isDark: theme === 'dark'
  };
};

/**
 * Hook to get theme toggle functionality
 */
export const useThemeToggle = () => {
  const { theme, toggleTheme } = useGriffelContext();
  
  return {
    theme,
    toggleTheme,
    isLight: theme === 'light',
    isDark: theme === 'dark'
  };
};
