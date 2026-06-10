import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import {
  applyChartThemeColors,
  attachChartData,
  cloneChartOptions,
  getCSSVar,
  useChartThemeMode,
} from "../chart-utils";
import "./rds-comp-chart-line.scss";

export interface RdsCompLineProps {
  labels: any[];
  options: any;
  dataSets: any[];
  id: string;
  chartLabel?: string;
}

const applyLineCanvasSizing = (chart: Chart, chartId: string) => {
  if (chartId === "linechart1") {
    chart.canvas.style.height = "65vh";
    chart.canvas.style.width = "100vh";
    return;
  }

  if (chartId === "linechart2") {
    const smallSize = getCSSVar("--rds-spacing-2xl", "50px");
    chart.canvas.style.height = smallSize;
    chart.canvas.style.width = smallSize;
    return;
  }

  chart.canvas.style.height = "76vh";
  chart.canvas.style.width = "100vh";
};

const RdsCompLineChart = ({
  labels,
  options,
  dataSets,
  id,
  chartLabel,
}: RdsCompLineProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeMode = useChartThemeMode();

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const chartOptions = cloneChartOptions(options);
    const chartData = { labels, datasets: dataSets };

    attachChartData(chartOptions, chartData);
    applyChartThemeColors(chartOptions);

    const lineCanvas = new Chart(ctx, {
      type: "line",
      data: chartData,
      options: chartOptions,
    });

    applyLineCanvasSizing(lineCanvas, id);

    return () => {
      lineCanvas.destroy();
    };
  }, [labels, options, dataSets, id, themeMode]);

  return (
    <div className="rds-comp-chart-line">
      <canvas
        data-testid={id}
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={chartLabel ?? "Line chart"}
      />
    </div>
  );
};

RdsCompLineChart.displayName = "RdsCompLineChart";
export default RdsCompLineChart;
