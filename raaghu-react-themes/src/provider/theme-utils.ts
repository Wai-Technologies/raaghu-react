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
 * Reads OS dark-mode preference. Checks parent/top windows so embedded
 * contexts (e.g. Storybook preview iframes) inherit the host preference.
 */
export function prefersDarkColorScheme(): boolean {
  if (typeof window === 'undefined') return false;

  const candidates: Window[] = [window];

  try {
    if (window.parent && window.parent !== window) {
      candidates.push(window.parent);
    }
  } catch {
    // Cross-origin parent — ignore.
  }

  try {
    if (window.top && window.top !== window) {
      candidates.push(window.top);
    }
  } catch {
    // Cross-origin top — ignore.
  }

  const seen = new Set<Window>();
  for (const candidate of candidates) {
    if (seen.has(candidate)) continue;
    seen.add(candidate);

    try {
      if (candidate.matchMedia?.('(prefers-color-scheme: dark)')?.matches) {
        return true;
      }
    } catch {
      // Ignore inaccessible frames.
    }
  }

  return false;
}

/**
 * Resolves `'system'` to the actual effective mode by reading
 * `prefers-color-scheme`. `'light'` and `'dark'` are returned as-is.
 */
export function resolveEffectiveMode(mode: RaaghuThemeMode): 'light' | 'dark' {
  if (mode !== 'system') return mode;
  return prefersDarkColorScheme() ? 'dark' : 'light';
}

export interface ApplyRaaghuThemeOptions {
  /** When false, skips writing to localStorage (useful in Storybook). */
  persist?: boolean;
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
export function applyRaaghuTheme(
  mode: RaaghuThemeMode,
  overrides?: RdsBrandOverrides,
  options?: ApplyRaaghuThemeOptions,
): void {
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
  if (options?.persist !== false && typeof localStorage !== 'undefined') {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  }

  injectTokens(effectiveMode, overrides);
}

function getGlobalsParamFromSearch(search: string): string {
  const params = new URLSearchParams(search);
  return decodeURIComponent(params.get('globals') || '');
}

function parseThemeFromGlobals(globals: string): RaaghuThemeMode | null {
  if (globals.includes('theme:dark')) return 'dark';
  if (globals.includes('theme:light')) return 'light';
  if (globals.includes('theme:system')) return 'system';
  return null;
}

/**
 * Walks from `win` up to the outermost accessible frame (Storybook manager).
 * Stops on cross-origin boundaries.
 */
function getAccessibleWindowChain(win: Window): Window[] {
  const chain: Window[] = [];
  const seen = new Set<Window>();
  let current: Window | null = win;

  while (current) {
    if (seen.has(current)) break;
    seen.add(current);

    try {
      // Access location to ensure same-origin readability.
      void current.location.search;
      chain.push(current);
    } catch {
      break;
    }

    if (current.parent === current) break;
    current = current.parent;
  }

  return chain;
}

/**
 * Reads Storybook toolbar theme from the URL hierarchy.
 *
 * The manager (parent) URL is the source of truth. Selecting the default
 * "System" theme clears `theme` from the manager query string, but the
 * preview iframe often keeps a stale `theme:light` / `theme:dark`. Prefer
 * the outermost accessible frame; if it has no explicit theme, treat as
 * system and ignore nested iframe globals.
 */
export function getStorybookThemeFromUrl(win: Window = window): RaaghuThemeMode | null {
  if (typeof win === 'undefined') return null;

  const chain = getAccessibleWindowChain(win);
  if (chain.length === 0) return null;

  const manager = chain[chain.length - 1];
  const managerTheme = parseThemeFromGlobals(
    getGlobalsParamFromSearch(manager.location.search),
  );
  if (managerTheme) return managerTheme;

  // Embedded preview: manager has no theme:* → Storybook default is system.
  // Do not fall back to a stale theme still present on the iframe URL.
  if (chain.length > 1) {
    return 'system';
  }

  // Standalone iframe.html (no manager): use this window's globals only.
  return parseThemeFromGlobals(getGlobalsParamFromSearch(chain[0].location.search));
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
