import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import { applyChartThemeColors, cloneChartOptions } from "../chart-utils";
import "./rds-comp-chart-stacked.scss";

export interface RdsCompStackedProps {
    labels: string[];
    options: ChartConfiguration['options'];
    dataSets: ChartConfiguration['data']['datasets'];
    id: string;
    chartLabel?: string;
}

const RdsCompStackedChart = (props: RdsCompStackedProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);
    const CanvasId = props.id;

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
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        if (chartRef.current) chartRef.current.destroy();

        const chartOptions = cloneChartOptions(props.options || {}) as any;
        
        const chartData = { labels: props.labels, datasets: props.dataSets };
        if (!chartOptions.data) {
            chartOptions.data = chartData;
        }
        
        applyChartThemeColors(chartOptions);

        chartRef.current = new Chart(ctx, {
            type: "bar",
            data: chartData,
            options: {
                ...chartOptions,
                maintainAspectRatio: false,
                scales: {
                    ...(chartOptions?.scales || {}),
                    x: {
                        stacked: true,
                        ...(chartOptions?.scales?.x || {}),
                        offset: true,
                        ticks: {
                            ...(chartOptions?.scales?.x?.ticks || {}),
                            padding: 20,
                            align: 'center',
                        },
                    },
                    y: {
                        stacked: true,
                        ...(chartOptions?.scales?.y || {}),
                    },
                },
            },
        });

        return () => { chartRef.current?.destroy(); };
    }, [props.labels, props.options, props.dataSets, themeMode]);

    return (
        <div className="stack-chart-container">
            <canvas id={CanvasId} ref={canvasRef} role="img" aria-label={props.chartLabel ?? 'Stacked chart'} />
        </div>
    );
};
RdsCompStackedChart.displayName = 'RdsCompStackedChart';
export default RdsCompStackedChart;
