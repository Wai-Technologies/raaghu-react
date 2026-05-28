import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { applyChartThemeColors } from "../chart-utils";
import "./rds-comp-chart-stacked.scss";

export interface RdsCompStackedprops {
    labels: any[];
    options: any;
    dataSets: any[];
    id: string;
}

const RdsCompStackedChart = (props: RdsCompStackedprops) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);
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

        if (chartRef.current) chartRef.current.destroy();

        const chartOptions = JSON.parse(JSON.stringify(props.options || {}));
        
        // Prepare chart data with datasets so applyChartThemeColors can resolve colors
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
                        ...(chartOptions?.scales?.x || {}),
                        offset: true,
                        categoryPercentage: 0.1,
                        barPercentage: 0.1,
                        ticks: {
                            ...(chartOptions?.scales?.x?.ticks || {}),
                            padding: 20,
                            align: 'center',
                        },
                    },
                },
            },
        });

        if (chartRef.current !== null) {
        }

        return () => { chartRef.current?.destroy(); };
    }, [props, themeMode]);

    return (
        <div className="stack-chart-container">
            <canvas id={CanvasId} ref={canvasRef} />
        </div>
    );
};
RdsCompStackedChart.displayName = 'RdsCompStackedChart';
export default RdsCompStackedChart;
