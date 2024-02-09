import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./rds-chart-pie.css";

export interface RdsPieProps {
  labels: any[];
  options: any;
  dataSets: any[];
  height?: number;
  width?: number;
  id: string;
}

const RdsPieChart = (props: RdsPieProps) => {
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
      options: props.options,
    });

    if (pieCanvas != null) {
      pieCanvas.canvas.style.height = props.height + "px";
      pieCanvas.canvas.style.width = props.width + "px";
    }
  }, [props]);

  return (
    <div>
      <canvas id={props.id} ref={canvasRef} />
    </div>
  );
};

export default RdsPieChart;
