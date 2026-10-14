import { type ChartOptions, type ChartDataset } from "chart.js/auto";
import {
  chartTextColor,
} from "../chart-utils";
import { useChart } from "../use-chart";
import "./rds-comp-chart-radar.scss";

export interface RdsCompRadarProps {
  labels: string[];
  options: ChartOptions<"radar">;
  dataSets: ChartDataset<"radar">[];
  id: string;
  chartLabel?: string;
  radius?: number;
}

const getFontSizeFromVar = (varName: string, fallback = 12) => {
  try {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
    if (!value) return fallback;
    const parsed = parseInt(value.replace(/px$/, ""), 10);
    return Number.isNaN(parsed) ? fallback : parsed;
  } catch {
    return fallback;
  }
};

const getFontWeightFromVar = (varName: string, fallback: number | string = "500") => {
  try {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
    return value || fallback;
  } catch {
    return fallback;
  }
};

const RdsCompRadarChart = ({
  labels,
  options,
  dataSets,
  id,
  chartLabel,
  radius,
}: RdsCompRadarProps) => {
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
                  size: getFontSizeFromVar("--rds-font-size-md", 12),
                  weight: getFontWeightFromVar("--rds-font-weight-medium", "500") as any,
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
          if (radius) {
            chart.canvas.style.height = `${radius}px`;
          } else {
            chart.canvas.style.height = "";
            chart.canvas.style.width = "";
          }
        }
      },
    },
    [labels, options, dataSets, radius, id]
  );

  return (
    <div className="rds-comp-chart-radar-container">
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
