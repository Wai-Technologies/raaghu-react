import React from "react";
import { RdsDoughnutChart } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsDoughnutChart
            height={400}
            width={400}
            labels={["Red", "Orange", "Yellow", "Green", "Blue"]}
            options={{
                maintainAspectRatio: false,
                type: "doughnut",
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: "top",
                        },
                        title: {
                            display: true,
                            text: "Chart.js Doughnut Chart",
                            fontColor: "#ff6384",
                        },
                        subtitles: {
                            fontColor: "#ff6384",
                        },
                    },
                },
            }}
            dataSets={[
                {
                    label: "Dataset 1",
                    data: [20, 10, 30, 40],
                    backgroundColor: ["#ff6384", "#ff9f40", "#ffcd56", "#4bc0c0"],
                    borderColor: ["#fff"],

                },
            ]}
            id="doughnut"
        />
    );
};

export default code_actual;
