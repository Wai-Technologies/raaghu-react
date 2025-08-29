import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export interface RdsCompBarChartProps {
    labels: any[];
    options: any;
    dataSets: any[];
    id: any;
    height?: string | number;
}

const RdsCompBarChart = (props: RdsCompBarChartProps) => {
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
                options: { ...props.options, responsive: true, maintainAspectRatio: false },
            });

            if (barCanvas !== null) {
                if (props.height) {
                    barCanvas.canvas.style.height = typeof props.height === "number" ? `${props.height}px` : String(props.height);
                    barCanvas.canvas.style.width = "100%";
                } else {
                    if (props.id === "barchart1") {
                        barCanvas.canvas.style.height = "65vh";
                        barCanvas.canvas.style.width = "100%";
                    } else if (props.id === "histogram") {
                        barCanvas.canvas.style.height = "50px";
                        barCanvas.canvas.style.width = "50px";
                    } else {
                        barCanvas.canvas.style.height = "76vh";
                        barCanvas.canvas.style.width = "100%";
                    }
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
RdsCompBarChart.displayName = 'RdsCompBarChart';
export default RdsCompBarChart;