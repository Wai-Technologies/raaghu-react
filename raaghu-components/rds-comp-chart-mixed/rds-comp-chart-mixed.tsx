import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import type { ChartOptions, ChartDataset, ChartData } from "chart.js/auto";
import { applyCanvasSize, resolveChartData, resolveChartLabel } from "../chart-utils";
import { useChart } from "../use-chart";
import "./rds-comp-chart-mixed.scss";

/** Props for {@link RdsCompMixedChart}. */
export interface RdsCompMixedChartProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** Chart.js data (labels and datasets). Takes precedence over `labels` and `dataSets`. Set `type: "line"` on a dataset to draw it as a line over the bars. */
  data?: ChartData;
  /** @deprecated Use `data.labels` instead. */
  labels?: string[];
  /** Chart.js options (never mutated). */
  options: ChartOptions<"bar">;
  /** @deprecated Use `data.datasets` instead. Set `type: "line"` on a dataset to draw it as a line over the bars. */
  dataSets?: ChartDataset[];
  /** Id of the canvas element. */
  id: string;
  /** Canvas height (number = px). */
  height?: string | number;
  /** Canvas width (number = px). */
  width?: string | number;
  /** Accessible label of the chart. Default "Mixed chart". */
  ariaLabel?: string;
  /** @deprecated Use `ariaLabel` instead. */
  chartLabel?: string;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
}

const RdsCompMixedChart = ({
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
}: RdsCompMixedChartProps) => {
  const resolved = resolveChartData("RdsCompMixedChart", data, labels, dataSets);
  const { canvasRef } = useChart(
    {
      type: "bar",
      labels: resolved.labels,
      datasets: resolved.datasets as ChartData<"bar">["datasets"],
      options,
      onCreate: (chart) => applyCanvasSize(chart.canvas, height, width),
    },
    [resolved.labels, options, resolved.datasets, id, height, width]
  );

  return (
    <div {...rest} ref={ref} className={clsx("rds-comp-chart-mixed", className)}>
      <canvas
        className="rds-chart-canvas"
        data-testid={id}
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={resolveChartLabel("RdsCompMixedChart", ariaLabel, chartLabel, "Mixed chart")}
      />
    </div>
  );
};

RdsCompMixedChart.displayName = "RdsCompMixedChart";
export default RdsCompMixedChart;
