import React, { useEffect, useRef } from "react";
import Chart, { type ChartOptions, type ChartDataset } from "chart.js/auto";
import Box from "@mui/material/Box";
import type { RdsStylingProps } from "../../raaghu-elements/shared/utils/styling-props";
import {
  applyChartThemeColors,
  attachChartData,
  cloneChartOptions,
  useChartThemeMode,
} from "../chart-utils";
import "./rds-comp-chart-bubble.scss";

export interface RdsCompBubbleChartProps extends RdsStylingProps {
  id: string;
  labels: string[];
  options: ChartOptions<"bubble">;
  dataSets: ChartDataset<"bubble">[];
  chartLabel?: string;
}

const RdsCompBubbleChart = React.forwardRef<HTMLDivElement, RdsCompBubbleChartProps>(function RdsCompBubbleChart({
  id,
  labels,
  options,
  dataSets,
  chartLabel,
  className,
  sx,
  style,
}, ref) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeMode = useChartThemeMode();

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const chartOptions = cloneChartOptions(options);
    const chartData = { labels, datasets: dataSets };

    attachChartData(chartOptions as { data?: unknown }, chartData);
    applyChartThemeColors(chartOptions as any);

    const bubbleCanvas = new Chart(ctx, {
      type: "bubble",
      data: chartData,
      options: chartOptions,
    });

    return () => {
      bubbleCanvas.destroy();
    };
  }, [id, labels, options, dataSets, themeMode]);

  return (
    <Box ref={ref} className={className} sx={sx} style={style}>
      <canvas
        data-testid={id}
        id={id}
        ref={canvasRef}
        width={300}
        height={300}
        role="img"
        aria-label={chartLabel ?? "Bubble chart"}
      />
    </Box>
  );
});

RdsCompBubbleChart.displayName = "RdsCompBubbleChart";
export default RdsCompBubbleChart;
