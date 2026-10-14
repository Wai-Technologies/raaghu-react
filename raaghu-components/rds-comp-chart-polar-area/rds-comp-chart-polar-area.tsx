import { type ChartOptions, type ChartDataset } from "chart.js/auto";
import { useChart } from "../use-chart";
import "./rds-comp-chart-polar-area.scss";

export interface RdsCompPolarAreaChartProps {
  labels: string[];
  options: ChartOptions<"polarArea">;
  dataSets: ChartDataset<"polarArea">[];
  radius?: number;
  id: string;
  chartLabel?: string;
}

const RdsCompPolarAreaChart = ({
  labels,
  options,
  dataSets,
  radius,
  id,
  chartLabel,
}: RdsCompPolarAreaChartProps) => {
  const { canvasRef } = useChart(
    {
      type: "polarArea",
      labels,
      datasets: dataSets,
      options,
      themeAxes: [],
      onCreate: (chart) => {
        chart.canvas.style.height = `${radius}px`;
      },
    },
    [labels, options, dataSets, radius, id]
  );

  return (
    <div className="rds-comp-chart-polar-area-container">
      <canvas
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={chartLabel ?? "Polar area chart"}
      />
    </div>
  );
};

RdsCompPolarAreaChart.displayName = "RdsCompPolarAreaChart";
export default RdsCompPolarAreaChart;
