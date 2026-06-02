import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { applyChartThemeColors, chartTextColor, chartMutedColor, chartFont } from "../chart-utils";
import "./rds-comp-chart-doughnut.scss";

export interface RdsCompDoughnutProps {
    labels: any[];
    options: any;
    dataSets: any[];
    id: string;
    titleText?: string;
    subTitleText?: string;
    chartLabel?: string;
}

const RdsCompDoughnutChart = (props: RdsCompDoughnutProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const CanvasId = props.id;

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

        const title    = props.titleText    || "";
        const subTitle = props.subTitleText || "";

        const centerText = {
            id: "counter3",
            beforeDraw(chart: any) {
                const { ctx: c, chartArea: { top, width, height } } = chart;
                const centerY = top + height / 2;

                // Read colors from CSS vars at draw time — responds to theme changes
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

        const chartOptions = JSON.parse(JSON.stringify(props.options || {}));
        
        // Prepare chart data with datasets so applyChartThemeColors can resolve colors
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
    }, [props, themeMode]);

    return (
        <div className="rds-comp-chart-doughnut">
            <canvas data-testid={CanvasId} id={CanvasId} ref={canvasRef} role="img" aria-label={props.chartLabel ?? 'Doughnut chart'} />
        </div>
    );
};
RdsCompDoughnutChart.displayName = 'RdsCompDoughnutChart';
export default RdsCompDoughnutChart;
