import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./rds-comp-chart-line.scss";

export interface RdsComplineprops {
    labels: any[];
    options: any;
    dataSets: any[];    
    id: string;
}

const RdsCompLineChart = (props: RdsComplineprops) => {
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
            const lineCanvas = new Chart(ctx, {
                type: "line",
                data: {
                    labels: props.labels,
                    datasets: props.dataSets,
                },
                 options: chartOptions,
            });
            
            if (lineCanvas !== null) {
                if (props.id === "linechart1") {
                    lineCanvas.canvas.style.height = "65vh";
                    lineCanvas.canvas.style.width = "100vh";
                } else if (props.id === "linechart2") {
                    lineCanvas.canvas.style.height = "50px";
                    lineCanvas.canvas.style.width = "50px";
                } else {
                    lineCanvas.canvas.style.height = "76vh";
                    lineCanvas.canvas.style.width = "100vh";
                }
            }
            return () => {
                lineCanvas.destroy();
            };
        }
    }, [props]);

    return (
        <div className="rds-comp-chart-line">
            <canvas data-testid={props.id} id={props.id} ref={canvasRef} />
        </div>
    );
};
RdsCompLineChart.displayName = 'RdsCompLineChart';
export default RdsCompLineChart;