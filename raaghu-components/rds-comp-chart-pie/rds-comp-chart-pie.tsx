import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import { applyChartThemeColors, cloneChartOptions } from "../chart-utils";
import Box from "@mui/material/Box";
import { joinClassNames, type RdsStylingProps } from "../../raaghu-elements/shared/utils/styling-props";
import "./rds-comp-chart-pie.scss";

export interface RdsCompPieProps extends RdsStylingProps {
  labels: string[];
  options: ChartConfiguration['options'];
  dataSets: ChartConfiguration['data']['datasets'];
  radius: number;
  id: string;
  chartLabel?: string;
}

const RdsCompPieChart = React.forwardRef<HTMLDivElement, RdsCompPieProps>(function RdsCompPieChart(props, ref) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [themeMode, setThemeMode] = React.useState(() => {
    if (typeof document !== 'undefined') {
        return document.documentElement.dataset.theme || 'light';
    }
    return 'light';
  });

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const observer = new MutationObserver(() => {
        setThemeMode(document.documentElement.dataset.theme || 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvasElm = canvasRef.current;
    if (!canvasElm) return;

    const ctx = canvasElm.getContext("2d") as CanvasRenderingContext2D;
    Chart.getChart(canvasElm)?.destroy();

    const chartOptions = cloneChartOptions(props.options || {}) as any;
    
    const chartData = { labels: props.labels, datasets: props.dataSets };
    if (!chartOptions.data) {
        chartOptions.data = chartData;
    }
    
    applyChartThemeColors(chartOptions, []);

    const pieChart = new Chart(ctx, {
      type: "pie",
      data: chartData,
      options: props.radius !== undefined ? { ...chartOptions, radius: props.radius } : chartOptions,
    });

    return () => { pieChart.destroy(); };
  }, [props.labels, props.options, props.dataSets, props.radius, themeMode]);

  return (
    <Box ref={ref} className={joinClassNames("rds-comp-chart-pie", props.className)} sx={props.sx} style={props.style}>
      <div className="chart-container">
        <canvas id={props.id} ref={canvasRef} role="img" aria-label={props.chartLabel ?? 'Pie chart'} />
      </div>
    </Box>
  );
});
RdsCompPieChart.displayName = 'RdsCompPieChart';
export default RdsCompPieChart;
