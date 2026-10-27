/** @deprecated Prefer Chart.js `scatter` only; `bar`/`line` were accepted historically. */
export type ScatterChartType = 'scatter' | 'bar' | 'line';

/** Always resolves to `scatter` — this component is a scatter chart. */
export function resolveScatterChartType(_chartType?: string): 'scatter' {
  return 'scatter';
}
