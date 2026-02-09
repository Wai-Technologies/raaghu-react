import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";

export interface RdsCompScatterChartProps {
    labels: any[],
    options: ChartConfiguration['options'],
    dataSets: ChartConfiguration['data']['datasets'],
    id: string
}

const RdsCompScatterChart = (props: RdsCompScatterChartProps) => {
    const { id, labels, options, dataSets } = props;
    const chartRef = useRef<Chart | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    const [themeMode, setThemeMode] = React.useState(() => {
        if (typeof document !== 'undefined') {
            return document.documentElement.getAttribute('data-theme') || 'light';
        }
        return 'light';
    });

    React.useEffect(() => {
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
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
              const chartOptions = JSON.parse(JSON.stringify(options || {}));

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
                if (!chartOptions.plugins) chartOptions.plugins = {};
                if (!chartOptions.plugins.legend) chartOptions.plugins.legend = {};
                if (!chartOptions.plugins.legend.labels) chartOptions.plugins.legend.labels = {};
                chartOptions.plugins.legend.labels.color = "#fff";
                if (!chartOptions.plugins.title) chartOptions.plugins.title = {};
                chartOptions.plugins.title.color = "#fff";
                if (chartOptions.plugins.tooltip) {
                    chartOptions.plugins.tooltip.titleColor = "#fff";
                    chartOptions.plugins.tooltip.bodyColor = "#fff";
                    chartOptions.plugins.tooltip.labelColor = () => ({ borderColor: '#fff', backgroundColor: '#fff' });
                }
            }
            chartRef.current = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: dataSets
                },
                  options: chartOptions,
            });

            if(chartRef.current !== null) {
                chartRef.current.canvas.style.height = "76vh";
                chartRef.current.canvas.style.width = "100vh";
            }
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [id, labels, options, dataSets, themeMode]);

    return (
        <div>
            <canvas id={id} ref={canvasRef} />
        </div>
    );
};
RdsCompScatterChart.displayName = 'RdsCompScatterChart';
export default RdsCompScatterChart;