import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export interface RdsCompPolarAreaChartProps {
    labels: any[],
    options: any,
    dataSets: any[],
    radius?: number,
    chartStyle?: string,
    id: string
}

const RdsCompPolarAreaChart = (props: RdsCompPolarAreaChartProps) => {
    // Helper to detect dark mode from body or html attribute/class
    const isDarkMode = () => {
        if (typeof window !== 'undefined') {
            return (
                document.body.classList.contains('theme-dark') ||
                document.body.classList.contains('dark-theme') ||
                document.documentElement.getAttribute('data-theme') === 'dark' ||
                document.body.getAttribute('data-theme') === 'dark'
            );
        }
        return false;
    };
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

        // Deep clone options to avoid mutating props.options
        const chartOptions = JSON.parse(JSON.stringify(props.options || {}));

        // If dark mode, set legend and title color to white
        if (isDarkMode()) {
            // Ensure plugins object exists
            if (!chartOptions.plugins) chartOptions.plugins = {};
            // Ensure legend object exists
            if (!chartOptions.plugins.legend) chartOptions.plugins.legend = {};
            if (!chartOptions.plugins.legend.labels) chartOptions.plugins.legend.labels = {};
            chartOptions.plugins.legend.labels.color = "#fff";
            // Ensure title object exists
            if (!chartOptions.plugins.title) chartOptions.plugins.title = {};
            chartOptions.plugins.title.color = "#fff";
            // Set tooltip label/title color to white if using custom tooltip
            if (chartOptions.plugins.tooltip) {
                chartOptions.plugins.tooltip.titleColor = "#fff";
                chartOptions.plugins.tooltip.bodyColor = "#fff";
                chartOptions.plugins.tooltip.labelColor = () => ({ borderColor: '#fff', backgroundColor: '#fff' });
            }
        }

        const PolarCanvas = new Chart(ctx, {
            type: "polarArea",
            data: {
                labels: props.labels,
                datasets: props.dataSets
            },
            options: chartOptions,
        });
        if (PolarCanvas != null) {
            PolarCanvas.canvas.style.height = props.radius + "px";
            chartInstanceRef.current = PolarCanvas; // Store the chart instance
        }
    }, [props]);

    return (
        <div>
            <canvas id={CanvasId} ref={canvasRef} />
        </div>
    );
};
RdsCompPolarAreaChart.displayName = 'RdsCompPolarAreaChart';
export default RdsCompPolarAreaChart;