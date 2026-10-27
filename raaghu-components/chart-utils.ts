import { useSyncExternalStore } from 'react';
import type { ChartArea, ChartType, Plugin } from 'chart.js/auto';
import { warnDeprecatedProp } from '../raaghu-elements/shared/utils/deprecation';
import { isDarkMode } from '../raaghu-react-themes/src/provider/theme-utils';

/** Snapshot key for chart re-renders; uses the shared theme helper (G3-005). */
function getChartThemeMode(): string {
  return isDarkMode() ? 'dark' : 'light';
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

/** Deep-clones Chart.js options, preserving functions (callbacks, generateLabels, etc.). */
function deepClonePreservingFunctions<T>(value: T): T {
  if (value === null || typeof value !== 'object') {
    return value;
  }
  if (typeof value === 'function') {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => deepClonePreservingFunctions(item)) as T;
  }
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(value as object)) {
    result[key] = deepClonePreservingFunctions(
      (value as Record<string, unknown>)[key]
    );
  }
  return result as T;
}

/** Deep-clones Chart.js options to avoid mutating caller-provided objects. */
export function cloneChartOptions<T>(options: T): T {
  if (!options) {
    return {} as T;
  }
  try {
    if (typeof structuredClone === 'function') {
      return structuredClone(options);
    }
  } catch {
    return deepClonePreservingFunctions(options);
  }
  return deepClonePreservingFunctions(options);
}

export function getCSSVar(property: string, fallback = ''): string {
  if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(property)
    .trim();
  return value || fallback;
}

export function chartTextColor(): string {
  // Token-only fallbacks (G3-006) — avoid drifting hard-coded hex.
  return getCSSVar('--rds-text-primary', 'var(--mui-palette-text-primary, currentColor)');
}

export function chartMutedColor(): string {
  return getCSSVar('--rds-text-secondary', 'var(--mui-palette-text-secondary, currentColor)');
}

/**
 * Returns the current theme's grid line color for chart axes.
 */
function chartGridColor(): string {
  return isDarkMode()
    ? getCSSVar('--rds-comp-chart-grid-color-dark', 'var(--rds-divider, var(--mui-palette-divider, currentColor))')
    : getCSSVar('--rds-comp-chart-grid-color-light', 'var(--rds-divider, var(--mui-palette-divider, currentColor))');
}

/**
 * Returns the current theme's tooltip background color.
 */
function chartTooltipBg(): string {
  return getCSSVar('--rds-background-paper', 'var(--mui-palette-background-paper, Canvas)');
}

/**
 * Returns the current theme's tooltip text color.
 */
function chartTooltipTextColor(): string {
  return getCSSVar('--rds-text-primary', 'var(--mui-palette-text-primary, currentColor)');
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
  const family = getCSSVar('--rds-font-family-base', 'var(--rds-font-family, sans-serif)');

  return `${weightVal} ${sizeVal} ${family}`;
}

/** Options for {@link createCenterTextPlugin}. */
export interface CenterTextPluginOptions {
  /** Chart.js plugin id. */
  id: string;
  /** Large text, drawn in the theme's text colour. */
  title: string;
  /** Smaller text, drawn in the theme's muted colour. */
  subTitle: string;
  /** Baseline y of the title, from the chart area. */
  titleY: (area: ChartArea) => number;
  /** Baseline y of the subtitle, from the chart area. */
  subTitleY: (area: ChartArea) => number;
  /** Font size of the subtitle. Default `'lg'`. */
  subTitleSize?: Parameters<typeof chartFont>[1];
  /** Line join left on the context after drawing. */
  lineJoin?: CanvasLineJoin;
}

/** Inline plugin that draws a title and a muted subtitle centred in the chart (doughnut, gauge). */
export function createCenterTextPlugin<TType extends ChartType = ChartType>({
  id,
  title,
  subTitle,
  titleY,
  subTitleY,
  subTitleSize = 'lg',
  lineJoin,
}: CenterTextPluginOptions): Plugin<TType> {
  return {
    id,
    beforeDraw(chart) {
      const { ctx, chartArea } = chart;
      const x = chartArea.left + chartArea.width / 2;

      ctx.save();
      ctx.font = chartFont('bold', 'xl');
      ctx.textAlign = 'center';
      ctx.fillStyle = chartTextColor();
      ctx.fillText(title, x, titleY(chartArea));
      ctx.restore();

      ctx.save();
      ctx.font = chartFont('medium', subTitleSize);
      ctx.textAlign = 'center';
      ctx.fillStyle = chartMutedColor();
      ctx.fillText(subTitle, x, subTitleY(chartArea));
      ctx.restore();

      if (lineJoin) ctx.lineJoin = lineJoin;
    },
  };
}

/** Loose view of Chart.js options used internally while writing theme colours. */
type ChartScaleConfig = {
  grid?: { color?: string };
  ticks?: { color?: string };
  border?: { color?: string };
  title?: { color?: string };
};

type ChartOptionsLike = {
  scales?: Record<string, ChartScaleConfig | undefined>;
  plugins?: {
    legend?: { labels?: { color?: string } };
    title?: { color?: string };
    tooltip?: {
      backgroundColor?: string;
      titleColor?: string;
      bodyColor?: string;
    };
  };
};

/**
 * Applies dark/light theme colors to a Chart.js options object in-place.
 *
 * Handles:
 *  - axis ticks, grid lines, borders, and titles (for x/y/r axes)
 *  - legend label color
 *  - chart title color
 *  - tooltip background / title / body colours (series swatches keep Chart.js defaults)
 *
 * Dataset colours are resolved separately by {@link resolveDatasetColors}.
 *
 * @param options  A Chart.js options object that the caller owns (clone consumer options first)
 * @param axes     Which axis keys to apply scale colors to (default: ['x', 'y'])
 */
export function applyChartThemeColors<TOptions extends object>(
  options: TOptions,
  axes: string[] = ['x', 'y']
): void {
  const chartOptions = options as ChartOptionsLike;
  const textColor   = chartTextColor();
  const gridColor   = chartGridColor();
  const tooltipBg   = chartTooltipBg();
  const tooltipText = chartTooltipTextColor();

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

  if (!chartOptions.plugins) chartOptions.plugins = {};

  if (!chartOptions.plugins.legend)        chartOptions.plugins.legend        = {};
  if (!chartOptions.plugins.legend.labels) chartOptions.plugins.legend.labels = {};
  chartOptions.plugins.legend.labels.color = textColor;

  if (!chartOptions.plugins.title) chartOptions.plugins.title = {};
  chartOptions.plugins.title.color = textColor;

  // Always theme tooltips (G3-004). Do not override labelColor — that forced every
  // series swatch to textColor so users could not tell series apart (G3-003).
  if (!chartOptions.plugins.tooltip) chartOptions.plugins.tooltip = {};
  chartOptions.plugins.tooltip.backgroundColor = tooltipBg;
  chartOptions.plugins.tooltip.titleColor      = tooltipText;
  chartOptions.plugins.tooltip.bodyColor       = tooltipText;
}

/**
 * Returns new dataset objects with `var(--rds-…)` colours in `backgroundColor` / `borderColor`
 * resolved for the current theme. The consumer's datasets are never mutated, so the original
 * `var()` strings are still there to re-resolve after a light/dark switch.
 */
export function resolveDatasetColors<T>(datasets: T[]): T[] {
  return datasets.map((dataset) => {
    const { backgroundColor, borderColor } = dataset as { backgroundColor?: unknown; borderColor?: unknown };
    return {
      ...dataset,
      ...(backgroundColor ? { backgroundColor: resolveColorValue(backgroundColor) } : {}),
      ...(borderColor ? { borderColor: resolveColorValue(borderColor) } : {}),
    };
  });
}

/**
 * Resolves CSS variable references in color values.
 * Handles both single color strings and arrays of color strings.
 * 
 * @param colorValue A color string with possible CSS var() syntax or array of such strings
 * @returns The resolved color value(s)
 */
function resolveColorValue(colorValue: unknown): unknown {
  if (Array.isArray(colorValue)) {
    return colorValue.map((color) => resolveColorValue(color));
  }
  
  if (typeof colorValue === 'string' && colorValue.includes('var(')) {
    const varMatch = colorValue.match(/var\(([^,)]+)(?:,\s*([^)]+))?\)/);
    if (varMatch) {
      const varName = varMatch[1].trim();
      const fallback = varMatch[2] ? varMatch[2].trim() : '';
      return getCSSVar(varName, fallback);
    }
  }
  
  return colorValue;
}

export function resolveChartLabel(
  component: string,
  ariaLabel: string | undefined,
  chartLabel: string | undefined,
  fallback: string,
): string {
  if (chartLabel !== undefined) warnDeprecatedProp(component, 'chartLabel', '`ariaLabel`');
  return ariaLabel ?? chartLabel ?? fallback;
}

export function resolveChartData<L, D extends unknown[]>(
  component: string,
  data: { labels?: L; datasets: D } | undefined,
  labels: L | undefined,
  dataSets: D | undefined,
  warn = true,
): { labels: L | undefined; datasets: D } {
  if (warn && labels !== undefined) warnDeprecatedProp(component, 'labels', '`data`');
  if (warn && dataSets !== undefined) warnDeprecatedProp(component, 'dataSets', '`data`');
  return {
    labels: data?.labels ?? labels,
    datasets: data?.datasets ?? dataSets ?? ([] as unknown as D),
  };
}

export function applyCanvasSize(
  canvas: HTMLCanvasElement,
  height?: string | number,
  width?: string | number,
) {
  const css = (value: string | number) => (typeof value === 'number' ? `${value}px` : value);
  if (height !== undefined) canvas.style.height = css(height);
  if (width !== undefined) canvas.style.width = css(width);
}
