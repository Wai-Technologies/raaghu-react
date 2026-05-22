import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { applyChartThemeColors, chartTextColor, chartMutedColor } from "../chart-utils";
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
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const CanvasId = props.id;

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        const title    = props.titleText    || "";
        const subTitle = props.subTitleText || "";

        const centerText = {
            id: "counter3",
            beforeDraw(chart: any) {
                const { ctx: c, chartArea: { top, width, height } } = chart;
                const centerY = top + height / 2;

                // Read colors from CSS vars at draw time — responds to theme changes
                const primaryColor = chartTextColor();
                const mutedColor   = chartMutedColor();

                c.save();
                c.font = "700 20px Poppins";
                c.textAlign = "center";
                c.fillStyle = primaryColor;
                c.fillText(title, width / 2, centerY - 10);
                c.restore();

                c.save();
                c.font = "500 16px Poppins";
                c.textAlign = "center";
                c.fillStyle = mutedColor;
                c.fillText(subTitle, width / 2, centerY + 16);
                c.restore();

                c.lineJoin = 'round';
            }
        };

        const chartOptions = JSON.parse(JSON.stringify(props.options || {}));
        applyChartThemeColors(chartOptions, []);

        const doughnutCanvas = new Chart(ctx, {
            type: "doughnut",
            plugins: [centerText],
            data: { labels: props.labels, datasets: props.dataSets },
            options: chartOptions,
        });

        if (doughnutCanvas !== null) {
            doughnutCanvas.canvas.style.width  = "66vh";
            doughnutCanvas.canvas.style.height = "66vh";
        }

        return () => { doughnutCanvas.destroy(); };
    }, [props]);

    return (
        <div className="rds-comp-chart-doughnut">
            <canvas data-testid={CanvasId} id={CanvasId} ref={canvasRef} />
        </div>
    );
};
RdsCompDoughnutChart.displayName = 'RdsCompDoughnutChart';
export default RdsCompDoughnutChart;
