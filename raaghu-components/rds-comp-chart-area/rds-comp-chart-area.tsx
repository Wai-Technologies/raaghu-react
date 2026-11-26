import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import { applyChartThemeColors, cloneChartOptions } from "../chart-utils";
import Box from "@mui/material/Box";
import { joinClassNames, type RdsStylingProps } from "../../raaghu-elements/shared/utils/styling-props";
import "./rds-comp-chart-area.scss";

export interface lineprops extends RdsStylingProps {
    labels: string[];
    options: ChartConfiguration['options'];
    dataSets: ChartConfiguration['data']['datasets'];
    id: string;
    isGradient: boolean;
    chartLabel?: string;
}

const RdsCompAreaChart = React.forwardRef<HTMLDivElement, lineprops>(function RdsCompAreaChart(props, ref) {
    const chartRef = useRef<Chart | null>(null);
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
        const ctx = canvasRef.current?.getContext("2d") as CanvasRenderingContext2D;
        chartRef.current?.destroy();

        const chartOptions = cloneChartOptions(props.options || {}) as any;
        
        const chartData = {
            labels: props.labels,
            datasets: props.dataSets.map(dataset =>
                props.isGradient ? { ...dataset, backgroundColor: dataset.backgroundColor } : dataset
            ),
        };
        if (!chartOptions.data) {
            chartOptions.data = chartData;
        }
        
        applyChartThemeColors(chartOptions);

        const AreaCanvas = new Chart(ctx, {
            type: "line",
            data: chartData as any,
            options: chartOptions,
        });

        chartRef.current = AreaCanvas as Chart;
        AreaCanvas.canvas.style.height = "76vh";
        AreaCanvas.canvas.style.width = "100vh";

        return () => { chartRef.current?.destroy(); };
    }, [props.labels, props.dataSets, props.options, props.isGradient, themeMode]);

    return (
        <Box ref={ref} className={joinClassNames("rds-comp-chart-area", props.className)} sx={props.sx} style={props.style}>
            <canvas id={props.id} ref={canvasRef} role="img" aria-label={props.chartLabel ?? 'Area chart'} />
        </Box>
    );
});
RdsCompAreaChart.displayName = 'RdsCompAreaChart';
export default RdsCompAreaChart;
