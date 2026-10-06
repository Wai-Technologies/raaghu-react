import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState, type ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createRaaghuMuiTheme } from '../mui/createRaaghuMuiTheme';
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
   * White-label overrides. Keys are `--rds-*` CSS variables.
   * Concrete colors (`#hex`, `rgb()`, `hsl()`) also update the MUI theme.
   * Every key updates SCSS. `var(--...)` values stay on the CSS side only.
   *
   * @example
   * <RaaghuThemeProvider brandOverrides={{ '--rds-primary-main': '#0B3D91' }}>
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
  const muiTheme = useMemo(
    () => createRaaghuMuiTheme(effectiveMode, brandOverrides),
    [effectiveMode, brandOverrides],
  );

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
    <RaaghuThemeContext value={contextValue}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </RaaghuThemeContext>
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

