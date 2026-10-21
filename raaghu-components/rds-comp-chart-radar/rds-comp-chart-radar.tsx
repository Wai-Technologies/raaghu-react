import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import type { ChartOptions, ChartDataset } from "chart.js/auto";
import { chartTextColor, getCSSVar } from "../chart-utils";
import { useChart } from "../use-chart";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import "./rds-comp-chart-radar.scss";

/** Props for {@link RdsCompRadarChart}. */
export interface RdsCompRadarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** Point labels around the chart. */
  labels: string[];
  /** Chart.js options (never mutated). */
  options: ChartOptions<"radar">;
  /** Chart.js radar datasets. */
  dataSets: ChartDataset<"radar">[];
  /** Id of the canvas element. */
  id: string;
  /** Accessible label of the chart. Default "Radar chart". */
  chartLabel?: string;
  /** Canvas height in px. */
  height?: number;
  /** @deprecated Use `height` instead (this is the canvas height in px). */
  radius?: number;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
}

/** Numeric value of a CSS variable (e.g. `"14px"` → 14), or `fallback`. */
const numericCSSVar = (varName: string, fallback: number) => {
  const parsed = parseInt(getCSSVar(varName).replace(/px$/, ""), 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const RdsCompRadarChart = ({
  labels,
  options,
  dataSets,
  id,
  chartLabel,
  height,
  radius,
  className,
  ref,
  ...rest
}: RdsCompRadarProps) => {
  if (radius !== undefined) warnDeprecatedProp("RdsCompRadarChart", "radius", "`height`");
  const canvasHeight = height ?? radius;

  const { canvasRef } = useChart<"radar">(
    {
      type: "radar",
      labels,
      datasets: dataSets,
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
                boxWidth: 8,
                boxHeight: 8,
                padding: 20,
                ...passedLabels,
                // ensure pointStyleWidth is not set (causes oval distortion)
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
            chart.canvas.style.height = `${canvasHeight}px`;
          } else {
            chart.canvas.style.height = "";
            chart.canvas.style.width = "";
          }
        }
      },
    },
    [labels, options, dataSets, canvasHeight, id]
  );

  return (
    <div
      {...rest}
      ref={ref}
      className={clsx("rds-comp-chart-radar-container", className)}
    >
      <canvas
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={chartLabel ?? "Radar chart"}
      />
    </div>
  );
};

RdsCompRadarChart.displayName = "RdsCompRadarChart";
export default RdsCompRadarChart;
