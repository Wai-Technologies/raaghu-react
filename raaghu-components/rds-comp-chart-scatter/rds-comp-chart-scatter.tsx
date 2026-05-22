import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import { applyChartThemeColors } from "../chart-utils";
import "./rds-comp-chart-scatter.scss";

export interface RdsCompScatterChartProps {
    labels: any[];
    options: ChartConfiguration['options'];
    dataSets: ChartConfiguration['data']['datasets'];
    id: string;
}

const RdsCompScatterChart = (props: RdsCompScatterChartProps) => {
    const { id, labels, options, dataSets } = props;
    const chartRef = useRef<Chart | null>(null);
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
        chartRef.current?.destroy();

        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        const chartOptions = JSON.parse(JSON.stringify(options || {}));
        applyChartThemeColors(chartOptions);

        chartRef.current = new Chart(ctx, {
            type: "bar",
            data: { labels, datasets: dataSets },
            options: chartOptions,
        });

        if (chartRef.current !== null) {
            chartRef.current.canvas.style.height = "76vh";
            chartRef.current.canvas.style.width = "100vh";
        }

        return () => { chartRef.current?.destroy(); };
    }, [id, labels, options, dataSets, themeMode]);

    return (
        <div className="rds-comp-chart-scatter">
            <canvas id={id} ref={canvasRef} />
        </div>
    );
};
RdsCompScatterChart.displayName = 'RdsCompScatterChart';
export default RdsCompScatterChart;
