import React from "react";
import { RdsBooleanChart } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsBooleanChart
            id="barcfgdhartpa"
            height={200}
            width={200}
            labels={["green", "grey"]}
            options={{
                maintainAspectRatio: false,
                elements: {
                    center: {
                        text: "50%", //set as you wish
                    },
                },
                cutoutPercentage: 75,
                legend: {
                    display: false,
                },
                responsive: true,
                plugins: {
                    series: {
                        label: {
                            position: "inside",
                            text: "total", // or "inside" | "outside"
                            display: false,
                        },
                    },
                    doughnutlabel: {
                        labels: [
                            {
                                text: "550",
                                font: {
                                    size: 20,
                                    weight: "bold",
                                },
                            },
                            {
                                text: "total",
                            },
                        ],
                    },

                    legend: {
                        display: false,
                        align: "center",
                        position: "top",
                    },
                },
            }}
            centerIconName="users"
            dataSets={[
                {
                    label: "Dataset 1",
                    data: [20, 10],
                    fillStyle: "blue",
                    fillRect: [200, 100, 40, 10],
                    backgroundColor: ["#7E2EEF", "#BF00BB"],
                    borderColor: ["#fff"],
                    borderWidth: 1,
                    cutout: "90%",
                    title: {
                        text: "Doughnut Chart",
                        verticalAlign: "center",
                        dockInsidePlotArea: true,
                    },
                },
            ]}
        />
    );
};

export default code_actual;
