import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { applyChartThemeColors } from "../chart-utils";
import "./rds-comp-chart-pie.scss";

export interface RdsCompPieProps {
  labels: any[];
  options: any;
  dataSets: any[];
  radius: number;
  id: string;
}

const RdsCompPieChart = (props: RdsCompPieProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasElm = canvasRef.current;
    if (!canvasElm) return;

    const ctx = canvasElm.getContext("2d") as CanvasRenderingContext2D;
    Chart.getChart(canvasElm)?.destroy();

    const chartOptions = JSON.parse(JSON.stringify(props.options || {}));
    // No axes for pie charts — pass empty array
    applyChartThemeColors(chartOptions, []);

    new Chart(ctx, {
      type: "pie",
      data: { labels: props.labels, datasets: props.dataSets },
      options: { ...chartOptions, radius: props.radius },
    });
  }, [props]);

  return (
    <div className="rds-comp-chart-pie">
      <div className="chart-container">
        <canvas id={props.id} ref={canvasRef} />
      </div>
    </div>
  );
};
RdsCompPieChart.displayName = 'RdsCompPieChart';
export default RdsCompPieChart;
