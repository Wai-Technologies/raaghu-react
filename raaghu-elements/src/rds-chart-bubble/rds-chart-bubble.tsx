// import React, { useEffect } from "react";
// import Chart from "chart.js/auto";
// import "./rds-chart-bubble.css";

// export interface RdsBubbleChartProps {
//     id: string;
//     labels: any[];
//     options: any;
//     dataSets: any[];
//     chartdata?: any[];
//     chartWidth?: number;
//     chartStyle?: string;
// }

// const RdsBubbleChart = (props: RdsBubbleChartProps) => {
//     const CanvasId = props.id;
//     let ctx;

//     useEffect(() => {
//         const canvasElm = document.getElementById(
//             CanvasId
//         ) as HTMLCanvasElement | null;
//         ctx = canvasElm?.getContext("2d") as CanvasRenderingContext2D;

//         const lineCanvas = new Chart(ctx, {
//             type: "bubble",
//             data: {
//                 labels: props.labels,
//                 datasets: props.dataSets,
//             },
//             options: props.options,
//         });
//     });

//     return (
//         <div>
//             <canvas id={CanvasId} ref={ctx} />
//         </div>
//     );
// };

// export default RdsBubbleChart;



import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./rds-chart-bubble.css";

export interface RdsBubbleChartProps {
    id: string;
    labels: any[];
    options: any;
    dataSets: any[];
    chartdata?: any[];
    chartWidth?: number;
    chartStyle?: string;
}

const RdsBubbleChart = (props: RdsBubbleChartProps) => {
    const chartRef = useRef<Chart | null>(null); // Ref to store the chart instance
    const canvasRef = useRef<HTMLCanvasElement | null>(null); // Ref to store the canvas element

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");

            // Destroy the previous chart instance if it exists
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            // Create a new chart instance
            if (ctx) {
                chartRef.current = new Chart(ctx, {
                    type: "bubble",
                    data: {
                        labels: props.labels,
                        datasets: props.dataSets,
                    },
                    options: props.options,
                });
            }
        }

        // Cleanup function to destroy the chart instance when the component unmounts
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
    }, [props.labels, props.dataSets, props.options]); // Add dependencies to re-render the chart when props change

    return (
        <div>
            <canvas id={props.id} ref={canvasRef} />
        </div>
    );
};

export default RdsBubbleChart;
