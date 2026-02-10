import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./rds-comp-chart-mixed.scss";

export interface RdsCompMixedChartProps {
    labels: any[];
    options: any;
    dataSets: any[];
    id: string;
}

const RdsCompMixedChart = (props: RdsCompMixedChartProps) => {
    
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
        const ctx = canvasElm?.getContext("2d") as CanvasRenderingContext2D;

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
                    if (chartOptions.scales[axis].title) {
                        chartOptions.scales[axis].title.color = "#fff";
                    }
                });
                if (!chartOptions.plugins) chartOptions.plugins = {};
                if (!chartOptions.plugins.legend) chartOptions.plugins.legend = {};
                if (!chartOptions.plugins.legend.labels) chartOptions.plugins.legend.labels = {};
                chartOptions.plugins.legend.labels.color = "#fff";
            }

            const mixedCanvas = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: props.labels,
                    datasets: props.dataSets,
                },
                options: chartOptions,
            });

            if(mixedCanvas !== null) {
                mixedCanvas.canvas.style.height = "86vh";
                mixedCanvas.canvas.style.width = "100vh";
            }

            return () => {
                mixedCanvas.destroy();
            };
        }
   }, [props]);


    return (
        <div className="rds-comp-chart-mixed">
            <canvas data-testid={props.id} id={props.id} ref={canvasRef} />
        </div>
    );
};
RdsCompMixedChart.displayName = 'RdsCompMixedChart';
export default RdsCompMixedChart;