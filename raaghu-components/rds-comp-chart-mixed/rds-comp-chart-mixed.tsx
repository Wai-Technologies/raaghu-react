import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { applyChartThemeColors } from "../chart-utils";
import "./rds-comp-chart-mixed.scss";

export interface RdsCompMixedChartProps {
    labels: any[];
    options: any;
    dataSets: any[];
    id: string;
}

const RdsCompMixedChart = (props: RdsCompMixedChartProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d") as CanvasRenderingContext2D;
        if (!ctx) return;

        const chartOptions = JSON.parse(JSON.stringify(props.options || {}));
        applyChartThemeColors(chartOptions);

        const mixedCanvas = new Chart(ctx, {
            type: "bar",
            data: { labels: props.labels, datasets: props.dataSets },
            options: chartOptions,
        });

        // Canvas sizing is controlled by CSS variables (theme tokens)

        return () => { mixedCanvas.destroy(); };
    }, [props]);

    return (
        <div className="rds-comp-chart-mixed">
            <canvas className="rds-chart-canvas" data-testid={props.id} id={props.id} ref={canvasRef} />
        </div>
    );
};
RdsCompMixedChart.displayName = 'RdsCompMixedChart';
export default RdsCompMixedChart;
