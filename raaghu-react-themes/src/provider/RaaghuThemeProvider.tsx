import React, { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme, lightTheme } from '../mui';
import {
  applyRaaghuTheme,
  getRaaghuThemeMode,
  initializeRaaghuTheme,
  type RaaghuThemeMode,
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
  defaultMode = 'light',
  initializeOnMount = true,
  onModeChange,
}: Readonly<RaaghuThemeProviderProps>) {
  const [internalMode, setInternalMode] = useState<RaaghuThemeMode>(defaultMode);
  const mode = controlledMode ?? internalMode;

  useEffect(() => {
    if (initializeOnMount && controlledMode === undefined) {
      setInternalMode(initializeRaaghuTheme());
    }
  }, [initializeOnMount, controlledMode]);

  useEffect(() => {
    applyRaaghuTheme(mode);
    onModeChange?.(mode);
  }, [mode, onModeChange]);

  const muiTheme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);

  const setMode = useCallback(
    (next: RaaghuThemeMode) => {
      if (controlledMode === undefined) {
        setInternalMode(next);
      }
      applyRaaghuTheme(next);
      onModeChange?.(next);
    },
    [controlledMode, onModeChange],
  );

  const contextValue = useMemo(
    () => ({
      mode,
      setMode,
      toggleMode: () => setMode(mode === 'light' ? 'dark' : 'light'),
      isDark: mode === 'dark',
    }),
    [mode, setMode],
  );

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

export default RaaghuThemeProvider;
