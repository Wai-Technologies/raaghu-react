import type { HTMLAttributes, ReactNode, Ref } from "react";
import clsx from "clsx";
import Chart, { type ChartData, type ChartOptions, type ChartDataset } from "chart.js/auto";
import { ChartIcons } from "./chart-icons";
import { applyCanvasSize, getCSSVar, resolveChartData, resolveChartLabel } from "../chart-utils";
import { useChart } from "../use-chart";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";

/** Props for {@link RdsCompBooleanChart}. */
export interface RdsCompBooleanChartProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** Chart.js data (labels and datasets). Takes precedence over `labels` and `dataSets`. */
  data?: ChartData<"doughnut">;
  /** @deprecated Use `data.labels` instead. */
  labels?: string[];
  /** Chart.js options (never mutated). */
  options: ChartOptions<"doughnut">;
  /** @deprecated Use `data.datasets` instead. */
  dataSets?: ChartDataset<"doughnut">[];
  /** @deprecated It has no effect. */
  chartStyle?: string;
  /** Id of the canvas element. */
  id: string;
  /** Canvas height (number = px). */
  height?: string | number;
  /** Canvas width (number = px). */
  width?: string | number;
  /** Node shown over the centre of the chart. Takes precedence over `centerIconName`. */
  centerIcon?: ReactNode;
  /** @deprecated Use `centerIcon` instead. Name of the icon drawn in the centre (a key of `ChartIcons`). */
  centerIconName?: string;
  /** Accessible label of the chart. Defaults to "Boolean chart". */
  ariaLabel?: string;
  /** @deprecated Use `ariaLabel` instead. */
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
  data,
  labels,
  options,
  dataSets,
  id,
  height,
  width,
  centerIcon,
  centerIconName,
  ariaLabel,
  chartLabel,
  chartStyle,
  className,
  ref,
  ...rest
}: RdsCompBooleanChartProps) => {
  if (chartStyle !== undefined) {
    warnDeprecatedProp("RdsCompBooleanChart", "chartStyle", "nothing (it has no effect)");
  }
  if (centerIconName !== undefined) {
    warnDeprecatedProp("RdsCompBooleanChart", "centerIconName", "`centerIcon`");
  }
  const resolved = resolveChartData("RdsCompBooleanChart", data, labels, dataSets);
  const hasCenterIcon = centerIcon !== undefined && centerIcon !== null;
  const iconName = hasCenterIcon ? "" : (centerIconName ?? "");

  const { canvasRef } = useChart(
    () => {
      const svg = ChartIcons[iconName];
      const dataURL = svg
        ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(resolveSvgCssVariables(svg))}`
        : "";

      const centerIconPlugin = {
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
        labels: resolved.labels,
        datasets: resolved.datasets,
        options,
        themeAxes: false,
        ...(svg && { plugins: [centerIconPlugin] }),
        onCreate: (chart) => {
          chart.canvas.style.height = "var(--rds-comp-chart-boolean-size, 20vh)";
          chart.canvas.style.width = "var(--rds-comp-chart-boolean-size, 20vh)";
          applyCanvasSize(chart.canvas, height, width);
        },
      };
    },
    [resolved.labels, options, resolved.datasets, iconName, height, width, hasCenterIcon]
  );

  const canvas = (
    <canvas
      data-testid={id}
      id={id}
      ref={canvasRef}
      role="img"
      aria-label={resolveChartLabel("RdsCompBooleanChart", ariaLabel, chartLabel, "Boolean chart")}
    />
  );

  return (
    <div {...rest} ref={ref} className={clsx(className)}>
      {hasCenterIcon ? (
        <span style={{ position: "relative", display: "inline-block" }}>
          {canvas}
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            {centerIcon}
          </span>
        </span>
      ) : (
        canvas
      )}
    </div>
  );
};

RdsCompBooleanChart.displayName = "RdsCompBooleanChart";
export default RdsCompBooleanChart;
