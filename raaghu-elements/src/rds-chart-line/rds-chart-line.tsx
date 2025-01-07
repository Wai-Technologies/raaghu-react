import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./rds-chart-line.css";

export interface Rdslineprops {
    labels: any[];
    options: any;
    dataSets: any[];    
    id: string;
}

const RdsLineChart = (props: Rdslineprops) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvasElm = canvasRef.current;
        const ctx = canvasElm?.getContext("2d");

        if (ctx) {
            const lineCanvas = new Chart(ctx, {
                type: "line",
                data: {
                    labels: props.labels,
                    datasets: props.dataSets,
                },
                options: props.options,
            });
            
            if(lineCanvas !== null) {
                lineCanvas.canvas.style.height = "50vh";
                lineCanvas.canvas.style.width = "100vh";
            }
            return () => {
                lineCanvas.destroy();
            };
        }
    }, []);

    return (
        <div>
            <canvas data-testid={props.id} id={props.id} ref={canvasRef} />
        </div>
    );
};

export default RdsLineChart;
