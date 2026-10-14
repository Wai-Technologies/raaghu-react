import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import { type ChartOptions, type ChartDataset } from "chart.js/auto";
import { useChart } from "../use-chart";
import "./rds-comp-chart-bubble.scss";

/** Props for {@link RdsCompBubbleChart}. */
export interface RdsCompBubbleChartProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** Id of the canvas element. */
  id: string;
  /** Dataset labels. */
  labels?: string[];
  /** Chart.js options (never mutated). */
  options: ChartOptions<"bubble">;
  /** Chart.js bubble datasets. */
  dataSets: ChartDataset<"bubble">[];
  /** Accessible label of the chart. */
  chartLabel?: string;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
}

const RdsCompBubbleChart = ({
  id,
  labels,
  options,
  dataSets,
  chartLabel,
  className,
  ref,
  ...rest
}: RdsCompBubbleChartProps) => {
  const { canvasRef } = useChart(
    { type: "bubble", labels, datasets: dataSets, options },
    [labels, options, dataSets]
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
        aria-label={chartLabel ?? "Bubble chart"}
      />
    </div>
  );
};

RdsCompBubbleChart.displayName = "RdsCompBubbleChart";
export default RdsCompBubbleChart;
