import {
  buildRdsCssVars,
  expandBrandPrimary,
  type RdsBrandOverrides,
} from './build-rds-css-vars';
import { colorTokens } from './design-tokens';

const DEFAULT_PRIMARY = colorTokens.primary[700].toLowerCase();

function applyOverrides(
  vars: Record<string, string>,
  overrides: RdsBrandOverrides,
): Record<string, string> {
  return { ...vars, ...overrides } as Record<string, string>;
}

describe('brand primary propagation (RDS-073)', () => {
  it('expandBrandPrimary derives light/dark/contrast/rgb from a hex main', () => {
    const overrides = expandBrandPrimary('#ff6600');
    expect(overrides['--rds-primary-main']).toBe('#ff6600');
    expect(overrides['--rds-primary-rgb']).toBe('255,102,0');
    expect(overrides['--rds-primary-light']).toContain('#ff6600');
    expect(overrides['--rds-primary-dark']).toContain('#ff6600');
    expect(overrides['--rds-primary-contrast-text']).toBe(colorTokens.neutral[0]);
  });

  it.each(['light', 'dark'] as const)(
    'overriding --rds-primary-main clears default primary hex from primary-tied %s tokens',
    (mode) => {
      // Keys whose *light* value is the default primary hex are the brand-tied set.
      // Coincidental same-hex roles (e.g. dark --rds-info-main) are not brand-tied.
      const lightPrimaryTiedKeys = Object.entries(buildRdsCssVars('light'))
        .filter(([, value]) => value.trim().toLowerCase() === DEFAULT_PRIMARY)
        .map(([key]) => key);

      const overrides = expandBrandPrimary({ main: '#f60' });
      const merged = applyOverrides(buildRdsCssVars(mode), overrides);
      const leftover = lightPrimaryTiedKeys.filter(
        (key) => merged[key]?.trim().toLowerCase() === DEFAULT_PRIMARY,
      );
      expect(leftover).toEqual([]);
    },
  );

  it('button primary bg aliases primary-main in the shared token set', () => {
    const light = buildRdsCssVars('light');
    expect(light['--rds-button-primary-bg']).toBe('var(--rds-primary-main)');
    expect(light['--rds-button-text-color']).toBe('var(--rds-primary-main)');
    expect(light['--rds-focus-color']).toBe('var(--rds-primary-main)');
    expect(light['--rds-switch-active-bg']).toBe('var(--rds-primary-main)');
  });
});
