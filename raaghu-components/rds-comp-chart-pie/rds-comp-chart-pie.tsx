import { useEffect, useRef } from "react";
import Chart, { type ChartOptions, type ChartDataset } from "chart.js/auto";
import {
  applyChartThemeColors,
  attachChartData,
  cloneChartOptions,
  useChartThemeMode,
} from "../chart-utils";
import "./rds-comp-chart-pie.scss";

export interface RdsCompPieProps {
  labels: string[];
  options: ChartOptions<"pie">;
  dataSets: ChartDataset<"pie">[];
  radius: number;
  id: string;
  chartLabel?: string;
}

const RdsCompPieChart = ({
  labels,
  options,
  dataSets,
  radius,
  id,
  chartLabel,
}: RdsCompPieProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  const themeMode = useChartThemeMode();

  useEffect(() => {
    const canvasElm = canvasRef.current;
    if (!canvasElm) return;

    const ctx = canvasElm.getContext("2d");
    if (!ctx) return;
    chartRef.current?.destroy();
    Chart.getChart(canvasElm)?.destroy();

    const chartOptions = cloneChartOptions(options);
    const chartData = { labels, datasets: dataSets };

    attachChartData(chartOptions, chartData);
    applyChartThemeColors(chartOptions, []);

    chartRef.current = new Chart(ctx, {
      type: "pie",
      data: chartData,
      options: { ...chartOptions, radius },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [labels, options, dataSets, radius, id, themeMode]);

  return (
    <div className="rds-comp-chart-pie">
      <div className="chart-container">
        <canvas
          id={id}
          ref={canvasRef}
          role="img"
          aria-label={chartLabel ?? "Pie chart"}
        />
      </div>
    </div>
  );
};

RdsCompPieChart.displayName = "RdsCompPieChart";
export default RdsCompPieChart;
