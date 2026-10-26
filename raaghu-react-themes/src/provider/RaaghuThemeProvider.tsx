import { createContext, use, useCallback, useEffect, useLayoutEffect, useMemo, useState, type ReactNode } from 'react';
import { ThemeProvider, useColorScheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createRaaghuTheme, raaghuTheme } from '../mui/raaghu.theme';
import {
  applyRaaghuTheme,
  getRaaghuThemeMode,
  initializeRaaghuTheme,
  prefersDarkColorScheme,
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

function MuiColorSchemeSync({ mode }: Readonly<{ mode: RaaghuThemeMode }>) {
  const { setMode } = useColorScheme();

  useLayoutEffect(() => {
    setMode(mode);
  }, [mode, setMode]);

  return null;
}

/**
 * Industry-standard theme root: syncs MUI ThemeProvider with Raaghu CSS custom properties.
 *
 * Usage:
 * ```tsx
 * import '@waiin/raaghu-react/styles.css';
 * import { RaaghuThemeProvider } from '@waiin/raaghu-react';
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
  const isControlled = controlledMode !== undefined;
  const [internalMode, setInternalMode] = useState<RaaghuThemeMode>(() =>
    !isControlled && initializeOnMount && typeof window !== 'undefined' ? initializeRaaghuTheme() : defaultMode,
  );
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(() =>
    typeof window !== 'undefined' ? prefersDarkColorScheme() : false,
  );
  const mode = controlledMode ?? internalMode;

  const brandOverridesKey = brandOverrides ? JSON.stringify(brandOverrides) : '';
  const stableBrandOverrides = useMemo<RdsBrandOverrides | undefined>(
    () => (brandOverridesKey ? JSON.parse(brandOverridesKey) : undefined),
    [brandOverridesKey],
  );

  const muiTheme = useMemo(
    () => (stableBrandOverrides ? createRaaghuTheme(stableBrandOverrides) : raaghuTheme),
    [stableBrandOverrides],
  );

  useLayoutEffect(() => {
    applyRaaghuTheme(mode, stableBrandOverrides, { persist: !isControlled });
  }, [mode, systemPrefersDark, stableBrandOverrides, isControlled]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setSystemPrefersDark(prefersDarkColorScheme());
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const effectiveMode = mode === 'system' ? (systemPrefersDark ? 'dark' : 'light') : mode;

  const setMode = useCallback(
    (next: RaaghuThemeMode) => {
      if (!isControlled) setInternalMode(next);
      onModeChange?.(next);
    },
    [isControlled, onModeChange],
  );

  const contextValue = useMemo<RaaghuThemeContextValue>(
    () => ({
      mode,
      setMode,
      toggleMode: () => {
        const next = mode === 'light' ? 'dark' : mode === 'dark' ? 'system' : 'light';
        setMode(next);
      },
      isDark: effectiveMode === 'dark',
    }),
    [mode, setMode, effectiveMode],
  );

  return (
    <RaaghuThemeContext value={contextValue}>
      <ThemeProvider
        theme={muiTheme}
        defaultMode={defaultMode}
        storageManager={null}
      >
        <MuiColorSchemeSync mode={mode} />
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

const RaaghuThemeContext = createContext<RaaghuThemeContextValue | null>(null);

export function useRaaghuTheme(): RaaghuThemeContextValue {
  const ctx = use(RaaghuThemeContext);
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
