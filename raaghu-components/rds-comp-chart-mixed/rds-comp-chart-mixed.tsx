import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import { applyChartThemeColors, cloneChartOptions } from "../chart-utils";
import Box from "@mui/material/Box";
import { joinClassNames, type RdsStylingProps } from "../../raaghu-elements/shared/utils/styling-props";
import "./rds-comp-chart-mixed.scss";

export interface RdsCompMixedChartProps extends RdsStylingProps {
    labels: string[];
    options: ChartConfiguration['options'];
    dataSets: ChartConfiguration['data']['datasets'];
    id: string;
    chartLabel?: string;
}

const RdsCompMixedChart = React.forwardRef<HTMLDivElement, RdsCompMixedChartProps>(function RdsCompMixedChart(props, ref) {
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
        if (!ctx) return;

        const chartOptions = cloneChartOptions(props.options || {}) as any;
        
        const chartData = { labels: props.labels, datasets: props.dataSets };
        if (!chartOptions.data) {
            chartOptions.data = chartData;
        }
        
        applyChartThemeColors(chartOptions);

        const mixedCanvas = new Chart(ctx, {
            type: "bar",
            data: chartData,
            options: chartOptions,
        });

        return () => { mixedCanvas.destroy(); };
    }, [props.labels, props.options, props.dataSets, themeMode]);

    return (
        <Box ref={ref} className={joinClassNames("rds-comp-chart-mixed", props.className)} sx={props.sx} style={props.style}>
            <canvas className="rds-chart-canvas" data-testid={props.id} id={props.id} ref={canvasRef} role="img" aria-label={props.chartLabel ?? 'Mixed chart'} />
        </Box>
    );
});
RdsCompMixedChart.displayName = 'RdsCompMixedChart';
export default RdsCompMixedChart;
