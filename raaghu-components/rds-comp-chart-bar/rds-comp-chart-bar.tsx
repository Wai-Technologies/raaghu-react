import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import Chart, { type ChartOptions, type ChartDataset } from "chart.js/auto";
import { useChart } from "../use-chart";
import "./rds-comp-chart-bar.scss";

/** Props for {@link RdsCompBarChart}. */
export interface RdsCompBarChartProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** X-axis labels. */
  labels: string[];
  /** Chart.js options (never mutated). `responsive` and `maintainAspectRatio` default to `true` / `false`. */
  options: ChartOptions<"bar">;
  /** Chart.js bar datasets. */
  dataSets: ChartDataset<"bar">[];
  /** Id of the canvas element. */
  id: string;
  /** Canvas height (number = px). */
  height?: string | number;
  /** Accessible label of the chart. */
  chartLabel?: string;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
}

const applyBarCanvasSizing = (
  chart: Chart,
  id: RdsCompBarChartProps["id"],
  height?: string | number
) => {
  if (height) {
    chart.canvas.style.height =
      typeof height === "number" ? `${height}px` : String(height);
    chart.canvas.style.width = "100%";
    return;
  }

  if (id === "barchart1") {
    chart.canvas.style.height = "var(--rds-comp-chart-bar-barchart1-height, 65vh)";
    chart.canvas.style.width = "100%";
    return;
  }

  if (id === "histogram") {
    chart.canvas.style.height = "var(--rds-comp-chart-bar-histogram-size, 50px)";
    chart.canvas.style.width = "var(--rds-comp-chart-bar-histogram-size, 50px)";
    return;
  }

  chart.canvas.style.height = "var(--rds-comp-chart-bar-default-height, 76vh)";
  chart.canvas.style.width = "100%";
};

const RdsCompBarChart = ({
  labels,
  options,
  dataSets,
  id,
  height,
  chartLabel,
  className,
  ref,
  ...rest
}: RdsCompBarChartProps) => {
  const { canvasRef } = useChart(
    {
      type: "bar",
      labels,
      datasets: dataSets,
      options: { responsive: true, maintainAspectRatio: false, ...options },
      onCreate: (chart) => applyBarCanvasSizing(chart, id, height),
    },
    [options, labels, dataSets, height, id]
  );

  return (
    <div {...rest} ref={ref} className={clsx("rds-comp-chart-bar", className)}>
      <canvas
        data-testid={id}
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={chartLabel ?? "Bar chart"}
      />
    </div>
  );
};

RdsCompBarChart.displayName = "RdsCompBarChart";
export default RdsCompBarChart;
