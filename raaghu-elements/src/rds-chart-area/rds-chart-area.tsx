import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./rds-chart-area.css";

export interface lineprops {
    labels: any[],
    options: any,
    dataSets: any[],
    height?: number,
    width?: number,
    id: string,
    isGradient: boolean,
}

const RdsAreaChart = (props: lineprops) => {
    const chartRef = useRef<Chart | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d") as CanvasRenderingContext2D;

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const AreaCanvas = new Chart(ctx, {
            type: "line",
            data: {
                labels: props.labels,
                datasets: props.dataSets.map(dataset => {
                    if (props.isGradient) {
                        return {
                            ...dataset,
                            backgroundColor: dataset.backgroundColor,
                        };
                    } else {
                        const { backgroundColor, ...rest } = dataset;
                        return rest;
                    }
                })
            },
            options: props.options,
        });

        chartRef.current = AreaCanvas;

        if (props.height) {
            AreaCanvas.canvas.style.height = props.height + "px";
        }
        if (props.width) {
            AreaCanvas.canvas.style.width = props.width + "px";
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [props.labels, props.dataSets, props.options, props.height, props.width, props.isGradient]);

    return (
        <div>
            <canvas id={props.id} ref={canvasRef} />
        </div>
    );
};

export default RdsAreaChart;
