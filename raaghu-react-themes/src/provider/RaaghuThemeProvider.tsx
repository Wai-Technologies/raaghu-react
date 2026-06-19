import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState, type ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme, lightTheme } from '../mui';
import {
  applyRaaghuTheme,
  getRaaghuThemeMode,
  initializeRaaghuTheme,
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
  const [internalMode, setInternalMode] = useState<RaaghuThemeMode>(defaultMode);
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(() =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)')?.matches
      ? true
      : false,
  );
  const mode = controlledMode ?? internalMode;

  // On mount: read stored preference or OS default
  useEffect(() => {
    if (initializeOnMount && controlledMode === undefined) {
      setInternalMode(initializeRaaghuTheme());
    }
  }, [initializeOnMount, controlledMode]);

  // Apply DOM classes + CSS tokens whenever mode/system preference changes
  useLayoutEffect(() => {
    applyRaaghuTheme(mode, brandOverrides);
    onModeChange?.(mode);
  }, [mode, systemPrefersDark, onModeChange, brandOverrides]);

  // When mode is 'system', track OS preference so React re-renders and MUI theme updates.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (event: MediaQueryListEvent) => {
      setSystemPrefersDark(event.matches);
    };

    // Keep state aligned if the effect runs after a mode toggle.
    setSystemPrefersDark(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // MUI needs the resolved ('light' | 'dark') value — not 'system'
  const effectiveMode = mode === 'system' ? (systemPrefersDark ? 'dark' : 'light') : resolveEffectiveMode(mode);
  const muiTheme = useMemo(() => (effectiveMode === 'dark' ? darkTheme : lightTheme), [effectiveMode]);

  const setMode = useCallback(
    (next: RaaghuThemeMode) => {
      if (controlledMode === undefined) {
        setInternalMode(next);
      }
      onModeChange?.(next);
    },
    [controlledMode, onModeChange],
  );

  const contextValue = useMemo(
    () => ({
      mode,
      setMode,
      // cycles: light → dark → system → light
      toggleMode: () => {
        const next = mode === 'light' ? 'dark' : mode === 'dark' ? 'system' : 'light';
        setMode(next);
      },
      isDark: effectiveMode === 'dark',
    }),
    [mode, effectiveMode, setMode],
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
