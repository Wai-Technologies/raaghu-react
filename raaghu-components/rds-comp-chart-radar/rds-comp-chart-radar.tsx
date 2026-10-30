import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ChartData, ChartOptions, ChartDataset } from "chart.js/auto";
import {
  applyCanvasSize,
  chartTextColor,
  getCSSVar,
  resolveChartData,
  resolveChartLabel,
} from "../chart-utils";
import { useChart } from "../use-chart";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import "./rds-comp-chart-radar.scss";

/** Props for {@link RdsCompRadarChart}. */
export interface RdsCompRadarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** Chart.js data (labels and datasets). Takes precedence over `labels` and `dataSets`. */
  data?: ChartData<"radar">;
  /** @deprecated Use `data.labels` instead. */
  labels?: string[];
  /**
   * Chart.js options (never mutated).
   * Note: The legend's `pointStyleWidth` is set to `undefined` to prevent oval-shaped legend markers.
   * This ensures consistent circular markers regardless of `boxWidth` and `boxHeight` settings.
   */
  options: ChartOptions<"radar">;
  /** @deprecated Use `data.datasets` instead. */
  dataSets?: ChartDataset<"radar">[];
  /** Id of the canvas element. */
  id: string;
  /** Accessible label of the chart. Default "Radar chart". */
  ariaLabel?: string;
  /** @deprecated Use `ariaLabel` instead. */
  chartLabel?: string;
  /** Canvas height (number = px). */
  height?: string | number;
  /** Canvas width (number = px). */
  width?: string | number;
  /** @deprecated Use `height` instead (this is the canvas height in px). */
  radius?: number;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
  /** MUI system styles applied to the root element. */
  sx?: SxProps<Theme>;
}

/** Numeric value of a CSS variable (e.g. `"14px"` → 14), or `fallback`. */
const numericCSSVar = (varName: string, fallback: number) => {
  const parsed = parseInt(getCSSVar(varName).replace(/px$/, ""), 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const RdsCompRadarChart = ({
  data,
  labels,
  options,
  dataSets,
  id,
  ariaLabel,
  chartLabel,
  height,
  width,
  radius,
  className,
  ref,
  sx,
  ...rest
}: RdsCompRadarProps) => {
  if (radius !== undefined) warnDeprecatedProp("RdsCompRadarChart", "radius", "`height`");
  const canvasHeight = height ?? radius;
  const resolved = resolveChartData("RdsCompRadarChart", data, labels, dataSets, false);

  const { canvasRef } = useChart<"radar">(
    {
      type: "radar",
      labels: resolved.labels,
      datasets: resolved.datasets,
      options,
      themeAxes: ["r"],
      overrides: (chartOptions) => {
        if (!chartOptions.scales) chartOptions.scales = {};
        if (!chartOptions.scales.r) chartOptions.scales.r = {};
        if (!chartOptions.scales.r.pointLabels) chartOptions.scales.r.pointLabels = {};
        chartOptions.scales.r.pointLabels.color = chartTextColor();

        const textColor = chartTextColor();

        const passedLegend = chartOptions?.plugins?.legend || {};
        const passedLabels = passedLegend.labels || {};

        return {
          scales: chartOptions.scales,
          plugins: {
            ...((chartOptions && chartOptions.plugins) || {}),
            legend: {
              position: "top",
              align: "start",
              ...passedLegend,
              labels: {
                usePointStyle: true,
                pointStyle: "circle",
                boxWidth: numericCSSVar("--rds-size-sm", 8),
                boxHeight: numericCSSVar("--rds-size-sm", 8),
                padding: numericCSSVar("--rds-size-20", 20),
                ...passedLabels,
                pointStyleWidth: undefined,
                font: {
                  size: numericCSSVar("--rds-font-size-md", 12),
                  weight: numericCSSVar("--rds-font-weight-medium", 500),
                  family: "inherit",
                  ...(typeof passedLabels.font === "object" && passedLabels.font !== null
                    ? passedLabels.font
                    : {}),
                },
                color: textColor,
              },
            },
          },
        };
      },
      onCreate: (chart) => {
        if (chart?.canvas) {
          if (canvasHeight) {
            applyCanvasSize(chart.canvas, canvasHeight);
          } else {
            chart.canvas.style.height = "";
            chart.canvas.style.width = "";
          }
          applyCanvasSize(chart.canvas, undefined, width);
        }
      },
    },
    [resolved.labels, options, resolved.datasets, canvasHeight, width, id]
  );

  return (
    <Box
      {...rest}
      ref={ref}
      className={clsx("rds-comp-chart-radar-container", className)}
      sx={sx}
    >
      <canvas
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={resolveChartLabel("RdsCompRadarChart", ariaLabel, chartLabel, "Radar chart")}
      />
    </Box>
  );
};

RdsCompRadarChart.displayName = "RdsCompRadarChart";
export default RdsCompRadarChart;
