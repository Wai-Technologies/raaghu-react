import { addons, type API } from 'storybook/manager-api';
import { GLOBALS_UPDATED, SET_GLOBALS } from 'storybook/internal/core-events';
import { create } from 'storybook/theming/create';
import {
  RAAGHU_LOGO_DARK_URL,
  RAAGHU_LOGO_LIGHT_URL,
} from '../raaghu-elements/shared/constants/raaghu-logo';
import { raaghuDarkChrome } from './storybook-palette';
import '../.storybook/custom-theme.css';

type ThemeMode = 'light' | 'dark' | 'system';

const brand = {
  brandTitle: 'Raaghu Design System',
  brandUrl: 'https://waiin.com/raaghu',
};

const managerThemes = {
  light: create({ base: 'light', ...brand, brandImage: RAAGHU_LOGO_LIGHT_URL }),
  dark: create({ base: 'dark', ...brand, ...raaghuDarkChrome, brandImage: RAAGHU_LOGO_DARK_URL }),
};

const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

const parseMode = (value: unknown): ThemeMode =>
  value === 'light' || value === 'dark' ? value : 'system';

const modeFromUrl = (): ThemeMode => {
  const globals = new URLSearchParams(window.location.search).get('globals') ?? '';
  const match = /(?:^|;)theme:([a-z]+)/.exec(globals);
  return parseMode(match?.[1]);
};

const resolveTheme = (mode: ThemeMode) => {
  const effective = mode === 'system' ? (darkQuery.matches ? 'dark' : 'light') : mode;
  return managerThemes[effective];
};

let currentMode = modeFromUrl();

addons.setConfig({
  theme: resolveTheme(currentMode),
  toolbar: {
    'storybook/background': { hidden: true },
  },
  sidebar: {
    showRoots: false,
  },
});

addons.register('raaghu/manager-theme-sync', (api: API) => {
  const apply = (mode: ThemeMode) => {
    currentMode = mode;
    api.setOptions({ theme: resolveTheme(mode) });
  };
  const onGlobals = ({ globals }: { globals?: Record<string, unknown> }) => {
    const mode = parseMode(globals?.theme);
    if (mode !== currentMode) apply(mode);
  };

  api.on(SET_GLOBALS, onGlobals);
  api.on(GLOBALS_UPDATED, onGlobals);
  darkQuery.addEventListener('change', () => {
    if (currentMode === 'system') apply('system');
  });
});

const updateSearchPlaceholder = () => {
  const searchInput = document.querySelector('input[placeholder="Find components"]') as HTMLInputElement;
  if (searchInput) {
    searchInput.placeholder = 'Type to search...';
  }
};

document.addEventListener('DOMContentLoaded', updateSearchPlaceholder);

const observer = new MutationObserver(() => {
  updateSearchPlaceholder();
});

setTimeout(() => {
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}, 100);
