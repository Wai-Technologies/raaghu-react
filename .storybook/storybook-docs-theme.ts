import { create, themes } from 'storybook/theming/create';
import {
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
