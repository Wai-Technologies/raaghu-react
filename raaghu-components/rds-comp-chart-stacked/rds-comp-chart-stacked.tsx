import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import {
  applyChartThemeColors,
  attachChartData,
  cloneChartOptions,
  useChartThemeMode,
} from "../chart-utils";
import "./rds-comp-chart-stacked.scss";

export interface RdsCompStackedProps {
  labels: any[];
  options: any;
  dataSets: any[];
  id: string;
  chartLabel?: string;
}

const RdsCompStackedChart = ({
  labels,
  options,
  dataSets,
  id,
  chartLabel,
}: RdsCompStackedProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  const themeMode = useChartThemeMode();

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    chartRef.current?.destroy();

    const chartOptions = cloneChartOptions(options);
    const chartData = { labels, datasets: dataSets };

    attachChartData(chartOptions, chartData);
    applyChartThemeColors(chartOptions);

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        ...chartOptions,
        maintainAspectRatio: false,
        scales: {
          ...(chartOptions?.scales || {}),
          x: {
            ...(chartOptions?.scales?.x || {}),
            offset: true,
            categoryPercentage: 0.1,
            barPercentage: 0.1,
            ticks: {
              ...(chartOptions?.scales?.x?.ticks || {}),
              padding: 20,
              align: "center",
            },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [labels, dataSets, options, themeMode]);

  return (
    <div className="stack-chart-container">
      <canvas
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={chartLabel ?? "Stacked chart"}
      />
    </div>
  );
};

RdsCompStackedChart.displayName = "RdsCompStackedChart";
export default RdsCompStackedChart;
