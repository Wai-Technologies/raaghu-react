import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { ChartIcons } from "./chart-icons";
import { getCSSVar } from "../chart-utils";

export interface RdsCompBooleanChartProps {
    labels: any[];
    options: any;
    dataSets: any[];
    chartStyle?: string;
    id: string;
    centerIconName?: string;
}

const RdsCompBooleanChart = (props: RdsCompBooleanChartProps) => {
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

    /**
     * Resolves CSS variables in SVG by replacing them with computed color values.
     * Handles var(--variable-name) syntax.
     */
    function resolveSvgCssVariables(svgString: string): string {
        return svgString.replace(/var\(([^,)]+)(?:,\s*([^)]+))?\)/g, (match, varName, fallback) => {
            const cleanVarName = varName.trim();
            const cleanFallback = fallback ? fallback.trim() : '';
            const resolvedColor = getCSSVar(cleanVarName, cleanFallback);
            return resolvedColor;
        });
    }

    useEffect(() => {
        const canvasElm = canvasRef.current;
        const ctx = canvasElm?.getContext("2d");

        if (ctx) {
            // Resolve SVG and encode for this theme
            const svg = ChartIcons[props.centerIconName || ""];
            const resolvedSvg = resolveSvgCssVariables(svg);
            const encodedSVG = btoa(unescape(encodeURIComponent(resolvedSvg)));
            const dataURL = `data:image/svg+xml;base64,${encodedSVG}`;

            const centerIcon = {
                id: "counter4",
                afterDraw(chart: any) {
                    const ctx = chart.ctx;
                    ctx.save();
                    const myIconImage = new Image();
                    myIconImage.src = dataURL;
                    const iconSize = 30;
                    const x = chart.width / 2 - iconSize / 2;
                    const y = chart.height / 2 - iconSize / 2;
                    ctx.drawImage(myIconImage, x, y, iconSize, iconSize);
                    ctx.restore();
                },
            };

            const boolCanvas = new Chart(ctx, {
                type: "doughnut",
                plugins: [centerIcon],
                data: {
                    labels: props.labels,
                    datasets: props.dataSets,
                },
                options: props.options,
            });

            if (boolCanvas !== null) {
                boolCanvas.canvas.style.height = "var(--rds-comp-chart-boolean-size, 20vh)";
                boolCanvas.canvas.style.width = "var(--rds-comp-chart-boolean-size, 20vh)";
            }
            return () => {
                boolCanvas.destroy();
            };
        }
    }, [props, themeMode]);

    return (
        <div>
            <canvas data-testid={CanvasId} id={CanvasId} ref={canvasRef} />
        </div>
    );
};
RdsCompBooleanChart.displayName = 'RdsCompBooleanChart';
export default RdsCompBooleanChart;