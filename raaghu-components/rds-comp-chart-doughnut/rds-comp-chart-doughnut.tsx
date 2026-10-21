import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import type { ChartOptions, ChartDataset } from "chart.js/auto";
import { createCenterTextPlugin } from "../chart-utils";
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
      plugins: [
        createCenterTextPlugin({
          id: "counter3",
          title: titleText,
          subTitle: subTitleText,
          titleY: ({ top, height }) => top + height / 2 - 10,
          subTitleY: ({ top, height }) => top + height / 2 + 16,
          lineJoin: "round",
        }),
      ],
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
