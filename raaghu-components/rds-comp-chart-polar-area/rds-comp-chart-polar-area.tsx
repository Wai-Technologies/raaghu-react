import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import type { ChartOptions, ChartDataset } from "chart.js/auto";
import { useChart } from "../use-chart";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import "./rds-comp-chart-polar-area.scss";

/** Props for {@link RdsCompPolarAreaChart}. */
export interface RdsCompPolarAreaChartProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** Segment labels. */
  labels: string[];
  /** Chart.js options (never mutated). */
  options: ChartOptions<"polarArea">;
  /** Chart.js polar area datasets. */
  dataSets: ChartDataset<"polarArea">[];
  /** Canvas height in px. */
  height?: number;
  /** @deprecated Use `height` instead (this is the canvas height in px). */
  radius?: number;
  /** Id of the canvas element. */
  id: string;
  /** Accessible label of the chart. Default "Polar area chart". */
  chartLabel?: string;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
}

const RdsCompPolarAreaChart = ({
  labels,
  options,
  dataSets,
  height,
  radius,
  id,
  chartLabel,
  className,
  ref,
  ...rest
}: RdsCompPolarAreaChartProps) => {
  if (radius !== undefined) warnDeprecatedProp("RdsCompPolarAreaChart", "radius", "`height`");
  const canvasHeight = height ?? radius;

  const { canvasRef } = useChart(
    {
      type: "polarArea",
      labels,
      datasets: dataSets,
      options,
      themeAxes: [],
      onCreate: (chart) => {
        // Without a height, Chart.js keeps its own size (HEAD wrote the invalid "undefinedpx" here).
        if (canvasHeight !== undefined) chart.canvas.style.height = `${canvasHeight}px`;
      },
    },
    [labels, options, dataSets, canvasHeight, id]
  );

  return (
    <div
      {...rest}
      ref={ref}
      className={clsx("rds-comp-chart-polar-area-container", className)}
    >
      <canvas
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={chartLabel ?? "Polar area chart"}
      />
    </div>
  );
};

RdsCompPolarAreaChart.displayName = "RdsCompPolarAreaChart";
export default RdsCompPolarAreaChart;
