import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export interface RdsDoughnutprops {
    labels: any[];
    options: any;
    dataSets: any[];
    id: string;
    titleText?: string;
    subTitleText?: string;
}

const RdsDoughnutChart = (props: RdsDoughnutprops) => {
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
                    ctx.fillText(title, width / 2, top + (height / 2.2));
                    ctx.restore();

                    ctx.font = "500 16px Poppins";
                    ctx.textAlign = "center";
                    ctx.fillText(subTitle, width / 2, (height / 0.75) / 2.0 + top);
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
                doughnutCanvas.canvas.style.width = "35vh";
                doughnutCanvas.canvas.style.height = "37.5vh";
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

export default RdsDoughnutChart;
