import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ChartData, ChartOptions, ChartDataset } from "chart.js/auto";
import { applyCanvasSize, createCenterTextPlugin, resolveChartData, resolveChartLabel } from "../chart-utils";
import { useChart } from "../use-chart";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import "./rds-comp-chart-gauge.scss";

/** Props for {@link RdsCompGaugeChart}. */
export interface RdsCompGaugeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** Chart.js data (labels and datasets). Takes precedence over `labels` and `dataSets`. */
  data?: ChartData<"doughnut">;
  /** @deprecated Use `data.labels` instead. */
  labels?: string[];
  /** Chart.js options (never mutated). The gauge always uses `rotation: -90` and `circumference: 180`. */
  options: ChartOptions<"doughnut">;
  /** @deprecated Use `data.datasets` instead. */
  dataSets?: ChartDataset<"doughnut">[];
  /** Id of the canvas element. */
  id: string;
  /** Canvas height (number = px). */
  height?: string | number;
  /** Canvas width (number = px). */
  width?: string | number;
  /** Large text drawn in the gauge. */
  titleText?: string;
  /** Smaller text drawn under the title. */
  subtitle?: string;
  /** @deprecated Use `subtitle` instead. */
  subTitleText?: string;
  /**
   * @deprecated Prefer `data.datasets` / `dataSets`. When those are omitted, builds
   * `[value, maxValue - value]` (G3-040).
   */
  value?: number;
  /**
   * @deprecated Prefer `data.datasets` / `dataSets`. Used with `value` when datasets are omitted.
   */
  maxValue?: number;
  /** Accessible label of the chart. Default "Gauge chart". */
  ariaLabel?: string;
  /** @deprecated Use `ariaLabel` instead. */
  chartLabel?: string;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
  sx?: SxProps<Theme>;
}

const RdsCompGaugeChart = ({
  data,
  labels,
  options,
  dataSets,
  id,
  height,
  width,
  titleText = "",
  subtitle,
  subTitleText,
  value,
  maxValue,
  ariaLabel,
  chartLabel,
  className,
  ref,
  sx,
  ...rest
}: RdsCompGaugeProps) => {
  if (value !== undefined) warnDeprecatedProp("RdsCompGaugeChart", "value", "`dataSets`");
  if (maxValue !== undefined) warnDeprecatedProp("RdsCompGaugeChart", "maxValue", "`dataSets`");
  if (subTitleText !== undefined) warnDeprecatedProp("RdsCompGaugeChart", "subTitleText", "`subtitle`");
  const subTitle = subtitle ?? subTitleText ?? "";
  const resolved = resolveChartData("RdsCompGaugeChart", data, labels, dataSets);
  const hasExplicitDatasets = (data?.datasets?.length ?? 0) > 0 || (dataSets?.length ?? 0) > 0;
  const gaugeFromValue =
    !hasExplicitDatasets && value !== undefined && maxValue !== undefined && maxValue > 0
      ? ([
          {
            data: [value, Math.max(0, maxValue - value)],
            backgroundColor: ["var(--rds-success-main)", "var(--rds-neutral-200)"],
            borderWidth: 0,
          },
        ] as ChartDataset<"doughnut">[])
      : undefined;
  const chartLabels = resolved.labels ?? (gaugeFromValue ? (["Value", "Remainder"] as string[]) : undefined);
  const chartDatasets = gaugeFromValue ?? resolved.datasets;

  const { canvasRef } = useChart<"doughnut">(
    {
      type: "doughnut",
      labels: chartLabels,
      datasets: chartDatasets,
      options,
      themeAxes: [],
      plugins: [
        createCenterTextPlugin({
          id: "gaugeText",
          title: titleText,
          subTitle,
          titleY: ({ top, height }) => top + height / 1.5,
          subTitleY: ({ top, height }) => top + height / 1.2,
          subTitleSize: "md",
        }),
      ],
      overrides: (chartOptions) => ({
        rotation: -90,
        circumference: 180,
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          ...chartOptions?.plugins,
          legend: {
            display: chartOptions?.plugins?.legend?.display !== false,
            position: "top",
            ...chartOptions?.plugins?.legend,
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
              ...chartOptions?.plugins?.legend?.labels,
            },
          },
        },
      }),
      onCreate: (chart) => {
        applyCanvasSize(chart.canvas, height, width);
      },
    },
    [chartLabels, options, chartDatasets, titleText, subTitle, height, width]
  );

  return (
    <Box {...rest} ref={ref} className={clsx("rds-comp-chart-gauge", className)} sx={sx}>
      <canvas
        data-testid={id}
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={resolveChartLabel("RdsCompGaugeChart", ariaLabel, chartLabel, "Gauge chart")}
      />
    </Box>
  );
};

RdsCompGaugeChart.displayName = "RdsCompGaugeChart";
export default RdsCompGaugeChart;
