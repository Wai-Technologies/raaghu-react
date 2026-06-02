import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { isDarkMode, applyChartThemeColors } from "../chart-utils";
import "./rds-comp-chart-bar.scss";

export interface RdsCompBarChartProps {
    labels: any[];
    options: any;
    dataSets: any[];
    id: any;
    height?: string | number;
    chartLabel?: string;
}

const RdsCompBarChart = (props: RdsCompBarChartProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const CanvasId = props.id;

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
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        const chartOptions = JSON.parse(JSON.stringify(props.options || {}));
        
        // Prepare chart data with datasets so applyChartThemeColors can resolve colors
        const chartData = { labels: props.labels, datasets: props.dataSets };
        if (!chartOptions.data) {
            chartOptions.data = chartData;
        }
        
        applyChartThemeColors(chartOptions);

        const barCanvas = new Chart(ctx, {
            type: "bar",
            data: chartData,
            options: { ...chartOptions, responsive: true, maintainAspectRatio: false },
        });

        if (barCanvas !== null) {
            if (props.height) {
                barCanvas.canvas.style.height = typeof props.height === "number" ? `${props.height}px` : String(props.height);
                barCanvas.canvas.style.width = "100%";
            } else if (props.id === "barchart1") {
                barCanvas.canvas.style.height = "var(--rds-comp-chart-bar-barchart1-height, 65vh)";
                barCanvas.canvas.style.width = "100%";
            } else if (props.id === "histogram") {
                barCanvas.canvas.style.height = "var(--rds-comp-chart-bar-histogram-size, 50px)";
                barCanvas.canvas.style.width = "var(--rds-comp-chart-bar-histogram-size, 50px)";
            } else {
                barCanvas.canvas.style.height = "var(--rds-comp-chart-bar-default-height, 76vh)";
                barCanvas.canvas.style.width = "100%";
            }
        }

        return () => { barCanvas.destroy(); };
    }, [props.options, props.labels, props.dataSets, props.height, props.id, themeMode]);

    return (
        <div className="rds-comp-chart-bar">
            <canvas data-testid={CanvasId} id={CanvasId} ref={canvasRef} role="img" aria-label={props.chartLabel ?? 'Bar chart'} />
        </div>
    );
};
RdsCompBarChart.displayName = 'RdsCompBarChart';
export default RdsCompBarChart;
