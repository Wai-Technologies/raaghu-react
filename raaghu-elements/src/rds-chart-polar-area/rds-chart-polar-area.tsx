import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export interface RdsPolarAreaChartProps {
    labels: any[],
    options: any,
    dataSets: any[],
    width?: number,
    height?: number,
    chartStyle?: string,
    id: string
}

const RdsPolarAreaChart = (props: RdsPolarAreaChartProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart<"polarArea", number[], unknown> | null>(null);
    const CanvasId = props.id;
    let ctx;


    useEffect(() => {
        const canvasElm = canvasRef.current;
        if (!canvasElm) return;
        ctx = canvasElm?.getContext("2d") as CanvasRenderingContext2D;
        
        // Destroy the existing chart if it exists
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }
        const PolarCanvas = new Chart(ctx, {
            type: "polarArea",
            data: {
                labels: props.labels,
                datasets: props.dataSets
            },
            options: props.options,
        });
        if (PolarCanvas != null) {
        PolarCanvas.canvas.style.height = props.height + "px";
        PolarCanvas.canvas.style.width = props.width + "px";
        chartInstanceRef.current = PolarCanvas; // Store the chart instance
        }
    });

    return (
        <div>
            <canvas id={CanvasId} ref={canvasRef} />
        </div>
    );
};

export default RdsPolarAreaChart;


// import React, { useEffect, useRef } from "react";
// import Chart, { ChartTypeRegistry, ChartData, ChartOptions } from "chart.js/auto";

// export interface RdsPolarAreaChartProps {
//     labels: any[];
//     options: ChartOptions<"polarArea">; // Explicitly typing the options for the polar area chart
//     dataSets: ChartData<"polarArea">["datasets"]; // Explicitly typing the datasets for the polar area chart
//     width?: number;
//     height?: number;
//     chartStyle?: string;
//     id: string;
// }

// const RdsPolarAreaChart = (props: RdsPolarAreaChartProps) => {
//     const chartRef = useRef<Chart<"polarArea"> | null>(null); // Explicitly typing the chartRef for a polar area chart
//     const canvasRef = useRef<HTMLCanvasElement | null>(null); // Ref to store the canvas element

//     useEffect(() => {
//         if (canvasRef.current) {
//             const ctx = canvasRef.current.getContext("2d");

//             // Destroy the previous chart instance if it exists
//             if (chartRef.current) {
//                 chartRef.current.destroy();
//             }

//             // Create a new chart instance
//             if (ctx) {
//                 chartRef.current = new Chart<"polarArea">(ctx, {
//                     type: "polarArea",
//                     data: {
//                         labels: props.labels,
//                         datasets: props.dataSets,
//                     },
//                     options: props.options,
//                 });

//                 // Set canvas dimensions
//                 if (props.height) {
//                     chartRef.current.canvas.style.height = `${props.height}px`;
//                 }
//                 if (props.width) {
//                     chartRef.current.canvas.style.width = `${props.width}px`;
//                 }
//             }
//         }

//         // Cleanup function to destroy the chart instance when the component unmounts
//         return () => {
//             if (chartRef.current) {
//                 chartRef.current.destroy();
//                 chartRef.current = null;
//             }
//         };
//     }, [props.labels, props.dataSets, props.options, props.width, props.height]); // Dependencies to re-render the chart when props change

//     return (
//         <div>
//             <canvas id={props.id} ref={canvasRef} />
//         </div>
//     );
// };

// export default RdsPolarAreaChart;
