import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import type { ChartOptions, ChartDataset, ChartData } from "chart.js/auto";
import { useChart } from "../use-chart";
import "./rds-comp-chart-mixed.scss";

/** Props for {@link RdsCompMixedChart}. */
export interface RdsCompMixedChartProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** X-axis labels. */
  labels: string[];
  /** Chart.js options (never mutated). */
  options: ChartOptions<"bar">;
  /** Chart.js datasets; set `type: "line"` on a dataset to draw it as a line over the bars. */
  dataSets: ChartDataset[];
  /** Id of the canvas element. */
  id: string;
  /** Accessible label of the chart. Default "Mixed chart". */
  chartLabel?: string;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
}

const RdsCompMixedChart = ({
  labels,
  options,
  dataSets,
  id,
  chartLabel,
  className,
  ref,
  ...rest
}: RdsCompMixedChartProps) => {
  const { canvasRef } = useChart(
    {
      type: "bar",
      labels,
      datasets: dataSets as ChartData<"bar">["datasets"],
      options,
    },
    [labels, options, dataSets, id]
  );

  return (
    <div {...rest} ref={ref} className={clsx("rds-comp-chart-mixed", className)}>
      <canvas
        className="rds-chart-canvas"
        data-testid={id}
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={chartLabel ?? "Mixed chart"}
      />
    </div>
  );
};

RdsCompMixedChart.displayName = "RdsCompMixedChart";
export default RdsCompMixedChart;
