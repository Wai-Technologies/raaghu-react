// import React, { useEffect } from "react";
// import Chart from "chart.js/auto";

// export interface RdsMixedChartProps {
//     labels: any[],
//     options: any,
//     dataSets: any[],
//     width?: number,
//     height?: number
//     chartStyle: string,
//     id: string
// }

// const RdsMixedChart = (props: RdsMixedChartProps) => {
//     const CanvasId = props.id;
//     let ctx;


//     useEffect(() => {
//         const canvasElm = document.getElementById(
//             CanvasId
//         ) as HTMLCanvasElement | null;
//         ctx = canvasElm?.getContext("2d") as CanvasRenderingContext2D;

//         const MixedCanvas = new Chart(ctx, {
//             type: "bar",
//             data: {
//                 labels: props.labels,
//                 datasets: props.dataSets
//             },
//             options: props.options,
//         });
//         MixedCanvas.canvas.style.height = props.height + "px";
//         MixedCanvas.canvas.style.width = props.width + "px";
//     });

//     return (
//         <div>
//             <canvas id={CanvasId} ref={ctx} />
//         </div>
//     );
// };

// export default RdsMixedChart;


import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export interface RdsMixedChartProps {
    labels: any[];
    options: any;
    dataSets: any[];
    width?: number;
    height?: number;
    chartStyle: string;
    id: string;
}

const RdsMixedChart = (props: RdsMixedChartProps) => {
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
                    type: "bar", // You can set this to "mixed" or any valid chart type
                    data: {
                        labels: props.labels,
                        datasets: props.dataSets,
                    },
                    options: props.options,
                });

                // Set canvas dimensions
                chartRef.current.canvas.style.height = `${props.height}px`;
                chartRef.current.canvas.style.width = `${props.width}px`;
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

export default RdsMixedChart;
