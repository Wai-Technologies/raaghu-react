import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { applyChartThemeColors } from "../chart-utils";
import "./rds-comp-chart-stacked.scss";

export interface RdsCompStackedprops {
    labels: any[];
    options: any;
    dataSets: any[];
    id: string;
}

const RdsCompStackedChart = (props: RdsCompStackedprops) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);
    const CanvasId = props.id;

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        if (chartRef.current) chartRef.current.destroy();

        const chartOptions = JSON.parse(JSON.stringify(props.options || {}));
        applyChartThemeColors(chartOptions);

        chartRef.current = new Chart(ctx, {
            type: "bar",
            data: { labels: props.labels, datasets: props.dataSets },
            options: {
                ...chartOptions,
                maintainAspectRatio: false,
                scales: {
                    ...(chartOptions?.scales || {}),
                    x: {
                        ...(chartOptions?.scales?.x || {}),
                        offset: true,
                        categoryPercentage: 0.1,
                        barPercentage: 0.1,
                        ticks: {
                            ...(chartOptions?.scales?.x?.ticks || {}),
                            padding: 20,
                            align: 'center',
                        },
                    },
                },
            },
        });

        if (chartRef.current !== null) {
        }

        return () => { chartRef.current?.destroy(); };
    }, [props]);

    return (
        <div className="stack-chart-container">
            <canvas id={CanvasId} ref={canvasRef} />
        </div>
    );
};
RdsCompStackedChart.displayName = 'RdsCompStackedChart';
export default RdsCompStackedChart;
