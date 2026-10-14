import { useEffect, useRef, type DependencyList } from 'react';
import Chart, {
  type ChartConfiguration,
  type ChartData,
  type ChartOptions,
  type ChartType,
  type Plugin,
} from 'chart.js/auto';
import {
  applyChartThemeColors,
  cloneChartOptions,
  resolveDatasetColors,
  useChartThemeMode,
} from './chart-utils';

type ChartOverridesFn<TType extends ChartType> = (themedOptions: ChartOptions<TType>) => ChartOptions<TType>;

/** What a chart component hands to {@link useChart}. */
export interface UseChartConfig<TType extends ChartType> {
  type: TType;
  labels?: ChartData<TType>['labels'];
  datasets: ChartData<TType>['datasets'];
  /** Consumer options. Cloned before theming, never mutated. */
  options?: ChartOptions<TType>;
  /** Scale keys to theme (`[]` for radial/pie charts). `false` skips theming and colour resolving. Default `['x', 'y']`. */
  themeAxes?: string[] | false;
  /**
   * Shallow-merged over the themed options (e.g. `responsive`, `maintainAspectRatio`).
   * Pass a function to build them from the themed options (a copy the hook owns, safe to mutate).
   */
  overrides?: ChartOptions<TType> | ChartOverridesFn<TType>;
  plugins?: Plugin<TType>[];
  /** Runs after the chart is created, e.g. to size the canvas. */
  onCreate?: (chart: Chart<TType>) => void;
}

/**
 * Owns a Chart.js instance for one canvas: clone + theme the options, resolve `var(--rds-…)`
 * dataset colours into new objects (consumer datasets are never mutated), create the chart and
 * destroy it on change/unmount. Re-runs when `deps` or the light/dark mode change.
 *
 * `config` can be a function of the 2D context when a chart needs it up front (e.g. gradients).
 * `deps` must list every prop `config` is built from.
 */
export function useChart<TType extends ChartType>(
  config: UseChartConfig<TType> | ((ctx: CanvasRenderingContext2D) => UseChartConfig<TType>),
  deps: DependencyList
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<TType> | null>(null);
  const themeMode = useChartThemeMode();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const {
      type,
      labels,
      datasets,
      options,
      themeAxes = ['x', 'y'],
      overrides,
      plugins,
      onCreate,
    } = typeof config === 'function' ? config(ctx) : config;

    const themed = themeAxes !== false;
    const chartOptions = cloneChartOptions(options ?? ({} as ChartOptions<TType>));
    if (themed) applyChartThemeColors(chartOptions as object, themeAxes);
    const data = {
      labels,
      datasets: themed ? resolveDatasetColors(datasets) : datasets,
    } as ChartData<TType>;

    // A chart left on this canvas (StrictMode double effects, HMR) must be destroyed first.
    Chart.getChart?.(canvas)?.destroy();
    const chart = new Chart(ctx, {
      type,
      data,
      options: {
        ...chartOptions,
        ...(typeof overrides === 'function'
          ? (overrides as ChartOverridesFn<TType>)(chartOptions)
          : overrides),
      },
      ...(plugins && { plugins }),
    } as ChartConfiguration<TType>);
    chartRef.current = chart;
    onCreate?.(chart);

    return () => {
      chart.destroy();
      if (chartRef.current === chart) chartRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- callers pass the props `config` is built from
  }, [...deps, themeMode]);

  return { canvasRef, chartRef };
}
