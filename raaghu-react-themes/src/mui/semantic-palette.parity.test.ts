import { buildRdsCssVars, type RdsThemeMode } from '../../tokens/build-rds-css-vars';
import { darkMuiPalette, lightMuiPalette } from './palette';

type PaletteChannel = {
  main?: string;
  light?: string;
  dark?: string;
  contrastText?: string;
};

const COLOR_KEYS = ['primary', 'secondary', 'error', 'warning', 'success', 'info'] as const;

/** MUI palette channel → matching --rds-* CSS var for the shared semantic core. */
const CHANNEL_TO_VAR: Array<{
  getMui: (mode: RdsThemeMode) => string | undefined;
  cssVar: string;
}> = [
  ...COLOR_KEYS.flatMap((color) => {
    const channels = ['main', 'light', 'dark', 'contrastText'] as const;
    return channels.map((channel) => ({
      getMui: (mode: RdsThemeMode) => {
        const palette = mode === 'dark' ? darkMuiPalette() : lightMuiPalette();
        const entry = palette[color] as PaletteChannel | undefined;
        return entry?.[channel];
      },
      cssVar: `--rds-${color}-${channel === 'contrastText' ? 'contrast-text' : channel}`,
    }));
  }),
  {
    getMui: (mode) => {
      const palette = mode === 'dark' ? darkMuiPalette() : lightMuiPalette();
      return palette.background?.default;
    },
    cssVar: '--rds-background-default',
  },
  {
    getMui: (mode) => {
      const palette = mode === 'dark' ? darkMuiPalette() : lightMuiPalette();
      return palette.background?.paper;
    },
    cssVar: '--rds-background-paper',
  },
  {
    getMui: (mode) => {
      const palette = mode === 'dark' ? darkMuiPalette() : lightMuiPalette();
      return palette.text?.primary;
    },
    cssVar: '--rds-text-primary',
  },
  {
    getMui: (mode) => {
      const palette = mode === 'dark' ? darkMuiPalette() : lightMuiPalette();
      return palette.text?.secondary;
    },
    cssVar: '--rds-text-secondary',
  },
  {
    getMui: (mode) => {
      const palette = mode === 'dark' ? darkMuiPalette() : lightMuiPalette();
      return palette.text?.disabled;
    },
    cssVar: '--rds-text-disabled',
  },
  {
    getMui: (mode) => {
      const palette = mode === 'dark' ? darkMuiPalette() : lightMuiPalette();
      return palette.divider as string | undefined;
    },
    cssVar: '--rds-divider',
  },
  {
    getMui: (mode) => {
      const palette = mode === 'dark' ? darkMuiPalette() : lightMuiPalette();
      return palette.action?.hover;
    },
    cssVar: '--rds-action-hover',
  },
  {
    getMui: (mode) => {
      const palette = mode === 'dark' ? darkMuiPalette() : lightMuiPalette();
      return palette.action?.selected;
    },
    cssVar: '--rds-action-selected',
  },
  {
    getMui: (mode) => {
      const palette = mode === 'dark' ? darkMuiPalette() : lightMuiPalette();
      return palette.action?.disabled;
    },
    cssVar: '--rds-action-disabled',
  },
];

describe('MUI palette ↔ --rds-* semantic parity', () => {
  it.each<RdsThemeMode>(['light', 'dark'])(
    '%s mode: shared semantic slots match buildRdsCssVars',
    (mode) => {
      const cssVars = buildRdsCssVars(mode);

      for (const { getMui, cssVar } of CHANNEL_TO_VAR) {
        expect(getMui(mode)).toBe(cssVars[cssVar]);
      }
    },
  );
});
