import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./rds-comp-chart-stacked.scss";

export interface RdsCompStackedprops {
    labels: any[],
    options: any,
    dataSets: any[],
    id: string
}

const RdsCompStackedChart = (props: RdsCompStackedprops) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);
    const CanvasId = props.id;


    // Helper to detect dark mode from body or html attribute/class
    const isDarkMode = () => {
        if (typeof window !== 'undefined') {
            return (
                document.body.classList.contains('theme-dark') ||
                document.body.classList.contains('dark-theme') ||
                document.documentElement.getAttribute('data-theme') === 'dark' ||
                document.body.getAttribute('data-theme') === 'dark'
            );
        }
        return false;
    };

    useEffect(() => {
        const canvasElm = canvasRef.current;
        const ctx = canvasElm?.getContext("2d");

        if (ctx) {
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            // Deep clone options to avoid mutating props.options
            const chartOptions = JSON.parse(JSON.stringify(props.options || {}));

            // If dark mode, set axis, tick, legend, and title color to white
            if (isDarkMode()) {
                if (!chartOptions.scales) chartOptions.scales = {};
                ["x", "y"].forEach(axis => {
                    if (!chartOptions.scales[axis]) chartOptions.scales[axis] = {};
                    if (!chartOptions.scales[axis].grid) chartOptions.scales[axis].grid = {};
                    if (!chartOptions.scales[axis].ticks) chartOptions.scales[axis].ticks = {};
                    if (!chartOptions.scales[axis].border) chartOptions.scales[axis].border = {};
                    chartOptions.scales[axis].grid.color = "rgba(255,255,255,0.2)";
                    chartOptions.scales[axis].ticks.color = "#fff";
                    chartOptions.scales[axis].border.color = "#fff";
                    if (!chartOptions.scales[axis].title) chartOptions.scales[axis].title = {};
                    chartOptions.scales[axis].title.color = "#fff";
                });
                // Ensure plugins object exists
                if (!chartOptions.plugins) chartOptions.plugins = {};
                // Ensure legend object exists
                if (!chartOptions.plugins.legend) chartOptions.plugins.legend = {};
                if (!chartOptions.plugins.legend.labels) chartOptions.plugins.legend.labels = {};
                chartOptions.plugins.legend.labels.color = "#fff";
                // Ensure title object exists
                if (!chartOptions.plugins.title) chartOptions.plugins.title = {};
                chartOptions.plugins.title.color = "#fff";
                // Set tooltip label/title color to white if using custom tooltip
                if (chartOptions.plugins.tooltip) {
                    chartOptions.plugins.tooltip.titleColor = "#fff";
                    chartOptions.plugins.tooltip.bodyColor = "#fff";
                    chartOptions.plugins.tooltip.labelColor = () => ({ borderColor: '#fff', backgroundColor: '#fff' });
                }
            }

            chartRef.current = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: props.labels,
                    datasets: props.dataSets
                },
                options: {
                    ...chartOptions,
                    maintainAspectRatio: false,
                    scales: {
                        ...(chartOptions?.scales || {}),
                        // ...existing code...
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
                        // ...existing code...
                    },
                },
            });

            if (chartRef.current !== null) {
                chartRef.current.canvas.style.height = "86vh";
            }
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [props]);

    return (
        <div className="stack-chart-container">
            <canvas id={CanvasId} ref={canvasRef} />
        </div>
    );
};
RdsCompStackedChart.displayName = 'RdsCompStackedChart';
export default RdsCompStackedChart;