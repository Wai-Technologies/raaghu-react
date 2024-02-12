import React from "react";
import { RdsLineChart } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsLineChart
            id="multilinechart"
            height={250}
            width={650}
            labels={["January", "February", "March", "April", "May", "Jun", "July"]}
            options={{
                pointStyle: "circle",
                radius: 4,
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 1,
                plugins: {
                    legend: {
                        position: "top",
                        align: "center",
                        pointStyle: "bottom",
                        labels: {
                            usePointStyle: true,
                        },
                    },
                    tooltip: {
                        usePointStyle: true,
                    },
                    filler: {
                        propagate: false,
                    },
                    title: {
                        display: true,
                        text: "Multi-Line Chart",
                    },
                },
                interaction: {
                    intersect: false,
                },
            }}
            dataSets={[
                {
                    label: "Dataset 1",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: "rgb(75, 192, 192,0.7)",
                    tension: 0.1,
                    backgroundColor: "rgb(75, 192, 192,0.2)",
                },
                {
                    label: "Dataset 2",
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: "rgb(192, 75, 192,0.7)",
                    tension: 0.1,
                    backgroundColor: "rgb(192, 75, 192,0.2)",
                },
                {
                    label: "Dataset 3",
                    data: [15, 29, 60, 41, 66, 35, 70],
                    fill: false,
                    borderColor: "rgb(192, 192, 75,0.7)",
                    tension: 0.1,
                    backgroundColor: "rgb(192, 192, 75,0.2)",
                },
            ]}
        />
    );
};

export default code_actual;
