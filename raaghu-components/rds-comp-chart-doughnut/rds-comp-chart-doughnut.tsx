import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import { applyChartThemeColors, chartTextColor, chartMutedColor, chartFont, cloneChartOptions } from "../chart-utils";
import Box from "@mui/material/Box";
import { joinClassNames, type RdsStylingProps } from "../../raaghu-elements/shared/utils/styling-props";
import "./rds-comp-chart-doughnut.scss";

export interface RdsCompDoughnutProps extends RdsStylingProps {
    labels: string[];
    options: ChartConfiguration['options'];
    dataSets: ChartConfiguration['data']['datasets'];
    id: string;
    titleText?: string;
    subTitleText?: string;
    chartLabel?: string;
}

const RdsCompDoughnutChart = React.forwardRef<HTMLDivElement, RdsCompDoughnutProps>(function RdsCompDoughnutChart(props, ref) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const CanvasId = props.id;

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

        const title    = props.titleText    || "";
        const subTitle = props.subTitleText || "";

        const centerText = {
            id: "counter3",
            beforeDraw(chart: Chart) {
                const { ctx: c, chartArea: { top, width, height } } = chart;
                const centerY = top + height / 2;

                const primaryColor = chartTextColor();
                const mutedColor   = chartMutedColor();

                c.save();
                c.font = chartFont('bold', 'xl');
                c.textAlign = "center";
                c.fillStyle = primaryColor;
                c.fillText(title, width / 2, centerY - 10);
                c.restore();

                c.save();
                c.font = chartFont('medium', 'lg');
                c.textAlign = "center";
                c.fillStyle = mutedColor;
                c.fillText(subTitle, width / 2, centerY + 16);
                c.restore();

                c.lineJoin = 'round';
            }
        };

        const chartOptions = cloneChartOptions(props.options || {}) as any;
        
        const chartData = { labels: props.labels, datasets: props.dataSets };
        if (!chartOptions.data) {
            chartOptions.data = chartData;
        }
        
        applyChartThemeColors(chartOptions, []);

        const doughnutCanvas = new Chart(ctx, {
            type: "doughnut",
            plugins: [centerText],
            data: chartData,
            options: chartOptions,
        });

        if (doughnutCanvas !== null) {
            doughnutCanvas.canvas.style.width  = "66vh";
            doughnutCanvas.canvas.style.height = "66vh";
        }

        return () => { doughnutCanvas.destroy(); };
    }, [props.labels, props.options, props.dataSets, props.titleText, props.subTitleText, themeMode]);

    return (
        <Box ref={ref} className={joinClassNames("rds-comp-chart-doughnut", props.className)} sx={props.sx} style={props.style}>
            <canvas data-testid={CanvasId} id={CanvasId} ref={canvasRef} role="img" aria-label={props.chartLabel ?? 'Doughnut chart'} />
        </Box>
    );
});
RdsCompDoughnutChart.displayName = 'RdsCompDoughnutChart';
export default RdsCompDoughnutChart;
