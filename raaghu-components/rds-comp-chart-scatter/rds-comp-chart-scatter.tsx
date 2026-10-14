import { ChartConfiguration, type ChartData } from "chart.js/auto";
import { useChart } from "../use-chart";
import "./rds-comp-chart-scatter.scss";
import { resolveScatterChartType, type ScatterChartType } from "./rds-comp-chart-scatter-utils";

export type { ScatterChartType } from "./rds-comp-chart-scatter-utils";

function resolveDatasetColor(
  color: unknown,
  fallback: string
): string {
  if (Array.isArray(color)) {
    return (color[0] as string) ?? fallback;
  }
  return typeof color === "string" ? color : fallback;
}

function normalizeScatterDataset(
  dataset: any,
  chartType: ScatterChartType
) {
  const normalized = {
    ...dataset,
    type: chartType,
  };

  if (chartType !== "line") {
    return normalized;
  }

  const lineColor = resolveDatasetColor(
    dataset.borderColor ?? dataset.backgroundColor,
    "rgb(255, 99, 132)"
  );

  return {
    ...normalized,
    showLine: true,
    fill: false,
    borderColor: lineColor,
    borderWidth: dataset.borderWidth ?? 2,
    pointBackgroundColor: resolveDatasetColor(
      dataset.pointBackgroundColor ?? dataset.backgroundColor,
      lineColor
    ),
    pointBorderColor: resolveDatasetColor(
      dataset.pointBorderColor ?? dataset.backgroundColor,
      lineColor
    ),
  };
}

export interface RdsCompScatterChartProps {
  labels: any[];
  options: ChartConfiguration["options"];
  dataSets: ChartConfiguration["data"]["datasets"];
  id: string;
  chartLabel?: string;
  chartType?: ScatterChartType;
}

const RdsCompScatterChart = ({
  id,
  labels,
  options,
  dataSets,
  chartLabel,
  chartType,
}: RdsCompScatterChartProps) => {
  const resolvedChartType = resolveScatterChartType(chartType);
  const { canvasRef } = useChart<ScatterChartType>(
    {
      type: resolvedChartType,
      labels,
      datasets: dataSets.map((dataset) =>
        normalizeScatterDataset(dataset, resolvedChartType)
      ) as ChartData<ScatterChartType>["datasets"],
      options: options as ChartConfiguration<ScatterChartType>["options"],
    },
    [id, labels, options, dataSets, chartType]
  );

  return (
    <div className="rds-comp-chart-scatter">
      <canvas
        id={id}
        ref={canvasRef}
        role="img"
        aria-label={chartLabel ?? "Scatter chart"}
      />
    </div>
  );
};

RdsCompScatterChart.displayName = "RdsCompScatterChart";
export default RdsCompScatterChart;
