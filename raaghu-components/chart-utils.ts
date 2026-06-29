import { useSyncExternalStore } from 'react';
import { isDarkMode } from '../raaghu-react-themes/src/provider/theme-utils';

function getChartThemeMode(): string {
  if (typeof document === 'undefined') return 'light';
  const attr = document.documentElement.getAttribute('data-theme') || 'light';
  const hasDarkClass =
    document.documentElement.classList.contains('theme-dark') ||
    document.documentElement.classList.contains('rds-theme--dark') ||
    document.body?.classList.contains('theme-dark') ||
    document.body?.classList.contains('dark-theme');
  return hasDarkClass ? 'dark' : attr;
}

export function useChartThemeMode(): string {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === 'undefined') return () => {};

      let rafId: number;
      const notify = () => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => onStoreChange());
      };

      const observer = new MutationObserver(notify);

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme', 'class'],
      });

      if (document.body) {
        observer.observe(document.body, {
          attributes: true,
          attributeFilter: ['class', 'data-theme'],
        });
      }

      return () => {
        cancelAnimationFrame(rafId);
        observer.disconnect();
      };
    },
    getChartThemeMode,
    () => 'light',
  );
}

/** Deep-clones Chart.js options to avoid mutating caller-provided objects. */
export function cloneChartOptions<T>(options: T): T {
  return JSON.parse(JSON.stringify(options || {}));
}

/** Attaches chart data to options when callers have not already done so. */
export function attachChartData(
  chartOptions: { data?: unknown },
  chartData: { labels: unknown[]; datasets: unknown[] }
): void {
  if (!chartOptions.data) {
    chartOptions.data = chartData;
  }
}

export function getCSSVar(property: string, fallback = ''): string {
  if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(property)
    .trim();
  return value || fallback;
}

export function chartTextColor(): string {
  return getCSSVar('--rds-text-primary', isDarkMode() ? '#e0e0e0' : '#212121');
}

export function chartMutedColor(): string {
  return getCSSVar('--rds-text-secondary', isDarkMode() ? '#9e9e9e' : '#757575');
}

/**
 * Returns the current theme's grid line color for chart axes.
 */
function chartGridColor(): string {
  // Keep grid lines visibly light in dark mode across all charts.
  return isDarkMode()
    ? getCSSVar('--rds-comp-chart-grid-color-dark', 'rgba(255,255,255,0.28)')
    : getCSSVar('--rds-comp-chart-grid-color-light', 'rgba(0,0,0,0.12)');
}

/**
 * Returns the current theme's tooltip background color.
 */
function chartTooltipBg(): string {
  return getCSSVar('--rds-background-paper', isDarkMode() ? '#424242' : '#ffffff');
}

/**
 * Returns the current theme's tooltip text color.
 */
function chartTooltipTextColor(): string {
  return getCSSVar('--rds-text-primary', isDarkMode() ? '#e0e0e0' : '#212121');
}

export function chartFont(
  weight: 'regular' | 'medium' | 'bold',
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
): string {
  const weightMap: Record<string, string> = {
    regular: '--rds-font-weight-regular',
    medium: '--rds-font-weight-medium',
    bold: '--rds-font-weight-bold',
  };

  const sizeMap: Record<string, string> = {
    xs: '--rds-font-size-xs',
    sm: '--rds-font-size-sm',
    md: '--rds-font-size-md',
    lg: '--rds-font-size-lg',
    xl: '--rds-font-size-xl',
    '2xl': '--rds-font-size-2xl',
  };

  const weightVal = getCSSVar(weightMap[weight] || '--rds-font-weight-regular', '400');
  const sizeVal = getCSSVar(sizeMap[size] || '--rds-font-size-md', '14px');
  const family = getCSSVar('--rds-font-family-base', 'Poppins');

  return `${weightVal} ${sizeVal} ${family}`;
}

/** Minimal mutable shape expected by {@link applyChartThemeColors}. */
interface ChartOptionsLike {
  scales?: Record<string, {
    grid?: Record<string, unknown>;
    ticks?: Record<string, unknown>;
    border?: Record<string, unknown>;
    title?: Record<string, unknown>;
  }>;
  data?: {
    datasets?: Array<{
      backgroundColor?: string | string[];
      borderColor?: string | string[];
    }>;
  };
  plugins?: {
    legend?: { labels?: Record<string, unknown> };
    title?: Record<string, unknown>;
    tooltip?: {
      backgroundColor?: string;
      titleColor?: string;
      bodyColor?: string;
      labelColor?: () => { borderColor: string; backgroundColor: string };
    };
  };
}

/**
 * Applies dark/light theme colors to a Chart.js options object in-place.
 *
 * Handles:
 *  - axis ticks, grid lines, borders, and titles (for x/y/r axes)
 *  - legend label color
 *  - chart title color
 *  - tooltip title/body/label colors
 *  - dataset colors (resolves CSS variables in backgroundColor and borderColor)
 *
 * @param chartOptions  A mutable Chart.js options object (already deep-cloned)
 * @param axes          Which axis keys to apply scale colors to (default: ['x', 'y'])
 */
export function applyChartThemeColors(
  chartOptions: ChartOptionsLike,
  axes: string[] = ['x', 'y']
): void {
  const textColor   = chartTextColor();
  const gridColor   = chartGridColor();
  const tooltipBg   = chartTooltipBg();
  const tooltipText = chartTooltipTextColor();

  // ── Scales ──────────────────────────────────────────────────────────────────
  if (axes.length > 0) {
    if (!chartOptions.scales) chartOptions.scales = {};
    const scales = chartOptions.scales;
    axes.forEach(axis => {
      if (!scales[axis]) scales[axis] = {};
      if (!scales[axis].grid)   scales[axis].grid   = {};
      if (!scales[axis].ticks)  scales[axis].ticks  = {};
      if (!scales[axis].border) scales[axis].border = {};
      if (!scales[axis].title)  scales[axis].title  = {};

      scales[axis].grid.color   = gridColor;
      scales[axis].ticks.color  = textColor;
      scales[axis].border.color = textColor;
      scales[axis].title.color  = textColor;
    });
  }

  // ── Datasets ─────────────────────────────────────────────────────────────────
  // Resolve CSS variables in dataset colors
  if (chartOptions.data && chartOptions.data.datasets && Array.isArray(chartOptions.data.datasets)) {
    chartOptions.data.datasets.forEach((dataset) => {
      if (dataset.backgroundColor) {
        dataset.backgroundColor = resolveColorValue(dataset.backgroundColor);
      }
      if (dataset.borderColor) {
        dataset.borderColor = resolveColorValue(dataset.borderColor);
      }
    });
  }

  // ── Plugins ─────────────────────────────────────────────────────────────────
  if (!chartOptions.plugins) chartOptions.plugins = {};

  // Legend
  if (!chartOptions.plugins.legend)        chartOptions.plugins.legend        = {};
  if (!chartOptions.plugins.legend.labels) chartOptions.plugins.legend.labels = {};
  chartOptions.plugins.legend.labels.color = textColor;

  // Title
  if (!chartOptions.plugins.title) chartOptions.plugins.title = {};
  chartOptions.plugins.title.color = textColor;

  // Tooltip
  if (chartOptions.plugins.tooltip) {
    chartOptions.plugins.tooltip.backgroundColor = tooltipBg;
    chartOptions.plugins.tooltip.titleColor      = tooltipText;
    chartOptions.plugins.tooltip.bodyColor       = tooltipText;
    chartOptions.plugins.tooltip.labelColor      = () => ({
      borderColor:     textColor,
      backgroundColor: textColor,
    });
  }
}

/**
 * Resolves CSS variable references in color values.
 * Handles both single color strings and arrays of color strings.
 * 
 * @param colorValue A color string with possible CSS var() syntax or array of such strings
 * @returns The resolved color value(s)
 */
function resolveColorValue(colorValue: string | string[]): string | string[] {
  if (Array.isArray(colorValue)) {
    return colorValue.map(color => resolveColorValue(color) as string);
  }
  
  if (typeof colorValue === 'string' && colorValue.includes('var(')) {
    // Extract CSS variable name from "var(--rds-..., fallback)"
    const varMatch = colorValue.match(/var\(([^,)]+)(?:,\s*([^)]+))?\)/);
    if (varMatch) {
      const varName = varMatch[1].trim();
      const fallback = varMatch[2] ? varMatch[2].trim() : '';
      return getCSSVar(varName, fallback);
    }
  }
  
  return colorValue;
}
