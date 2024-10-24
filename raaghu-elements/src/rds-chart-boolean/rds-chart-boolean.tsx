import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Buffer } from "buffer";
import { ChartIcons } from "./chart-icons";

export interface RdsBooleanChartProps {
    labels: any[];
    options: any;
    dataSets: any[];
    width?: number;
    chartStyle?: string;
    id: string;
    height?: number;
    centerIconName?: string;
}

const RdsBooleanChart = (props: RdsBooleanChartProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const CanvasId = props.id;

    const svg = ChartIcons[props.centerIconName || ""];
    const encodedSVG = Buffer.from(svg).toString("base64");
    const dataURL = `data:image/svg+xml;base64,${encodedSVG}`;

    useEffect(() => {
        const canvasElm = canvasRef.current;
        const ctx = canvasElm?.getContext("2d");

        if (ctx) {
            const centerIcon = {
                id: "counter4",
                afterDraw(chart: any) {
                    const ctx = chart.ctx;
                    ctx.save();
                    const myIconImage = new Image();
                    myIconImage.src = dataURL;
                    const iconSize = 30;
                    const x = chart.width / 2 - iconSize / 2;
                    const y = chart.height / 2 - iconSize / 2;
                    ctx.drawImage(myIconImage, x, y, iconSize, iconSize);
                    ctx.restore();
                },
            };

            const boolCanvas = new Chart(ctx, {
                type: "doughnut",
                plugins: [centerIcon],
                data: {
                    labels: props.labels,
                    datasets: props.dataSets,
                },
                options: props.options,
            });

            if (boolCanvas !== null) {
                boolCanvas.canvas.style.height = `${props.height}px`;
                boolCanvas.canvas.style.width = `${props.width}px`;
            }

            return () => {
                boolCanvas.destroy();
            };
        }
    }, [props]);

    return (
        <div>
            <canvas data-testid={CanvasId} id={CanvasId} ref={canvasRef} />
        </div>
    );
};

export default RdsBooleanChart;
