import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import Chart, { type ChartOptions, type ChartDataset } from "chart.js/auto";
import { chartFont, chartMutedColor, chartTextColor } from "../chart-utils";
import { useChart } from "../use-chart";
import "./rds-comp-chart-doughnut.scss";

/** Props for {@link RdsCompDoughnutChart}. */
export interface RdsCompDoughnutProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** Slice labels. */
  labels: string[];
  /** Chart.js options (never mutated). */
  options: ChartOptions<"doughnut">;
  /** Chart.js doughnut datasets. */
  dataSets: ChartDataset<"doughnut">[];
  /** Id of the canvas element. */
  id: string;
  /** Large text drawn in the centre. */
  titleText?: string;
  /** Smaller text drawn under the title. */
  subTitleText?: string;
  /** Accessible label of the chart. Defaults to "Doughnut chart" followed by the title and subtitle text, if any. */
  chartLabel?: string;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
}

const createCenterTextPlugin = (title: string, subTitle: string) => ({
  id: "counter3",
  beforeDraw(chart: Chart) {
    const {
      ctx: canvasCtx,
      chartArea: { top, width, height },
    } = chart;
    const centerY = top + height / 2;
    const primaryColor = chartTextColor();
    const mutedColor = chartMutedColor();

    canvasCtx.save();
    canvasCtx.font = chartFont("bold", "xl");
    canvasCtx.textAlign = "center";
    canvasCtx.fillStyle = primaryColor;
    canvasCtx.fillText(title, width / 2, centerY - 10);
    canvasCtx.restore();

    canvasCtx.save();
    canvasCtx.font = chartFont("medium", "lg");
    canvasCtx.textAlign = "center";
    canvasCtx.fillStyle = mutedColor;
    canvasCtx.fillText(subTitle, width / 2, centerY + 16);
    canvasCtx.restore();

    canvasCtx.lineJoin = "round";
  },
});

const RdsCompDoughnutChart = ({
  labels,
  options,
  dataSets,
  id,
  titleText = "",
  subTitleText = "",
  chartLabel,
  className,
  ref,
  ...rest
}: RdsCompDoughnutProps) => {
  const defaultLabel = [
    "Doughnut chart:",
    ...[titleText, subTitleText].filter(Boolean),
  ];
  const { canvasRef } = useChart(
    {
      type: "doughnut",
      labels,
      datasets: dataSets,
      options,
      themeAxes: [],
      plugins: [createCenterTextPlugin(titleText, subTitleText)],
      onCreate: (chart) => {
        chart.canvas.style.width = "66vh";
        chart.canvas.style.height = "66vh";
      },
    },
    [labels, options, dataSets, titleText, subTitleText]
  );

  return (
    <div {...rest} ref={ref} className={clsx("rds-comp-chart-doughnut", className)}>
      <canvas
        data-testid={id}
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={
          chartLabel ??
          (defaultLabel.length > 1 ? defaultLabel.join(" ") : "Doughnut chart")
        }
      />
    </div>
  );
};

RdsCompDoughnutChart.displayName = "RdsCompDoughnutChart";
export default RdsCompDoughnutChart;
