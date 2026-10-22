import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import type Chart from "chart.js/auto";
import type { ChartData, ChartOptions, ChartDataset } from "chart.js/auto";
import { applyCanvasSize, getCSSVar, resolveChartData, resolveChartLabel } from "../chart-utils";
import { useChart } from "../use-chart";
import "./rds-comp-chart-line.scss";

/** Props for {@link RdsCompLineChart}. */
export interface RdsCompLineProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** Chart.js data (labels and datasets). Takes precedence over `labels` and `dataSets`. */
  data?: ChartData<"line">;
  /** @deprecated Use `data.labels` instead. */
  labels?: string[];
  /** Chart.js options (never mutated). */
  options: ChartOptions<"line">;
  /** @deprecated Use `data.datasets` instead. */
  dataSets?: ChartDataset<"line">[];
  /** Id of the canvas element. */
  id: string;
  /** Canvas height (number = px). */
  height?: string | number;
  /** Canvas width (number = px). */
  width?: string | number;
  /** Accessible label of the chart. Default "Line chart". */
  ariaLabel?: string;
  /** @deprecated Use `ariaLabel` instead. */
  chartLabel?: string;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
}

const applyLineCanvasSizing = (chart: Chart, chartId: string) => {
  if (chartId === "linechart1") {
    chart.canvas.style.height = "65vh";
    chart.canvas.style.width = "100vh";
    return;
  }

  if (chartId === "linechart2") {
    const smallSize = getCSSVar("--rds-spacing-2xl", "50px");
    chart.canvas.style.height = smallSize;
    chart.canvas.style.width = smallSize;
    return;
  }

  chart.canvas.style.height = "76vh";
  chart.canvas.style.width = "100vh";
};

const RdsCompLineChart = ({
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
  ...rest
}: RdsCompLineProps) => {
  const resolved = resolveChartData("RdsCompLineChart", data, labels, dataSets);
  const { canvasRef } = useChart(
    {
      type: "line",
      labels: resolved.labels,
      datasets: resolved.datasets,
      options,
      onCreate: (chart) => {
        applyLineCanvasSizing(chart, id);
        applyCanvasSize(chart.canvas, height, width);
      },
    },
    [resolved.labels, options, resolved.datasets, id, height, width]
  );

  return (
    <div {...rest} ref={ref} className={clsx("rds-comp-chart-line", className)}>
      <canvas
        data-testid={id}
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={resolveChartLabel("RdsCompLineChart", ariaLabel, chartLabel, "Line chart")}
      />
    </div>
  );
};

RdsCompLineChart.displayName = "RdsCompLineChart";
export default RdsCompLineChart;
