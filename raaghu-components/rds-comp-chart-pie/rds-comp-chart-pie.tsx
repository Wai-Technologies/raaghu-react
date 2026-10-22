import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import type { ChartData, ChartOptions, ChartDataset } from "chart.js/auto";
import { applyCanvasSize, resolveChartData, resolveChartLabel } from "../chart-utils";
import { useChart } from "../use-chart";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import "./rds-comp-chart-pie.scss";

/** Props for {@link RdsCompPieChart}. */
export interface RdsCompPieProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** Chart.js data (labels and datasets). Takes precedence over `labels` and `dataSets`. */
  data?: ChartData<"pie">;
  /** @deprecated Use `data.labels` instead. */
  labels?: string[];
  /** Chart.js options (never mutated). */
  options: ChartOptions<"pie">;
  /** @deprecated Use `data.datasets` instead. */
  dataSets?: ChartDataset<"pie">[];
  /**
   * Chart.js pie radius. When set, it overrides `options.radius`.
   * @deprecated Use `options.radius` instead.
   */
  radius?: number;
  /** Id of the canvas element. */
  id: string;
  /** Canvas height (number = px). */
  height?: string | number;
  /** Canvas width (number = px). */
  width?: string | number;
  /** Accessible label of the chart. Default "Pie chart". */
  ariaLabel?: string;
  /** @deprecated Use `ariaLabel` instead. */
  chartLabel?: string;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
}

const RdsCompPieChart = ({
  data,
  labels,
  options,
  dataSets,
  radius,
  id,
  height,
  width,
  ariaLabel,
  chartLabel,
  className,
  ref,
  ...rest
}: RdsCompPieProps) => {
  if (radius !== undefined) warnDeprecatedProp("RdsCompPieChart", "radius", "`options.radius`");
  const resolved = resolveChartData("RdsCompPieChart", data, labels, dataSets);

  const { canvasRef } = useChart(
    {
      type: "pie",
      labels: resolved.labels,
      datasets: resolved.datasets,
      options,
      themeAxes: [],
      overrides: radius !== undefined ? { radius } : undefined,
      onCreate: (chart) => applyCanvasSize(chart.canvas, height, width),
    },
    [resolved.labels, options, resolved.datasets, radius, id, height, width]
  );

  return (
    <div {...rest} ref={ref} className={clsx("rds-comp-chart-pie", className)}>
      <div className="chart-container">
        <canvas
          id={id}
          ref={canvasRef}
          role="img"
          aria-label={resolveChartLabel("RdsCompPieChart", ariaLabel, chartLabel, "Pie chart")}
        />
      </div>
    </div>
  );
};

RdsCompPieChart.displayName = "RdsCompPieChart";
export default RdsCompPieChart;
