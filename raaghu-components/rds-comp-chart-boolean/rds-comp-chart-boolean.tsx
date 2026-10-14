import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import Chart, { type ChartOptions, type ChartDataset } from "chart.js/auto";
import { ChartIcons } from "./chart-icons";
import { getCSSVar } from "../chart-utils";
import { useChart } from "../use-chart";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";

/** Props for {@link RdsCompBooleanChart}. */
export interface RdsCompBooleanChartProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** Slice labels. */
  labels: string[];
  /** Chart.js options (never mutated). */
  options: ChartOptions<"doughnut">;
  /** Chart.js doughnut datasets. */
  dataSets: ChartDataset<"doughnut">[];
  /** @deprecated It has no effect. */
  chartStyle?: string;
  /** Id of the canvas element. */
  id: string;
  /** Name of the icon drawn in the centre (a key of `ChartIcons`). No icon when missing or unknown. */
  centerIconName?: string;
  /** Accessible label of the chart. Defaults to "Boolean chart". */
  chartLabel?: string;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
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
  chartStyle,
  className,
  ref,
  ...rest
}: RdsCompBooleanChartProps) => {
  if (chartStyle !== undefined) {
    warnDeprecatedProp("RdsCompBooleanChart", "chartStyle", "nothing (it has no effect)");
  }

  const { canvasRef } = useChart(
    () => {
      const svg = ChartIcons[centerIconName];
      const dataURL = svg
        ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(resolveSvgCssVariables(svg))}`
        : "";

      const centerIcon = {
        id: "counter4",
        afterDraw(chart: Chart) {
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

      return {
        type: "doughnut",
        labels,
        datasets: dataSets,
        options,
        themeAxes: false,
        ...(svg && { plugins: [centerIcon] }),
        onCreate: (chart) => {
          chart.canvas.style.height = "var(--rds-comp-chart-boolean-size, 20vh)";
          chart.canvas.style.width = "var(--rds-comp-chart-boolean-size, 20vh)";
        },
      };
    },
    [labels, options, dataSets, centerIconName]
  );

  return (
    <div {...rest} ref={ref} className={clsx(className)}>
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
