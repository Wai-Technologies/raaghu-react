import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { ChartIcons } from "./chart-icons";
import { getCSSVar, useChartThemeMode } from "../chart-utils";

export interface RdsCompBooleanChartProps {
  labels: any[];
  options: any;
  dataSets: any[];
  chartStyle?: string;
  id: string;
  centerIconName?: string;
  chartLabel?: string;
}

/** Resolves CSS variables in SVG by replacing them with computed color values. */
function resolveSvgCssVariables(svgString: string): string {
  return svgString.replace(/var\(([^,)]+)(?:,\s*([^)]+))?\)/g, (_match, varName, fallback) => {
    const cleanVarName = varName.trim();
    const cleanFallback = fallback ? fallback.trim() : "";
    return getCSSVar(cleanVarName, cleanFallback);
  });
}

const RdsCompBooleanChart = ({
  labels,
  options,
  dataSets,
  id,
  centerIconName = "",
  chartLabel,
}: RdsCompBooleanChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeMode = useChartThemeMode();

  useEffect(() => {
    const canvasElm = canvasRef.current;
    const ctx = canvasElm?.getContext("2d");
    if (!ctx) return;

    const svg = ChartIcons[centerIconName];
    const resolvedSvg = resolveSvgCssVariables(svg);
    const encodedSVG = btoa(unescape(encodeURIComponent(resolvedSvg)));
    const dataURL = `data:image/svg+xml;base64,${encodedSVG}`;

    const centerIcon = {
      id: "counter4",
      afterDraw(chart: any) {
        const chartCtx = chart.ctx;
        chartCtx.save();
        const myIconImage = new Image();
        myIconImage.src = dataURL;
        const iconSize = 30;
        const x = chart.width / 2 - iconSize / 2;
        const y = chart.height / 2 - iconSize / 2;
        chartCtx.drawImage(myIconImage, x, y, iconSize, iconSize);
        chartCtx.restore();
      },
    };

    const boolCanvas = new Chart(ctx, {
      type: "doughnut",
      plugins: [centerIcon],
      data: {
        labels,
        datasets: dataSets,
      },
      options,
    });

    boolCanvas.canvas.style.height = "var(--rds-comp-chart-boolean-size, 20vh)";
    boolCanvas.canvas.style.width = "var(--rds-comp-chart-boolean-size, 20vh)";

    return () => {
      boolCanvas.destroy();
    };
  }, [labels, options, dataSets, centerIconName, themeMode]);

  return (
    <div>
      <canvas
        data-testid={id}
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={chartLabel ?? "Boolean chart"}
      />
    </div>
  );
};

RdsCompBooleanChart.displayName = "RdsCompBooleanChart";
export default RdsCompBooleanChart;
