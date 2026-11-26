import { useId, type HTMLAttributes, type Ref } from "react";
import clsx from "clsx";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type Chart from "chart.js/auto";
import type { ChartData, ChartOptions, ChartDataset } from "chart.js/auto";
import { applyCanvasSize, getCSSVar, resolveChartData, resolveChartLabel } from "../chart-utils";
import { ChartAccessibleAlternative, chartAccessibleDescribedBy } from "../chart-accessible-alternative";
import { useChart } from "../use-chart";
import "./rds-comp-chart-line.scss";

/** Props for {@link RdsCompLineChart}. */
export interface RdsCompLineProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** Chart.js data (labels and datasets). Takes precedence over `labels` and `dataSets`. */
  data?: ChartData<"line">;
  /** @deprecated Use `data.labels` instead. */
  labels?: string[];
  /** Chart.js options (never mutated). */
  options: ChartOptions<"line">;
  /** @deprecated Use `data.datasets` instead. */
  dataSets?: ChartDataset<"line">[];
  /** Id of the canvas element. Note: legacy IDs `linechart1` and `linechart2` trigger specific canvas sizes. */
  id: string;
  /** Canvas height (number = px). */
  height?: string | number;
  /** Canvas width (number = px). */
  width?: string | number;
  /** Accessible label of the chart. Default "Line chart". */
  ariaLabel?: string;
  /** Optional visible summary; chart data is also exposed in a screen-reader table. */
  description?: string;
  /** @deprecated Use `ariaLabel` instead. */
  chartLabel?: string;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
  /** MUI system styles applied to the root element. */
  sx?: SxProps<Theme>;
}

/**
 * Applies legacy ID-based canvas sizing for backwards compatibility.
 * - `linechart1`: 65vh × 100vh
 * - `linechart2`: --rds-spacing-2xl (default 50px) square
 * - Other IDs: 76vh × 100%
 * @internal Kept for backwards compatibility; callers should migrate to explicit `height`/`width` props.
 */
const applyLineCanvasSizing = (chart: Chart, chartId: string) => {
  if (chartId === "linechart1") {
    chart.canvas.style.height = "65vh";
    chart.canvas.style.width = "100vh";
    return;
  }

  if (chartId === "linechart2") {
    const smallSize = getCSSVar("--rds-spacing-2xl");
    chart.canvas.style.height = smallSize;
    chart.canvas.style.width = smallSize;
    return;
  }

  chart.canvas.style.height = "76vh";
  chart.canvas.style.width = "100%";
};

const RdsCompLineChart = ({
  data,
  labels,
  options,
  dataSets,
  id,
  height,
  width,
  ariaLabel,
  description,
  chartLabel,
  className,
  ref,
  sx,
  ...rest
}: RdsCompLineProps) => {
  const accessibleAltId = useId();
  const resolved = resolveChartData("RdsCompLineChart", data, labels, dataSets);
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
      onCreate: (chart) => {
        applyLineCanvasSizing(chart, id);
        applyCanvasSize(chart.canvas, height, width);
      },
    },
    [resolved.labels, options, resolved.datasets, id, height, width]
  );

  return (
    <Box {...rest} ref={ref} className={clsx("rds-comp-chart-line", className)} sx={sx}>
      <canvas
        data-testid={id}
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={resolveChartLabel("RdsCompLineChart", ariaLabel, chartLabel, "Line chart")}
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

RdsCompLineChart.displayName = "RdsCompLineChart";
export default RdsCompLineChart;
