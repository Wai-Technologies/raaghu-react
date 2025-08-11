import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
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

    // Destroy the existing chart if it exists
    Chart.getChart(canvasElm)?.destroy();

    const pieCanvas = new Chart(ctx, {
      type: "pie",
      data: {
        labels: props.labels,
        datasets: props.dataSets,
      },
      options: {
        ...props.options,
        radius: props.radius, 
      },
    });

  }, [props]);

  return (
    <div className="chart-container">
      <canvas id={props.id} ref={canvasRef} />
    </div>
  );
};

export default RdsCompPieChart;