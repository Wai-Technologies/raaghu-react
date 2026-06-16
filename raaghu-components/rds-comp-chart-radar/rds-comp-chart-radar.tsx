import { useEffect, useRef } from "react";
import Chart, { type ChartOptions, type ChartDataset } from "chart.js/auto";
import {
  applyChartThemeColors,
  attachChartData,
  chartTextColor,
  cloneChartOptions,
  useChartThemeMode,
} from "../chart-utils";
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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const themeMode = useChartThemeMode();

  useEffect(() => {
    const canvasElm = canvasRef.current;
    if (!canvasElm) return;

    const ctx = canvasElm.getContext("2d") as CanvasRenderingContext2D;
    chartInstanceRef.current?.destroy();

    const chartOptions = cloneChartOptions(options);
    applyChartThemeColors(chartOptions, ["r"]);

    if (!chartOptions.scales) chartOptions.scales = {};
    if (!chartOptions.scales.r) chartOptions.scales.r = {};
    if (!chartOptions.scales.r.pointLabels) chartOptions.scales.r.pointLabels = {};
    chartOptions.scales.r.pointLabels.color = chartTextColor();

    const chartData = { labels, datasets: dataSets };
    attachChartData(chartOptions, chartData);

    const textColor = chartTextColor();

    const radarCanvas = new Chart(ctx, {
      type: "radar",
      data: chartData,
      options: {
        ...chartOptions,
        plugins: {
          ...((chartOptions && chartOptions.plugins) || {}),
          legend: {
            ...(chartOptions?.plugins?.legend || {}),
            position: "top",
            align: "start",
            labels: {
              boxWidth: 8,
              boxHeight: 8,
              pointStyleWidth: 8,
              padding: 20,
              usePointStyle: true,
              pointStyle: "circle",
              font: {
                size: getFontSizeFromVar("--rds-font-size-md", 12),
                weight: getFontWeightFromVar("--rds-font-weight-medium", "500"),
                family: "inherit",
              },
              color: textColor,
            },
          },
        },
      },
    });

    if (radarCanvas?.canvas) {
      if (radius) {
        radarCanvas.canvas.style.height = `${radius}px`;
      } else {
        radarCanvas.canvas.style.height = "";
        radarCanvas.canvas.style.width = "";
      }
    }

    chartInstanceRef.current = radarCanvas;

    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, [labels, options, dataSets, radius, id, themeMode]);

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
