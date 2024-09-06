// import React, { useEffect } from "react";
// import Chart from "chart.js/auto";
// import "./rds-chart-stacked.css";

// export interface RdsStackedprops {
//     labels: any[],
//     options: any,
//     dataSets: any[],
//     height?: number,
//     width?: number,
//     id: string
// }

// const RdsStackedChart = (props: RdsStackedprops) => {
//     const CanvasId = props.id;
//     let ctx;


//     useEffect(() => {
//         const canvasElm = document.getElementById(
//             CanvasId
//         ) as HTMLCanvasElement | null;
//         ctx = canvasElm?.getContext("2d") as CanvasRenderingContext2D;

//         const StackedCanvas = new Chart(ctx, {
//             type: "bar",
//             data: {
//                 labels: props.labels,
//                 datasets: props.dataSets
//             },
//             options: props.options,
//         });
//         StackedCanvas.canvas.style.height = props.height + "px";
//         StackedCanvas.canvas.style.width = props.width + "px";
//     });

//     return (
//         <div className="chart-container">
//             <canvas id={CanvasId} ref={ctx} />
//         </div>
//     );
// };

// export default RdsStackedChart;


import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./rds-chart-stacked.css";

export interface RdsStackedprops {
    labels: any[];
    options: any;
    dataSets: any[];
    height?: number;
    width?: number;
    id: string;
}

const RdsStackedChart = (props: RdsStackedprops) => {
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
                    type: "bar",
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
    }, [props.labels, props.dataSets, props.options, props.height, props.width]); // Dependencies to re-render the chart when props change

    return (
        <div className="chart-container">
            <canvas id={props.id} ref={canvasRef} />
        </div>
    );
};

export default RdsStackedChart;
