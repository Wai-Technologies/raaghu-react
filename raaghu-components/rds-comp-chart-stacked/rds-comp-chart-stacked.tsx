import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./rds-comp-chart-stacked.scss";

export interface RdsCompStackedprops {
    labels: any[],
    options: any,
    dataSets: any[],
    id: string
}

const RdsCompStackedChart = (props: RdsCompStackedprops) => {
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
                        scales: {
                            ...(props.options?.scales || {}),
        // ...existing code...
                            x: {
                                ...(props.options?.scales?.x || {}),
                                offset: true,
                                    categoryPercentage: 0.1,
                                    barPercentage: 0.1,
                                ticks: {
                                    ...(props.options?.scales?.x?.ticks || {}),
                                    padding: 20,
                                    align: 'center',
                                },
                            },
        // ...existing code...
                        },
                    },
            });

            if (chartRef.current !== null) {
                chartRef.current.canvas.style.height = "86vh";
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
RdsCompStackedChart.displayName = 'RdsCompStackedChart';
export default RdsCompStackedChart;