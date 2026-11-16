import React, { useEffect, useState } from 'react';
import { DocsContainer, type DocsContainerProps } from '@storybook/addon-docs/blocks';
import { create, themes } from 'storybook/theming/create';
import {
  getStorybookThemeFromUrl,
  resolveEffectiveMode,
  type RaaghuThemeMode,
} from '../raaghu-react-themes/src/provider/theme-utils';
import { raaghuDarkChrome } from './storybook-palette';

/** Storybook docs theme aligned with Raaghu dark surfaces. */
export const raaghuDocsDark = create({
  ...themes.dark,
  ...raaghuDarkChrome,
});

export const raaghuDocsLight = create({
  ...themes.light,
});

export function getDocsTheme(mode: RaaghuThemeMode = 'system') {
  return resolveEffectiveMode(mode) === 'dark' ? raaghuDocsDark : raaghuDocsLight;
}

function parseThemeMode(value: unknown): RaaghuThemeMode | null {
  if (value === 'light' || value === 'dark' || value === 'system') return value;
  return null;
}

/** Toolbar global wins over the system theme captured when the preview module loads. */
function themeFromDocsContext(context: DocsContainerProps['context']): RaaghuThemeMode {
  try {
    const story = context.storyById();
    const fromGlobals = parseThemeMode(context.getStoryContext(story).globals?.theme);
    if (fromGlobals) return fromGlobals;
  } catch {
    // Docs can render before a primary story is attached.
  }
  return getStorybookThemeFromUrl() ?? 'system';
}

export function RaaghuDocsContainer({ children, context }: DocsContainerProps) {
  const [mode, setMode] = useState<RaaghuThemeMode>(() => themeFromDocsContext(context));

  useEffect(() => {
    const sync = (event?: { globals?: Record<string, unknown> }) => {
      setMode(parseThemeMode(event?.globals?.theme) ?? themeFromDocsContext(context));
    };
    sync();
    context.channel.on('globalsUpdated', sync);
    return () => {
      context.channel.off('globalsUpdated', sync);
    };
  }, [context]);

  return React.createElement(DocsContainer, { context, theme: getDocsTheme(mode) }, children);
}
