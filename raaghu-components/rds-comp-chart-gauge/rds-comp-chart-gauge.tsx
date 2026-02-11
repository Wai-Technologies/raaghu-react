import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./rds-comp-chart-gauge.scss";

export interface RdsCompGaugeprops {
    labels: any[];
    options: any;
    dataSets: any[];
    id: string;
    titleText?: string;
    subTitleText?: string;
    value?: number;
    maxValue?: number;
}

const RdsCompGaugeChart = (props: RdsCompGaugeprops) => {
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
                id: "gaugeText",
                beforeDraw(chart: any, args: any, options: any) {
                    const { ctx, chartArea: { top, right, bottom, left, width, height } } = chart;
                    ctx.save();
                    ctx.font = "700 20px Poppins";
                    ctx.textAlign = "center";
                    ctx.fillStyle = isDarkMode() ? "#fff" : "#333";
                    ctx.fillText(title, width / 2, top + (height / 1.5));
                    ctx.restore();

                    ctx.font = "500 14px Poppins";
                    ctx.textAlign = "center";
                    ctx.fillStyle = isDarkMode() ? "#fff" : "#666";
                    ctx.fillText(subTitle, width / 2, top + (height / 1.2));
                    ctx.restore();
                }
            };

             const chartOptions = JSON.parse(JSON.stringify(props.options || {}));
            if (isDarkMode()) {
                if (!chartOptions.plugins) chartOptions.plugins = {};
                if (!chartOptions.plugins.legend) chartOptions.plugins.legend = {};
                if (!chartOptions.plugins.legend.labels) chartOptions.plugins.legend.labels = {};
                chartOptions.plugins.legend.labels.color = "#fff";
            }

            const gaugeCanvas = new Chart(ctx, {
                type: "doughnut",
                plugins: [centerText],
                data: {
                    labels: props.labels,
                    datasets: props.dataSets
                },
                options: {
                    ...chartOptions,
                    rotation: -90,
                    circumference: 180,
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                        ...chartOptions?.plugins,
                        legend: {
                             display: chartOptions?.plugins?.legend?.display !== false,
                            position: "top",
                            labels: {
                                usePointStyle: true,
                                pointStyle: 'circle',
                                ...chartOptions?.plugins?.legend?.labels
                            },
                            ...props.options?.plugins?.legend
                        }
                    }
                },
            });

            if (gaugeCanvas !== null) {
                gaugeCanvas.canvas.style.width = "45vh";
                gaugeCanvas.canvas.style.height = "45vh";
            }

            return () => {
                gaugeCanvas.destroy();
            };
        }
    }, [props]);

    return (
        <div className="rds-comp-chart-gauge">
            <canvas data-testid={CanvasId} id={CanvasId} ref={canvasRef}></canvas>
        </div>
    );
};
RdsCompGaugeChart.displayName = 'RdsCompGaugeChart';
export default RdsCompGaugeChart;