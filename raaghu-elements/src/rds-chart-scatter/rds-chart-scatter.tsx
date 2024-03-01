import React, { useEffect } from "react";
import Chart from "chart.js/auto";

export interface RdsScatterChartProps {
    labels: any[],
    options: any,
    dataSets: any[],
    width: number,
    height?: number,
    chartStyle?: string,
    id: string
}

const RdsScatterChart = (props: RdsScatterChartProps) => {
    const CanvasId = props.id;
    let ctx;


    useEffect(() => {
        const canvasElm = document.getElementById(
            CanvasId
        ) as HTMLCanvasElement | null;
        ctx = canvasElm?.getContext("2d") as CanvasRenderingContext2D;

        const ScatterCanvas = new Chart(ctx, {
            type: "bar",
            data: {
                labels: props.labels,
                datasets: props.dataSets
            },
            options: props.options,
        });
        ScatterCanvas.canvas.style.height = props.height + "px";
        ScatterCanvas.canvas.style.width = props.width + "px";
    });

    return (
        <div>
            <canvas id={CanvasId} ref={ctx} />
        </div>
    );
};

export default RdsScatterChart;
