/**
 * Preview-side theme sync for Storybook globals + OS preference.
 * Runs as a preview module side-effect (no Storybook/React hooks).
 */
import { addons } from 'storybook/preview-api';
import {
  applyRaaghuTheme,
  getStorybookThemeFromUrl,
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
  return getStorybookThemeFromUrl() ?? 'system';
}

let currentMode: RaaghuThemeMode = 'system';
let lastEffectiveMode: 'light' | 'dark' | null = null;

function syncThemeIfChanged(mode: RaaghuThemeMode): void {
  const effective = resolveEffectiveMode(mode);
  if (mode === currentMode && effective === lastEffectiveMode) {
    return;
  }

  currentMode = mode;
  lastEffectiveMode = effective;
  applyRaaghuTheme(mode, undefined, STORYBOOK_THEME_OPTIONS);
}

function onGlobalsUpdated(event: { globals?: Record<string, unknown> }): void {
  const mode = parseThemeMode(event.globals?.theme) ?? 'system';
  syncThemeIfChanged(mode);
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

  // Iframe previews can miss OS theme events; poll while following system mode.
  window.setInterval(() => {
    const urlMode = getStorybookThemeFromUrl();
    if (urlMode) {
      syncThemeIfChanged(urlMode);
      return;
    }
    if (currentMode === 'system') {
      syncThemeIfChanged('system');
    }
  }, 500);

  // Re-check during the first seconds after load when matchMedia can be stale.
  [50, 150, 300, 600, 1200].forEach((delay) => {
    window.setTimeout(() => syncThemeIfChanged(currentMode), delay);
  });
}

setupStorybookThemeSync();
