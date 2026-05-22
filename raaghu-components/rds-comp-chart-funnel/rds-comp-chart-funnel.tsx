import React from "react";
import { FunnelChart } from "@mui/x-charts-pro/FunnelChart";
import "./rds-comp-chart-funnel.scss";

export interface RdsCompFunnelChartProps {
  series?: any[];
  gap?: number;
  id: string;
  labels?: any[];
  dataSets?: any[];
}

const RdsCompFunnelChart = (props: RdsCompFunnelChartProps) => {
  const computedSeries = React.useMemo(() => {
    if (props.series && props.series.length > 0) {
      return props.series;
    }

    const firstDataSet = props.dataSets?.[0];
    const values = Array.isArray(firstDataSet?.data) ? firstDataSet.data : [];
    const labels = Array.isArray(props.labels) ? props.labels : [];
    const colors = Array.isArray(firstDataSet?.backgroundColor) ? firstDataSet.backgroundColor : [];

    return [
      {
        curve: "bump",
        variant: "filled",
        data: values.map((value: number, index: number) => ({
          value,
          label: labels[index] ?? `Stage ${index + 1}`,
          color: colors[index],
        })),
      },
    ];
  }, [props.series, props.dataSets, props.labels]);

  return (
    <div className="rds-comp-chart-funnel" data-testid={props.id} id={props.id}>
      <FunnelChart series={computedSeries} gap={props.gap ?? 0} />
    </div>
  );
};

RdsCompFunnelChart.displayName = "RdsCompFunnelChart";
export default RdsCompFunnelChart;
