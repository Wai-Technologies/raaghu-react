import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ChartData, ChartOptions, ChartDataset } from "chart.js/auto";
import { applyCanvasSize, resolveChartData, resolveChartLabel } from "../chart-utils";
import { useChart } from "../use-chart";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import "./rds-comp-chart-polar-area.scss";

/** Props for {@link RdsCompPolarAreaChart}. */
export interface RdsCompPolarAreaChartProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** Chart.js data (labels and datasets). Takes precedence over `labels` and `dataSets`. */
  data?: ChartData<"polarArea">;
  /** @deprecated Use `data.labels` instead. */
  labels?: string[];
  /** Chart.js options (never mutated). */
  options: ChartOptions<"polarArea">;
  /** @deprecated Use `data.datasets` instead. */
  dataSets?: ChartDataset<"polarArea">[];
  /** Canvas height (number = px). */
  height?: string | number;
  /** Canvas width (number = px). */
  width?: string | number;
  /** @deprecated Use `height` instead (this is the canvas height in px). */
  radius?: number;
  /** Id of the canvas element. */
  id: string;
  /** Accessible label of the chart. Default "Polar area chart". */
  ariaLabel?: string;
  /** @deprecated Use `ariaLabel` instead. */
  chartLabel?: string;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
  /** MUI system styles applied to the chart root element. */
  sx?: SxProps<Theme>;
}

const RdsCompPolarAreaChart = ({
  data,
  labels,
  options,
  dataSets,
  height,
  width,
  radius,
  id,
  ariaLabel,
  chartLabel,
  className,
  ref,
  sx,
  ...rest
}: RdsCompPolarAreaChartProps) => {
  if (radius !== undefined) warnDeprecatedProp("RdsCompPolarAreaChart", "radius", "`height`");
  const canvasHeight = height ?? radius;
  const resolved = resolveChartData("RdsCompPolarAreaChart", data, labels, dataSets, false);

  const { canvasRef } = useChart(
    {
      type: "polarArea",
      labels: resolved.labels,
      datasets: resolved.datasets,
      options,
      themeAxes: [],
      onCreate: (chart) => applyCanvasSize(chart.canvas, canvasHeight, width),
    },
    [resolved.labels, options, resolved.datasets, canvasHeight, width, id]
  );

  return (
    <Box
      {...rest}
      ref={ref}
      className={clsx("rds-comp-chart-polar-area-container", className)}
      sx={sx}
    >
      <canvas
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={resolveChartLabel("RdsCompPolarAreaChart", ariaLabel, chartLabel, "Polar area chart")}
      />
    </Box>
  );
};

RdsCompPolarAreaChart.displayName = "RdsCompPolarAreaChart";
export default RdsCompPolarAreaChart;
