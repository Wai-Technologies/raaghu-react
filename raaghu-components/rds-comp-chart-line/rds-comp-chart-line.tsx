import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { applyChartThemeColors, getCSSVar } from "../chart-utils";
import "./rds-comp-chart-line.scss";

export interface RdsCompLineProps {
    labels: any[];
    options: any;
    dataSets: any[];
    id: string;
}

const RdsCompLineChart = (props: RdsCompLineProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [themeMode, setThemeMode] = React.useState(() => {
        if (typeof document !== 'undefined') {
            return document.documentElement.getAttribute('data-theme') || 'light';
        }
        return 'light';
    });

    React.useEffect(() => {
        if (typeof window === 'undefined') return;
        const observer = new MutationObserver(() => {
            setThemeMode(document.documentElement.getAttribute('data-theme') || 'light');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        const chartOptions = JSON.parse(JSON.stringify(props.options || {}));
        
        // Prepare chart data with datasets so applyChartThemeColors can resolve colors
        const chartData = { labels: props.labels, datasets: props.dataSets };
        if (!chartOptions.data) {
            chartOptions.data = chartData;
        }
        
        applyChartThemeColors(chartOptions);

        const lineCanvas = new Chart(ctx, {
            type: "line",
            data: chartData,
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
    }, [props, themeMode]);

    return (
        <div className="rds-comp-chart-line">
            <canvas data-testid={props.id} id={props.id} ref={canvasRef} />
        </div>
    );
};
RdsCompLineChart.displayName = 'RdsCompLineChart';
export default RdsCompLineChart;
