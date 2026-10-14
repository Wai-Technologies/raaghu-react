import { type ChartOptions, type ChartDataset, type ChartData } from "chart.js/auto";
import { useChart } from "../use-chart";
import "./rds-comp-chart-mixed.scss";

export interface RdsCompMixedChartProps {
  labels: string[];
  options: ChartOptions<"bar">;
  dataSets: ChartDataset[];
  id: string;
  chartLabel?: string;
}

const RdsCompMixedChart = ({
  labels,
  options,
  dataSets,
  id,
  chartLabel,
}: RdsCompMixedChartProps) => {
  const { canvasRef } = useChart(
    {
      type: "bar",
      labels,
      datasets: dataSets as ChartData<"bar">["datasets"],
      options,
    },
    [labels, options, dataSets, id]
  );

  return (
    <div className="rds-comp-chart-mixed">
      <canvas
        className="rds-chart-canvas"
        data-testid={id}
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={chartLabel ?? "Mixed chart"}
      />
    </div>
  );
};

RdsCompMixedChart.displayName = "RdsCompMixedChart";
export default RdsCompMixedChart;
