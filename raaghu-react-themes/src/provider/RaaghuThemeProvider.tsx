import React, { useCallback, useEffect, useLayoutEffect, useState, type ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme } from '../mui/dark.theme';
import { lightTheme } from '../mui/light.theme';
import {
  applyRaaghuTheme,
  getRaaghuThemeMode,
  initializeRaaghuTheme,
  prefersDarkColorScheme,
  resolveEffectiveMode,
  type RaaghuThemeMode,
  type RdsBrandOverrides,
} from './theme-utils';

export interface RaaghuThemeProviderProps {
  children: ReactNode;
  /** Controlled theme mode */
  mode?: RaaghuThemeMode;
  /** Initial mode when uncontrolled (defaults to stored preference or system) */
  defaultMode?: RaaghuThemeMode;
  /** When true, reads localStorage / prefers-color-scheme on mount */
  initializeOnMount?: boolean;
  onModeChange?: (mode: RaaghuThemeMode) => void;
  /**
   * Optional white-label / brand overrides applied on top of the base token set.
   * Keys must be valid `--rds-*` CSS variable names.
   *
   * @example
   * <RaaghuThemeProvider brandOverrides={{ '--rds-primary-main': '#FF6600' }}>
   *   <App />
   * </RaaghuThemeProvider>
   */
  brandOverrides?: RdsBrandOverrides;
}

/**
 * Industry-standard theme root: syncs MUI ThemeProvider with Raaghu CSS custom properties.
 *
 * Usage:
 * ```tsx
 * import 'raaghu-react-themes/src/styles/index.scss';
 * import { RaaghuThemeProvider } from 'raaghu-react-themes';
 *
 * <RaaghuThemeProvider>
 *   <App />
 * </RaaghuThemeProvider>
 * ```
 */
export function RaaghuThemeProvider({
  children,
  mode: controlledMode,
  defaultMode = 'system',
  initializeOnMount = true,
  onModeChange,
  brandOverrides,
}: Readonly<RaaghuThemeProviderProps>) {
  const [internalMode, setInternalMode] = useState<RaaghuThemeMode>(() => {
    if (controlledMode !== undefined) {
      return defaultMode;
    }
    if (initializeOnMount && typeof window !== 'undefined') {
      return initializeRaaghuTheme();
    }
    return defaultMode;
  });
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(() =>
    typeof window !== 'undefined' ? prefersDarkColorScheme() : false,
  );
  const mode = controlledMode ?? internalMode;

  useLayoutEffect(() => {
    applyRaaghuTheme(mode, brandOverrides);
  }, [mode, systemPrefersDark, brandOverrides]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      setSystemPrefersDark(prefersDarkColorScheme());
    };

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const effectiveMode = mode === 'system' ? (systemPrefersDark ? 'dark' : 'light') : resolveEffectiveMode(mode);
  const muiTheme = effectiveMode === 'dark' ? darkTheme : lightTheme;

  const setMode = useCallback(
    (next: RaaghuThemeMode) => {
      if (controlledMode === undefined) {
        setInternalMode(next);
      }
      onModeChange?.(next);
    },
    [controlledMode, onModeChange],
  );

  const contextValue = {
    mode,
    setMode,
    toggleMode: () => {
      const next = mode === 'light' ? 'dark' : mode === 'dark' ? 'system' : 'light';
      setMode(next);
    },
    isDark: effectiveMode === 'dark',
  };

  return (
    <RaaghuThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </RaaghuThemeContext.Provider>
  );
}

interface RaaghuThemeContextValue {
  mode: RaaghuThemeMode;
  setMode: (mode: RaaghuThemeMode) => void;
  toggleMode: () => void;
  isDark: boolean;
}

const RaaghuThemeContext = React.createContext<RaaghuThemeContextValue | null>(null);

export function useRaaghuTheme(): RaaghuThemeContextValue {
  const ctx = React.useContext(RaaghuThemeContext);
  if (!ctx) {
    return {
      mode: getRaaghuThemeMode(),
      setMode: applyRaaghuTheme,
      toggleMode: () => applyRaaghuTheme(getRaaghuThemeMode() === 'light' ? 'dark' : 'light'),
      isDark: getRaaghuThemeMode() === 'dark',
    };
  }
  return ctx;
}

