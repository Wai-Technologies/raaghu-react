import { useEffect, useRef, type DependencyList, type RefObject } from 'react';
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
  isChartDeepEqual,
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
  /**
   * Runs after the chart is created and again after every in-place update, e.g. to size the
   * canvas. It must be idempotent.
   */
  onCreate?: (chart: Chart<TType>) => void;
}

/** What {@link useChart} returns. */
export interface UseChartResult<TType extends ChartType> {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  chartRef: RefObject<Chart<TType> | null>;
}

/**
 * Owns a Chart.js instance for one canvas: clone + theme the options, resolve `var(--rds-…)`
 * dataset colours into new objects (consumer datasets are never mutated) and create the chart.
 *
 * The chart is created once and kept in `chartRef`. When `deps` or the light/dark mode change
 * (compared structurally, so equal-valued options/data never count as a change) the new data,
 * options and plugins are assigned to the existing chart and it is updated without animation.
 * The chart is recreated only when `type` changes, the canvas element is replaced, or `plugins`
 * switches between provided and omitted (Chart.js only reads the array it was created with);
 * it is destroyed on unmount.
 *
 * `config` can be a function of the 2D context when a chart needs it up front (e.g. gradients).
 * `deps` must list every prop `config` is built from.
 */
export function useChart<TType extends ChartType>(
  config: UseChartConfig<TType> | ((ctx: CanvasRenderingContext2D) => UseChartConfig<TType>),
  deps: DependencyList
): UseChartResult<TType> {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<TType> | null>(null);
  /** Canvas and chart type the current chart was created for. */
  const createdForRef = useRef<{ canvas: HTMLCanvasElement; type: TType; hasPlugins: boolean } | null>(null);
  /** The array handed to Chart.js as `plugins`; refilled in place so plugin closures stay current. */
  const pluginsRef = useRef<Plugin<TType>[]>([]);
  const appliedDepsRef = useRef<DependencyList | null>(null);
  const themeMode = useChartThemeMode();

  // Runs after every render, but only touches the chart when the deps differ structurally.
  useEffect(() => {
    const canvas = canvasRef.current;
    const nextDeps = [...deps, themeMode];
    if (
      chartRef.current &&
      createdForRef.current?.canvas === canvas &&
      appliedDepsRef.current &&
      isChartDeepEqual(appliedDepsRef.current, nextDeps)
    ) {
      return;
    }

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
    const finalOptions = {
      ...chartOptions,
      ...(typeof overrides === 'function'
        ? (overrides as ChartOverridesFn<TType>)(chartOptions)
        : overrides),
    } as ChartOptions<TType>;

    appliedDepsRef.current = nextDeps;

    const existing = chartRef.current;
    const created = createdForRef.current;
    if (existing && created && created.canvas === canvas && created.type === type && created.hasPlugins === (plugins !== undefined)) {
      pluginsRef.current.splice(0, pluginsRef.current.length, ...(plugins ?? []));
      existing.data = data;
      existing.options = finalOptions;
      existing.update('none');
      onCreate?.(existing);
      return;
    }

    existing?.destroy();
    Chart.getChart?.(canvas)?.destroy();
    pluginsRef.current = [...(plugins ?? [])];
    const chart = new Chart(ctx, {
      type,
      data,
      options: finalOptions,
      ...(plugins && { plugins: pluginsRef.current }),
    } as ChartConfiguration<TType>);
    chartRef.current = chart;
    createdForRef.current = { canvas, type, hasPlugins: plugins !== undefined };
    onCreate?.(chart);
  });

  // Destroy only on unmount; clearing the refs lets a StrictMode remount create a fresh chart.
  useEffect(
    () => () => {
      chartRef.current?.destroy();
      chartRef.current = null;
      createdForRef.current = null;
      appliedDepsRef.current = null;
    },
    []
  );

  return { canvasRef, chartRef };
}
