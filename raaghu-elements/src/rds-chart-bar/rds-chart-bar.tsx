import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export interface RdsBarChartProps {
    labels: any[];
    options: any;
    dataSets: any[];
    width?: number;
    height?: number;
    id: string;
    // isGradient: boolean;
}

const RdsBarChart = (props: RdsBarChartProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const CanvasId = props.id;

    useEffect(() => {
        const canvasElm = canvasRef.current;
        const ctx = canvasElm?.getContext("2d");

        if (ctx) {
            const barCanvas = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: props.labels,
                    datasets: props.dataSets
                },
                options: props.options,
            });

            barCanvas.canvas.style.height = `${props.height}px`;
            barCanvas.canvas.style.width = `${props.width}px`;

            // var gradient = ctx.createLinearGradient(0, 50, 0, 300);
            // gradient.addColorStop(0, "rgba(54, 162, 235, 76%)");
            // gradient.addColorStop(1, "rgba(54, 162, 235, 8%)");
            // {props.isGradient ? (
            // BarCanvas.data.datasets[0].backgroundColor = gradient
            // ): null}

            return () => {
                barCanvas.destroy();
            };
        }
    }, []);

    return (
        <div>
            <canvas data-testid={CanvasId} id={CanvasId} ref={canvasRef} />
        </div>
    );
};

export default RdsBarChart;
