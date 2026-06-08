import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import { applyChartThemeColors, chartTextColor, chartMutedColor, chartFont } from "../chart-utils";
import "./rds-comp-chart-gauge.scss";

export interface RdsCompGaugeProps {
    labels: string[];
    options: ChartConfiguration['options'];
    dataSets: ChartConfiguration['data']['datasets'];
    id: string;
    titleText?: string;
    subTitleText?: string;
    value?: number;
    maxValue?: number;
    chartLabel?: string;
}

const RdsCompGaugeChart = (props: RdsCompGaugeProps) => {
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
            id: "gaugeText",
            beforeDraw(chart: Chart) {
                const { ctx: c, chartArea: { top, width, height } } = chart;

                // Read colors from CSS vars at draw time — responds to theme changes
                const primaryColor = chartTextColor();
                const mutedColor   = chartMutedColor();

                c.save();
                c.font = chartFont('bold', 'xl');
                c.textAlign = "center";
                c.fillStyle = primaryColor;
                c.fillText(title, width / 2, top + (height / 1.5));
                c.restore();

                c.save();
                c.font = chartFont('medium', 'md');
                c.textAlign = "center";
                c.fillStyle = mutedColor;
                c.fillText(subTitle, width / 2, top + (height / 1.2));
                c.restore();
            }
        };

        const chartOptions = JSON.parse(JSON.stringify(props.options || {}));
        
        // Prepare chart data with datasets so applyChartThemeColors can resolve colors
        const chartData = { labels: props.labels, datasets: props.dataSets };
        if (!chartOptions.data) {
            chartOptions.data = chartData;
        }
        
        applyChartThemeColors(chartOptions, []);

        const gaugeCanvas = new Chart(ctx, {
            type: "doughnut",
            plugins: [centerText],
            data: chartData,
            options: {
                ...chartOptions,
                rotation: -90,
                circumference: 180,
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    ...chartOptions?.plugins,
                    legend: {
                        display: chartOptions?.plugins?.legend?.display !== false,
                        position: "top",
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            ...chartOptions?.plugins?.legend?.labels,
                        },
                        ...props.options?.plugins?.legend,
                    },
                },
            },
        });

        if (gaugeCanvas !== null) {
            gaugeCanvas.canvas.style.width  = "45vh";
            gaugeCanvas.canvas.style.height = "45vh";
        }

        return () => { gaugeCanvas.destroy(); };
    }, [props, themeMode]);

    return (
        <div className="rds-comp-chart-gauge">
            <canvas data-testid={CanvasId} id={CanvasId} ref={canvasRef} role="img" aria-label={props.chartLabel ?? 'Gauge chart'} />
        </div>
    );
};
RdsCompGaugeChart.displayName = 'RdsCompGaugeChart';
export default RdsCompGaugeChart;
