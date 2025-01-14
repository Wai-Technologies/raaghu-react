import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export interface RdsBarChartProps {
    labels: any[];
    options: any;
    dataSets: any[];
    id: any;
}

const RdsBarChart = (props: RdsBarChartProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const CanvasId = props.id;

    useEffect(() => {
        const canvasElm = canvasRef.current;
        const ctx = canvasElm?.getContext("2d");

        if (ctx) {
            const barCanvas = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: props.labels,
                    datasets: props.dataSets
                },
                options: props.options,
            });

            if (barCanvas !== null) {
                if (props.id === "barchart1") {
                    barCanvas.canvas.style.height = "57vh";
                    barCanvas.canvas.style.width = "100vh";
                } else if (props.id === "histogram") {
                    barCanvas.canvas.style.height = "50px";
                    barCanvas.canvas.style.width = "50px";
                } else {
                    barCanvas.canvas.style.height = "42.5vh";
                    barCanvas.canvas.style.width = "100vh";
                }
            }
        
            return () => {
                barCanvas.destroy();
            };
        }
    }, []);
    
    return (
        <div>
            <canvas data-testid={CanvasId} id={CanvasId} ref={canvasRef} />
        </div>
    );
};

export default RdsBarChart;
