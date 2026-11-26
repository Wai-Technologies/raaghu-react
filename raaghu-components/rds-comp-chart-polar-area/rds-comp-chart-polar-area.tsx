import { useId, type HTMLAttributes, type Ref } from "react";
import clsx from "clsx";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ChartData, ChartOptions, ChartDataset } from "chart.js/auto";
import { applyCanvasSize, resolveChartData, resolveChartLabel } from "../chart-utils";
import { ChartAccessibleAlternative, chartAccessibleDescribedBy } from "../chart-accessible-alternative";
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
  /** Optional visible summary; chart data is also exposed in a screen-reader table. */
  description?: string;
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
  description,
  chartLabel,
  className,
  ref,
  sx,
  ...rest
}: RdsCompPolarAreaChartProps) => {
  if (radius !== undefined) warnDeprecatedProp("RdsCompPolarAreaChart", "radius", "`height`");
  const accessibleAltId = useId();
  const canvasHeight = height ?? radius;
  const resolved = resolveChartData("RdsCompPolarAreaChart", data, labels, dataSets, false);
  const describedBy = chartAccessibleDescribedBy(
    accessibleAltId,
    description,
    resolved.labels,
    resolved.datasets,
  );

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
        aria-describedby={describedBy}
      />
      <ChartAccessibleAlternative
        summaryId={accessibleAltId}
        description={description}
        labels={resolved.labels}
        datasets={resolved.datasets}
      />
    </Box>
  );
};

RdsCompPolarAreaChart.displayName = "RdsCompPolarAreaChart";
export default RdsCompPolarAreaChart;
