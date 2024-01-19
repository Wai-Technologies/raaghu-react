import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import "./rds-chart-bubble.css";

export interface RdsBubbleChartProps {
  id: string;
  labels: any[];
  options: any;
  dataSets: any[];
  chartdata?: any[];
  chartWidth?: number;
  chartStyle?: string;
}

const RdsBubbleChart = (props: RdsBubbleChartProps) => {
    const CanvasId = props.id;
    let ctx;

    useEffect(() => {
        const canvasElm = document.getElementById(
            CanvasId
        ) as HTMLCanvasElement | null;
        ctx = canvasElm?.getContext("2d") as CanvasRenderingContext2D;

        const lineCanvas = new Chart(ctx, {
            type: "bubble",
            data: {
                labels: props.labels,
                datasets: props.dataSets,
            },
            options: props.options,
        });
    });

    return (
        <div>
            <canvas id={CanvasId} ref={ctx} />
        </div>
    );
};

export default RdsBubbleChart;
