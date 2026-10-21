import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import { useChart } from "../use-chart";
import "./rds-comp-chart-stacked.scss";

/** Props for {@link RdsCompStackedChart}. */
export interface RdsCompStackedProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** X-axis labels. */
  labels: any[];
  /** Chart.js bar options (never mutated). Set `scales.x.stacked` / `scales.y.stacked` to stack the bars. */
  options: any;
  /** Chart.js bar datasets. */
  dataSets: any[];
  /** Id of the canvas element. */
  id: string;
  /** Accessible label of the chart. Default "Stacked chart". */
  chartLabel?: string;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
}

const RdsCompStackedChart = ({
  labels,
  options,
  dataSets,
  id,
  chartLabel,
  className,
  ref,
  ...rest
}: RdsCompStackedProps) => {
  const { canvasRef } = useChart<"bar">(
    {
      type: "bar",
      labels,
      datasets: dataSets,
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
    },
    [labels, dataSets, options]
  );

  return (
    <div
      {...rest}
      ref={ref}
      // `stack-chart-container` is the legacy class, kept for consumer CSS.
      className={clsx("rds-comp-chart-stacked", "stack-chart-container", className)}
    >
      <canvas
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={chartLabel ?? "Stacked chart"}
      />
    </div>
  );
};

RdsCompStackedChart.displayName = "RdsCompStackedChart";
export default RdsCompStackedChart;
