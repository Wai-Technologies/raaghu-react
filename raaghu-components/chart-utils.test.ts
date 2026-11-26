import {
  applyChartThemeColors,
  chartFont,
  chartTextColor,
  isChartDeepEqual,
  resolveChartData,
  useChartThemeMode,
} from './chart-utils';
import { isDarkMode } from '../raaghu-react-themes/src/provider/theme-utils';
import { renderHook } from '@testing-library/react';

jest.mock('../raaghu-react-themes/src/provider/theme-utils', () => ({
  isDarkMode: jest.fn(() => false),
}));

describe('applyChartThemeColors audit fixes', () => {
  it('always themes tooltip without forcing labelColor swatches (G3-003, G3-004)', () => {
    const options: Record<string, any> = { plugins: {} };
    applyChartThemeColors(options);

    expect(options.plugins.tooltip).toBeDefined();
    expect(options.plugins.tooltip.backgroundColor).toBeDefined();
    expect(options.plugins.tooltip.titleColor).toBeDefined();
    expect(options.plugins.tooltip.bodyColor).toBeDefined();
    expect(options.plugins.tooltip.labelColor).toBeUndefined();
  });

  it('uses the shared isDarkMode helper for theme mode (G3-005)', () => {
    (isDarkMode as jest.Mock).mockReturnValue(true);
    const { result } = renderHook(() => useChartThemeMode());
    expect(result.current).toBe('dark');
    (isDarkMode as jest.Mock).mockReturnValue(false);
  });

  it('falls back to CSS variables instead of hard-coded hex/Poppins (G3-006)', () => {
    expect(chartTextColor()).toMatch(/var\(--/);
    expect(chartTextColor()).not.toMatch(/#[0-9a-fA-F]{3,6}/);
    expect(chartFont('regular', 'md')).toContain('sans-serif');
    expect(chartFont('regular', 'md')).not.toContain('Poppins');
  });
});

describe('resolveChartData stable references (RDS-068)', () => {
  it('returns the same empty datasets array on every call when none are provided', () => {
    const first = resolveChartData('Test', undefined, undefined, undefined, false);
    const second = resolveChartData('Test', undefined, undefined, undefined, false);
    expect(first.datasets).toEqual([]);
    expect(second.datasets).toBe(first.datasets);
  });

  it('returns the provided datasets by reference', () => {
    const datasets = [{ data: [1] }];
    expect(resolveChartData('Test', { datasets }, undefined, undefined, false).datasets).toBe(datasets);
    expect(resolveChartData('Test', undefined, undefined, datasets, false).datasets).toBe(datasets);
  });
});

describe('isChartDeepEqual', () => {
  it('treats structurally equal options and data as equal', () => {
    const make = () => ({
      labels: ['a', 'b'],
      datasets: [{ data: [1, 2], backgroundColor: ['red', 'blue'] }],
      options: { plugins: { legend: { display: false } } },
    });
    expect(isChartDeepEqual(make(), make())).toBe(true);
  });

  it('detects differences in values, lengths and keys', () => {
    expect(isChartDeepEqual({ a: [1, 2] }, { a: [1, 3] })).toBe(false);
    expect(isChartDeepEqual([1, 2], [1, 2, 3])).toBe(false);
    expect(isChartDeepEqual({ a: 1 }, { b: 1 })).toBe(false);
    expect(isChartDeepEqual([], {})).toBe(false);
  });

  it('compares functions and class instances by reference', () => {
    const fn = () => 1;
    expect(isChartDeepEqual({ cb: fn }, { cb: fn })).toBe(true);
    expect(isChartDeepEqual({ cb: () => 1 }, { cb: () => 1 })).toBe(false);
    expect(isChartDeepEqual(new Map(), new Map())).toBe(false);
  });

  it('compares dates and typed arrays by value', () => {
    expect(isChartDeepEqual(new Date(5), new Date(5))).toBe(true);
    expect(isChartDeepEqual(new Date(5), new Date(6))).toBe(false);
    expect(isChartDeepEqual(new Float32Array([1, 2]), new Float32Array([1, 2]))).toBe(true);
    expect(isChartDeepEqual(new Float32Array([1, 2]), new Float32Array([1, 3]))).toBe(false);
  });
});