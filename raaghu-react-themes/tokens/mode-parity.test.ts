import { buildRdsCssVars } from './build-rds-css-vars';
import baseline from './mode-parity-baseline.json';

const onlyIn = (a: Record<string, string>, b: Record<string, string>) =>
  Object.keys(a).filter((key) => !(key in b)).sort();

describe('light/dark CSS var parity', () => {
  const light = buildRdsCssVars('light');
  const dark = buildRdsCssVars('dark');

  it('adds no new light-only vars', () => {
    expect(onlyIn(light, dark).filter((key) => !baseline.lightOnly.includes(key))).toEqual([]);
  });

  it('adds no new dark-only vars', () => {
    expect(onlyIn(dark, light).filter((key) => !baseline.darkOnly.includes(key))).toEqual([]);
  });

  it('keeps the baseline free of names that now match', () => {
    expect(baseline.lightOnly.filter((key) => !onlyIn(light, dark).includes(key))).toEqual([]);
    expect(baseline.darkOnly.filter((key) => !onlyIn(dark, light).includes(key))).toEqual([]);
  });
});
