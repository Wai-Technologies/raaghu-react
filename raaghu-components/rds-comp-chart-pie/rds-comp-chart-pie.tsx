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

  const [themeMode, setThemeMode] = React.useState(() => {
    if (typeof document !== 'undefined') {
        return document.documentElement.getAttribute('data-theme') || 'light';
    }
    return 'light';
  });

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const observer = new MutationObserver(() => {
        setThemeMode(document.documentElement.getAttribute('data-theme') || 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvasElm = canvasRef.current;
    if (!canvasElm) return;

    const ctx = canvasElm.getContext("2d") as CanvasRenderingContext2D;
    Chart.getChart(canvasElm)?.destroy();

    const chartOptions = JSON.parse(JSON.stringify(props.options || {}));
    
    // Prepare chart data with datasets so applyChartThemeColors can resolve colors
    const chartData = { labels: props.labels, datasets: props.dataSets };
    if (!chartOptions.data) {
        chartOptions.data = chartData;
    }
    
    // No axes for pie charts — pass empty array
    applyChartThemeColors(chartOptions, []);

    new Chart(ctx, {
      type: "pie",
      data: chartData,
      options: { ...chartOptions, radius: props.radius },
    });
  }, [props, themeMode]);

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
