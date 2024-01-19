import React, { useEffect} from "react";
import Chart from "chart.js/auto";
import "./rds-chart-area.css";

export interface lineprops {
  labels:any[],
  options:any,
  dataSets:any[],
  height?:number,
  width?:number,
  id:string,
  isGradient:boolean,
}

const RdsAreaChart = (props: lineprops) => {
    const CanvasId = props.id;
    let ctx;
 
    useEffect(() => {
        const canvasElm = document.getElementById(
            CanvasId
        ) as HTMLCanvasElement | null;
        ctx = canvasElm?.getContext("2d") as CanvasRenderingContext2D;
    
        const AreaCanvas = new Chart(ctx, {
            type: "line",
            data: {
                labels: props.labels,
                datasets:props.dataSets
            },
            options: props.options,
        });
        AreaCanvas.canvas.style.height = props.height + "px";
        AreaCanvas.canvas.style.width = props.width + "px";
    });

    return (
        <div>
            <canvas id={CanvasId} ref={ctx} />
        </div>
    );
};

export default RdsAreaChart;
