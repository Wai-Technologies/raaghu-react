import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./rds-chart-area.css";

export interface lineprops {
    labels: any[],
    options: any,
    dataSets: any[],
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
                        return dataset;
                    }
                })
            },
            options: props.options,
        });

        chartRef.current = AreaCanvas;

        AreaCanvas.canvas.style.height ="50vh";
        AreaCanvas.canvas.style.width = "100vh";

        
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [props.labels, props.dataSets, props.options, props.isGradient]);

    return (
        <div>
            <canvas id={props.id} ref={canvasRef} />
        </div>
    );
};

export default RdsAreaChart;
