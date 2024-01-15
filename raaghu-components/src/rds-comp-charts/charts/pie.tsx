
import React from "react";
import { RdsPieChart } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsPieChart
            id="piechartpa"
            height={300}
            width={200}
            labels={["red", "Orange", "Yellow", "Green", "Blue"]}
            options={{
                circumference: 360,
                radius: 100,
                maintainAspectRatio: false,
                animation: {
                    animateRotate: false,
                    animateScale: true
                },
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                        pointStyle: "line",

                        labels: {

                            usePointStyle: true
                        }
                    },
                    title: {
                        display: true,
                        text: "Pie Chart"
                    }
                }
            }}
            dataSets={[
                {
                    label: "Dataset1",
                    data: [20, 10, 20, 40, 10],
                    backgroundColor: [
                        "#ff6384",
                        "#ff9f40",
                        "#ffcd56",
                        "#4bc0c0",
                        "#059bff",
                    ],
                    borderColor: [
                        "#fff",
                    ],
                    borderWidth: 1
                }
            ]}
        />
    );
};

export default code_actual;
