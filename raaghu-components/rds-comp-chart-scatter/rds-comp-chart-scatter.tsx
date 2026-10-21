import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import type { ChartConfiguration, ChartData, ChartDataset } from "chart.js/auto";
import { useChart } from "../use-chart";
import "./rds-comp-chart-scatter.scss";
import { resolveScatterChartType, type ScatterChartType } from "./rds-comp-chart-scatter-utils";

export type { ScatterChartType } from "./rds-comp-chart-scatter-utils";

/** The dataset keys this file reads; Chart.js dataset types differ per chart type. */
type DatasetColors = {
  backgroundColor?: unknown;
  borderColor?: unknown;
  borderWidth?: unknown;
  pointBackgroundColor?: unknown;
  pointBorderColor?: unknown;
};

function resolveDatasetColor(
  color: unknown,
  fallback: string
): string {
  if (Array.isArray(color)) {
    return (color[0] as string) ?? fallback;
  }
  return typeof color === "string" ? color : fallback;
}

function normalizeScatterDataset(
  dataset: ChartDataset,
  chartType: ScatterChartType
) {
  const normalized = {
    ...dataset,
    type: chartType,
  };

  if (chartType !== "line") {
    return normalized;
  }

  const colors = dataset as DatasetColors;
  const lineColor = resolveDatasetColor(
    colors.borderColor ?? colors.backgroundColor,
    "rgb(255, 99, 132)"
  );

  return {
    ...normalized,
    showLine: true,
    fill: false,
    borderColor: lineColor,
    borderWidth: colors.borderWidth ?? 2,
    pointBackgroundColor: resolveDatasetColor(
      colors.pointBackgroundColor ?? colors.backgroundColor,
      lineColor
    ),
    pointBorderColor: resolveDatasetColor(
      colors.pointBorderColor ?? colors.backgroundColor,
      lineColor
    ),
  };
}

/** Props for {@link RdsCompScatterChart}. */
export interface RdsCompScatterChartProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** Labels (optional for scatter data given as `{ x, y }` points). */
  labels: unknown[];
  /** Chart.js options (never mutated). */
  options: ChartConfiguration["options"];
  /** Chart.js datasets. */
  dataSets: ChartConfiguration["data"]["datasets"];
  /** Id of the canvas element. */
  id: string;
  /** Accessible label of the chart. Default "Scatter chart". */
  chartLabel?: string;
  /** Chart.js type to draw. `"line"` connects the points. Default `"scatter"`. */
  chartType?: ScatterChartType;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
}

const RdsCompScatterChart = ({
  id,
  labels,
  options,
  dataSets,
  chartLabel,
  chartType,
  className,
  ref,
  ...rest
}: RdsCompScatterChartProps) => {
  const resolvedChartType = resolveScatterChartType(chartType);
  const { canvasRef } = useChart<ScatterChartType>(
    {
      type: resolvedChartType,
      labels,
      datasets: dataSets.map((dataset) =>
        normalizeScatterDataset(dataset, resolvedChartType)
      ) as ChartData<ScatterChartType>["datasets"],
      options: options as ChartConfiguration<ScatterChartType>["options"],
    },
    [id, labels, options, dataSets, chartType]
  );

  return (
    <div {...rest} ref={ref} className={clsx("rds-comp-chart-scatter", className)}>
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
