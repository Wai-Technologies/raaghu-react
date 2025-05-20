import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./rds-chart-stacked.css";

export interface RdsStackedprops {
    labels: any[],
    options: any,
    dataSets: any[],
    id: string
}

const RdsStackedChart = (props: RdsStackedprops) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);
    const CanvasId = props.id;

    useEffect(() => {
        const canvasElm = canvasRef.current;
        const ctx = canvasElm?.getContext("2d");

        if (ctx) {
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            chartRef.current = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: props.labels,
                    datasets: props.dataSets
                },
                options: {
                    ...props.options,
                    maintainAspectRatio: false,
                },
            });

            if (chartRef.current !== null) {
                chartRef.current.canvas.style.height = "60vh";
            }
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [props]);

    return (
        <div className="stack-chart-container">
            <canvas id={CanvasId} ref={canvasRef} />
        </div>
    );
};

export default RdsStackedChart;