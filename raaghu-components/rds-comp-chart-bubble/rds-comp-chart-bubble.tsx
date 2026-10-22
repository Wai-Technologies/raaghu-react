import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import { type ChartData, type ChartOptions, type ChartDataset } from "chart.js/auto";
import { applyCanvasSize, resolveChartData, resolveChartLabel } from "../chart-utils";
import { useChart } from "../use-chart";
import "./rds-comp-chart-bubble.scss";

/** Props for {@link RdsCompBubbleChart}. */
export interface RdsCompBubbleChartProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** Id of the canvas element. */
  id: string;
  /** Chart.js data (labels and datasets). Takes precedence over `labels` and `dataSets`. */
  data?: ChartData<"bubble">;
  /** @deprecated Use `data.labels` instead. */
  labels?: string[];
  /** Chart.js options (never mutated). */
  options: ChartOptions<"bubble">;
  /** @deprecated Use `data.datasets` instead. */
  dataSets?: ChartDataset<"bubble">[];
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
}

const RdsCompBubbleChart = ({
  id,
  data,
  labels,
  options,
  dataSets,
  height,
  width,
  ariaLabel,
  chartLabel,
  className,
  ref,
  ...rest
}: RdsCompBubbleChartProps) => {
  const resolved = resolveChartData("RdsCompBubbleChart", data, labels, dataSets);
  const { canvasRef } = useChart(
    {
      type: "bubble",
      labels: resolved.labels,
      datasets: resolved.datasets,
      options,
      onCreate: (chart) => applyCanvasSize(chart.canvas, height, width),
    },
    [resolved.labels, options, resolved.datasets, height, width]
  );

  return (
    <div {...rest} ref={ref} className={clsx(className)}>
      <canvas
        data-testid={id}
        id={id}
        ref={canvasRef}
        width={300}
        height={300}
        role="img"
        aria-label={resolveChartLabel("RdsCompBubbleChart", ariaLabel, chartLabel, "Bubble chart")}
      />
    </div>
  );
};

RdsCompBubbleChart.displayName = "RdsCompBubbleChart";
export default RdsCompBubbleChart;
