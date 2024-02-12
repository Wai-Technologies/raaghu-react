import React from "react";
import { RdsBubbleChart } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsBubbleChart
            id="bubblechart"
            labels={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            options={{
                responsive: true,
                radius: 5, // smaller bubbles
                maintainAspectRatio: false,
                pointStyle: "circle",
                plugins: {
                    legend: {
                        position: "top",
                        pointStyle: "line",
                        labels: {
                            usePointStyle: true,
                        },
                    },
                    tooltip: {
                        usePointStyle: true,
                    },
                    title: {
                        display: true,
                        text: "Bubble Chart",
                    },
                },
            }}
            dataSets={[
                {
                    label: "Dataset 1",
                    data: [90, 97, 20, 30, 40, 50, 60, 70],
                    borderColor: ["red"],
                    backgroundColor: ["rgba(255, 99, 132)"],
                },
                {
                    label: "Dataset 2",
                    data: [90, 80, 70, 60, 50, 40, 30, 90, 98],
                    borderColor: ["orange"],
                    backgroundColor: ["rgba(255, 206, 86)"],
                },
            ]}
        />
    );
};

export default code_actual;


