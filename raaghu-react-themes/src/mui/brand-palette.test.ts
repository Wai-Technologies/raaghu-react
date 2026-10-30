import { applyBrandOverridesToPalette } from './brand-palette';
import { lightMuiPalette } from './palette';
import { createRaaghuTheme } from './raaghu.theme';
import { buildRdsCssVars } from '../../tokens/build-rds-css-vars';
import { appBarTokens } from '../../tokens/design-tokens';

type PaletteChannel = { main?: string; light?: string };

describe('applyBrandOverridesToPalette', () => {
  it('rewrites mapped palette channels from --rds-* overrides', () => {
    const base = lightMuiPalette();
    const palette = applyBrandOverridesToPalette(base, {
      '--rds-primary-main': '#FF6600',
      '--rds-text-primary': '#101010',
      '--rds-background-paper': '#FAFAFA',
    });

    expect((palette.primary as PaletteChannel).main).toBe('#FF6600');
    expect(palette.text?.primary).toBe('#101010');
    expect(palette.background?.paper).toBe('#FAFAFA');
    expect((palette.primary as PaletteChannel).light).toBe((base.primary as PaletteChannel).light);
  });

  it('returns the base palette when overrides are omitted', () => {
    const base = lightMuiPalette();
    expect(applyBrandOverridesToPalette(base)).toBe(base);
  });
});

describe('createRaaghuTheme', () => {
  it('exposes light and dark colorSchemes with CSS variables', () => {
    const theme = createRaaghuTheme({ '--rds-primary-main': '#123456' });
    const schemes = theme.colorSchemes;

    expect(theme.vars).toBeDefined();
    expect(schemes?.light?.palette.primary.main).toBe('#123456');
    expect(schemes?.dark?.palette.primary.main).toBe('#123456');
  });
});

describe('app bar CSS vars (G1-041)', () => {
  it('sets --rds-appbar-* on both modes so SCSS need not remap via [data-theme]', () => {
    const light = buildRdsCssVars('light');
    const dark = buildRdsCssVars('dark');

    expect(light['--rds-appbar-bg']).toBeDefined();
    expect(dark['--rds-appbar-bg']).toBe(appBarTokens.darkBg);
    expect(dark['--rds-appbar-secondary-bg']).toBe(appBarTokens.darkSecondaryBg);
    expect(dark['--rds-appbar-badge-bg']).toBe(appBarTokens.darkBadgeBg);
    expect(dark['--rds-appbar-badge-color']).toBe(appBarTokens.darkBadgeColor);
    expect(dark['--rds-appbar-color']).toBeDefined();
  });
});
