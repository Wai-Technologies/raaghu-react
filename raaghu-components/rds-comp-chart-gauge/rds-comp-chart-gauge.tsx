import Chart, { type ChartOptions, type ChartDataset } from "chart.js/auto";
import {
  chartFont,
  chartMutedColor,
  chartTextColor,
} from "../chart-utils";
import { useChart } from "../use-chart";
import "./rds-comp-chart-gauge.scss";

export interface RdsCompGaugeProps {
  labels: string[];
  options: ChartOptions<"doughnut">;
  dataSets: ChartDataset<"doughnut">[];
  id: string;
  titleText?: string;
  subTitleText?: string;
  value?: number;
  maxValue?: number;
  chartLabel?: string;
}

const createGaugeTextPlugin = (title: string, subTitle: string) => ({
  id: "gaugeText",
  beforeDraw(chart: Chart) {
    const {
      ctx: canvasCtx,
      chartArea: { top, width, height },
    } = chart;
    const primaryColor = chartTextColor();
    const mutedColor = chartMutedColor();

    canvasCtx.save();
    canvasCtx.font = chartFont("bold", "xl");
    canvasCtx.textAlign = "center";
    canvasCtx.fillStyle = primaryColor;
    canvasCtx.fillText(title, width / 2, top + height / 1.5);
    canvasCtx.restore();

    canvasCtx.save();
    canvasCtx.font = chartFont("medium", "md");
    canvasCtx.textAlign = "center";
    canvasCtx.fillStyle = mutedColor;
    canvasCtx.fillText(subTitle, width / 2, top + height / 1.2);
    canvasCtx.restore();
  },
});

const RdsCompGaugeChart = ({
  labels,
  options,
  dataSets,
  id,
  titleText = "",
  subTitleText = "",
  chartLabel,
}: RdsCompGaugeProps) => {
  const { canvasRef } = useChart<"doughnut">(
    {
      type: "doughnut",
      labels,
      datasets: dataSets,
      options,
      themeAxes: [],
      plugins: [createGaugeTextPlugin(titleText, subTitleText)],
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
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
              ...chartOptions?.plugins?.legend?.labels,
            },
            ...options?.plugins?.legend,
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
    <div className="rds-comp-chart-gauge">
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
