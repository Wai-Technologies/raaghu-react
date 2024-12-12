import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";

export interface RdsScatterChartProps {
    labels: any[],
    options: ChartConfiguration['options'],
    dataSets: ChartConfiguration['data']['datasets'],
    chartStyle?: string,
    id: string
}

const RdsScatterChart = (props: RdsScatterChartProps) => {
    const { id, labels, options, dataSets } = props;
    const chartRef = useRef<Chart | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
            chartRef.current = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: dataSets
                },
                options: options,
            });

            if(chartRef.current !== null) {
                chartRef.current.canvas.style.height = "50vh";
                chartRef.current.canvas.style.width = "100vh";
            }
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [id, labels, options, dataSets]);

    return (
        <div>
            <canvas id={id} ref={canvasRef} />
        </div>
    );
};

export default RdsScatterChart;
