import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { applyChartThemeColors, getCSSVar } from "../chart-utils";
import "./rds-comp-chart-line.scss";

export interface RdsComplineprops {
    labels: any[];
    options: any;
    dataSets: any[];
    id: string;
}

const RdsCompLineChart = (props: RdsComplineprops) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        const chartOptions = JSON.parse(JSON.stringify(props.options || {}));
        applyChartThemeColors(chartOptions);

        const lineCanvas = new Chart(ctx, {
            type: "line",
            data: { labels: props.labels, datasets: props.dataSets },
            options: chartOptions,
        });

        if (lineCanvas !== null) {
            if (props.id === "linechart1") {
                lineCanvas.canvas.style.height = "65vh";
                lineCanvas.canvas.style.width = "100vh";
            } else if (props.id === "linechart2") {
                const smallSize = getCSSVar('--rds-spacing-2xl', '50px');
                lineCanvas.canvas.style.height = smallSize;
                lineCanvas.canvas.style.width = smallSize;
            } else {
                lineCanvas.canvas.style.height = "76vh";
                lineCanvas.canvas.style.width = "100vh";
            }
        }

        return () => { lineCanvas.destroy(); };
    }, [props]);

    return (
        <div className="rds-comp-chart-line">
            <canvas data-testid={props.id} id={props.id} ref={canvasRef} />
        </div>
    );
};
RdsCompLineChart.displayName = 'RdsCompLineChart';
export default RdsCompLineChart;
