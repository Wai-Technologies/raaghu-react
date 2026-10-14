import Chart, { type ChartOptions, type ChartDataset } from "chart.js/auto";
import { getCSSVar } from "../chart-utils";
import { useChart } from "../use-chart";
import "./rds-comp-chart-line.scss";

export interface RdsCompLineProps {
  labels: string[];
  options: ChartOptions<"line">;
  dataSets: ChartDataset<"line">[];
  id: string;
  chartLabel?: string;
}

const applyLineCanvasSizing = (chart: Chart, chartId: string) => {
  if (chartId === "linechart1") {
    chart.canvas.style.height = "65vh";
    chart.canvas.style.width = "100vh";
    return;
  }

  if (chartId === "linechart2") {
    const smallSize = getCSSVar("--rds-spacing-2xl", "50px");
    chart.canvas.style.height = smallSize;
    chart.canvas.style.width = smallSize;
    return;
  }

  chart.canvas.style.height = "76vh";
  chart.canvas.style.width = "100vh";
};

const RdsCompLineChart = ({
  labels,
  options,
  dataSets,
  id,
  chartLabel,
}: RdsCompLineProps) => {
  const { canvasRef } = useChart(
    {
      type: "line",
      labels,
      datasets: dataSets,
      options,
      onCreate: (chart) => applyLineCanvasSizing(chart, id),
    },
    [labels, options, dataSets, id]
  );

  return (
    <div className="rds-comp-chart-line">
      <canvas
        data-testid={id}
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={chartLabel ?? "Line chart"}
      />
    </div>
  );
};

RdsCompLineChart.displayName = "RdsCompLineChart";
export default RdsCompLineChart;
