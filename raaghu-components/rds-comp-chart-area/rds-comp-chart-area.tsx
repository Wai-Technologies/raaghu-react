import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import { applyChartThemeColors } from "../chart-utils";
import "./rds-comp-chart-area.scss";

export interface lineprops {
    labels: string[];
    options: ChartConfiguration['options'];
    dataSets: ChartConfiguration['data']['datasets'];
    id: string;
    isGradient: boolean;
    chartLabel?: string;
}

const RdsCompAreaChart = (props: lineprops) => {
    const chartRef = useRef<Chart | null>(null);
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
        const ctx = canvasRef.current?.getContext("2d") as CanvasRenderingContext2D;
        chartRef.current?.destroy();

        const chartOptions = JSON.parse(JSON.stringify(props.options || {}));
        
        // Prepare chart data with datasets so applyChartThemeColors can resolve colors
        const chartData = {
            labels: props.labels,
            datasets: props.dataSets.map(dataset =>
                props.isGradient ? { ...dataset, backgroundColor: dataset.backgroundColor } : dataset
            ),
        };
        if (!chartOptions.data) {
            chartOptions.data = chartData;
        }
        
        applyChartThemeColors(chartOptions);

        const AreaCanvas = new Chart(ctx, {
            type: "line",
            data: chartData,
            options: chartOptions,
        });

        chartRef.current = AreaCanvas;
        AreaCanvas.canvas.style.height = "76vh";
        AreaCanvas.canvas.style.width = "100vh";

        return () => { chartRef.current?.destroy(); };
    }, [props.labels, props.dataSets, props.options, props.isGradient, themeMode]);

    return (
        <div className="rds-comp-chart-area">
            <canvas id={props.id} ref={canvasRef} role="img" aria-label={props.chartLabel ?? 'Area chart'} />
        </div>
    );
};
RdsCompAreaChart.displayName = 'RdsCompAreaChart';
export default RdsCompAreaChart;
