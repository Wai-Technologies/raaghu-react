import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./rds-comp-chart-bar.scss";

export interface RdsCompBarChartProps {
    labels: any[];
    options: any;
    dataSets: any[];
    id: any;
    height?: string | number;
}

const RdsCompBarChart = (props: RdsCompBarChartProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const CanvasId = props.id;

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
        const canvasElm = canvasRef.current;
        const ctx = canvasElm?.getContext("2d");

        if (ctx) {
            const chartOptions = JSON.parse(JSON.stringify(props.options || {}));

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
            const barCanvas = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: props.labels,
                    datasets: props.dataSets
                },
                options: { ...chartOptions, responsive: true, maintainAspectRatio: false },
            });

            if (barCanvas !== null) {
                if (props.height) {
                    barCanvas.canvas.style.height = typeof props.height === "number" ? `${props.height}px` : String(props.height);
                    barCanvas.canvas.style.width = "100%";
                } else {
                    if (props.id === "barchart1") {
                        barCanvas.canvas.style.height = "65vh";
                        barCanvas.canvas.style.width = "100%";
                    } else if (props.id === "histogram") {
                        barCanvas.canvas.style.height = "50px";
                        barCanvas.canvas.style.width = "50px";
                    } else {
                        barCanvas.canvas.style.height = "76vh";
                        barCanvas.canvas.style.width = "100%";
                    }
                }
            }
        
            return () => {
                barCanvas.destroy();
            };
        }
     }, [props.options, props.labels, props.dataSets, props.height, props.id, themeMode]);
    
    return (
        <div className="rds-comp-chart-bar">
            <canvas data-testid={CanvasId} id={CanvasId} ref={canvasRef} />
        </div>
    );
};
RdsCompBarChart.displayName = 'RdsCompBarChart';
export default RdsCompBarChart;