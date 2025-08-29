import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./rds-comp-chart-radar.scss";

export interface RdsCompRadarProps {
  labels: any[];
  options: any;
  dataSets: any[];
  id: string;
}

const RdsCompRadarChart = (props: RdsCompRadarProps) => {
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
      options: {
        ...props.options,
        plugins: {
          ...((props.options && props.options.plugins) || {}),
          legend: {
            ...(props.options && props.options.plugins && props.options.plugins.legend ? props.options.plugins.legend : {}),
            position: 'top',
            align: 'start',
            labels: {
              boxWidth: 8,
              boxHeight: 8,
              pointStyleWidth: 8,
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle',
              font: {
                size: 12,
                weight: '500',
                family: 'inherit',
              },
              color: '#333333',
            },
          },
        },
      },
    });

    if (radarCanvas != null) {
      radarCanvas.canvas.style.height = "350px";
      radarCanvas.canvas.style.width = "450px";
      chartInstanceRef.current = radarCanvas; 
    }
  }, [props]);

  return (
    <div className="rds-comp-chart-radar-container">
      <canvas id={props.id} ref={canvasRef} />
    </div>
  );
};
RdsCompRadarChart.displayName = 'RdsCompRadarChart';
export default RdsCompRadarChart;