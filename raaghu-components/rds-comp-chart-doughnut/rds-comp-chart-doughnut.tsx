import { useEffect, useRef } from "react";
import Chart, { type ChartOptions, type ChartDataset } from "chart.js/auto";
import {
  applyChartThemeColors,
  attachChartData,
  chartFont,
  chartMutedColor,
  chartTextColor,
  cloneChartOptions,
  useChartThemeMode,
} from "../chart-utils";
import "./rds-comp-chart-doughnut.scss";

export interface RdsCompDoughnutProps {
  labels: string[];
  options: ChartOptions<"doughnut">;
  dataSets: ChartDataset<"doughnut">[];
  id: string;
  titleText?: string;
  subTitleText?: string;
  chartLabel?: string;
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
}: RdsCompDoughnutProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeMode = useChartThemeMode();

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const chartOptions = cloneChartOptions(options);
    const chartData = { labels, datasets: dataSets };

    attachChartData(chartOptions, chartData);
    applyChartThemeColors(chartOptions, []);

    const doughnutCanvas = new Chart(ctx, {
      type: "doughnut",
      plugins: [createCenterTextPlugin(titleText, subTitleText)],
      data: chartData,
      options: chartOptions,
    });

    doughnutCanvas.canvas.style.width = "66vh";
    doughnutCanvas.canvas.style.height = "66vh";

    return () => {
      doughnutCanvas.destroy();
    };
  }, [labels, options, dataSets, titleText, subTitleText, themeMode]);

  return (
    <div className="rds-comp-chart-doughnut">
      <canvas
        data-testid={id}
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={chartLabel ?? "Doughnut chart"}
      />
    </div>
  );
};

RdsCompDoughnutChart.displayName = "RdsCompDoughnutChart";
export default RdsCompDoughnutChart;
