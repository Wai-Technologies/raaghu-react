import type { HTMLAttributes, Ref } from "react";
import clsx from "clsx";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ChartData, ChartOptions, ChartDataset } from "chart.js/auto";
import { applyCanvasSize, createCenterTextPlugin, resolveChartData, resolveChartLabel } from "../chart-utils";
import { useChart } from "../use-chart";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import "./rds-comp-chart-doughnut.scss";

/** Props for {@link RdsCompDoughnutChart}. */
export interface RdsCompDoughnutProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** Chart.js data (labels and datasets). Takes precedence over `labels` and `dataSets`. */
  data?: ChartData<"doughnut">;
  /** @deprecated Use `data.labels` instead. */
  labels?: string[];
  /** Chart.js options (never mutated). */
  options: ChartOptions<"doughnut">;
  /** @deprecated Use `data.datasets` instead. */
  dataSets?: ChartDataset<"doughnut">[];
  /** Id of the canvas element. */
  id: string;
  /** Canvas height (number = px). */
  height?: string | number;
  /** Canvas width (number = px). */
  width?: string | number;
  /** Large text drawn in the centre. */
  titleText?: string;
  /** Smaller text drawn under the title. */
  subtitle?: string;
  /** @deprecated Use `subtitle` instead. */
  subTitleText?: string;
  /** Accessible label of the chart. Defaults to "Doughnut chart" followed by the title and subtitle text, if any. */
  ariaLabel?: string;
  /** @deprecated Use `ariaLabel` instead. */
  chartLabel?: string;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
  sx?: SxProps<Theme>;
}

const RdsCompDoughnutChart = ({
  data,
  labels,
  options,
  dataSets,
  id,
  height,
  width,
  titleText = "",
  subtitle,
  subTitleText,
  ariaLabel,
  chartLabel,
  className,
  ref,
  sx,
  ...rest
}: RdsCompDoughnutProps) => {
  if (subTitleText !== undefined) {
    warnDeprecatedProp("RdsCompDoughnutChart", "subTitleText", "`subtitle`");
  }
  const subTitle = subtitle ?? subTitleText ?? "";
  const resolved = resolveChartData("RdsCompDoughnutChart", data, labels, dataSets);
  const defaultLabel = ["Doughnut chart:", ...[titleText, subTitle].filter(Boolean)];
  const { canvasRef } = useChart(
    {
      type: "doughnut",
      labels: resolved.labels,
      datasets: resolved.datasets,
      options,
      themeAxes: [],
      plugins: [
        createCenterTextPlugin({
          id: "counter3",
          title: titleText,
          subTitle,
          titleY: ({ top, height }) => top + height / 2 - 10,
          subTitleY: ({ top, height }) => top + height / 2 + 16,
          lineJoin: "round",
        }),
      ],
      onCreate: (chart) => {
        chart.canvas.style.width = "66vh";
        chart.canvas.style.height = "66vh";
        applyCanvasSize(chart.canvas, height, width);
      },
    },
    [resolved.labels, options, resolved.datasets, titleText, subTitle, height, width]
  );

  return (
    <Box {...rest} ref={ref} className={clsx("rds-comp-chart-doughnut", className)} sx={sx}>
      <canvas
        data-testid={id}
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={resolveChartLabel(
          "RdsCompDoughnutChart",
          ariaLabel,
          chartLabel,
          defaultLabel.length > 1 ? defaultLabel.join(" ") : "Doughnut chart"
        )}
      />
    </Box>
  );
};

RdsCompDoughnutChart.displayName = "RdsCompDoughnutChart";
export default RdsCompDoughnutChart;
