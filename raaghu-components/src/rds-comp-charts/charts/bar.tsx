import React from "react";
import { RdsBarChart } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsBarChart
            id="barchartpa"
            height={400}
            width={650}
            labels={["January", "February", "March", "April", "May", "June", "July"]}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "top",
                    },
                    title: {
                        display: true,
                        text: "Vertical Bar Chart",
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                    x: {
                        grid: {
                            display: false,
                        },
                    },
                },
            }}
            dataSets={[
                {
                    label: "Dataset 1",
                    data: [20, 30, 50, 80, 98, 95, 55],
                    backgroundColor: "rgba(75, 192, 192, 1)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderRadius: 20,
                },
                {
                    label: "Dataset 2",
                    data: [15, 67, 34, 78, 45, 87, 76],
                    backgroundColor: "rgba(54, 162, 235, 1)",
                    borderRadius: 20,
                },
                {
                    label: "Dataset 3",
                    data: [31, 52, 43, 91, 74, 93, 76],
                    backgroundColor: "rgba(255, 159, 64, 1)",
                    borderRadius: 20,
                },
            ]}
        />
    );
};

export default code_actual;
