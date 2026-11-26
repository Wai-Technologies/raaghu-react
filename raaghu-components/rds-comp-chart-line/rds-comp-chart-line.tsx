import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import { applyChartThemeColors, cloneChartOptions, getCSSVar } from "../chart-utils";
import Box from "@mui/material/Box";
import { joinClassNames, type RdsStylingProps } from "../../raaghu-elements/shared/utils/styling-props";
import "./rds-comp-chart-line.scss";

export interface RdsCompLineProps extends RdsStylingProps {
    labels: string[];
    options: ChartConfiguration['options'];
    dataSets: ChartConfiguration['data']['datasets'];
    id: string;
    chartLabel?: string;
}

const RdsCompLineChart = React.forwardRef<HTMLDivElement, RdsCompLineProps>(function RdsCompLineChart(props, ref) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [themeMode, setThemeMode] = React.useState(() => {
        if (typeof document !== 'undefined') {
            return document.documentElement.dataset.theme || 'light';
        }
        return 'light';
    });

    React.useEffect(() => {
        if (typeof window === 'undefined') return;
        const observer = new MutationObserver(() => {
            setThemeMode(document.documentElement.dataset.theme || 'light');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        const chartOptions = cloneChartOptions(props.options || {}) as any;
        
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
    }, [props.labels, props.options, props.dataSets, props.id, themeMode]);

    return (
        <Box ref={ref} className={joinClassNames("rds-comp-chart-line", props.className)} sx={props.sx} style={props.style}>
            <canvas data-testid={props.id} id={props.id} ref={canvasRef} role="img" aria-label={props.chartLabel ?? 'Line chart'} />
        </Box>
    );
});
RdsCompLineChart.displayName = 'RdsCompLineChart';
export default RdsCompLineChart;
