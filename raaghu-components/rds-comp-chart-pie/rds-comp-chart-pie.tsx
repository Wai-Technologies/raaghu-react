import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import type { ChartOptions, ChartDataset } from "chart.js/auto";
import { useChart } from "../use-chart";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import "./rds-comp-chart-pie.scss";

/** Props for {@link RdsCompPieChart}. */
export interface RdsCompPieProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** Slice labels. */
  labels: string[];
  /** Chart.js options (never mutated). */
  options: ChartOptions<"pie">;
  /** Chart.js pie datasets. */
  dataSets: ChartDataset<"pie">[];
  /**
   * Chart.js pie radius. When set, it overrides `options.radius`.
   * @deprecated Use `options.radius` instead.
   */
  radius?: number;
  /** Id of the canvas element. */
  id: string;
  /** Accessible label of the chart. Default "Pie chart". */
  chartLabel?: string;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
}

const RdsCompPieChart = ({
  labels,
  options,
  dataSets,
  radius,
  id,
  chartLabel,
  className,
  ref,
  ...rest
}: RdsCompPieProps) => {
  if (radius !== undefined) warnDeprecatedProp("RdsCompPieChart", "radius", "`options.radius`");

  const { canvasRef } = useChart(
    {
      type: "pie",
      labels,
      datasets: dataSets,
      options,
      themeAxes: [],
      overrides: radius !== undefined ? { radius } : undefined,
    },
    [labels, options, dataSets, radius, id]
  );

  return (
    <div {...rest} ref={ref} className={clsx("rds-comp-chart-pie", className)}>
      <div className="chart-container">
        <canvas
          id={id}
          ref={canvasRef}
          role="img"
          aria-label={chartLabel ?? "Pie chart"}
        />
      </div>
    </div>
  );
};

RdsCompPieChart.displayName = "RdsCompPieChart";
export default RdsCompPieChart;
