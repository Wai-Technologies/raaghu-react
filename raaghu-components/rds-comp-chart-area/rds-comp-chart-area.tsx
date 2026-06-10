import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import {
  applyChartThemeColors,
  attachChartData,
  cloneChartOptions,
  useChartThemeMode,
} from "../chart-utils";
import "./rds-comp-chart-area.scss";

export interface lineprops {
  labels: any[];
  options: any;
  dataSets: any[];
  id: string;
  isGradient: boolean;
  chartLabel?: string;
}

const RdsCompAreaChart = ({
  labels,
  options,
  dataSets,
  id,
  isGradient,
  chartLabel,
}: lineprops) => {
  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeMode = useChartThemeMode();

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    chartRef.current?.destroy();

    const chartOptions = cloneChartOptions(options);
    const chartData = {
      labels,
      datasets: dataSets.map((dataset) =>
        isGradient ? { ...dataset, backgroundColor: dataset.backgroundColor } : dataset
      ),
    };

    attachChartData(chartOptions, chartData);
    applyChartThemeColors(chartOptions);

    const areaCanvas = new Chart(ctx, {
      type: "line",
      data: chartData,
      options: chartOptions,
    });

    chartRef.current = areaCanvas;
    areaCanvas.canvas.style.height = "76vh";
    areaCanvas.canvas.style.width = "100vh";

    return () => {
      chartRef.current?.destroy();
    };
  }, [labels, dataSets, options, isGradient, themeMode]);

  return (
    <div className="rds-comp-chart-area">
      <canvas
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={chartLabel ?? "Area chart"}
      />
    </div>
  );
};

RdsCompAreaChart.displayName = "RdsCompAreaChart";
export default RdsCompAreaChart;
