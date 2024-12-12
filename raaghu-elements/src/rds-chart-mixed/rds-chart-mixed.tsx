import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export interface RdsMixedChartProps {
    labels: any[];
    options: any;
    dataSets: any[];
    chartStyle: string;
    id: string;
}

const RdsMixedChart = (props: RdsMixedChartProps) => {
    
const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        const canvasElm = canvasRef.current;
        const ctx = canvasElm?.getContext("2d") as CanvasRenderingContext2D;

        if (ctx) {
            const mixedCanvas = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: props.labels,
                    datasets: props.dataSets,
                },
                options: props.options,
            });

            if(mixedCanvas !== null) {
                mixedCanvas.canvas.style.height = "50vh";
                mixedCanvas.canvas.style.width = "100vh";
            }

            return () => {
                mixedCanvas.destroy();
            };
        }
    }, []);

    return (
        <div>
            <canvas data-testid={props.id} id={props.id} ref={canvasRef} />
        </div>
    );
};

export default RdsMixedChart;
