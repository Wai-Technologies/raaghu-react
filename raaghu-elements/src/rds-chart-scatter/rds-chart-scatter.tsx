import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";

export interface RdsScatterChartProps {
    labels: any[],
    options: ChartConfiguration['options'],
    dataSets: ChartConfiguration['data']['datasets'],
    width: number,
    height?: number,
    chartStyle?: string,
    id: string
}

const RdsScatterChart = (props: RdsScatterChartProps) => {
    const { id, labels, options, dataSets, width, height } = props;
    const chartRef = useRef<Chart | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
            // Modify the dataSets to include the pointStyle
            const modifiedDataSets = dataSets.map(dataset => ({
                ...dataset,
                pointStyle: 'triangle' // This sets the point style to triangle
            }));

            chartRef.current = new Chart(ctx, {
                type: "scatter", // Make sure the type is scatter for this example
                data: {
                    labels: labels,
                    datasets: modifiedDataSets
                },
                options: options,
            });
            if (height) {
                chartRef.current.canvas.style.height = height + "px";
            }
            chartRef.current.canvas.style.width = width + "px";
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [id, labels, options, dataSets, width, height]);

    return (
        <div>
            <canvas id={id} ref={canvasRef} />
        </div>
    );
};

export default RdsScatterChart;
