import { useId, type HTMLAttributes, type Ref } from "react";
import clsx from "clsx";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ChartOptions, ChartDataset, ChartData } from "chart.js";
import { registerMixedChart } from "../chart-js-register";

registerMixedChart();
import { applyCanvasSize, resolveChartData, resolveChartLabel } from "../chart-utils";
import { ChartAccessibleAlternative, chartAccessibleDescribedBy } from "../chart-accessible-alternative";
import { useChart } from "../use-chart";
import "./rds-comp-chart-mixed.scss";

/** Props for {@link RdsCompMixedChart}. */
export interface RdsCompMixedChartProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** Chart.js data (labels and datasets). Takes precedence over `labels` and `dataSets`. Set `type: "line"` on a dataset to draw it as a line over the bars. */
  data?: ChartData;
  /** @deprecated Use `data.labels` instead. */
  labels?: string[];
  /** Chart.js options (never mutated). */
  options: ChartOptions<"bar">;
  /** @deprecated Use `data.datasets` instead. Set `type: "line"` on a dataset to draw it as a line over the bars. */
  dataSets?: ChartDataset[];
  /** Id of the canvas element. */
  id: string;
  /** Canvas height (number = px). */
  height?: string | number;
  /** Canvas width (number = px). */
  width?: string | number;
  /** Accessible label of the chart. Default "Mixed chart". */
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

const RdsCompMixedChart = ({
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
}: RdsCompMixedChartProps) => {
  const accessibleAltId = useId();
  const resolved = resolveChartData("RdsCompMixedChart", data, labels, dataSets);
  const describedBy = chartAccessibleDescribedBy(
    accessibleAltId,
    description,
    resolved.labels,
    resolved.datasets,
  );
  const { canvasRef } = useChart(
    {
      type: "bar",
      labels: resolved.labels,
      datasets: resolved.datasets as ChartData<"bar">["datasets"],
      options,
      onCreate: (chart) => applyCanvasSize(chart.canvas, height, width),
    },
    [resolved.labels, options, resolved.datasets, id, height, width]
  );

  return (
    <Box {...rest} ref={ref} className={clsx("rds-comp-chart-mixed", className)} sx={sx}>
      <canvas
        className="rds-chart-canvas"
        data-testid={id}
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={resolveChartLabel("RdsCompMixedChart", ariaLabel, chartLabel, "Mixed chart")}
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

RdsCompMixedChart.displayName = "RdsCompMixedChart";
export default RdsCompMixedChart;
