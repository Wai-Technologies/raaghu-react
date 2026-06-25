import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import { applyChartThemeColors } from "../chart-utils";
import "./rds-comp-chart-bubble.scss";

export interface RdsCompBubbleChartProps {
    id: string;
    labels: string[];
    options: ChartConfiguration['options'];
    dataSets: ChartConfiguration['data']['datasets'];
    chartLabel?: string;
}

const RdsCompBubbleChart = (props: RdsCompBubbleChartProps) => {
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
        if (!ctx) return;

        const chartOptions = JSON.parse(JSON.stringify(props.options || {}));
        
        // Prepare chart data with datasets so applyChartThemeColors can resolve colors
        const chartData = { labels: props.labels, datasets: props.dataSets };
        if (!chartOptions.data) {
            chartOptions.data = chartData;
        }
        
        applyChartThemeColors(chartOptions);

        const bubbleCanvas = new Chart(ctx, {
            type: "bubble",
            data: chartData,
            options: chartOptions,
        });

        return () => { bubbleCanvas.destroy(); };
    }, [props, themeMode]);

    return (
        <div>
            <canvas data-testid={props.id} id={props.id} ref={canvasRef} width={300} height={300} role="img" aria-label={props.chartLabel ?? 'Bubble chart'} />
        </div>
    );
};

RdsCompBubbleChart.displayName = 'RdsCompBubbleChart';
export default RdsCompBubbleChart;
