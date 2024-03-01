import React, { useEffect } from "react";
import Chart from "chart.js/auto";

export interface RdsMixedChartProps {
    labels: any[],
    options: any,
    dataSets: any[],
    width?: number,
    height?: number
    chartStyle: string,
    id: string
}

const RdsMixedChart = (props: RdsMixedChartProps) => {
    const CanvasId = props.id;
    let ctx;


    useEffect(() => {
        const canvasElm = document.getElementById(
            CanvasId
        ) as HTMLCanvasElement | null;
        ctx = canvasElm?.getContext("2d") as CanvasRenderingContext2D;

        const MixedCanvas = new Chart(ctx, {
            type: "bar",
            data: {
                labels: props.labels,
                datasets: props.dataSets
            },
            options: props.options,
        });
        MixedCanvas.canvas.style.height = props.height + "px";
        MixedCanvas.canvas.style.width = props.width + "px";
    });

    return (
        <div>
            <canvas id={CanvasId} ref={ctx} />
        </div>
    );
};

export default RdsMixedChart;
