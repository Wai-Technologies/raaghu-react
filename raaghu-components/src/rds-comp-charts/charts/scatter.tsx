import React from "react";
import { RdsScatterChart } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsScatterChart
            id="scatterc"
            height={300}
            width={300}
            labels={["January", "February", "March", "April"]}
            options={{
                responsive: true,
                maintainAspectRatio: false, pointStyle: "triangle",
                radius: 10,
                plugins: {
                    legend: {
                        position: "top",
                        align: "center",
                        pointStyle: "line",
                        labels: {
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        usePointStyle: true,
                    },
                },
                scales: {
                    x: {
                        type: "linear",
                        position: "bottom"
                    }
                }
            }}
            dataSets={[
                {
                    type: "scatter",
                    label: "Scatter Dataset",
                    data: [
                        {
                            x: -10,
                            y: 0
                        },
                        {
                            x: -8,
                            y: 3
                        },
                        {
                            x: -5,
                            y: 5
                        },
                        {
                            x: 0,
                            y: 9
                        },
                        {
                            x: 4,
                            y: 3
                        },
                        {
                            x: 9,
                            y: 5
                        },
                        {
                            x: 0.5,
                            y: 5.5
                        }
                    ],
                    backgroundColor: "rgb(146,138,224)"
                }
            ]}
        />
    );
};
export default code_actual;
