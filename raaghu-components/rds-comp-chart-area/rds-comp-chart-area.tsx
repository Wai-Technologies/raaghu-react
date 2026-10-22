import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import { type ChartData, type ChartOptions, type ChartDataset } from "chart.js/auto";
import { applyCanvasSize, resolveChartData, resolveChartLabel } from "../chart-utils";
import { useChart } from "../use-chart";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import "./rds-comp-chart-area.scss";

/** Props for {@link RdsCompAreaChart}. */
export interface RdsCompAreaChartProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** Chart.js data (labels and datasets). Takes precedence over `labels` and `dataSets`. */
  data?: ChartData<"line">;
  /** @deprecated Use `data.labels` instead. */
  labels?: string[];
  /** Chart.js options (never mutated). Defaults to `{}`. */
  options?: ChartOptions<"line">;
  /** @deprecated Use `data.datasets` instead. */
  dataSets?: ChartDataset<"line">[];
  /** Id of the canvas element. */
  id?: string;
  /** Canvas height (number = px). */
  height?: string | number;
  /** Canvas width (number = px). */
  width?: string | number;
  /** @deprecated Has no effect. Use a scriptable `backgroundColor` on the dataset instead. */
  isGradient?: boolean;
  /** Accessible label of the chart. Defaults to "Area chart". */
  ariaLabel?: string;
  /** @deprecated Use `ariaLabel` instead. */
  chartLabel?: string;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
}

/** @deprecated Use RdsCompAreaChartProps. */
export type lineprops = RdsCompAreaChartProps;

const RdsCompAreaChart = ({
  data,
  labels,
  options,
  dataSets,
  id,
  height,
  width,
  isGradient,
  ariaLabel,
  chartLabel,
  className,
  ref,
  ...rest
}: RdsCompAreaChartProps) => {
  if (isGradient !== undefined) {
    warnDeprecatedProp("RdsCompAreaChart", "isGradient", "a scriptable `backgroundColor`");
  }
  const resolved = resolveChartData("RdsCompAreaChart", data, labels, dataSets);

  const { canvasRef } = useChart(
    {
      type: "line",
      labels: resolved.labels,
      datasets: resolved.datasets,
      options,
      onCreate: (chart) => {
        chart.canvas.style.height = "76vh";
        chart.canvas.style.width = "100vh";
        applyCanvasSize(chart.canvas, height, width);
      },
    },
    [resolved.labels, resolved.datasets, options, height, width]
  );

  return (
    <div {...rest} ref={ref} className={clsx("rds-comp-chart-area", className)}>
      <canvas
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={resolveChartLabel("RdsCompAreaChart", ariaLabel, chartLabel, "Area chart")}
      />
    </div>
  );
};

RdsCompAreaChart.displayName = "RdsCompAreaChart";
export default RdsCompAreaChart;
