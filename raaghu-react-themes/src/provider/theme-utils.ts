/**
 * Canonical theme utilities for Raaghu Design System.
 * Single source for DOM theme state — used by RaaghuThemeProvider,
 * Storybook, chart-utils, and client applications.
 */

import { injectTokens, type RdsBrandOverrides } from '../../tokens/build-rds-css-vars';

/**
 * Supported theme modes for the Raaghu Design System.
 *
 * - `'light'`  — always light, ignores OS preference
 * - `'dark'`   — always dark, ignores OS preference
 * - `'system'` — follows the OS/browser `prefers-color-scheme` automatically
 */
export type RaaghuThemeMode = 'light' | 'dark' | 'system';

/**
 * Resolves `'system'` to the actual effective mode by reading
 * `prefers-color-scheme`. `'light'` and `'dark'` are returned as-is.
 */
export function resolveEffectiveMode(mode: RaaghuThemeMode): 'light' | 'dark' {
  if (mode !== 'system') return mode;
  return typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)')?.matches
    ? 'dark'
    : 'light';
}

export { type RdsBrandOverrides };

export const THEME_STORAGE_KEY = 'raaghu-theme';

/** CSS classes applied to document.body when a theme is active */
const RAAGHU_THEME_BODY_CLASSES = {
  light: ['light-theme', 'theme-light'],
  dark: ['dark-theme', 'theme-dark'],
} as const;

/**
 * Returns true when the document is in dark mode.
 * Checks data-theme and legacy body/html class patterns.
 */
export function isDarkMode(): boolean {
  if (typeof document === 'undefined') return false;

  const htmlTheme = document.documentElement.getAttribute('data-theme');
  const bodyTheme = document.body.getAttribute('data-theme');

  return (
    htmlTheme === 'dark' ||
    bodyTheme === 'dark' ||
    document.documentElement.classList.contains('rds-theme--dark') ||
    document.body.classList.contains('dark-theme') ||
    document.body.classList.contains('theme-dark') ||
    document.documentElement.classList.contains('theme-dark')
  );
}

/**
 * Applies theme to the DOM so runtime --rds-* tokens and MUI stay in sync.
 *
 * @param mode - `'light'`, `'dark'`, or `'system'` (follows OS preference).
 * @param overrides - Optional brand overrides applied on top of the base token set.
 */
export function applyRaaghuTheme(mode: RaaghuThemeMode, overrides?: RdsBrandOverrides): void {
  if (typeof document === 'undefined') return;

  // Resolve 'system' → actual 'light' | 'dark' for DOM/token application
  const effectiveMode = resolveEffectiveMode(mode);
  const isDark = effectiveMode === 'dark';

  // Apply effective mode to the DOM (components read this)
  document.documentElement.setAttribute('data-theme', effectiveMode);
  document.documentElement.classList.toggle('rds-theme--dark', isDark);
  document.documentElement.classList.toggle('theme-dark', isDark);
  document.documentElement.classList.toggle('theme-light', !isDark);

  const allBodyClasses = [
    ...RAAGHU_THEME_BODY_CLASSES.light,
    ...RAAGHU_THEME_BODY_CLASSES.dark,
  ];
  document.body.classList.remove(...allBodyClasses);
  document.body.classList.add(
    ...(isDark ? RAAGHU_THEME_BODY_CLASSES.dark : RAAGHU_THEME_BODY_CLASSES.light),
  );

  // Persist the user's intent ('system', 'light', or 'dark') — not the resolved value
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  }

  injectTokens(effectiveMode, overrides);
}

export function getRaaghuThemeMode(): RaaghuThemeMode {
  if (typeof document === 'undefined') return 'light';
  const htmlTheme = document.documentElement.getAttribute('data-theme');
  if (htmlTheme === 'dark' || htmlTheme === 'light') {
    return htmlTheme;
  }
  return isDarkMode() ? 'dark' : 'light';
}

/**
 * Initializes theme from localStorage or system preference.
 * Returns `'system'` when no stored preference exists (default behaviour).
 */
export function initializeRaaghuTheme(): RaaghuThemeMode {
  const stored =
    typeof localStorage !== 'undefined'
      ? (localStorage.getItem(THEME_STORAGE_KEY) as RaaghuThemeMode | null)
      : null;

  const mode: RaaghuThemeMode =
    stored === 'dark' || stored === 'light' || stored === 'system'
      ? stored
      : 'system'; // default: follow the OS when nothing is explicitly stored

  applyRaaghuTheme(mode);
  return mode;
}
