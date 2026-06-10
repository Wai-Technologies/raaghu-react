import { useEffect, useRef } from "react";
import Chart, { type ChartOptions, type ChartDataset } from "chart.js/auto";
import {
  applyChartThemeColors,
  attachChartData,
  cloneChartOptions,
  useChartThemeMode,
} from "../chart-utils";
import "./rds-comp-chart-mixed.scss";

export interface RdsCompMixedChartProps {
  labels: string[];
  options: ChartOptions<"bar">;
  dataSets: ChartDataset[];
  id: string;
  chartLabel?: string;
}

const RdsCompMixedChart = ({
  labels,
  options,
  dataSets,
  id,
  chartLabel,
}: RdsCompMixedChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeMode = useChartThemeMode();

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const chartOptions = cloneChartOptions(options);
    const chartData = { labels, datasets: dataSets };

    attachChartData(chartOptions, chartData);
    applyChartThemeColors(chartOptions);

    const mixedCanvas = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: chartOptions,
    });

    return () => {
      mixedCanvas.destroy();
    };
  }, [labels, options, dataSets, id, themeMode]);

  return (
    <div className="rds-comp-chart-mixed">
      <canvas
        className="rds-chart-canvas"
        data-testid={id}
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={chartLabel ?? "Mixed chart"}
      />
    </div>
  );
};

RdsCompMixedChart.displayName = "RdsCompMixedChart";
export default RdsCompMixedChart;
