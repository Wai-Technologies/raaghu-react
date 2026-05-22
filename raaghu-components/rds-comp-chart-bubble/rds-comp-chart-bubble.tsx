import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { applyChartThemeColors } from "../chart-utils";
import "./rds-comp-chart-bubble.scss";

export interface RdsCompBubbleChartProps {
    id: string;
    labels: any[];
    options: any;
    dataSets: any[];
}

const RdsCompBubbleChart = (props: RdsCompBubbleChartProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d") as CanvasRenderingContext2D;
        if (!ctx) return;

        const chartOptions = JSON.parse(JSON.stringify(props.options || {}));
        applyChartThemeColors(chartOptions);

        const bubbleCanvas = new Chart(ctx, {
            type: "bubble",
            data: { labels: props.labels, datasets: props.dataSets },
            options: chartOptions,
        });

        return () => { bubbleCanvas.destroy(); };
    }, [props]);

    return (
        <div>
            <canvas data-testid={props.id} id={props.id} ref={canvasRef} width={300} height={300} />
        </div>
    );
};

RdsCompBubbleChart.displayName = 'RdsCompBubbleChart';
export default RdsCompBubbleChart;
