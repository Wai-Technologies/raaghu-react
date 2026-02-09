import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./rds-comp-chart-doughnut.scss";

export interface RdsCompDoughnutprops {
    labels: any[];
    options: any;
    dataSets: any[];
    id: string;
    titleText?: string;
    subTitleText?: string;
}

const RdsCompDoughnutChart = (props: RdsCompDoughnutprops) => {
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
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const CanvasId = props.id;

    useEffect(() => {
        const canvasElm = canvasRef.current;
        const ctx = canvasElm?.getContext("2d");

        if (ctx) {
            const title = props.titleText || "";
            const subTitle = props.subTitleText || "";

            const centerText = {
                id: "counter3",
                beforeDraw(chart: any, args: any, options: any) {
                    const { ctx, chartArea: { top, right, bottom, left, width, height } } = chart;
                    ctx.save();
                    ctx.font = "700 20px Poppins";
                    ctx.textAlign = "center";
                    const centerY = top + height / 2;
                    ctx.fillText(title, width / 2, centerY - 10);
                    ctx.fillStyle = isDarkMode() ? "#fff" : "#222";
                    ctx.restore();

                    ctx.font = "500 16px Poppins";
                    ctx.textAlign = "center";
                     ctx.fillStyle = isDarkMode() ? "#fff" : "#666";
                    ctx.fillText(subTitle, width / 2, centerY + 16);
                    ctx.restore();
                    ctx.lineJoin = 'round';
                }
            };

            const chartOptions = JSON.parse(JSON.stringify(props.options || {}));

            if (isDarkMode()) {
                if (!chartOptions.plugins) chartOptions.plugins = {};
                if (!chartOptions.plugins.legend) chartOptions.plugins.legend = {};
                if (!chartOptions.plugins.legend.labels) chartOptions.plugins.legend.labels = {};
                chartOptions.plugins.legend.labels.color = "#fff";
            }
            const doughnutCanvas = new Chart(ctx, {
                type: "doughnut",
                plugins: [centerText],
                data: {
                    labels: props.labels,
                    datasets: props.dataSets
                },
                 options: chartOptions,
            });

            if (doughnutCanvas !== null) {
                doughnutCanvas.canvas.style.width = "66vh";
                doughnutCanvas.canvas.style.height = "66vh";
            }

            return () => {
                doughnutCanvas.destroy();
            };
        }
    }, [props]);

    return (
        <div className="rds-comp-chart-doughnut">
            <canvas data-testid={CanvasId} id={CanvasId} ref={canvasRef}></canvas>
        </div>
    );
};
RdsCompDoughnutChart.displayName = 'RdsCompDoughnutChart';
export default RdsCompDoughnutChart;