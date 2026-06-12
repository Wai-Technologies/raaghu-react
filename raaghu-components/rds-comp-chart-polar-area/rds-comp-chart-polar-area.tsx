import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import { applyChartThemeColors } from "../chart-utils";
import "./rds-comp-chart-polar-area.scss";

export interface RdsCompPolarAreaChartProps {
    labels: string[];
    options: ChartConfiguration['options'];
    dataSets: ChartConfiguration['data']['datasets'];
    radius?: number;
    id: string;
    chartLabel?: string;
}

const RdsCompPolarAreaChart = (props: RdsCompPolarAreaChartProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart<"polarArea", number[], unknown> | null>(null);
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
        const canvasElm = canvasRef.current;
        if (!canvasElm) return;

        const ctx = canvasElm.getContext("2d") as CanvasRenderingContext2D;
        chartInstanceRef.current?.destroy();

        const chartOptions = JSON.parse(JSON.stringify(props.options || {}));
        // Polar area uses 'r' axis — pass empty array; applyChartThemeColors handles plugins
        
        // Prepare chart data with datasets so applyChartThemeColors can resolve colors
        const chartData = { labels: props.labels, datasets: props.dataSets };
        if (!chartOptions.data) {
            chartOptions.data = chartData;
        }
        
        applyChartThemeColors(chartOptions, []);

        const PolarCanvas = new Chart(ctx, {
            type: "polarArea",
            data: chartData,
            options: chartOptions,
        });

        if (PolarCanvas != null) {
            PolarCanvas.canvas.style.height = props.radius + "px";
            chartInstanceRef.current = PolarCanvas;
        }
    }, [props, themeMode]);

    return (
        <div className="rds-comp-chart-polar-area-container">
            <canvas id={CanvasId} ref={canvasRef} role="img" aria-label={props.chartLabel ?? 'Polar area chart'} />
        </div>
    );
};
RdsCompPolarAreaChart.displayName = 'RdsCompPolarAreaChart';
export default RdsCompPolarAreaChart;
