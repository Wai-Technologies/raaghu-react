// import React, { useEffect } from "react";
// import Chart from "chart.js/auto";
// import "./rds-chart-area.css";

// export interface lineprops {
//     labels: any[],
//     options: any,
//     dataSets: any[],
//     height?: number,
//     width?: number,
//     id: string,
//     isGradient: boolean,
// }

// const RdsAreaChart = (props: lineprops) => {
//     const CanvasId = props.id;
//     let ctx;

//     useEffect(() => {
//         const canvasElm = document.getElementById(
//             CanvasId
//         ) as HTMLCanvasElement | null;
//         ctx = canvasElm?.getContext("2d") as CanvasRenderingContext2D;

//         const AreaCanvas = new Chart(ctx, {
//             type: "line",
//             data: {
//                 labels: props.labels,
//                 datasets: props.dataSets
//             },
//             options: props.options,
//         });
//         AreaCanvas.canvas.style.height = props.height + "px";
//         AreaCanvas.canvas.style.width = props.width + "px";
//     });

//     return (
//         <div>
//             <canvas id={CanvasId} ref={ctx} />
//         </div>
//     );
// };

// export default RdsAreaChart;


import React, { useEffect, useRef } from "react";
import Chart, { ChartData, ChartOptions } from "chart.js/auto";
import "./rds-chart-area.css";

export interface LineProps {
  labels: any[];
  options: ChartOptions<"line">; // Explicitly typing options for a line chart
  dataSets: ChartData<"line">["datasets"]; // Explicitly typing datasets for a line chart
  height?: number;
  width?: number;
  id: string;
  isGradient: boolean;
}

const RdsAreaChart = (props: LineProps) => {
  const chartRef = useRef<Chart<"line"> | null>(null); // Ref to store the chart instance
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Ref to store the canvas element

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      // Destroy the existing chart instance before creating a new one
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create a new chart instance
      if (ctx) {
        chartRef.current = new Chart<"line">(ctx, {
          type: "line",
          data: {
            labels: props.labels,
            datasets: props.dataSets,
          },
          options: props.options,
        });

        // Set canvas dimensions
        if (props.height) {
          chartRef.current.canvas.style.height = `${props.height}px`;
        }
        if (props.width) {
          chartRef.current.canvas.style.width = `${props.width}px`;
        }
      }
    }

    // Cleanup function to destroy the chart instance when the component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [props.labels, props.dataSets, props.options, props.width, props.height]); // Dependencies to re-render the chart when props change

  return (
    <div>
      <canvas id={props.id} ref={canvasRef} />
    </div>
  );
};

export default RdsAreaChart;
