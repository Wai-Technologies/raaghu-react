import { useId, type HTMLAttributes, type Ref } from "react";
import clsx from "clsx";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ChartData, ChartOptions } from "chart.js/auto";
import { applyCanvasSize, resolveChartData, resolveChartLabel } from "../chart-utils";
import { ChartAccessibleAlternative, chartAccessibleDescribedBy } from "../chart-accessible-alternative";
import { useChart } from "../use-chart";
import "./rds-comp-chart-stacked.scss";

/** Props for {@link RdsCompStackedChart}. */
export interface RdsCompStackedProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** Chart.js data (labels and datasets). Takes precedence over `labels` and `dataSets`. */
  data?: ChartData<"bar">;
  /** @deprecated Use `data.labels` instead. */
  labels?: ChartData<"bar">["labels"];
  /** Chart.js bar options (never mutated). Axes default to `stacked: true`; pass `false` to opt out. */
  options: ChartOptions<"bar">;
  /** @deprecated Use `data.datasets` instead. */
  dataSets?: ChartData<"bar">["datasets"];
  /** Id of the canvas element. */
  id: string;
  /** Canvas height (number = px). */
  height?: string | number;
  /** Canvas width (number = px). */
  width?: string | number;
  /** Accessible label of the chart. Default "Stacked chart". */
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

const RdsCompStackedChart = ({
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
}: RdsCompStackedProps) => {
  const accessibleAltId = useId();
  const resolved = resolveChartData("RdsCompStackedChart", data, labels, dataSets);
  const describedBy = chartAccessibleDescribedBy(
    accessibleAltId,
    description,
    resolved.labels,
    resolved.datasets,
  );
  const { canvasRef } = useChart<"bar">(
    {
      type: "bar",
      labels: resolved.labels,
      datasets: resolved.datasets,
      options,
      overrides: (chartOptions) => ({
        maintainAspectRatio: false,
        scales: {
          ...(chartOptions?.scales || {}),
          x: {
            stacked: true,
            ...(chartOptions?.scales?.x || {}),
            offset: true,
            ticks: {
              ...(chartOptions?.scales?.x?.ticks || {}),
              padding: 20,
              align: "center",
            },
          },
          y: {
            stacked: true,
            ...(chartOptions?.scales?.y || {}),
          },
        },
      }),
      onCreate: (chart) => applyCanvasSize(chart.canvas, height, width),
    },
    [resolved.labels, resolved.datasets, options, height, width]
  );

  return (
    <Box
      {...rest}
      ref={ref}
      className={clsx("rds-comp-chart-stacked", "stack-chart-container", className)}
      sx={sx}
    >
      <canvas
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={resolveChartLabel("RdsCompStackedChart", ariaLabel, chartLabel, "Stacked chart")}
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

RdsCompStackedChart.displayName = "RdsCompStackedChart";
export default RdsCompStackedChart;
