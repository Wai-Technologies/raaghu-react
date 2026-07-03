export type ScatterChartType = 'scatter' | 'bar' | 'line';

const VALID_CHART_TYPES: ScatterChartType[] = ['scatter', 'bar', 'line'];

export function resolveScatterChartType(chartType?: string): ScatterChartType {
  if (chartType && VALID_CHART_TYPES.includes(chartType as ScatterChartType)) {
    return chartType as ScatterChartType;
  }
  return 'scatter';
}
