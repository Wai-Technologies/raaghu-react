import React, { useEffect, useRef } from "react";
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
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        const canvasElm = canvasRef.current;
        const ctx = canvasElm?.getContext("2d") as CanvasRenderingContext2D;

        if (ctx) {
            const bubbleCanvas = new Chart(ctx, {
                type: "bubble",
                data: {
                    labels: props.labels,
                    datasets: props.dataSets,
                },
                options: props.options,
            });

            return () => {
                bubbleCanvas.destroy();
            };
        }
    }, [props]);

    return (
        <div>
            <canvas data-testid={props.id} id={props.id} ref={canvasRef} />
        </div>
    );
    };


export default RdsBubbleChart;
