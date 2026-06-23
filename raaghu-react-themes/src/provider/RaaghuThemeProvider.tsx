import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState, type ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme } from '../mui/dark.theme';
import { lightTheme } from '../mui/light.theme';
import {
  applyRaaghuTheme,
  getRaaghuThemeMode,
  initializeRaaghuTheme,
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
  defaultMode = 'light',
  initializeOnMount = true,
  onModeChange,
  brandOverrides,
}: Readonly<RaaghuThemeProviderProps>) {
  const defaultModeRef = React.useRef(defaultMode);
  const [internalMode, setInternalMode] = useState<RaaghuThemeMode>(defaultModeRef.current);
  const mode = controlledMode ?? internalMode;

  const prevInitializeOnMountRef = React.useRef(initializeOnMount);
  const prevControlledModeRef = React.useRef(controlledMode);
  if (
    (initializeOnMount !== prevInitializeOnMountRef.current || controlledMode !== prevControlledModeRef.current) &&
    initializeOnMount &&
    controlledMode === undefined
  ) {
    prevInitializeOnMountRef.current = initializeOnMount;
    prevControlledModeRef.current = controlledMode;
    setInternalMode(initializeRaaghuTheme());
  }

  const onModeChangeRef = React.useRef(onModeChange);
  React.useLayoutEffect(() => { onModeChangeRef.current = onModeChange; });
  useLayoutEffect(() => {
    applyRaaghuTheme(mode, brandOverrides);
    onModeChangeRef.current?.(mode);
  }, [mode, brandOverrides]);

  const muiTheme = mode === 'dark' ? darkTheme : lightTheme;

  const setMode = useCallback(
    (next: RaaghuThemeMode) => {
      if (controlledMode === undefined) {
        setInternalMode(next);
      }
      applyRaaghuTheme(next, brandOverrides);
      onModeChange?.(next);
    },
    [controlledMode, onModeChange, brandOverrides],
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

