import { applyChartThemeColors, useChartThemeMode } from './chart-utils';
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
});
