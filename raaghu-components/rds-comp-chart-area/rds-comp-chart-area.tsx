import { useId, type HTMLAttributes, type Ref } from "react";
import clsx from "clsx";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { type ChartData, type ChartOptions, type ChartDataset } from "chart.js";
import { registerAreaChart } from "../chart-js-register";

registerAreaChart();
import { applyCanvasSize, resolveChartData, resolveChartLabel } from "../chart-utils";
import { ChartAccessibleAlternative, chartAccessibleDescribedBy } from "../chart-accessible-alternative";
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
  /** Canvas height (number = px). Defaults to `76vh`. */
  height?: string | number;
  /** Canvas width (number = px). Defaults to `100vh`. */
  width?: string | number;
  /** @deprecated Has no effect. Use a scriptable `backgroundColor` on the dataset instead. */
  isGradient?: boolean;
  /** Accessible label of the chart. Defaults to "Area chart". */
  ariaLabel?: string;
  /** Optional visible summary; chart data is also exposed in a screen-reader table. */
  description?: string;
  /** @deprecated Use `ariaLabel` instead. */
  chartLabel?: string;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
  /** System styles applied to the root element. */
  sx?: SxProps<Theme>;
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
  description,
  chartLabel,
  className,
  ref,
  sx,
  ...rest
}: RdsCompAreaChartProps) => {
  if (isGradient !== undefined) {
    warnDeprecatedProp("RdsCompAreaChart", "isGradient", "a scriptable `backgroundColor`");
  }
  const accessibleAltId = useId();
  const resolved = resolveChartData("RdsCompAreaChart", data, labels, dataSets);
  const describedBy = chartAccessibleDescribedBy(
    accessibleAltId,
    description,
    resolved.labels,
    resolved.datasets,
  );

  const { canvasRef } = useChart(
    {
      type: "line",
      labels: resolved.labels,
      datasets: resolved.datasets,
      options,
      onCreate: (chart) => applyCanvasSize(chart.canvas, height ?? "76vh", width ?? "100%"),
    },
    [resolved.labels, resolved.datasets, options, height, width]
  );

  return (
    <Box {...rest} ref={ref} className={clsx("rds-comp-chart-area", className)} sx={sx}>
      <canvas
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={resolveChartLabel("RdsCompAreaChart", ariaLabel, chartLabel, "Area chart")}
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

RdsCompAreaChart.displayName = "RdsCompAreaChart";
export default RdsCompAreaChart;
