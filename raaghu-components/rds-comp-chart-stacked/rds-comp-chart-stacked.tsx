import { useChart } from "../use-chart";
import "./rds-comp-chart-stacked.scss";

export interface RdsCompStackedProps {
  labels: any[];
  options: any;
  dataSets: any[];
  id: string;
  chartLabel?: string;
}

const RdsCompStackedChart = ({
  labels,
  options,
  dataSets,
  id,
  chartLabel,
}: RdsCompStackedProps) => {
  const { canvasRef } = useChart<"bar">(
    {
      type: "bar",
      labels,
      datasets: dataSets,
      options,
      overrides: (chartOptions) => ({
        maintainAspectRatio: false,
        scales: {
          ...(chartOptions?.scales || {}),
          x: {
            ...(chartOptions?.scales?.x || {}),
            offset: true,
            categoryPercentage: 0.1,
            barPercentage: 0.1,
            ticks: {
              ...(chartOptions?.scales?.x?.ticks || {}),
              padding: 20,
              align: "center",
            },
          },
        },
      }),
    },
    [labels, dataSets, options]
  );

  return (
    <div className="stack-chart-container">
      <canvas
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={chartLabel ?? "Stacked chart"}
      />
    </div>
  );
};

RdsCompStackedChart.displayName = "RdsCompStackedChart";
export default RdsCompStackedChart;
