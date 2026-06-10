import { useEffect, useRef } from "react";
import Chart, { type ChartOptions, type ChartDataset } from "chart.js/auto";
import {
  applyChartThemeColors,
  attachChartData,
  cloneChartOptions,
  useChartThemeMode,
} from "../chart-utils";
import "./rds-comp-chart-bar.scss";

export interface RdsCompBarChartProps {
  labels: string[];
  options: ChartOptions<"bar">;
  dataSets: ChartDataset<"bar">[];
  id: string;
  height?: string | number;
  chartLabel?: string;
}

const applyBarCanvasSizing = (
  chart: Chart,
  id: RdsCompBarChartProps["id"],
  height?: string | number
) => {
  if (height) {
    chart.canvas.style.height =
      typeof height === "number" ? `${height}px` : String(height);
    chart.canvas.style.width = "100%";
    return;
  }

  if (id === "barchart1") {
    chart.canvas.style.height = "var(--rds-comp-chart-bar-barchart1-height, 65vh)";
    chart.canvas.style.width = "100%";
    return;
  }

  if (id === "histogram") {
    chart.canvas.style.height = "var(--rds-comp-chart-bar-histogram-size, 50px)";
    chart.canvas.style.width = "var(--rds-comp-chart-bar-histogram-size, 50px)";
    return;
  }

  chart.canvas.style.height = "var(--rds-comp-chart-bar-default-height, 76vh)";
  chart.canvas.style.width = "100%";
};

const RdsCompBarChart = ({
  labels,
  options,
  dataSets,
  id,
  height,
  chartLabel,
}: RdsCompBarChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeMode = useChartThemeMode();

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const chartOptions = cloneChartOptions(options);
    const chartData = { labels, datasets: dataSets };

    attachChartData(chartOptions, chartData);
    applyChartThemeColors(chartOptions);

    const barCanvas = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: { ...chartOptions, responsive: true, maintainAspectRatio: false },
    });

    applyBarCanvasSizing(barCanvas, id, height);

    return () => {
      barCanvas.destroy();
    };
  }, [options, labels, dataSets, height, id, themeMode]);

  return (
    <div className="rds-comp-chart-bar">
      <canvas
        data-testid={id}
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={chartLabel ?? "Bar chart"}
      />
    </div>
  );
};

RdsCompBarChart.displayName = "RdsCompBarChart";
export default RdsCompBarChart;
