import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { applyChartThemeColors, chartTextColor, chartMutedColor, chartFont } from "../chart-utils";
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
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const CanvasId = props.id;

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        const title    = props.titleText    || "";
        const subTitle = props.subTitleText || "";

        const centerText = {
            id: "gaugeText",
            beforeDraw(chart: any) {
                const { ctx: c, chartArea: { top, width, height } } = chart;

                // Read colors from CSS vars at draw time — responds to theme changes
                const primaryColor = chartTextColor();
                const mutedColor   = chartMutedColor();

                c.save();
                c.font = chartFont('bold', 'xl');
                c.textAlign = "center";
                c.fillStyle = primaryColor;
                c.fillText(title, width / 2, top + (height / 1.5));
                c.restore();

                c.save();
                c.font = chartFont('medium', 'md');
                c.textAlign = "center";
                c.fillStyle = mutedColor;
                c.fillText(subTitle, width / 2, top + (height / 1.2));
                c.restore();
            }
        };

        const chartOptions = JSON.parse(JSON.stringify(props.options || {}));
        applyChartThemeColors(chartOptions, []);

        const gaugeCanvas = new Chart(ctx, {
            type: "doughnut",
            plugins: [centerText],
            data: { labels: props.labels, datasets: props.dataSets },
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
                            ...chartOptions?.plugins?.legend?.labels,
                        },
                        ...props.options?.plugins?.legend,
                    },
                },
            },
        });

        if (gaugeCanvas !== null) {
            gaugeCanvas.canvas.style.width  = "45vh";
            gaugeCanvas.canvas.style.height = "45vh";
        }

        return () => { gaugeCanvas.destroy(); };
    }, [props]);

    return (
        <div className="rds-comp-chart-gauge">
            <canvas data-testid={CanvasId} id={CanvasId} ref={canvasRef} />
        </div>
    );
};
RdsCompGaugeChart.displayName = 'RdsCompGaugeChart';
export default RdsCompGaugeChart;
