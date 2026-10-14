import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import { type ChartOptions, type ChartDataset } from "chart.js/auto";
import { useChart } from "../use-chart";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import "./rds-comp-chart-area.scss";

/** Props for {@link RdsCompAreaChart}. */
export interface RdsCompAreaChartProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** X-axis labels. */
  labels: string[];
  /** Chart.js options (never mutated). Defaults to `{}`. */
  options?: ChartOptions<"line">;
  /** Chart.js line datasets. */
  dataSets: ChartDataset<"line">[];
  /** Id of the canvas element. */
  id?: string;
  /** @deprecated Has no effect. Use a scriptable `backgroundColor` on the dataset instead. */
  isGradient?: boolean;
  /** Accessible label of the chart. Defaults to "Area chart". */
  chartLabel?: string;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
}

/** @deprecated Use RdsCompAreaChartProps. */
export type lineprops = RdsCompAreaChartProps;

const RdsCompAreaChart = ({
  labels,
  options,
  dataSets,
  id,
  isGradient,
  chartLabel,
  className,
  ref,
  ...rest
}: RdsCompAreaChartProps) => {
  if (isGradient !== undefined) {
    warnDeprecatedProp("RdsCompAreaChart", "isGradient", "a scriptable `backgroundColor`");
  }

  const { canvasRef } = useChart(
    {
      type: "line",
      labels,
      datasets: dataSets,
      options,
      onCreate: (chart) => {
        chart.canvas.style.height = "76vh";
        chart.canvas.style.width = "100vh";
      },
    },
    [labels, dataSets, options]
  );

  return (
    <div {...rest} ref={ref} className={clsx("rds-comp-chart-area", className)}>
      <canvas
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={chartLabel ?? "Area chart"}
      />
    </div>
  );
};

RdsCompAreaChart.displayName = "RdsCompAreaChart";
export default RdsCompAreaChart;
