import type { PaletteOptions } from '@mui/material/styles';
import type { RdsBrandOverrides } from '../../tokens/build-rds-css-vars';

type PaletteColorKey = 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info';

const COLOR_CHANNEL_MAP: Record<string, { color: PaletteColorKey; channel: 'main' | 'light' | 'dark' | 'contrastText' }> = {
  '--rds-primary-main': { color: 'primary', channel: 'main' },
  '--rds-primary-light': { color: 'primary', channel: 'light' },
  '--rds-primary-dark': { color: 'primary', channel: 'dark' },
  '--rds-primary-contrast-text': { color: 'primary', channel: 'contrastText' },
  '--rds-secondary-main': { color: 'secondary', channel: 'main' },
  '--rds-secondary-light': { color: 'secondary', channel: 'light' },
  '--rds-secondary-dark': { color: 'secondary', channel: 'dark' },
  '--rds-secondary-contrast-text': { color: 'secondary', channel: 'contrastText' },
  '--rds-error-main': { color: 'error', channel: 'main' },
  '--rds-error-light': { color: 'error', channel: 'light' },
  '--rds-error-dark': { color: 'error', channel: 'dark' },
  '--rds-error-contrast-text': { color: 'error', channel: 'contrastText' },
  '--rds-warning-main': { color: 'warning', channel: 'main' },
  '--rds-warning-light': { color: 'warning', channel: 'light' },
  '--rds-warning-dark': { color: 'warning', channel: 'dark' },
  '--rds-warning-contrast-text': { color: 'warning', channel: 'contrastText' },
  '--rds-success-main': { color: 'success', channel: 'main' },
  '--rds-success-light': { color: 'success', channel: 'light' },
  '--rds-success-dark': { color: 'success', channel: 'dark' },
  '--rds-success-contrast-text': { color: 'success', channel: 'contrastText' },
  '--rds-info-main': { color: 'info', channel: 'main' },
  '--rds-info-light': { color: 'info', channel: 'light' },
  '--rds-info-dark': { color: 'info', channel: 'dark' },
  '--rds-info-contrast-text': { color: 'info', channel: 'contrastText' },
};

const SIMPLE_MAP: Record<string, (palette: PaletteOptions, value: string) => void> = {
  '--rds-background-default': (palette, value) => {
    palette.background = { ...palette.background, default: value };
  },
  '--rds-background-paper': (palette, value) => {
    palette.background = { ...palette.background, paper: value };
  },
  '--rds-text-primary': (palette, value) => {
    palette.text = { ...palette.text, primary: value };
  },
  '--rds-text-secondary': (palette, value) => {
    palette.text = { ...palette.text, secondary: value };
  },
  '--rds-text-disabled': (palette, value) => {
    palette.text = { ...palette.text, disabled: value };
  },
  '--rds-divider': (palette, value) => {
    palette.divider = value;
  },
};

/**
 * Applies `--rds-*` brand overrides onto a MUI palette so `theme.palette.*`
 * (and generated `--mui-palette-*` CSS vars) track white-label colors.
 */
export function applyBrandOverridesToPalette(
  base: PaletteOptions,
  overrides?: RdsBrandOverrides,
): PaletteOptions {
  if (!overrides) return base;

  const palette: PaletteOptions = {
    ...base,
    primary: { ...base.primary },
    secondary: { ...base.secondary },
    error: { ...base.error },
    warning: { ...base.warning },
    success: { ...base.success },
    info: { ...base.info },
    background: { ...base.background },
    text: { ...base.text },
  };

  for (const [key, value] of Object.entries(overrides)) {
    if (value == null || value === '') continue;

    const channelMap = COLOR_CHANNEL_MAP[key];
    if (channelMap) {
      const color = { ...(palette[channelMap.color] as object) } as Record<string, string>;
      color[channelMap.channel] = value;
      palette[channelMap.color] = color as PaletteOptions[PaletteColorKey];
      continue;
    }

    SIMPLE_MAP[key]?.(palette, value);
  }

  return palette;
}
