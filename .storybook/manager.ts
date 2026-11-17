import { addons } from 'storybook/manager-api';
import { GLOBALS_UPDATED, SET_GLOBALS } from 'storybook/internal/core-events';
import { create } from 'storybook/theming/create';
import '../.storybook/custom-theme.css';

type ThemeMode = 'light' | 'dark' | 'system';

const BRAND = {
  brandTitle: 'Raaghu Design System',
  brandUrl: 'https://waiin.com/raaghu',
} as const;

const managerThemes = {
  light: create({
    base: 'light',
    ...BRAND,
    brandImage: 'https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png',
  }),
  dark: create({
    base: 'dark',
    ...BRAND,
    brandImage: 'https://raaghustorageaccount.blob.core.windows.net/raaghu-designsystem/raaghu-design-system-darkmode3.png',
  }),
};

const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

function parseMode(value: unknown): ThemeMode {
  return value === 'light' || value === 'dark' ? value : 'system';
}

/** Theme selected in the manager URL (?globals=theme:dark), used before the API is ready. */
function getModeFromUrl(): ThemeMode {
  const globals = decodeURIComponent(new URLSearchParams(window.location.search).get('globals') || '');
  if (globals.includes('theme:dark')) return 'dark';
  if (globals.includes('theme:light')) return 'light';
  return 'system';
}

function resolve(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'system') return darkQuery.matches ? 'dark' : 'light';
  return mode;
}

/**
 * Keeps the manager UI (sidebar, toolbar, addon panel) in sync with the
 * "Theme" toolbar global, the same way the preview iframe is themed.
 */
addons.register('raaghu/theme-sync', (api) => {
  let mode: ThemeMode = getModeFromUrl();
  let applied: 'light' | 'dark' | null = null;

  const apply = () => {
    const effective = resolve(mode);
    if (effective === applied) return;
    applied = effective;
    api.setOptions({ theme: managerThemes[effective] });
  };

  const onGlobals = ({ globals }: { globals?: Record<string, unknown> }) => {
    mode = parseMode(globals?.theme);
    apply();
  };

  api.on(SET_GLOBALS, onGlobals);
  api.on(GLOBALS_UPDATED, onGlobals);
  darkQuery.addEventListener('change', () => {
    if (mode === 'system') apply();
  });

  const current = api.getGlobals?.();
  if (current && 'theme' in current) mode = parseMode(current.theme);
  apply();
});

addons.setConfig({
  theme: managerThemes[resolve(getModeFromUrl())],
   toolbar: {
    "storybook/background": { hidden: true },
  },
  sidebar: {
    showRoots: false,
  },
});

// Custom search placeholder replacement
const updateSearchPlaceholder = () => {
  const searchInput = document.querySelector('input[placeholder="Find components"]') as HTMLInputElement;
  if (searchInput) {
    searchInput.placeholder = 'Type to search...';
  }
};

// Run on DOM content loaded and also observe for dynamic changes
document.addEventListener('DOMContentLoaded', updateSearchPlaceholder);

// Use MutationObserver to handle dynamic content loading
const observer = new MutationObserver(() => {
  updateSearchPlaceholder();
});

// Start observing when the document is ready
setTimeout(() => {
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}, 100);
