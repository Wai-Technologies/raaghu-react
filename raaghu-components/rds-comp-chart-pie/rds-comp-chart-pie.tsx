import { type ChartOptions, type ChartDataset } from "chart.js/auto";
import { useChart } from "../use-chart";
import "./rds-comp-chart-pie.scss";

export interface RdsCompPieProps {
  labels: string[];
  options: ChartOptions<"pie">;
  dataSets: ChartDataset<"pie">[];
  radius: number;
  id: string;
  chartLabel?: string;
}

const RdsCompPieChart = ({
  labels,
  options,
  dataSets,
  radius,
  id,
  chartLabel,
}: RdsCompPieProps) => {
  const { canvasRef } = useChart(
    {
      type: "pie",
      labels,
      datasets: dataSets,
      options,
      themeAxes: [],
      overrides: { radius },
    },
    [labels, options, dataSets, radius, id]
  );

  return (
    <div className="rds-comp-chart-pie">
      <div className="chart-container">
        <canvas
          id={id}
          ref={canvasRef}
          role="img"
          aria-label={chartLabel ?? "Pie chart"}
        />
      </div>
    </div>
  );
};

RdsCompPieChart.displayName = "RdsCompPieChart";
export default RdsCompPieChart;
