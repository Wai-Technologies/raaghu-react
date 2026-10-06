import { createTheme, type Theme, type ThemeOptions } from '@mui/material/styles';
import type { RdsBrandOverrides } from '../../tokens/build-rds-css-vars';
import { contrastText } from '../../tokens/contrast';
import { darkTheme } from './dark.theme';
import { lightTheme } from './light.theme';

type PaletteRole = 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info';

/**
 * CSS variables that also update the MUI theme.
 * Any other `--rds-*` key still updates SCSS through injectTokens().
 * Values must be concrete colors (`#hex`, `rgb()`, `hsl()`). `var(--...)` is ignored
 * here because MUI computes alpha/lighten at theme-creation time.
 */
const PALETTE_ROLES: { role: PaletteRole; main: string[]; contrast: string[] }[] = [
  { role: 'primary', main: ['--rds-primary-main', '--rds-color-primary'], contrast: ['--rds-primary-contrast-text', '--rds-color-on-primary'] },
  { role: 'secondary', main: ['--rds-secondary-main', '--rds-color-secondary'], contrast: ['--rds-secondary-contrast-text'] },
  { role: 'error', main: ['--rds-error-main', '--rds-color-error'], contrast: ['--rds-error-contrast-text'] },
  { role: 'warning', main: ['--rds-warning-main', '--rds-color-warning'], contrast: ['--rds-warning-contrast-text'] },
  { role: 'success', main: ['--rds-success-main', '--rds-color-success'], contrast: ['--rds-success-contrast-text'] },
  { role: 'info', main: ['--rds-info-main', '--rds-color-info'], contrast: ['--rds-info-contrast-text'] },
];

function isConcreteColor(value: string | undefined): value is string {
  if (!value) return false;
  const color = value.trim();
  if (color.startsWith('var(')) return false;
  return /^#(?:[\da-fA-F]{3,8})$/.test(color) || /^(?:rgb|hsl)a?\(/i.test(color);
}

function firstColor(overrides: RdsBrandOverrides | undefined, keys: string[]): string | undefined {
  if (!overrides) return undefined;
  for (const key of keys) {
    const value = overrides[key];
    if (isConcreteColor(value)) return value.trim();
  }
  return undefined;
}

function brandOverridesToMui(overrides?: RdsBrandOverrides): ThemeOptions | null {
  if (!overrides) return null;

  const palette: NonNullable<ThemeOptions['palette']> = {};
  let touched = false;

  for (const entry of PALETTE_ROLES) {
    const main = firstColor(overrides, entry.main);
    if (!main) continue;
    const contrast = firstColor(overrides, entry.contrast);
    touched = true;
    palette[entry.role] = {
      main,
      contrastText: contrast ?? contrastText(main),
    };
  }

  const backgroundDefault = firstColor(overrides, ['--rds-background-default']);
  const backgroundPaper = firstColor(overrides, ['--rds-background-paper']);
  if (backgroundDefault || backgroundPaper) {
    touched = true;
    palette.background = {
      ...(backgroundDefault ? { default: backgroundDefault } : {}),
      ...(backgroundPaper ? { paper: backgroundPaper } : {}),
    };
  }

  const textPrimary = firstColor(overrides, ['--rds-text-primary']);
  const textSecondary = firstColor(overrides, ['--rds-text-secondary']);
  if (textPrimary || textSecondary) {
    touched = true;
    palette.text = {
      ...(textPrimary ? { primary: textPrimary } : {}),
      ...(textSecondary ? { secondary: textSecondary } : {}),
    };
  }

  const fontFamily = overrides['--rds-font-family-base']?.trim();
  const typography = fontFamily && !fontFamily.startsWith('var(')
    ? { fontFamily }
    : undefined;
  if (typography) touched = true;

  if (!touched) return null;
  return { palette, ...(typography ? { typography } : {}) };
}

/**
 * MUI theme for a Raaghu mode, with optional brand overrides applied on top.
 * Pass the same object to `RaaghuThemeProvider` / `applyRaaghuTheme` so SCSS
 * variables and MUI components stay on one brand.
 */
export function createRaaghuMuiTheme(
  mode: 'light' | 'dark',
  overrides?: RdsBrandOverrides,
): Theme {
  const base = mode === 'dark' ? darkTheme : lightTheme;
  const options = brandOverridesToMui(overrides);
  if (!options) return base;
  return createTheme(base, options);
}
