import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import {
  applyChartThemeColors,
  attachChartData,
  cloneChartOptions,
  useChartThemeMode,
} from "../chart-utils";
import "./rds-comp-chart-polar-area.scss";

export interface RdsCompPolarAreaChartProps {
  labels: any[];
  options: any;
  dataSets: any[];
  radius?: number;
  id: string;
  chartLabel?: string;
}

const RdsCompPolarAreaChart = ({
  labels,
  options,
  dataSets,
  radius,
  id,
  chartLabel,
}: RdsCompPolarAreaChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart<"polarArea", number[], unknown> | null>(null);
  const themeMode = useChartThemeMode();

  useEffect(() => {
    const canvasElm = canvasRef.current;
    if (!canvasElm) return;

    const ctx = canvasElm.getContext("2d") as CanvasRenderingContext2D;
    chartInstanceRef.current?.destroy();

    const chartOptions = cloneChartOptions(options);
    const chartData = { labels, datasets: dataSets };

    attachChartData(chartOptions, chartData);
    applyChartThemeColors(chartOptions, []);

    const polarCanvas = new Chart(ctx, {
      type: "polarArea",
      data: chartData,
      options: chartOptions,
    });

    polarCanvas.canvas.style.height = `${radius}px`;
    chartInstanceRef.current = polarCanvas;

    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, [labels, options, dataSets, radius, id, themeMode]);

  return (
    <div className="rds-comp-chart-polar-area-container">
      <canvas
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={chartLabel ?? "Polar area chart"}
      />
    </div>
  );
};

RdsCompPolarAreaChart.displayName = "RdsCompPolarAreaChart";
export default RdsCompPolarAreaChart;
