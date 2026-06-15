import { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import {
  applyChartThemeColors,
  attachChartData,
  cloneChartOptions,
  useChartThemeMode,
} from "../chart-utils";
import "./rds-comp-chart-scatter.scss";

export interface RdsCompScatterChartProps {
  labels: any[];
  options: ChartConfiguration["options"];
  dataSets: ChartConfiguration["data"]["datasets"];
  id: string;
  chartLabel?: string;
}

const RdsCompScatterChart = ({
  id,
  labels,
  options,
  dataSets,
  chartLabel,
}: RdsCompScatterChartProps) => {
  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeMode = useChartThemeMode();

  useEffect(() => {
    chartRef.current?.destroy();

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const chartOptions = cloneChartOptions(options);
    const chartData = { labels, datasets: dataSets };

    attachChartData(chartOptions, chartData);
    applyChartThemeColors(chartOptions);

    chartRef.current = new Chart(ctx, {
      type: "scatter",
      data: chartData,
      options: chartOptions,
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [id, labels, options, dataSets, themeMode]);

  return (
    <div className="rds-comp-chart-scatter">
      <canvas
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={chartLabel ?? "Scatter chart"}
      />
    </div>
  );
};

RdsCompScatterChart.displayName = "RdsCompScatterChart";
export default RdsCompScatterChart;
