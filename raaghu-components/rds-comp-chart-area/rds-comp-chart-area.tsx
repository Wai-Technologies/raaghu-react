import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./rds-comp-chart-area.scss";

export interface lineprops {
    labels: any[],
    options: any,
    dataSets: any[],
    id: string,
    isGradient: boolean,
}

const RdsCompAreaChart = (props: lineprops) => {
    const chartRef = useRef<Chart | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);


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

    // Track theme mode for re-render
    const [themeMode, setThemeMode] = React.useState(() => {
        if (typeof document !== 'undefined') {
            return document.documentElement.getAttribute('data-theme') || 'light';
        }
        return 'light';
    });

    useEffect(() => {
        // Observe theme changes
        if (typeof window !== 'undefined') {
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (
                        mutation.type === 'attributes' &&
                        mutation.attributeName === 'data-theme'
                    ) {
                        const newTheme = document.documentElement.getAttribute('data-theme') || 'light';
                        setThemeMode(newTheme);
                    }
                });
            });
            observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
            return () => observer.disconnect();
        }
    }, []);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d") as CanvasRenderingContext2D;

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Deep clone options to avoid mutating props.options
        const chartOptions = JSON.parse(JSON.stringify(props.options || {}));

        // If dark mode, set axis, tick, and label color to white
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
                if (chartOptions.scales[axis].title) {
                    chartOptions.scales[axis].title.color = "#fff";
                }
            });
            // Set legend label color to white
            if (chartOptions.plugins && chartOptions.plugins.legend && chartOptions.plugins.legend.labels) {
                chartOptions.plugins.legend.labels.color = "#fff";
            }
            // Set tooltip label/title color to white if using custom tooltip
            if (chartOptions.plugins && chartOptions.plugins.tooltip) {
                chartOptions.plugins.tooltip.titleColor = "#fff";
                chartOptions.plugins.tooltip.bodyColor = "#fff";
                chartOptions.plugins.tooltip.labelColor = () => ({ borderColor: '#fff', backgroundColor: '#fff' });
            }
        }

        const AreaCanvas = new Chart(ctx, {
            type: "line",
            data: {
                labels: props.labels,
                datasets: props.dataSets.map(dataset => {
                    if (props.isGradient) {
                        return {
                            ...dataset,
                            backgroundColor: dataset.backgroundColor,
                        };
                    } else {
                        return dataset;
                    }
                })
            },
            options: chartOptions,
        });

        chartRef.current = AreaCanvas;

        AreaCanvas.canvas.style.height ="76vh";
        AreaCanvas.canvas.style.width = "100vh";

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [props.labels, props.dataSets, props.options, props.isGradient, themeMode]);

    return (
        <div>
            <canvas id={props.id} ref={canvasRef} />
        </div>
    );
};
RdsCompAreaChart.displayName = 'RdsCompAreaChart';
export default RdsCompAreaChart;