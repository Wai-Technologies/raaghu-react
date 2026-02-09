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
  const isDarkMode = () => {
    if (typeof window !== 'undefined') {
      return (
        document.body.classList.contains('theme-dark') ||
        document.body.classList.contains('dark-theme') ||
        document.documentElement.getAttribute('data-theme') === 'dark' ||
        document.body.getAttribute('data-theme') === 'dark'
      );
    }
    return false;
  };
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvasElm = canvasRef.current;
    if (!canvasElm) return;

    const ctx = canvasElm.getContext("2d") as CanvasRenderingContext2D;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const chartOptions = JSON.parse(JSON.stringify(props.options || {}));

    if (isDarkMode()) {
      if (!chartOptions.plugins) chartOptions.plugins = {};
      if (!chartOptions.plugins.legend) chartOptions.plugins.legend = {};
      if (!chartOptions.plugins.legend.labels) chartOptions.plugins.legend.labels = {};
      chartOptions.plugins.legend.labels.color = "#fff";
      if (!chartOptions.plugins.title) chartOptions.plugins.title = {};
      chartOptions.plugins.title.color = "#fff";
      if (chartOptions.plugins.tooltip) {
        chartOptions.plugins.tooltip.titleColor = "#fff";
        chartOptions.plugins.tooltip.bodyColor = "#fff";
        chartOptions.plugins.tooltip.labelColor = () => ({ borderColor: '#fff', backgroundColor: '#fff' });
      }
      if (!chartOptions.scales) chartOptions.scales = {};
      if (!chartOptions.scales.r) chartOptions.scales.r = {};
      if (!chartOptions.scales.r.pointLabels) chartOptions.scales.r.pointLabels = {};
      chartOptions.scales.r.pointLabels.color = "#fff";
    }
    const radarCanvas = new Chart(ctx, {
      type: "radar",
      data: {
        labels: props.labels,
        datasets: props.dataSets,
      },
      options: {
           ...chartOptions,
        plugins: {
          ...((chartOptions && chartOptions.plugins) || {}),
          legend: {
           ...(chartOptions && chartOptions.plugins && chartOptions.plugins.legend ? chartOptions.plugins.legend : {}),
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
               color: (isDarkMode() ? '#fff' : '#333333'),
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