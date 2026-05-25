import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { applyChartThemeColors } from "../chart-utils";
import "./rds-comp-chart-polar-area.scss";

export interface RdsCompPolarAreaChartProps {
    labels: any[];
    options: any;
    dataSets: any[];
    radius?: number;
    id: string;
}

const RdsCompPolarAreaChart = (props: RdsCompPolarAreaChartProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart<"polarArea", number[], unknown> | null>(null);
    const CanvasId = props.id;

    useEffect(() => {
        const canvasElm = canvasRef.current;
        if (!canvasElm) return;

        const ctx = canvasElm.getContext("2d") as CanvasRenderingContext2D;
        chartInstanceRef.current?.destroy();

        const chartOptions = JSON.parse(JSON.stringify(props.options || {}));
        // Polar area uses 'r' axis — pass empty array; applyChartThemeColors handles plugins
        applyChartThemeColors(chartOptions, []);

        const PolarCanvas = new Chart(ctx, {
            type: "polarArea",
            data: { labels: props.labels, datasets: props.dataSets },
            options: chartOptions,
        });

        if (PolarCanvas != null) {
            PolarCanvas.canvas.style.height = props.radius + "px";
            chartInstanceRef.current = PolarCanvas;
        }
    }, [props]);

    return (
        <div className="rds-comp-chart-polar-area-container">
            <canvas id={CanvasId} ref={canvasRef} />
        </div>
    );
};
RdsCompPolarAreaChart.displayName = 'RdsCompPolarAreaChart';
export default RdsCompPolarAreaChart;
