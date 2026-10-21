import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import type { ChartOptions, ChartDataset } from "chart.js/auto";
import { createCenterTextPlugin } from "../chart-utils";
import { useChart } from "../use-chart";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import "./rds-comp-chart-gauge.scss";

/** Props for {@link RdsCompGaugeChart}. */
export interface RdsCompGaugeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** Segment labels. */
  labels: string[];
  /** Chart.js options (never mutated). The gauge always uses `rotation: -90` and `circumference: 180`. */
  options: ChartOptions<"doughnut">;
  /** Chart.js doughnut datasets that draw the gauge. */
  dataSets: ChartDataset<"doughnut">[];
  /** Id of the canvas element. */
  id: string;
  /** Large text drawn in the gauge. */
  titleText?: string;
  /** Smaller text drawn under the title. */
  subTitleText?: string;
  /** @deprecated Has no effect. Put the value in `dataSets` (e.g. `data: [value, maxValue - value]`). */
  value?: number;
  /** @deprecated Has no effect. Put the value in `dataSets` (e.g. `data: [value, maxValue - value]`). */
  maxValue?: number;
  /** Accessible label of the chart. Default "Gauge chart". */
  chartLabel?: string;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
}

const RdsCompGaugeChart = ({
  labels,
  options,
  dataSets,
  id,
  titleText = "",
  subTitleText = "",
  value,
  maxValue,
  chartLabel,
  className,
  ref,
  ...rest
}: RdsCompGaugeProps) => {
  if (value !== undefined) warnDeprecatedProp("RdsCompGaugeChart", "value", "`dataSets`");
  if (maxValue !== undefined) warnDeprecatedProp("RdsCompGaugeChart", "maxValue", "`dataSets`");

  const { canvasRef } = useChart<"doughnut">(
    {
      type: "doughnut",
      labels,
      datasets: dataSets,
      options,
      themeAxes: [],
      plugins: [
        createCenterTextPlugin({
          id: "gaugeText",
          title: titleText,
          subTitle: subTitleText,
          titleY: ({ top, height }) => top + height / 1.5,
          subTitleY: ({ top, height }) => top + height / 1.2,
          subTitleSize: "md",
        }),
      ],
      overrides: (chartOptions) => ({
        rotation: -90,
        circumference: 180,
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          ...chartOptions?.plugins,
          legend: {
            display: chartOptions?.plugins?.legend?.display !== false,
            position: "top",
            // The themed copy of the consumer's legend; its `labels` are merged below so the theme colour stays.
            ...chartOptions?.plugins?.legend,
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
              ...chartOptions?.plugins?.legend?.labels,
            },
          },
        },
      }),
      onCreate: (chart) => {
        chart.canvas.style.width = "45vh";
        chart.canvas.style.height = "45vh";
      },
    },
    [labels, options, dataSets, titleText, subTitleText]
  );

  return (
    <div {...rest} ref={ref} className={clsx("rds-comp-chart-gauge", className)}>
      <canvas
        data-testid={id}
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={chartLabel ?? "Gauge chart"}
      />
    </div>
  );
};

RdsCompGaugeChart.displayName = "RdsCompGaugeChart";
export default RdsCompGaugeChart;
