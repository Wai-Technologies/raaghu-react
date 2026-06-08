import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import { applyChartThemeColors } from "../chart-utils";
import "./rds-comp-chart-mixed.scss";

export interface RdsCompMixedChartProps {
    labels: string[];
    options: ChartConfiguration['options'];
    dataSets: ChartConfiguration['data']['datasets'];
    id: string;
    chartLabel?: string;
}

const RdsCompMixedChart = (props: RdsCompMixedChartProps) => {
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
        const ctx = canvasRef.current?.getContext("2d") as CanvasRenderingContext2D;
        if (!ctx) return;

        const chartOptions = JSON.parse(JSON.stringify(props.options || {}));
        
        // Prepare chart data with datasets so applyChartThemeColors can resolve colors
        const chartData = { labels: props.labels, datasets: props.dataSets };
        if (!chartOptions.data) {
            chartOptions.data = chartData;
        }
        
        applyChartThemeColors(chartOptions);

        const mixedCanvas = new Chart(ctx, {
            type: "bar",
            data: chartData,
            options: chartOptions,
        });

        // Canvas sizing is controlled by CSS variables (theme tokens)

        return () => { mixedCanvas.destroy(); };
    }, [props, themeMode]);

    return (
        <div className="rds-comp-chart-mixed">
            <canvas className="rds-chart-canvas" data-testid={props.id} id={props.id} ref={canvasRef} role="img" aria-label={props.chartLabel ?? 'Mixed chart'} />
        </div>
    );
};
RdsCompMixedChart.displayName = 'RdsCompMixedChart';
export default RdsCompMixedChart;
