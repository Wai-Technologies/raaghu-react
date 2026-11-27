import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import { ChartIcons } from "./chart-icons";
import { getCSSVar } from "../chart-utils";
import Box from "@mui/material/Box";
import type { RdsStylingProps } from "../../raaghu-elements/shared/utils/styling-props";

export interface RdsCompBooleanChartProps extends RdsStylingProps {
    labels: string[];
    options: ChartConfiguration['options'];
    dataSets: ChartConfiguration['data']['datasets'];
    chartStyle?: string;
    id: string;
    centerIconName?: string;
    chartLabel?: string;
}

const RdsCompBooleanChart = React.forwardRef<HTMLDivElement, RdsCompBooleanChartProps>(function RdsCompBooleanChart(props, ref) {
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
            const svg = props.centerIconName ? ChartIcons[props.centerIconName] : undefined;
            const iconImage = svg ? new Image() : null;

            const centerIcon = {
                id: "counter4",
                afterDraw(chart: Chart) {
                    if (!iconImage?.complete || !iconImage.src) return;
                    const ctx = chart.ctx;
                    ctx.save();
                    const iconSize = 30;
                    const x = chart.width / 2 - iconSize / 2;
                    const y = chart.height / 2 - iconSize / 2;
                    ctx.drawImage(iconImage, x, y, iconSize, iconSize);
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

            if (iconImage && svg) {
                iconImage.onload = () => { if (boolCanvas.ctx) boolCanvas.draw(); };
                const encodedSVG = btoa(unescape(encodeURIComponent(resolveSvgCssVariables(svg))));
                iconImage.src = `data:image/svg+xml;base64,${encodedSVG}`;
            }

            if (boolCanvas !== null) {
                boolCanvas.canvas.style.height = "var(--rds-comp-chart-boolean-size, 20vh)";
                boolCanvas.canvas.style.width = "var(--rds-comp-chart-boolean-size, 20vh)";
            }
            return () => {
                if (iconImage) iconImage.onload = null;
                boolCanvas.destroy();
            };
        }
    }, [props.labels, props.options, props.dataSets, props.centerIconName, themeMode]);

    return (
        <Box ref={ref} className={props.className} sx={props.sx} style={props.style}>
            <canvas data-testid={CanvasId} id={CanvasId} ref={canvasRef} role="img" aria-label={props.chartLabel ?? 'Boolean chart'} />
        </Box>
    );
});
RdsCompBooleanChart.displayName = 'RdsCompBooleanChart';
export default RdsCompBooleanChart;