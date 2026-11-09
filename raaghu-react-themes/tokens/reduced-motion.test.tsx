import { buildRdsCssVars, buildStaticCssSnapshot, injectTokens, reducedMotionCssVars } from './build-rds-css-vars';
import { reducedMotionTokens } from './design-tokens';
import { act, render } from '@testing-library/react';
import { RaaghuThemeProvider } from '../src/provider/RaaghuThemeProvider';

describe('reduced motion tokens', () => {
  const vars = buildRdsCssVars('light');
  const reduced = reducedMotionCssVars(vars);

  it('collapses transition and motion durations', () => {
    expect(reduced['--rds-transition-base']).toBe(reducedMotionTokens.duration);
    expect(reduced['--rds-motion-duration-slower']).toBe(reducedMotionTokens.duration);
    expect(reduced['--rds-motion-transition-base']).toContain(reducedMotionTokens.duration);
    expect(reduced['--rds-motion-transition-base']).toContain('cubic-bezier');
  });

  it('keeps easings and meaningful loading animations untouched', () => {
    expect(reduced['--rds-transition-ease-in']).toBeUndefined();
    expect(reduced['--rds-motion-easing-in']).toBeUndefined();
    expect(reduced['--rds-loader-duration-2s']).toBeUndefined();
    expect(reduced['--rds-spinner-animation-duration']).toBeUndefined();
    expect(reduced['--rds-progress-indeterminate-duration']).toBeUndefined();
  });

  it('emits a reduced-motion block in the static snapshot', () => {
    const css = buildStaticCssSnapshot('light');
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
    expect(css.split('@media (prefers-reduced-motion: reduce)')[1]).toContain(`--rds-transition-base: ${reducedMotionTokens.duration}`);
  });

  it('applies reduced values inline when the OS asks for reduced motion', () => {
    const original = window.matchMedia;
    window.matchMedia = ((query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })) as unknown as typeof window.matchMedia;
    try {
      injectTokens('light');
      expect(document.documentElement.style.getPropertyValue('--rds-transition-base')).toBe(reducedMotionTokens.duration);
    } finally {
      window.matchMedia = original;
      injectTokens('light');
    }
    expect(document.documentElement.style.getPropertyValue('--rds-transition-base')).not.toBe(reducedMotionTokens.duration);
  });
});

describe('RaaghuThemeProvider and reduced motion', () => {
  it('re-injects tokens when the OS reduced-motion setting changes', () => {
    const original = window.matchMedia;
    let reduce = false;
    const listeners: Array<() => void> = [];
    window.matchMedia = ((query: string) => ({
      get matches() {
        return query.includes('prefers-reduced-motion') && reduce;
      },
      media: query,
      addEventListener: (_: string, fn: () => void) => {
        if (query.includes('prefers-reduced-motion')) listeners.push(fn);
      },
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
    })) as unknown as typeof window.matchMedia;
    const value = () => document.documentElement.style.getPropertyValue('--rds-transition-base');
    try {
      const { unmount } = render(<RaaghuThemeProvider defaultMode="light">x</RaaghuThemeProvider>);
      expect(value()).not.toBe(reducedMotionTokens.duration);
      reduce = true;
      act(() => listeners.forEach((fn) => fn()));
      expect(value()).toBe(reducedMotionTokens.duration);
      reduce = false;
      act(() => listeners.forEach((fn) => fn()));
      expect(value()).not.toBe(reducedMotionTokens.duration);
      unmount();
    } finally {
      window.matchMedia = original;
    }
  });
});
