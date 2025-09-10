import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

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
                    ctx.restore();

                    ctx.font = "500 16px Poppins";
                    ctx.textAlign = "center";
                    ctx.fillText(subTitle, width / 2, centerY + 16);
                    ctx.restore();
                    ctx.textColor = "#fff";
                    ctx.fontColor = "#fff";
                    ctx.fillStyle = "#666";
                    ctx.lineJoin = 'round';
                    // ctx.subtitles.set("fontColor", "#F084C2");
                }
            };

            const doughnutCanvas = new Chart(ctx, {
                type: "doughnut",
                plugins: [centerText],
                data: {
                    labels: props.labels,
                    datasets: props.dataSets
                },
                options: props.options,
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
        <div>
            <canvas data-testid={CanvasId} id={CanvasId} ref={canvasRef}></canvas>
        </div>
    );
};
RdsCompDoughnutChart.displayName = 'RdsCompDoughnutChart';
export default RdsCompDoughnutChart;