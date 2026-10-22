import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import type { ChartData, ChartOptions } from "chart.js/auto";
import { applyCanvasSize, resolveChartData, resolveChartLabel } from "../chart-utils";
import { useChart } from "../use-chart";
import "./rds-comp-chart-stacked.scss";

/** Props for {@link RdsCompStackedChart}. */
export interface RdsCompStackedProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** Chart.js data (labels and datasets). Takes precedence over `labels` and `dataSets`. */
  data?: ChartData<"bar">;
  /** @deprecated Use `data.labels` instead. */
  labels?: ChartData<"bar">["labels"];
  /** Chart.js bar options (never mutated). Set `scales.x.stacked` / `scales.y.stacked` to stack the bars. */
  options: ChartOptions<"bar">;
  /** @deprecated Use `data.datasets` instead. */
  dataSets?: ChartData<"bar">["datasets"];
  /** Id of the canvas element. */
  id: string;
  /** Canvas height (number = px). */
  height?: string | number;
  /** Canvas width (number = px). */
  width?: string | number;
  /** Accessible label of the chart. Default "Stacked chart". */
  ariaLabel?: string;
  /** @deprecated Use `ariaLabel` instead. */
  chartLabel?: string;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
}

const RdsCompStackedChart = ({
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
}: RdsCompStackedProps) => {
  const resolved = resolveChartData("RdsCompStackedChart", data, labels, dataSets);
  const { canvasRef } = useChart<"bar">(
    {
      type: "bar",
      labels: resolved.labels,
      datasets: resolved.datasets,
      options,
      overrides: (chartOptions) => ({
        maintainAspectRatio: false,
        scales: {
          ...(chartOptions?.scales || {}),
          x: {
            ...(chartOptions?.scales?.x || {}),
            offset: true,
            ticks: {
              ...(chartOptions?.scales?.x?.ticks || {}),
              padding: 20,
              align: "center",
            },
          },
        },
      }),
      onCreate: (chart) => applyCanvasSize(chart.canvas, height, width),
    },
    [resolved.labels, resolved.datasets, options, height, width]
  );

  return (
    <div
      {...rest}
      ref={ref}
      className={clsx("rds-comp-chart-stacked", "stack-chart-container", className)}
    >
      <canvas
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={resolveChartLabel("RdsCompStackedChart", ariaLabel, chartLabel, "Stacked chart")}
      />
    </div>
  );
};

RdsCompStackedChart.displayName = "RdsCompStackedChart";
export default RdsCompStackedChart;
