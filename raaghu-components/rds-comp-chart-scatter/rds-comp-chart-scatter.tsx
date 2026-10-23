import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ChartConfiguration, ChartData, ChartDataset } from "chart.js/auto";
import { applyCanvasSize, resolveChartData, resolveChartLabel } from "../chart-utils";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
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
  /** Chart.js data (labels and datasets). Takes precedence over `labels` and `dataSets`. */
  data?: ChartData;
  /** @deprecated Use `data.labels` instead. */
  labels?: unknown[];
  /** Chart.js options (never mutated). */
  options: ChartConfiguration["options"];
  /** @deprecated Use `data.datasets` instead. */
  dataSets?: ChartConfiguration["data"]["datasets"];
  /** Id of the canvas element. */
  id: string;
  /** Canvas height (number = px). */
  height?: string | number;
  /** Canvas width (number = px). */
  width?: string | number;
  /** Accessible label of the chart. Default "Scatter chart". */
  ariaLabel?: string;
  /** @deprecated Use `ariaLabel` instead. */
  chartLabel?: string;
  /** @deprecated Use `showLine` on the datasets to connect the points. Chart.js type to draw. Default `"scatter"`. */
  chartType?: ScatterChartType;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
  sx?: SxProps<Theme>;
}

const RdsCompScatterChart = ({
  id,
  data,
  labels,
  options,
  dataSets,
  height,
  width,
  ariaLabel,
  chartLabel,
  chartType,
  className,
  ref,
  sx,
  ...rest
}: RdsCompScatterChartProps) => {
  if (chartType !== undefined) {
    warnDeprecatedProp("RdsCompScatterChart", "chartType", "`showLine` on the datasets");
  }
  const resolvedChartType = resolveScatterChartType(chartType);
  const resolved = resolveChartData<unknown[], ChartDataset[]>(
    "RdsCompScatterChart",
    data as { labels?: unknown[]; datasets: ChartDataset[] } | undefined,
    labels,
    dataSets as ChartDataset[] | undefined
  );
  const { canvasRef } = useChart<ScatterChartType>(
    {
      type: resolvedChartType,
      labels: resolved.labels,
      datasets: resolved.datasets.map((dataset) =>
        normalizeScatterDataset(dataset, resolvedChartType)
      ) as ChartData<ScatterChartType>["datasets"],
      options: options as ChartConfiguration<ScatterChartType>["options"],
      onCreate: (chart) => applyCanvasSize(chart.canvas, height, width),
    },
    [id, resolved.labels, options, resolved.datasets, chartType, height, width]
  );

  return (
    <Box {...rest} ref={ref} className={clsx("rds-comp-chart-scatter", className)} sx={sx}>
      <canvas
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={resolveChartLabel("RdsCompScatterChart", ariaLabel, chartLabel, "Scatter chart")}
      />
    </Box>
  );
};

RdsCompScatterChart.displayName = "RdsCompScatterChart";
export default RdsCompScatterChart;
