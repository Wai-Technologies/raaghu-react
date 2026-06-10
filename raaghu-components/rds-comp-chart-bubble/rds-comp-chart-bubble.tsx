import { useEffect, useRef } from "react";
import Chart, { type ChartOptions, type ChartDataset } from "chart.js/auto";
import {
  applyChartThemeColors,
  attachChartData,
  cloneChartOptions,
  useChartThemeMode,
} from "../chart-utils";
import "./rds-comp-chart-bubble.scss";

export interface RdsCompBubbleChartProps {
  id: string;
  labels: string[];
  options: ChartOptions<"bubble">;
  dataSets: ChartDataset<"bubble">[];
  chartLabel?: string;
}

const RdsCompBubbleChart = ({
  id,
  labels,
  options,
  dataSets,
  chartLabel,
}: RdsCompBubbleChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeMode = useChartThemeMode();

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const chartOptions = cloneChartOptions(options);
    const chartData = { labels, datasets: dataSets };

    attachChartData(chartOptions, chartData);
    applyChartThemeColors(chartOptions);

    const bubbleCanvas = new Chart(ctx, {
      type: "bubble",
      data: chartData,
      options: chartOptions,
    });

    return () => {
      bubbleCanvas.destroy();
    };
  }, [id, labels, options, dataSets, themeMode]);

  return (
    <div>
      <canvas
        data-testid={id}
        id={id}
        ref={canvasRef}
        width={300}
        height={300}
        role="img"
        aria-label={chartLabel ?? "Bubble chart"}
      />
    </div>
  );
};

RdsCompBubbleChart.displayName = "RdsCompBubbleChart";
export default RdsCompBubbleChart;
