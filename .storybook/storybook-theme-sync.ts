/**
 * Preview-side theme sync for Storybook globals + OS preference.
 * Runs as a preview module side-effect (no Storybook/React hooks).
 */
import { addons } from 'storybook/preview-api';
import {
  applyRaaghuTheme,
  resolveEffectiveMode,
  type RaaghuThemeMode,
} from '../raaghu-react-themes/src/provider/theme-utils';

const GLOBALS_UPDATED = 'globalsUpdated';
const STORYBOOK_THEME_OPTIONS = { persist: false } as const;

function parseThemeMode(value: unknown): RaaghuThemeMode | null {
  if (value === 'light' || value === 'dark' || value === 'system') {
    return value;
  }
  return null;
}

function getThemeModeFromUrl(): RaaghuThemeMode {
  const params = new URLSearchParams(window.location.search);
  const globals = decodeURIComponent(params.get('globals') || '');

  if (globals.includes('theme:dark')) return 'dark';
  if (globals.includes('theme:light')) return 'light';
  return 'system';
}

let currentMode: RaaghuThemeMode = 'system';
let lastEffectiveMode: 'light' | 'dark' | null = null;

/** True when the DOM already reflects the given effective mode. */
function domMatches(effective: 'light' | 'dark'): boolean {
  return document.documentElement.getAttribute('data-theme') === effective;
}

function syncThemeIfChanged(mode: RaaghuThemeMode): void {
  const effective = resolveEffectiveMode(mode);
  // Also check the DOM: docs pages / head scripts may have overwritten
  // data-theme, so a cached match alone is not enough.
  if (mode === currentMode && effective === lastEffectiveMode && domMatches(effective)) {
    return;
  }

  currentMode = mode;
  lastEffectiveMode = effective;
  applyRaaghuTheme(mode, undefined, STORYBOOK_THEME_OPTIONS);
  // Tell the early preview-head.html script not to overwrite this on DOMContentLoaded.
  (window as Window & { __rdsThemeSynced?: boolean }).__rdsThemeSynced = true;
}

function onGlobalsUpdated(event: { globals?: Record<string, unknown> }): void {
  const mode = parseThemeMode(event.globals?.theme) ?? 'system';
  syncThemeIfChanged(mode);
}

/**
 * Re-applies the currently selected Storybook theme to the DOM.
 * Docs/MDX pages (e.g. Introduction) call this on mount, since they do not
 * run story decorators and must not guess the theme from the iframe URL.
 */
export function reapplyStorybookTheme(): void {
  if (typeof window === 'undefined') return;
  syncThemeIfChanged(currentMode);
}

export function setupStorybookThemeSync(): void {
  if (typeof window === 'undefined') return;

  syncThemeIfChanged(getThemeModeFromUrl());

  addons.ready().then(() => {
    addons.getChannel().on(GLOBALS_UPDATED, onGlobalsUpdated);
  });

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', () => {
    if (currentMode === 'system') {
      syncThemeIfChanged('system');
    }
  });

  // Iframe previews can miss OS theme events, and docs pages can overwrite
  // data-theme; poll so the DOM always matches the selected theme.
  window.setInterval(() => {
    syncThemeIfChanged(currentMode);
  }, 500);

  // Re-check during the first seconds after load when matchMedia can be stale.
  [50, 150, 300, 600, 1200].forEach((delay) => {
    window.setTimeout(() => syncThemeIfChanged(currentMode), delay);
  });
}

setupStorybookThemeSync();
