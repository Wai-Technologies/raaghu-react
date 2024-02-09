import React, { useEffect} from "react";
import Chart from "chart.js/auto";

export interface RdsPolarAreaChartProps {
  labels:any[],
  options:any,
  dataSets:any[],
  width?: number,
  height?:number,
  chartStyle?:string,
  id:string
}

const RdsPolarAreaChart = (props: RdsPolarAreaChartProps) => {
    const CanvasId = props.id;
    let ctx;
 

    useEffect(() => {
        const canvasElm = document.getElementById(
            CanvasId
        ) as HTMLCanvasElement | null;
        ctx = canvasElm?.getContext("2d") as CanvasRenderingContext2D;
    
        const PolarCanvas = new Chart(ctx, {
            type: "polarArea",
            data: {
                labels: props.labels,
                datasets:props.dataSets
            },
            options: props.options,
        });
        PolarCanvas.canvas.style.height = props.height + "px";
        PolarCanvas.canvas.style.width = props.width + "px";
    });

    return (
        <div>
            <canvas id={CanvasId} ref={ctx} />
        </div>
    );
};

export default RdsPolarAreaChart;
