import { create, themes } from 'storybook/theming/create';
import {
  resolveEffectiveMode,
  type RaaghuThemeMode,
} from '../raaghu-react-themes/src/provider/theme-utils';

/** Storybook docs theme aligned with Raaghu dark surfaces. */
export const raaghuDocsDark = create({
  ...themes.dark,
  appBg: '#1b1b1b',
  appContentBg: '#1f232b',
  appBorderColor: '#3a4250',
  textColor: '#e6eaf2',
  barBg: '#20242d',
  barTextColor: '#c4cfde',
  inputBg: '#171b22',
  inputBorder: '#3a4250',
  inputTextColor: '#e6eaf2',
});

export const raaghuDocsLight = create({
  ...themes.light,
});

export function getDocsTheme(mode: RaaghuThemeMode = 'system') {
  return resolveEffectiveMode(mode) === 'dark' ? raaghuDocsDark : raaghuDocsLight;
}
