import { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import {
  applyChartThemeColors,
  attachChartData,
  cloneChartOptions,
  useChartThemeMode,
} from "../chart-utils";
import "./rds-comp-chart-scatter.scss";
import { resolveScatterChartType, type ScatterChartType } from "./rds-comp-chart-scatter-utils";

export type { ScatterChartType } from "./rds-comp-chart-scatter-utils";

function resolveDatasetColor(
  color: string | string[] | undefined,
  fallback: string
): string {
  if (Array.isArray(color)) {
    return color[0] ?? fallback;
  }
  return color ?? fallback;
}

function normalizeScatterDataset(
  dataset: NonNullable<ChartConfiguration["data"]["datasets"]>[number],
  chartType: ScatterChartType
) {
  const normalized = {
    ...dataset,
    type: chartType,
  };

  if (chartType !== "line") {
    return normalized;
  }

  const lineColor = resolveDatasetColor(
    dataset.borderColor ?? dataset.backgroundColor,
    "rgb(255, 99, 132)"
  );

  return {
    ...normalized,
    showLine: true,
    fill: false,
    borderColor: lineColor,
    borderWidth: dataset.borderWidth ?? 2,
    pointBackgroundColor: resolveDatasetColor(
      dataset.pointBackgroundColor ?? dataset.backgroundColor,
      lineColor
    ),
    pointBorderColor: resolveDatasetColor(
      dataset.pointBorderColor ?? dataset.backgroundColor,
      lineColor
    ),
  };
}

export interface RdsCompScatterChartProps {
  labels: any[];
  options: ChartConfiguration["options"];
  dataSets: ChartConfiguration["data"]["datasets"];
  id: string;
  chartLabel?: string;
  chartType?: ScatterChartType;
}

const RdsCompScatterChart = ({
  id,
  labels,
  options,
  dataSets,
  chartLabel,
  chartType,
}: RdsCompScatterChartProps) => {
  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeMode = useChartThemeMode();

  useEffect(() => {
    chartRef.current?.destroy();

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const resolvedChartType = resolveScatterChartType(chartType);
    const chartOptions = cloneChartOptions(options);
    const chartData = {
      labels,
      datasets: dataSets.map((dataset) =>
        normalizeScatterDataset(dataset, resolvedChartType)
      ),
    };

    attachChartData(chartOptions, chartData);
    applyChartThemeColors(chartOptions);

    chartRef.current = new Chart(ctx, {
      type: resolvedChartType,
      data: chartData,
      options: chartOptions,
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [id, labels, options, dataSets, themeMode, chartType]);

  return (
    <div className="rds-comp-chart-scatter">
      <canvas
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={chartLabel ?? "Scatter chart"}
      />
    </div>
  );
};

RdsCompScatterChart.displayName = "RdsCompScatterChart";
export default RdsCompScatterChart;
