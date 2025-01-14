import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./rds-chart-radar.css";

export interface RdsRadarProps {
  labels: any[];
  options: any;
  dataSets: any[];
  id: string;
}

const RdsRadarChart = (props: RdsRadarProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvasElm = canvasRef.current;
    if (!canvasElm) return;

    const ctx = canvasElm.getContext("2d") as CanvasRenderingContext2D;

    // Destroy the existing chart if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const radarCanvas = new Chart(ctx, {
      type: "radar",
      data: {
        labels: props.labels,
        datasets: props.dataSets,
      },
      options: props.options,
    });

    if (radarCanvas != null) {
      radarCanvas.canvas.style.height = "250px";
      radarCanvas.canvas.style.width = "270px";
      chartInstanceRef.current = radarCanvas; // Store the chart instance
    }
  }, [props]);

  return (
    <div>
      <canvas id={props.id} ref={canvasRef} />
    </div>
  );
};

export default RdsRadarChart;
