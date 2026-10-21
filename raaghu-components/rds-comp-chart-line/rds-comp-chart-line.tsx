import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import type Chart from "chart.js/auto";
import type { ChartOptions, ChartDataset } from "chart.js/auto";
import { getCSSVar } from "../chart-utils";
import { useChart } from "../use-chart";
import "./rds-comp-chart-line.scss";

/** Props for {@link RdsCompLineChart}. */
export interface RdsCompLineProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** X-axis labels. */
  labels: string[];
  /** Chart.js options (never mutated). */
  options: ChartOptions<"line">;
  /** Chart.js line datasets. */
  dataSets: ChartDataset<"line">[];
  /** Id of the canvas element. */
  id: string;
  /** Accessible label of the chart. Default "Line chart". */
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
  labels,
  options,
  dataSets,
  id,
  chartLabel,
  className,
  ref,
  ...rest
}: RdsCompLineProps) => {
  const { canvasRef } = useChart(
    {
      type: "line",
      labels,
      datasets: dataSets,
      options,
      onCreate: (chart) => applyLineCanvasSizing(chart, id),
    },
    [labels, options, dataSets, id]
  );

  return (
    <div {...rest} ref={ref} className={clsx("rds-comp-chart-line", className)}>
      <canvas
        data-testid={id}
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={chartLabel ?? "Line chart"}
      />
    </div>
  );
};

RdsCompLineChart.displayName = "RdsCompLineChart";
export default RdsCompLineChart;
