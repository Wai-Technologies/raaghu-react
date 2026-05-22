/**
 * Canonical theme utilities for Raaghu Design System.
 * Single source for DOM theme state — used by RaaghuThemeProvider,
 * Storybook, chart-utils, and client applications.
 */

import { injectTokens } from '../../tokens/build-rds-css-vars';

export type RaaghuThemeMode = 'light' | 'dark' | 'semi-dark';

export const THEME_STORAGE_KEY = 'raaghu-theme';

/** CSS classes applied to document.body when a theme is active */
export const RAAGHU_THEME_BODY_CLASSES = {
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
 */
export function applyRaaghuTheme(mode: RaaghuThemeMode): void {
  if (typeof document === 'undefined') return;

  const isDark = mode === 'dark';

  document.documentElement.setAttribute('data-theme', mode);
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

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  }

  injectTokens(mode);
}

export function getRaaghuThemeMode(): RaaghuThemeMode {
  if (typeof document === 'undefined') return 'light';
  const htmlTheme = document.documentElement.getAttribute('data-theme');
  if (htmlTheme === 'dark' || htmlTheme === 'semi-dark' || htmlTheme === 'light') {
    return htmlTheme;
  }
  return isDarkMode() ? 'dark' : 'light';
}

/**
 * Initializes theme from localStorage or system preference.
 */
export function initializeRaaghuTheme(): RaaghuThemeMode {
  const stored =
    typeof localStorage !== 'undefined'
      ? (localStorage.getItem(THEME_STORAGE_KEY) as RaaghuThemeMode | null)
      : null;

  const prefersDark =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)')?.matches;

  const mode: RaaghuThemeMode =
    stored === 'dark' || stored === 'semi-dark'
      ? stored
      : stored === 'light'
        ? 'light'
        : prefersDark
          ? 'dark'
          : 'light';

  applyRaaghuTheme(mode);
  return mode;
}
