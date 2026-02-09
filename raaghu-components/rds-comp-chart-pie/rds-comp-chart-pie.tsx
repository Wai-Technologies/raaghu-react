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

  useEffect(() => {
    const canvasElm = canvasRef.current;
    if (!canvasElm) return;

    const ctx = canvasElm.getContext("2d") as CanvasRenderingContext2D;

    Chart.getChart(canvasElm)?.destroy();
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
    }


    const pieCanvas = new Chart(ctx, {
      type: "pie",
      data: {
        labels: props.labels,
        datasets: props.dataSets,
      },
      options: {
        ...chartOptions,
        radius: props.radius, 
      },
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