import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import { applyChartThemeColors, chartTextColor } from "../chart-utils";
import "./rds-comp-chart-radar.scss";

export interface RdsCompRadarProps {
  labels: string[];
  options: ChartConfiguration['options'];
  dataSets: ChartConfiguration['data']['datasets'];
  id: string;
  chartLabel?: string;
  radius?: number;
}

const RdsCompRadarChart = (props: RdsCompRadarProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

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
    chartInstanceRef.current?.destroy();

    const chartOptions = JSON.parse(JSON.stringify(props.options || {}));
    // Apply theme colors to plugins; radar uses 'r' axis for point labels
    applyChartThemeColors(chartOptions, ['r']);

    // Ensure r-axis point labels also pick up the theme color
    if (!chartOptions.scales)                          chartOptions.scales = {};
    if (!chartOptions.scales.r)                        chartOptions.scales.r = {};
    if (!chartOptions.scales.r.pointLabels)            chartOptions.scales.r.pointLabels = {};
    chartOptions.scales.r.pointLabels.color = chartTextColor();
    
    // Prepare chart data with datasets so applyChartThemeColors can resolve colors
    const chartData = { labels: props.labels, datasets: props.dataSets };
    if (!chartOptions.data) {
        chartOptions.data = chartData;
    }

    const textColor = chartTextColor();

    const getFontSizeFromVar = (varName: string, fallback = 12) => {
      try {
        const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
        if (!v) return fallback;
        const n = parseInt(v.replace(/px$/, ""), 10);
        return Number.isNaN(n) ? fallback : n;
      } catch (e) {
        return fallback;
      }
    };

    const getFontWeightFromVar = (varName: string, fallback: number | string = '500') => {
      try {
        const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
        return v || fallback;
      } catch (e) {
        return fallback;
      }
    };

    const radarCanvas = new Chart(ctx, {
      type: "radar",
      data: { labels: props.labels, datasets: props.dataSets },
      options: {
        ...chartOptions,
        plugins: {
          ...((chartOptions && chartOptions.plugins) || {}),
          legend: {
            ...(chartOptions?.plugins?.legend || {}),
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
                size: getFontSizeFromVar('--rds-font-size-md', 12),
                weight: getFontWeightFromVar('--rds-font-weight-medium', '500'),
                family: 'inherit',
              },
              // Read from CSS var at render time — no hardcoded color
              color: textColor,
            },
          },
        },
      },
    });

    if (radarCanvas != null) {
      // Prefer explicit sizes via props.radius; fall back to CSS-controlled sizing
      if (props && props.radius) {
        radarCanvas.canvas.style.height = props.radius + "px";
      } else {
        // leave sizing to CSS/parent container for responsiveness
        radarCanvas.canvas.style.height = '';
        radarCanvas.canvas.style.width = '';
      }
      chartInstanceRef.current = radarCanvas;
    }
  }, [props, themeMode]);

  return (
    <div className="rds-comp-chart-radar-container">
      <canvas id={props.id} ref={canvasRef} role="img" aria-label={props.chartLabel ?? 'Radar chart'} />
    </div>
  );
};
RdsCompRadarChart.displayName = 'RdsCompRadarChart';
export default RdsCompRadarChart;
