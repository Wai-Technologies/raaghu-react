import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export interface RdsPolarAreaChartProps {
    labels: any[],
    options: any,
    dataSets: any[],
    radius?: number,
    chartStyle?: string,
    id: string
}

const RdsPolarAreaChart = (props: RdsPolarAreaChartProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart<"polarArea", number[], unknown> | null>(null);
    const CanvasId = props.id;
    let ctx;


    useEffect(() => {
        const canvasElm = canvasRef.current;
        if (!canvasElm) return;
        ctx = canvasElm?.getContext("2d") as CanvasRenderingContext2D;
        
        // Destroy the existing chart if it exists
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }
        const PolarCanvas = new Chart(ctx, {
            type: "polarArea",
            data: {
                labels: props.labels,
                datasets: props.dataSets
            },
            options: props.options,
        });
        if (PolarCanvas != null) {
            PolarCanvas.canvas.style.height = props.radius + "px";
            chartInstanceRef.current = PolarCanvas; // Store the chart instance
        }
    });

    return (
        <div>
            <canvas id={CanvasId} ref={canvasRef} />
        </div>
    );
};

export default RdsPolarAreaChart;