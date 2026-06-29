import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import { ChartIcons } from "./chart-icons";
import { getCSSVar } from "../chart-utils";

export interface RdsCompBooleanChartProps {
    labels: string[];
    options: ChartConfiguration['options'];
    dataSets: ChartConfiguration['data']['datasets'];
    chartStyle?: string;
    id: string;
    centerIconName?: string;
    chartLabel?: string;
}

const RdsCompBooleanChart = (props: RdsCompBooleanChartProps) => {
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

    /**
     * Resolves CSS variables in SVG by replacing them with computed color values.
     * Handles var(--variable-name) syntax.
     */
    function resolveSvgCssVariables(svgString: string): string {
        let result = svgString;
        let searchFrom = 0;
        while (true) {
            const varStart = result.indexOf('var(', searchFrom);
            if (varStart === -1) break;
            const openParen = varStart + 4;
            const closeParen = result.indexOf(')', openParen);
            if (closeParen === -1) break;
            const inner = result.slice(openParen, closeParen);
            const commaIdx = inner.indexOf(',');
            const varName = (commaIdx === -1 ? inner : inner.slice(0, commaIdx)).trim();
            const fallback = commaIdx === -1 ? '' : inner.slice(commaIdx + 1).trim();
            const resolvedColor = getCSSVar(varName, fallback);
            result = result.slice(0, varStart) + resolvedColor + result.slice(closeParen + 1);
            searchFrom = varStart + resolvedColor.length;
        }
        return result;
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
                afterDraw(chart: Chart) {
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
            <canvas data-testid={CanvasId} id={CanvasId} ref={canvasRef} role="img" aria-label={props.chartLabel ?? 'Boolean chart'} />
        </div>
    );
};
RdsCompBooleanChart.displayName = 'RdsCompBooleanChart';
export default RdsCompBooleanChart;