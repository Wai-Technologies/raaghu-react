// Theme utilities and exports
// Import this file in your React application to use theme functions

// Note: Import the SCSS files in your main application entry point:
// import 'raaghu-react-themes/src/styles/index.scss';

// Export MUI themes
export * from './styles/themes/index';

// Theme types
export type ThemeMode = 'light' | 'dark' | 'semi-dark';

export interface ThemeColors {
  primary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  secondary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  error: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  warning: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  info: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  success: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  background: {
    default: string;
    paper: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
}

// Theme configuration
export interface RaaghuTheme {
  mode: ThemeMode;
  colors: ThemeColors;
  spacing: Record<string, string>;
  typography: {
    fontFamily: string;
    fontSize: Record<string, string>;
    fontWeight: Record<string, number>;
    lineHeight: Record<string, number>;
  };
  breakpoints: Record<string, string>;
  shadows: Record<string, string>;
  borderRadius: Record<string, string>;
}

// Default theme configuration
export const defaultTheme: RaaghuTheme = {
  mode: 'light',
  colors: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#ffffff',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#ffffff',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
      contrastText: '#ffffff',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
  },
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      snug: 1.375,
      base: 1.5,
      relaxed: 1.625,
    },
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  shadows: {
    1: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    2: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    3: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    4: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
};

// Theme utilities
export class ThemeManager {
  private currentTheme: ThemeMode = 'light';

  /**
   * Set the current theme mode
   */
  setTheme(mode: ThemeMode): void {
    this.currentTheme = mode;
    
    // Remove existing theme classes
    document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-semi-dark');
    
    // Add new theme class
    document.documentElement.classList.add(`theme-${mode}`);
    
    // Import appropriate theme CSS
    this.loadThemeCSS(mode);
  }

  /**
   * Get the current theme mode
   */
  getTheme(): ThemeMode {
    return this.currentTheme;
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Get a CSS custom property value
   */
  getCSSVariable(variable: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(`--rds-${variable}`).trim();
  }

  /**
   * Set a CSS custom property value
   */
  setCSSVariable(variable: string, value: string): void {
    document.documentElement.style.setProperty(`--rds-${variable}`, value);
  }

  /**
   * Load theme-specific CSS
   */
  private loadThemeCSS(mode: ThemeMode): void {
    // Add theme-specific class to document for CSS targeting
    // The actual CSS loading should be handled by your build system
    console.log(`Theme switched to: ${mode}`);
  }

  /**
   * Detect system theme preference
   */
  detectSystemTheme(): ThemeMode {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }

  /**
   * Initialize theme from localStorage or system preference
   */
  initializeTheme(): void {
    let savedTheme: ThemeMode | null = null;
    
    if (typeof window !== 'undefined') {
      savedTheme = localStorage.getItem('raaghu-theme') as ThemeMode;
    }
    
    const initialTheme = savedTheme || this.detectSystemTheme();
    this.setTheme(initialTheme);
  }

  /**
   * Save current theme to localStorage
   */
  saveTheme(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('raaghu-theme', this.currentTheme);
    }
  }
}

// Create a singleton instance
export const themeManager = new ThemeManager();

// Hook for React components (if using React)
export function useTheme() {
  return {
    theme: defaultTheme,
    themeMode: themeManager.getTheme(),
    setTheme: (mode: ThemeMode) => {
      themeManager.setTheme(mode);
      themeManager.saveTheme();
    },
    toggleTheme: () => {
      themeManager.toggleTheme();
      themeManager.saveTheme();
    },
    getCSSVariable: themeManager.getCSSVariable.bind(themeManager),
    setCSSVariable: themeManager.setCSSVariable.bind(themeManager),
  };
}

// Initialize theme on module load
if (typeof window !== 'undefined') {
  themeManager.initializeTheme();
}

// Export theme-related constants
export const THEME_MODES: ThemeMode[] = ['light', 'dark', 'semi-dark'];

export const THEME_STORAGE_KEY = 'raaghu-theme';

// Note: To use the SCSS styles, import them in your main application:
// import 'raaghu-react-themes/src/styles/index.scss';
// or import specific theme files:
// import 'raaghu-react-themes/src/styles/themes/light.scss';
