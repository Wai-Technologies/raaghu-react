import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import Chart, { type ChartData, type ChartOptions, type ChartDataset } from "chart.js/auto";
import { applyCanvasSize, resolveChartData, resolveChartLabel } from "../chart-utils";
import { useChart } from "../use-chart";
import "./rds-comp-chart-bar.scss";

/** Props for {@link RdsCompBarChart}. */
export interface RdsCompBarChartProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** Chart.js data (labels and datasets). Takes precedence over `labels` and `dataSets`. */
  data?: ChartData<"bar">;
  /** @deprecated Use `data.labels` instead. */
  labels?: string[];
  /** Chart.js options (never mutated). `responsive` and `maintainAspectRatio` default to `true` / `false`. */
  options: ChartOptions<"bar">;
  /** @deprecated Use `data.datasets` instead. */
  dataSets?: ChartDataset<"bar">[];
  /** Id of the canvas element. */
  id: string;
  /** Canvas height (number = px). */
  height?: string | number;
  /** Canvas width (number = px). */
  width?: string | number;
  /** Accessible label of the chart. */
  ariaLabel?: string;
  /** @deprecated Use `ariaLabel` instead. */
  chartLabel?: string;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
  /** MUI system styles applied to the root element. */
  sx?: SxProps<Theme>;
}

const applyBarCanvasSizing = (
  chart: Chart,
  id: RdsCompBarChartProps["id"],
  height?: string | number,
  width?: string | number
) => {
  if (height) {
    chart.canvas.style.height =
      typeof height === "number" ? `${height}px` : String(height);
    chart.canvas.style.width = "100%";
  } else if (id === "barchart1") {
    chart.canvas.style.height = "var(--rds-comp-chart-bar-barchart1-height, 65vh)";
    chart.canvas.style.width = "100%";
  } else if (id === "histogram") {
    chart.canvas.style.height = "var(--rds-comp-chart-bar-histogram-size)";
    chart.canvas.style.width = "var(--rds-comp-chart-bar-histogram-size)";
  } else {
    chart.canvas.style.height = "var(--rds-comp-chart-bar-default-height, 76vh)";
    chart.canvas.style.width = "100%";
  }
  applyCanvasSize(chart.canvas, undefined, width);
};

const RdsCompBarChart = ({
  data,
  labels,
  options,
  dataSets,
  id,
  height,
  width,
  ariaLabel,
  chartLabel,
  className,
  ref,
  sx,
  ...rest
}: RdsCompBarChartProps) => {
  const resolved = resolveChartData("RdsCompBarChart", data, labels, dataSets);
  const { canvasRef } = useChart(
    {
      type: "bar",
      labels: resolved.labels,
      datasets: resolved.datasets,
      options: { responsive: true, maintainAspectRatio: false, ...options },
      onCreate: (chart) => applyBarCanvasSizing(chart, id, height, width),
    },
    [options, resolved.labels, resolved.datasets, height, width, id]
  );

  return (
    <Box {...rest} ref={ref} className={clsx("rds-comp-chart-bar", className)} sx={sx}>
      <canvas
        data-testid={id}
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={resolveChartLabel("RdsCompBarChart", ariaLabel, chartLabel, "Bar chart")}
      />
    </Box>
  );
};

RdsCompBarChart.displayName = "RdsCompBarChart";
export default RdsCompBarChart;
